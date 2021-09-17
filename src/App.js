import React, { useState, useEffect } from "react";
import { FormControl, Input } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

import "./App.css";
import Message from "./Message";
import FlipMove from "react-flip-move";

import db from "./firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(prompt("Please enter your name"));
  }, []);

  useEffect(() => {
    //Order the messages by created time
    const q = query(collection(db, "messages"), orderBy("created_at", "desc"));

    // Adding the event listeners to the collection in Firestore
    onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().message,
          username: doc.data().username,
          created_at: doc.data().created_at,
        }))
      );
    });
  }, []);

  const sendMessage = async (event) => {
    // all the logic to send the message goes here
    event.preventDefault();
    // setMessages([...messages, { username: username, text: input }]);
    await addDoc(collection(db, "messages"), {
      message: input,
      username: username,
      created_at: Timestamp.now(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>Hello Programmers! </h1>
      <h2>Welcome, {username}!!</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a message ..."
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton
            className="app__iconButton"
            type="submit"
            onClick={sendMessage}
            color="primary"
            variant="contained"
            disabled={!input}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map((message) => (
          <Message key={message.id} message={message} username={username} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
