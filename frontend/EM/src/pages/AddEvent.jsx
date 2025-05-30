import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';

const AddEvent = () => {
  const navigate = useNavigate();

  const handleAddEvent = async (eventData) => {
    try {
      const response = await fetch('http://localhost:3000/api/AddEvent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(eventData),
      });

      if (response.ok) {
        alert('Event added successfully!');
        navigate('/Dashboard');
      } else if (response.status === 401) {
        alert('Please login first.');
        navigate('/Login');
      } else {
        alert('Failed to add event.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error occurred. Try again.');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 600, margin: 'auto' }}>
      <h2>Add New Event</h2>
      <EventForm onSubmit={handleAddEvent} buttonText="Add Event" />
    </div>
  );
};

export default AddEvent;
