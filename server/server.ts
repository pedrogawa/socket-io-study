import { Server } from "socket.io";

type joinRoomCallback = (message: string) => void;

interface sendMessage {
  message: string;
  room?: string;
}

const io = new Server(3000, {
  cors: {
    origin: ["http://localhost:3001"],
  },
});

io.on("connection", (socket) => {
  socket.on("send-message", (message: string, room: string) => {
    if (room) {
      socket.to(room).emit("receive-message", message, socket.id);
    } else {
      socket.broadcast.emit("receive-message", message, socket.id);
    }
  });

  socket.on("join-room", (room: string, cb: joinRoomCallback) => {
    socket.join(room);
    cb(`Joined ${room}`);
  });
});
