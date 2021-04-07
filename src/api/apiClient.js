import axios from 'axios';
const BASE_URL = ""
export const getNotes = (callback) => {
  axios.get(BASE_URL + '/getNotes')
    .then((given) => {
      console.log("data", given.data, "body: ", given )
      return given.data;
    })
    .then(({notes}) => callback(notes));
}
export const createNote = async (newNote, callback) => {
  const {data} = await axios.post(BASE_URL + '/createNote', newNote);
  
  console.log("this is the axios front end for creating a new item:,", data)
  const note = data;

  if (callback) callback(note);
  return note;
}

export const updateNote = async (updateNote, callback) => {
  const {data} = await axios.put(BASE_URL + '/updateNote', updateNote);
  return data
}

export const deleteNote = async (noteId, callback) => {
  try {
    await axios.delete(BASE_URL + '/deleteNote', {id: noteId});
    if (callback) callback();
  } catch (error) {
    console.log(error)
  }
}