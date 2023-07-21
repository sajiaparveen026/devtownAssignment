import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../SearchBar';

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [token, setToken] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);

  const getNotes = async (token) => {
    try {
      const res = await axios.get('api/notes', {
        headers: { Authorization: token },
      });
      setNotes(res.data);
      // Save the fetched notes in local storage
      localStorage.setItem('notes', JSON.stringify(res.data));
      setFilteredNotes(res.data); // Initialize filteredNotes with fetched notes
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('tokenStore');
    setToken(token);

    // Check if notes are available in local storage
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes)); // Parse the string back to an array of objects
      setFilteredNotes(JSON.parse(storedNotes)); // Initialize filteredNotes with stored notes
    } else {
      if (token) {
        getNotes(token);
      }
    }
  }, []);
 

  const deleteNote = async (id) => {
    try {
      if (token) {
        await axios.delete(`api/notes/${id}`, {
          headers: { Authorization: token },
        });
        getNotes(token);
      }
    } catch (error) {
      window.location.href = '/';
    }
  };

  // Additional state to handle drag and drop
  const [draggedNote, setDraggedNote] = useState(null);

  const onDragStart = (event, note) => {
    setDraggedNote(note);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event) => {
    event.preventDefault();
    const targetNoteId = event.currentTarget.dataset.noteId;

    // Find the index of the dragged note and the target note
    const draggedIndex = notes.findIndex((note) => note._id === draggedNote._id);
    const targetIndex = notes.findIndex((note) => note._id === targetNoteId);

    // Create a new array to hold the reordered notes
    const newNotes = [...notes];

    // Remove the dragged note from its original position
    const [removed] = newNotes.splice(draggedIndex, 1);

    // Insert the dragged note at the target position
    newNotes.splice(targetIndex, 0, removed);

    // Update the state with the new order of notes
    setNotes(newNotes);

    // Save the reordered notes in local storage
    localStorage.setItem('notes', JSON.stringify(newNotes));

    // Reset the draggedNote state to null
    setDraggedNote(null);
  };
   // Function to handle search
  const handleSearch = (query) => {
    const filtered = notes.filter(
      (note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.content.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNotes(filtered);
  };
  const shareNote = async (note) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: note.title,
          text: note.content,
          url: window.location.href, // Share the current URL, you can modify it based on your requirements
        });
      } else {
        alert('Web Share API not supported in your browser. You can manually share the note.');
      }
    } catch (error) {
      console.error('Error sharing note:', error);
    }
  };
  return (
    <div className="note-wrapper">
        <SearchBar notes={notes} handleSearch={handleSearch} />
      {filteredNotes.map((note) => (
        <div
          key={note._id}
          className={`card ${draggedNote && draggedNote._id === note._id ? 'dragging' : ''}`}
          draggable
          onDragStart={(event) => onDragStart(event, note)}
          onDragOver={onDragOver}
          onDrop={onDrop}
          data-note-id={note._id}
        >
          <h4 title={note.title}>{note.title}</h4>
          <div className="text-wrapper">
            <p dangerouslySetInnerHTML= {{__html:note.content}}></p>
          </div>
          <p className="date">{new Date(note.date).toLocaleDateString()}</p>

          <div className="card-footer">
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
            <button className="share-button" onClick={() => shareNote(note)}>Share</button>
          </div>
          <button className="close" onClick={() => deleteNote(note._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  );
}
