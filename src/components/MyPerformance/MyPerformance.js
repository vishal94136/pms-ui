import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAssessment, fetchMyGoals, updateMyGoalStatus } from '../../redux/actions/performanceActions';
import './MyPerformance.css';

const MyPerformance = () => {
  const dispatch = useDispatch();
  const myAssessment = useSelector((state) => state.performance.myAssessment);
  const myGoals = useSelector((state) => state.performance.myGoals);
  const [newStatus, setNewStatus] = useState(myGoals.overallGoalStatus);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchMyAssessment());
    dispatch(fetchMyGoals());
    setNewStatus(myGoals.overallGoalStatus);
  }, [dispatch, myGoals.overallGoalStatus]);

  const renderStars = (rating) => {
    if (rating === 0) return '-';
    const fullStars = Math.floor(rating);
    const stars = '★'.repeat(fullStars) + '☆'.repeat(4 - fullStars);
    return <span className="ratings-stars">{stars}</span>;
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    if (!newStatus) return;
    const year = myAssessment[0]?.year;
    if (!year) {
      alert('Year not available');
      return;
    }
    setLoading(true);
    await dispatch(updateMyGoalStatus(newStatus, year));
    setLoading(false);
  };

  return (
    <div className="my-performance">
      <h3>My Annual Assessment</h3>
      <table className="assessment-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Manager</th>
            <th>Rating</th>
            <th>Assessment Status</th>
            <th>Goal Status</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {myAssessment.length === 0 ? (
            <tr><td colSpan="6">No data available</td></tr>
          ) : (
            myAssessment.map((item) => (
              <tr key={item.id}>
                <td>{item.roleName}</td>
                <td>{item.managerName}</td>
                <td>{renderStars(item.rating)}</td>
                <td>{item.assessmentStatus}</td>
                <td>{item.goalStatus}</td>
                <td>{item.year}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <h3>My Assigned Goals</h3>
      <table className="goals-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          {myGoals.goals.length === 0 ? (
            <tr><td colSpan="2">No goals assigned</td></tr>
          ) : (
            myGoals.goals.map((goal) => (
              <tr key={goal.id}>
                <td>{goal.id}</td>
                <td>{goal.goal}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="status-update">
        <label>Overall Goal Status:</label>
        <select value={newStatus} onChange={handleStatusChange}>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={handleUpdateStatus} disabled={loading || newStatus === myGoals.overallGoalStatus}>
          {loading ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </div>
  );
};

export default MyPerformance;