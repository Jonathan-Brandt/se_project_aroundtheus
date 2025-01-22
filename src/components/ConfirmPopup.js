import Popup from "./Popup";

export default class ConfirmPopup extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
  }

  setEventListener() {
    this._popup
      .querySelector(".confirm-button")
      .addEventListener("click", () => {
        if (this._submitFunction) {
          this._submitFunction();
        }
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
