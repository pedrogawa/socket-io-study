import { useEffect, useRef } from "react";
import "./App.css";
import { socket } from "./utils/socket/socket";
import { displayMessage } from "./utils/displayMessages";
import Messages from "./utils/socket/messages";
import AuthService from "./utils/socket/connection";

function App() {
  const messageRef = useRef<HTMLInputElement>(null);
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
    if (room) {
      Messages.sendMessage(message, room);
    } else {
      Messages.sendMessage(message);
    }
    displayMessage(message, "sent");
  };

  const joinRoom = (room: string) => {
    AuthService.join(room);
  };

  return (
    <div className="App">
      <div className="window-messages"></div>
      <input ref={messageRef} />
      <button
        onClick={() =>
          sendMessage(
            messageRef.current?.value || "",
            roomRef.current?.value || ""
          )
        }
      >
        Send
      </button>
      <input ref={roomRef} />
      <button onClick={() => joinRoom(roomRef.current?.value || "")}>
        Send
      </button>
    </div>
  );
}

export default App;
