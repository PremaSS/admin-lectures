import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Table from './Table';
import LectureDetail from './LectureDetail';
import LectureAdd from './LectureAdd';

function LecturesList() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLectureId, setSelectedLectureId] = useState(null);
  const [isAddingLecture, setIsAddingLecture] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLectures, setfilteredLectures] = useState([]);

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const myData = [
          { id: 1, title: 'my Lecture 1', completed: false },
          { id: 2, title: 'my Lecture 2', completed: true },
          { id: 3, title: 'my Lecture 3', completed: false },
        ];
        setLectures(myData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  useEffect(() => {
    const filtered = lectures.filter((lecture) =>
      lecture.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setfilteredLectures(filtered);
  }, [searchQuery, lectures]);

  const handleEdit = (id) => {
    setSelectedLectureId(id);
  };
  const handleCancelEdit = () => {
    setSelectedLectureId(null);
  };

  const handleSaveLecture = (updatedLecture) => {
    const updatedLectures = lectures.map((lecture) =>
      lecture.id === updatedLecture.id ? updatedLecture : lecture,
    );
    setLectures(updatedLectures);
    setSelectedLectureId(null);
    // Здесь будем вызывать API для сохранения изменений
    console.log('Saved Lecture', updatedLecture);
  };

  const handleAddLecture = (newLecture) => {
    const nextId = lectures.length > 0 ? Math.max(...lectures.map((lecture) => lecture.id)) + 1 : 1;
    const newLectureWithId = { ...newLecture, id: nextId };
    setLectures([...lectures, newLectureWithId]);
    setIsAddingLecture(false);
    // Здесь будем вызывать API для добавления новой лекции
    console.log('Added Lecture', newLectureWithId);
  };
  const handleCancelAdd = () => {
    setIsAddingLecture(false);
  };
  const handleOpenAddForm = () => {
    setIsAddingLecture(true);
  };

  const handleDeleteLecture = (id) => {
    const updatedLectures = lectures.filter((lecture) => lecture.id !== id);
    setLectures(updatedLectures);
    // Здесь нужно будет вызвать API для удаления лекции
    console.log('Deleted Lecture with id:', id);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return <p>Loading lectures...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  const columns = [
    { key: 'id', header: 'ID' },
    { key: 'title', header: 'Title' },
    { key: 'completed', header: 'Completed' },
    {
      key: 'actions',
      header: 'Actions',
      render: (lecture) => (
        <>
          <button onClick={() => handleEdit(lecture.id)}>Edit</button>
          <button onClick={() => handleDeleteLecture(lecture.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>List of Lectures</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <button onClick={handleOpenAddForm}>Add Lecture</button>
      <Table data={filteredLectures} columns={columns} />
      {selectedLectureId && (
        <LectureDetail
          lectureId={selectedLectureId}
          onSave={handleSaveLecture}
          onCancel={handleCancelEdit}
        />
      )}
      {isAddingLecture && <LectureAdd onAdd={handleAddLecture} onCancel={handleCancelAdd} />}
    </div>
  );
}

export default LecturesList;
