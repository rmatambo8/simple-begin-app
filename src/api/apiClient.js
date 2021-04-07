import axios from 'axios';
const BASE_URL = ""
export const getNotes = (callback) => {
  axios.get(BASE_URL + '/getNotes')
    .then(({data}) => {
      return data.body;
    })
    .then(({notes}) => callback(notes));
}
export const createNote = async (newNote, callback) => {
  const {data} = await axios.post(BASE_URL + '/createNote', newNote);
  
  const note = data.body;
  console.log("this is the axios front end for creating a new item:,", data)

  if (callback) callback(note);
  return note;
}

export const updateNote = async (updateNote, callback) => {
  const {data} = await axios.put(BASE_URL + '/updateNote', updateNote);
  return data.body
}

export const deleteNote = async (noteId, callback) => {
  try {
    await axios.delete(BASE_URL + '/deleteNote', {id: noteId});
    if (callback) callback();
  } catch (error) {
    console.log(error)
  }
}