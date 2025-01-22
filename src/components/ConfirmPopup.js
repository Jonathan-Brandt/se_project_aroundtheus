import Popup from "./Popup";

export default class ConfirmPopup extends Popup {
  constructor(modalSelector) {
    this._modal = document.querySelector("#confirmationModal");
    this._submitFunction = null;
    this._closeButton = this._closeButton("modal__close");
    this._closeButton.addEventListener("click", () => this._close());
  }

  setEventListener() {
    this._modal
      .querySelector(".confirm-button")
      .addEventListener("click", () => {
        if (this._submitFunction) {
          this._submitFunction();
        }
        this._closeButton();
      });
  }

  setSubmitFunction(submitFunction) {
    this._submitFunction = submitFunction;
  }

  open() {
    super.open();
  }

  close() {
    super.close();
  }
}
