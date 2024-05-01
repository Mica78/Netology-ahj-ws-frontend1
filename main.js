/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/reg-form.js
class RegForm {
  static get regForm() {
    const form = document.createElement("form");
    form.id = "reg";
    form.innerHTML = `
      <label style="width:100%" class="login-label" for="login">Выберете псевдоним</label>
      <input style="width:100%" form="reg" name="login" type="text" required>
      <button form="reg" type="submit" class="btn-login">Продолжить</button>
    `;
    form.style.display = "flex";
    form.style.flexWrap = "wrap";
    form.style.position = "absolute";
    form.style.zIndex = 1;
    form.style.backgroundColor = "white";
    return form;
  }
}
;// CONCATENATED MODULE: ./src/js/user-element.js

class UserElement {
  constructor(element, user) {
    this.element = element;
    this.userName = user.name;
    this.userId = user.id;
    if (this.userId === currentUser.id) {
      this.userName = "You";
    }
  }
  get HTMLElement() {
    const el = document.createElement("div");
    el.classList.add("user");
    const userName = document.createElement("p");
    userName.classList.add("user-name");
    if (this.userName === "You") {
      userName.style.color = "red";
    }
    userName.textContent = this.userName;
    el.insertAdjacentElement("beforeend", userName);
    return el;
  }
  render() {
    this.element.insertAdjacentElement("beforeend", this.HTMLElement);
  }
}
/* harmony default export */ const user_element = (UserElement);
;// CONCATENATED MODULE: ./src/js/message-element.js

class MessageElement {
  constructor(element, message) {
    this.element = element;
    this.authorId = message.user.id;
    this.authorName = message.user.name;
    if (this.authorId === currentUser.id) {
      this.authorName = "You";
    }
    this.messageText = message.messageText;
    this.messageDate = message.date;
  }
  get HTMLMessageElement() {
    const el = document.createElement("div");
    el.classList.add("message");
    const authorElement = document.createElement("p");
    authorElement.classList.add("author");
    authorElement.textContent = `${this.authorName}, ${this.messageDate}`;
    const messageTextElement = document.createElement("p");
    messageTextElement.classList.add("message_text");
    messageTextElement.textContent = this.messageText;
    if (this.authorName === "You") {
      authorElement.style.color = "red";
      authorElement.style.textAlign = "right";
      messageTextElement.style.textAlign = "right";
    }
    el.insertAdjacentElement("beforeend", authorElement);
    el.insertAdjacentElement("beforeend", messageTextElement);
    return el;
  }
  render() {
    this.element.insertAdjacentElement("beforeend", this.HTMLMessageElement);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js
const ws = new WebSocket("wss://netology-ahj-ws-backend.onrender.com");



const chat = document.querySelector(".chat");
const chatMessage = document.querySelector(".chat-message");
const sendBtn = document.querySelector(".chat-send");
let currentUser = null;
const chatUI = document.querySelector(".chatui");
chatUI.style.display = "none";
const app_form = document.querySelector("body").insertAdjacentElement("beforeend", RegForm.regForm);
sendBtn.addEventListener("click", () => {
  if (!chatMessage.value) {
    return;
  }
  const sendedObject = {
    message: {
      user: currentUser,
      messageData: chatMessage.value
    }
  };
  ws.send(JSON.stringify(sendedObject));
  chatMessage.value = "";
});
ws.addEventListener("open", e => {
  console.log(e);
  currentUser = false;
  app_form.addEventListener("submit", e => {
    e.preventDefault();
    const formData = new FormData(app_form);
    const login = formData.get("login");
    ws.send(JSON.stringify({
      login: login
    }));
    app_form.style.display = "none";
  });
});
ws.addEventListener("close", e => {
  console.log(e);
});
ws.addEventListener("message", e => {
  try {
    const data = JSON.parse(e.data);
    switch (Object.keys(data)[0]) {
      case "Autorization":
        currentUser = data["Autorization"];
        if (!currentUser) {
          alert("Имя пользователя зарезервировано");
          app_form.style.display = "block";
        } else {
          chatUI.style.display = "flex";
        }
        break;
      case "chat":
        if (currentUser) {
          const {
            chat: messages
          } = data;
          messages.forEach(message => {
            const currentMessage = new MessageElement(chat, message);
            currentMessage.render();
          });
        }
        break;
      case "users":
        document.querySelector(".users").innerHTML = "";
        for (const user of data.users) {
          new user_element(document.querySelector(".users"), user).render();
        }
        break;
    }
  } catch (err) {
    console.log(err);
  }
});
ws.addEventListener("error", e => {
  console.log(e);
});
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;