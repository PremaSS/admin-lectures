import React, { useState, useEffect } from 'react';

function LectureDetail({ lectureId, onSave, onCancel }) {
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedCompleted, setEditedCompleted] = useState(false);

  useEffect(() => {
    const fetchLecture = async () => {
      setLoading(true);
      try {
        // Потом заменим на реальный запрос, когда будет API
        const myLecture = {
          id: lectureId,
          title: `My Title ${lectureId}`,
          completed: false,
        };
        setLecture(myLecture);
        setEditedTitle(myLecture.title);
        setEditedCompleted(myLecture.completed);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLecture();
  }, [lectureId]);

  const handleTitleChange = (event) => {
    setEditedTitle(event.target.value);
  };

  const handleCompletedChange = () => {
    setEditedCompleted(!editedCompleted);
  };

  const handleSave = () => {
    if (onSave) {
      onSave({ ...lecture, title: editedTitle, completed: editedCompleted });
    }
  };

  if (loading) {
    return <p>Loading lecture details...</p>;
  }

  if (error) {
    return <p>Error fetching lecture details: {error.message}</p>;
  }

  if (!lecture) {
    return <p>Lecture not found.</p>;
  }

  return (
    <div>
      <h2>Lecture Details</h2>
      <label>
        Title:
        <input type="text" value={editedTitle} onChange={handleTitleChange} />
      </label>
      <label>
        Completed:
        <input type="checkbox" checked={editedCompleted} onChange={handleCompletedChange} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default LectureDetail;
