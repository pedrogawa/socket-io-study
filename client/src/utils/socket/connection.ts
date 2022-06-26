import { displayJoinRoomMessage, displayMessage } from "../displayMessages";
import { socket } from "./socket";

export default class AuthService {
  static connect() {
    socket.on("connect", () => {
      displayJoinRoomMessage(`You connected with: ${socket.id}`);
    });
  }

  static join(room: string) {
    socket.emit("join-room", room, (message: string) => {
      displayMessage(message, "received");
    });
  }
}
