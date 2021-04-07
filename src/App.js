import React, { useState, useEffect } from "react";
import * as apiClient from "./api/apiClient";
import './App.css';
import Note from './components/Note';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    apiClient.getNotes((res) => {
      setNotes(res);
    })
  }, []);

  const onDelete = ({id}) => {
    apiClient.deleteNote(id, () => setNotes(notes.filter(note => note.id !== id)))
  }

  const onAddNote = (note) => {
    console.log("this is the new Note", note)
    setNotes([...notes, note])
  }

  return (
    <div>
      <h1>My Notes:</h1>
      <div id="new-note-form">
        <NoteForm addNote={onAddNote} />
      </div>
      <ul>
        {notes && notes.map((note) => {
          return <Note noteData={note} onDelete={onDelete}/>
          })
        }
      </ul>
    </div>
  )
}

export default App;