import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubordinates, fetchGoals, assignGoals } from '../../redux/actions/performanceActions';
import './GoalSetting.css';

const GoalSetting = () => {
  const dispatch = useDispatch();
  const subordinates = useSelector((state) => state.performance.subordinates);
  const goals = useSelector((state) => state.performance.goals);
  const [selectedResource, setSelectedResource] = useState('');
  const [selectedGoals, setSelectedGoals] = useState([]);

  useEffect(() => {
    dispatch(fetchSubordinates());
    dispatch(fetchGoals());
  }, [dispatch]);

  const handleGoalChange = (goalId) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const handleSubmit = () => {
    if (!selectedResource || selectedGoals.length === 0) {
      alert('Select a subordinate and at least one goal');
      return;
    }
    dispatch(assignGoals(parseInt(selectedResource), selectedGoals));
    setSelectedGoals([]);
  };

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
        {goals.map((goal) => (
          <div key={goal.id} className="goal-item">
            <input
              type="checkbox"
              checked={selectedGoals.includes(goal.id)}
              onChange={() => handleGoalChange(goal.id)}
            />
            {goal.goal}
          </div>
        ))}
      </div>
      <button onClick={handleSubmit}>Assign Goals</button>
    </div>
  );
};

export default GoalSetting;