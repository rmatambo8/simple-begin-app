import React from 'react';

const Note = ({ noteData, onDelete}) => {
  const { title, description, dueDate } = noteData;
  return (
    <>
      <li>
        <h3>{title}</h3>
        <p>{description}</p>
        <p>{dueDate}</p>
        <button onClick={() => onDelete(noteData)}>Delete</button>
      </li>
    </>
  )
}


export default Note;