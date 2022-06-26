export const displayMessage = (message: string, type: string) => {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector<HTMLElement>(".window-messages")?.append(div);
  if (type === "sent") {
    div?.classList.add("message-sent");
  } else {
    div?.classList.add("received-message");
  }
};

export const displayJoinRoomMessage = (message: string) => {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector<HTMLElement>(".window-messages")?.append(div);
  div?.classList.add("group-joined");
};
