import React, { useEffect, useRef } from "react";

import "./App.css";
import { socket } from "./utils/socket/socket";
import { displayMessage } from "./utils/displayMessages";
import { MdSend } from "react-icons/md";
import Messages from "./utils/socket/messages";
import AuthService from "./utils/socket/connection";

function App() {
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const roomRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    AuthService.connect();
    Messages.receivedMessage();
    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = (message: string, room?: string) => {
    if (message) {
      if (room) {
        Messages.sendMessage(message, room);
      } else {
        Messages.sendMessage(message);
      }
      if (messageRef.current) {
        messageRef.current.value = "";
        displayMessage(message, "sent");
      }
    }
  };

  const onEnterPressed = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage(
        messageRef.current?.value || "",
        roomRef.current?.value || ""
      );
    }
  };

  const joinRoom = (room: string) => {
    AuthService.join(room);
  };

  return (
    <div className="App">
      <div className="window-messages" />
      <div className="join-group-container">
        <input placeholder="Type a group to join" ref={roomRef} />
        <button onClick={() => joinRoom(roomRef.current?.value || "")}>
          Join
        </button>
      </div>
      <div className="textarea-container">
        <textarea
          ref={messageRef}
          onKeyDown={onEnterPressed}
          id="chatText"
          className="chat-text"
          placeholder="Send a message"
        />
        <div
          className="send-button"
          id="sendButton"
          onClick={() =>
            sendMessage(
              messageRef.current?.value || "",
              roomRef.current?.value || ""
            )
          }
        >
          <MdSend />
        </div>
      </div>
    </div>
  );
}

export default App;
