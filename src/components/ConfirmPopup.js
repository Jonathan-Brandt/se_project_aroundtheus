import Popup from "./Popup";

export default class ConfirmPopup extends Popup {
  constructor(modalSelector) {
    super(modalSelector);
    this._form = this._popup.querySelector(".modal__container");
    this._submitButton = this._form.querySelector(".confirmation__button");
    this._submitbuttonTextContent = this._submitButton.textContent;
  }

  setSaving(isSaving) {
    if (isSaving) {
      this._submitButton.textContent = "Saving...";
    } else {
      this._submitButton.textContent = this._submitbuttonTextContent;
    }
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
