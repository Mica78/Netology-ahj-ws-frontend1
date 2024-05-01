const ws = new WebSocket("ws://localhost:7000");

import { RegForm } from "./reg-form";

import UserElement from "./user-element";

import { MessageElement } from "./message-element";

const chat = document.querySelector(".chat");

const chatMessage = document.querySelector(".chat-message");

const sendBtn = document.querySelector(".chat-send");

export let currentUser = null;

const chatUI = document.querySelector(".chatui");
chatUI.style.display = "none";

const form = document
  .querySelector("body")
  .insertAdjacentElement("beforeend", RegForm.regForm);

sendBtn.addEventListener("click", () => {
  if (!chatMessage.value) {
    return;
  }

  const sendedObject = {
    message: {
      user: currentUser,
      messageData: chatMessage.value,
    },
  };

  ws.send(JSON.stringify(sendedObject));

  chatMessage.value = "";
});

ws.addEventListener("open", (e) => {
  console.log(e);
  currentUser = false;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const login = formData.get("login");
    ws.send(JSON.stringify({ login: login }));
    form.style.display = "none";
  });
});

ws.addEventListener("close", (e) => {
  console.log(e);
});

ws.addEventListener("message", (e) => {
  try {
    const data = JSON.parse(e.data);
    console.log(Object.keys(data)[0], Object.keys(data), data, data["users"]);
    switch (Object.keys(data)[0]) {
      case "Autorization":
        currentUser = data["Autorization"];
        if (!currentUser) {
          alert("Имя пользователя зарезервировано");
          form.style.display = "block";
        } else {
          chatUI.style.display = "flex";
        }
        break;
      case "chat":
        if (currentUser) {
          const { chat: messages } = data;
          messages.forEach((message) => {
            const currentMessage = new MessageElement(chat, message);
            currentMessage.render();
          });
        }
        break;
      case "users":
        console.log(data.users, document.querySelector(".users"));

        document.querySelector(".users").innerHTML = "";

        for (const user of data.users) {
          new UserElement(document.querySelector(".users"), user).render();
        }
        break;
    }
  } catch (err) {
    console.log(err);
  }
});

ws.addEventListener("error", (e) => {
  console.log(e);
});
