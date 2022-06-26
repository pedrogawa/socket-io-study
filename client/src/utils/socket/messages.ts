import { displayMessage } from "./../displayMessages";
import { socket } from "./socket";

export default class Messages {
  static sendMessage(message: string, room?: string) {
    if (room) {
      socket.emit("send-message", message, room);
    } else {
      socket.emit("send-message", message);
    }
  }

  static receivedMessage() {
    socket.on("receive-message", (message: string, id: string) => {
      if (id !== socket.id) {
        displayMessage(message, "received");
      }
    });
  }
}
