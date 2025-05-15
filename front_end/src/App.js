import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const response = await axios.get(API_URL);
    setNotes(response.data);
  };

  const addNote = async () => {
    const response = await axios.post(API_URL, { title, content });
    setNotes([...notes, response.data]);
    setTitle("");
    setContent("");
  };

  const updateNote = async (id) => {
    await axios.put(`${API_URL}/${id}`);
    setNotes(
      notes.map((note) =>
        note._id === id ? { ...note, title, content } : note
      )
    );
  };

  const deleteNote = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div>
      <h1>Notes App</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Title"
      />
      <br />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter the Content right here"
      />
      <br />
      <button onClick={addNote}>Add Note</button>
      <br />
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => updateNote(note._id)}>Update</button>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
