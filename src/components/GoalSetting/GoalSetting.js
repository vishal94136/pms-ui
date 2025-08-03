import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubordinates, fetchGoals, assignGoals, fetchManagerGoals } from '../../redux/actions/performanceActions';
import './GoalSetting.css';

const GoalSetting = () => {
  const dispatch = useDispatch();
  const subordinates = useSelector((state) => state.performance.subordinates);
  const goals = useSelector((state) => state.performance.goals);
  const managerGoals = useSelector((state) => state.performance.managerGoals);
  const [selectedResource, setSelectedResource] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchSubordinates());
    dispatch(fetchGoals());
    dispatch(fetchManagerGoals());
  }, [dispatch]);

  const handleGoalChange = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const handleSubmit = async () => {
    if (!selectedResource || selectedGoals.length === 0) {
      alert('Select a subordinate and at least one goal');
      return;
    }
    setLoading(true);
    await dispatch(assignGoals(parseInt(selectedResource), selectedGoals));
    setSelectedGoals([]);
    setLoading(false);
    dispatch(fetchManagerGoals());
  };

  const getExistingGoals = () => {
    if (!selectedResource) return [];
    const selectedSub = subordinates.find((sub) => sub.id === parseInt(selectedResource));
    if (!selectedSub) return [];
    const resourceGoals = managerGoals.find((mg) => mg.resourceName === selectedSub.name);
    return resourceGoals ? resourceGoals.goals : [];
  };

  const existingGoals = getExistingGoals();

  return (
    <div className="goal-setting">
      <h3>Goals Setting</h3>
      <div className="form-group">
        <label>Select Subordinate:</label>
        <select value={selectedResource} onChange={(e) => setSelectedResource(e.target.value)}>
          <option value="">-- Select --</option>
          {subordinates.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name} ({sub.roles[0]?.name || 'Unknown'})
            </option>
          ))}
        </select>
      </div>
      <div className="goals-list">
        <label>Select Goals:</label>
        {goals.filter((goal) => !existingGoals.includes(goal.goal)).map((goal) => (
          <div key={goal.id} className="goal-item">
            <input
              type="checkbox"
              checked={selectedGoals.includes(goal.id)}
              onChange={() => handleGoalChange(goal.id)}
            />
            {goal.goal}
          </div>
        ))}
        {goals.every((goal) => existingGoals.includes(goal.goal)) && (
          <p>All goals already assigned to this resource.</p>
        )}
      </div>
      <button onClick={handleSubmit} disabled={loading || selectedGoals.length === 0}>
        {loading ? 'Assigning...' : 'Assign Goals'}
      </button>
      <div className="assigned-goals-table">
        <h4>Assigned Goals</h4>
        <table className="goals-table">
          <thead>
            <tr>
              <th>Resource Name</th>
              <th>Goals</th>
              <th>Goal Status</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {managerGoals.length === 0 ? (
              <tr><td colSpan="4">No data available</td></tr>
            ) : (
              managerGoals.map((item, index) => (
                <tr key={index}>
                  <td>{item.resourceName}</td>
                  <td>{item.goals.length > 0 ? item.goals.join(', ') : 'No goals assigned'}</td>
                  <td>{item.goalStatus}</td>
                  <td>{item.year || '-'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GoalSetting;