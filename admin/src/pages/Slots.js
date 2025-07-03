import React, { useState, useEffect } from 'react';
import { getSlots } from '../services/api';

const Slots = () => {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const data = await getSlots();
        setSlots(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="slots-page">
      <div className="page-header">
        <h1>Time Slots</h1>
      </div>

      <div className="slots-table">
        <table>
          <thead>
            <tr>
              <th>Franchise</th>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Capacity</th>
              <th>Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.map((slot) => (
              <tr key={slot._id}>
                <td>{slot.franchise.name}</td>
                <td>{new Date(slot.date).toLocaleDateString()}</td>
                <td>{slot.startTime}</td>
                <td>{slot.endTime}</td>
                <td>{slot.capacity}</td>
                <td>{slot.available}</td>
                <td>
                  <button className="btn btn-info">View</button>
                  <button className="btn btn-warning">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Slots; 