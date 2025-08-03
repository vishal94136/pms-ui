import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAssessment, fetchAnnualAssessment, fetchSubordinates } from '../../redux/actions/performanceActions';
import './DashboardContent.css';

const DashboardContent = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const myAssessment = useSelector((state) => state.performance.myAssessment[0] || {});
  const annualAssessment = useSelector((state) => state.performance.annualAssessment);
  const subordinates = useSelector((state) => state.performance.subordinates);
  const roles = user?.roles || [];
  const isManager = roles.includes('Manager');

  useEffect(() => {
    dispatch(fetchMyAssessment());
    if (isManager) {
      dispatch(fetchAnnualAssessment());
      dispatch(fetchSubordinates());
    }
  }, [dispatch, isManager]);

  const renderStars = (rating) => {
    if (rating === 0) return 'No Rating';
    const fullStars = Math.floor(rating);
    const stars = '★'.repeat(fullStars) + '☆'.repeat(4 - fullStars);
    return <span className="ratings-stars">{stars}</span>;
  };

  const calculateStarCounts = () => {
    const counts = { 4: 0, 3: 0, 2: 0, 1: 0 };
    annualAssessment.forEach((item) => {
      const starRating = Math.floor(item.rating);
      if (starRating >= 1 && starRating <= 4) {
        counts[starRating]++;
      }
    });
    return counts;
  };

  const calculatePendingAssessments = () => {
    return annualAssessment.filter((item) => item.assessmentStatus === 'InProgress').length;
  };

  const starCounts = calculateStarCounts();

  return (
    <div className="dashboard-cards">
      <div className="card personal-info">
        <h4>Personal Info</h4>
        <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
        <p><strong>ID:</strong> {user?.id || 'N/A'}</p>
        <p><strong>Role:</strong> {roles.join(', ') || 'N/A'}</p>
        <p><strong>Manager:</strong> {myAssessment.managerName || 'N/A'}</p>
      </div>

      <div className="card assessment-summary">
        <h4>Assessment Summary</h4>
        <p><strong>Rating:</strong> {renderStars(myAssessment.rating)}</p>
        <p><strong>Assessment Status:</strong> {myAssessment.assessmentStatus || 'N/A'}</p>
        <p><strong>Goal Status:</strong> {myAssessment.goalStatus || 'N/A'}</p>
        <p><strong>Year:</strong> {myAssessment.year || 'N/A'}</p>
      </div>

      {isManager && (
        <div className="card team-stats">
          <h4>Team Stats</h4>
          <p><strong>Subordinates:</strong> {subordinates.length}</p>
          {/* <p><strong>4 Stars:</strong> {starCounts[4]}</p>
          <p><strong>3 Stars:</strong> {starCounts[3]}</p>
          <p><strong>2 Stars:</strong> {starCounts[2]}</p>
          <p><strong>1 Star:</strong> {starCounts[1]}</p> */}
          <p><strong>Pending Assessments:</strong> {calculatePendingAssessments()}</p>
        </div>
      )}
    </div>
  );
};

export default DashboardContent;