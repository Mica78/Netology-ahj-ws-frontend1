import { currentUser } from "./app";

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

export default UserElement;
