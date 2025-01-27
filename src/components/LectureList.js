import React, { useState, useEffect } from 'react';
import axios from 'axios';

function LecturesList() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos'); // Потом заменим на свой URL API нашего бота
        setLectures(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  if (loading) {
    return <p>Loading lectures...</p>;
  }

  if (error) {
    return <p>Error fetching data:{error.message}</p>;
  }

  return (
    <div>
      <h2>List of Lectures</h2>
      <ul>
        {lectures.map((lecture) => (
          <li key={lecture.id}>{lecture.title}</li> // Потом заменим на нужные поля лекций
        ))}
      </ul>
    </div>
  );
}

export default LecturesList;
