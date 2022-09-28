import { useState, useEffect } from "react";
import "./ChatBot.css";

export default function ChatBot() {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [get, setGet] = useState(true);

  useEffect(() => {
    // setChats((prev) => [...prev, localStorage.getItem("userMess")]);
    // console.log(chats);
    if (get) {
      let data = JSON.parse(localStorage.getItem("userMess"));
      if (data) {
        setMessages(data);
      }
      setGet(false);
    } else {
      localStorage.setItem("userMess", JSON.stringify(messages));
    }
    // console.log(messages);
  }, [get, messages]);

  const sendMess = (e) => {
    e.preventDefault();
    if (userInput !== "") {
      setMessages((prev) => [
        ...prev,
        { key: "user", mess: userInput },
        { key: "bot", mess: userInput }
      ]);
      setUserInput("");
    }
  };

  const clearChat = () => {
    localStorage.removeItem("userMess");
    window.location.reload();
  };

  return (
    <>
      <h1>Chat Bot</h1>
      <div className="chat_wrapper">
        <div className="chatBox">
          {messages.length > 1
            ? messages.map((mess, index) => {
                return mess.key === "user" ? (
                  <div key={index} className="user">
                    <p>{mess.mess}</p>
                  </div>
                ) : (
                  <div key={index} className="bot">
                    <p>{mess.mess}</p>
                  </div>
                );
              })
            : ""}
        </div>
        <form onSubmit={sendMess}>
        <div className="input_box">
          <input
            type="text"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
          <button type="submit" onClick={sendMess}>
            Send
          </button>
          <button onClick={clearChat}>Clear</button>
        </div>
        </form>
      </div>
    </>
  );
}
