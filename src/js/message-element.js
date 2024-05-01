import { currentUser } from "./app";

export class MessageElement {
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
