import React, { useState } from "react";
import { createNote } from "../api/apiClient";

const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)
  return {
    value,
    setValue,
    bind: {
      onChange(e) {
        setValue(e.target.value);
      },
      value,
    },
    reset() {
      setValue(initialValue);
    },
  }
}

const NoteForm = ({addNote}) => {
  const titleInput = useInput("");
  const descriptionInput = useInput("");
  const dateInput = useInput("");

  const submitNote = e => {
    e.preventDefault();
    const note = {
      title: titleInput.value,
      description: descriptionInput.value,
      dueDate: dateInput.value,
    }

    createNote(note, (newNote) => {
      addNote(newNote);
      [titleInput,
      descriptionInput,
      dateInput].forEach(i => i.reset());
    });
  }

  return (
    <form onSubmit={submitNote}>
      <label>Title
        <input type="text" {...titleInput.bind}/>
      </label>
      <label>Description
        <input type="text" {...descriptionInput.bind} />
      </label>
      <label>Set Due Date
        <input type="date" {...dateInput.bind} />
      </label>
      <button>Submit Note</button>
    </form>
  )
}

export default NoteForm;