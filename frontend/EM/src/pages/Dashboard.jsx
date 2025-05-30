import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventList from '../components/EventList';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/events', {
          credentials: 'include',
        });

        if (response.status === 401) {
          navigate('/Login');
          return;
        }

        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        setEvents(data.events);
      } catch (err) {
        setError('Failed to load events. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [navigate]);

  const handleAddEvent = () => {
    navigate('/AddEvent');
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/Login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/delete/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Update state to remove deleted event
      setEvents(prev => prev.filter(event => event.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
      setError('Failed to delete event.');
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 800, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <h2>Dashboard</h2>
        <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Your Events:</h3>
      <EventList events={events} onDelete={handleDeleteEvent} />

      <button
        onClick={handleAddEvent}
        style={{
          marginTop: 20,
          padding: '10px 15px',
          cursor: 'pointer',
        }}
      >
        + Add New Event
      </button>
    </div>
  );
};

export default Dashboard;
