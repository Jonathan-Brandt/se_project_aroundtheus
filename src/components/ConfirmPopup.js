import Popup from "./Popup";

export default class ConfirmPopup extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup
      .querySelector(".confirmation__button")
      .addEventListener("click", () => {
        if (this._submitFunction) {
          this._submitFunction();
        }
      });
  }

  setSubmitFunction(submitFunction) {
    this._submitFunction = submitFunction;
  }
}
