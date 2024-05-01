export class RegForm {
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
