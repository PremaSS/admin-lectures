import React, { useState } from 'react';

function LectureAdd({ onAdd, onCancel }) {
  const [title, setTitle] = useState('');
  const [complited, setComplited] = useState(false);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleComplitedChange = () => {
    setComplited(!complited);
  };

  const handleAdd = () => {
    if (title.trim() === '') {
      alert('Title cannot be empty');
      return;
    }
    onAdd({ title, complited });
    setTitle('');
    setComplited(false);
  };

  return (
    <div>
      <h2>Add New Lecture</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={handleTitleChange} />
      </label>

      <label>
        Complited:
        <input type="checkbox" checked={complited} onChange={handleComplitedChange} />
      </label>
      <button onClick={handleAdd}>Add</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default LectureAdd;
