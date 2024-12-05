import "../pages/index.css";

import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import { initialCards } from "../pages/utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template", handleImageClick);
      const cardElement = card.getView();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

const popupWithImage = new PopupWithImage("#preview-modal");
popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm("#profile-edit-modal", (formData) => {
  userInfo.setUserInfo(formData);
});
popupWithForm.setEventListeners();

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const modalEditForm = document.querySelector("#modal-edit-form");
const profileEditFormValidator = new FormValidator(config, modalEditForm);
profileEditFormValidator.enableValidation();

const modalAddForm = document.querySelector("#add-card-form");
const addCardFormValidator = new FormValidator(config, modalAddForm);
addCardFormValidator.enableValidation();

cardSection.renderItems();

function handleImageClick(data) {
  popupWithImage.open(data);
}

// Select the buttons
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

// Select the modals
const addCardModal = new PopupWithForm("#add-card-modal");
const editProfileModal = new PopupWithForm("#profile-edit-modal");

// Set up event listeners
addCardButton.addEventListener("click", () => addCardModal.open());
editProfileButton.addEventListener("click", () => editProfileModal.open());

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
