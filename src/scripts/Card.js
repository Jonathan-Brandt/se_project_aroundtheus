export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = this._handleImageClick.bind(this);
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick(this._name, this._link)
      );
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleImageClick(name, link) {
    const modal = document.querySelector(".modal");

    if (modal) {
      const nameElement = modal.querySelector(".card__description");
      const imageElement = modal.querySelector(".card__image");

      if (nameElement && imageElement) {
        nameElement.textContent = name;
        imageElement.src = link;
      } else {
        console.log("Name or image element not found.");
      }
    } else {
      console.log("Modal not found.");
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;
    this._cardElement.querySelector(".card__description-title").textContent =
      this._name;

    this._setEventListeners();

    return this._cardElement;
  }
}
