import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
function Chat(props) {
  const [chats, setChats] = useState([]);
  const fetchChats = async (req, res) => {
    const response = await axios.get("http://localhost:5000/api/chat");

    console.log(response.data);
    setChats(response.data);
  };
  useEffect(() => {
    fetchChats();
  }, []);
  return (
    <div>
      {Array.isArray(chats) && chats.map((ch) => <h1>{ch.chatName}</h1>)}
    </div>
  );
}

export default Chat;
