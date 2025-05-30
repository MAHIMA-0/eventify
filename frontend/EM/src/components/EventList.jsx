import React from 'react';

const EventList = ({ events, onDelete }) => {
  if (!events.length) return <p>No events found.</p>;

  return (
    <ul>
      {events.map(event => (
        <li key={event.id} style={{ marginBottom: 15 }}>
          <strong>{event.name}</strong> — {event.date}
          <p>{event.location}</p>
          <button
            onClick={() => onDelete(event.id)}
            style={{
              padding: '5px 10px',
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 4,
              marginTop: 5
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
