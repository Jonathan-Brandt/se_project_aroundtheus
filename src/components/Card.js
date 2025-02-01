export default class Card {
  constructor(
    { _id, name, link },
    cardSelector,
    handleImageClick,
    handleDeleteCard,
    handleLikeClick
  ) {
    this._id = _id;
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleImageClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this);
      });

    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleImageClick({ name: this._name, link: this._link })
      );
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeClick() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
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
