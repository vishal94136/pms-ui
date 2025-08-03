import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnualAssessment, updateAssessment } from '../../redux/actions/performanceActions';
import './AnnualAssessment.css';

const AnnualAssessment = () => {
  const dispatch = useDispatch();
  const annualAssessment = useSelector((state) => state.performance.annualAssessment);
  const [selectedItem, setSelectedItem] = useState(null);
  const [newRating, setNewRating] = useState(0);

  useEffect(() => {
    dispatch(fetchAnnualAssessment());
  }, [dispatch]);

  const renderStars = (rating) => {
    if (rating === 0) return '-';
    const fullStars = Math.floor(rating);
    const stars = '★'.repeat(fullStars) + '☆'.repeat(4 - fullStars);
    return <span className="ratings-stars">{stars}</span>;
  };

  const handleRateClick = (item) => {
    setSelectedItem(item);
    setNewRating(item.rating);
  };

  const handleViewClick = (item) => {
    alert(`Viewing details for ${item.resourceName}`); 
  };

  const handleSubmitRating = () => {
    if (newRating < 1 || newRating > 4) {
      alert('Rating must be between 1 and 4');
      return;
    }
    const updatedData = {
      resourceId: selectedItem.resource_id,
      roleId: selectedItem.role_id,
      managerId: selectedItem.manager_id,
      rating: newRating,
      assessmentStatus: selectedItem.assessmentStatus,
      goalStatus: selectedItem.goalStatus,
      year: selectedItem.year,
    };
    dispatch(updateAssessment(selectedItem.id, updatedData));
    setSelectedItem(null);
  };

  const getAction = (rating, assessmentStatus) => {
    return (rating === 0 || assessmentStatus === 'InProgress') ? 'Rate Goals' : 'View';
  };

  const getActionClass = (rating, assessmentStatus) => {
    return (rating === 0 || assessmentStatus === 'InProgress') ? 'rate' : 'view';
  };

  return (
    <div className="annual-assessment">
      <h3>Annual Assessment {annualAssessment[0]?.year || ''}</h3>
      <table className="assessment-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Emp Id</th>
            <th>Role</th>
            <th>Goals</th>
            <th>Ratings</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {annualAssessment.length === 0 ? (
            <tr><td colSpan="6">No data available</td></tr>
          ) : (
            annualAssessment.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="name-cell">
                    <div className="avatar"></div>
                    {item.resourceName}
                  </div>
                </td>
                <td>{item.resource_id}</td>
                <td>{item.roleName}</td>
                <td>
                  <span className={`goals-status ${item.goalStatus.toLowerCase()}`}>
                    {item.goalStatus}
                  </span>
                </td>
                <td>{renderStars(item.rating)}</td>
                <td>
                  <button
                    className={`action-btn ${getActionClass(item.rating, item.assessmentStatus)}`}
                    onClick={() => 
                      (item.rating === 0 || item.assessmentStatus === 'InProgress') 
                        ? handleRateClick(item) 
                        : handleViewClick(item)
                    }
                  >
                    {getAction(item.rating, item.assessmentStatus)}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedItem && (
        <div className="rating-modal">
          <div className="modal-content">
            <h4>Rate Goals for {selectedItem.resourceName}</h4>
            <input
              type="number"
              min="1"
              max="4"
              value={newRating}
              onChange={(e) => setNewRating(parseInt(e.target.value))}
            />
            <button onClick={handleSubmitRating}>Submit</button>
            <button onClick={() => setSelectedItem(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnualAssessment;