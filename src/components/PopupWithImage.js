import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector(".modal__image");
    this._captionElement = this._popup.querySelector(".modal__caption");
  }

  open(data) {
    this._imageElement.src = data.link;
    this._captionElement.textContent = data.name;
    super.open();
  }
}
