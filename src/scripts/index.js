import "../pages/index.css";

import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import { initialCards } from "../pages/utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-description",
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

const cardContainer = document.querySelector(".cards__list"); // The container for the cards

// Functions

function handleImageClick(data) {
  popupWithImage.open(data);
}

function handleEditProfileFormSubmit(inputValues) {
  userInfo.setUserInfo({
    name: inputValues.title,
    job: inputValues.description,
  });
  editProfileModal.close();
}

function handleAddCardFormSubmit(inputValues) {
  const cardData = { name: inputValues.title, link: inputValues.url };
  const newCard = createCard(cardData);
  cardSection.addItem(newCard);
  addCardModal.close();
  console.log(inputValues);
}

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", handleImageClick);
  const cardElement = card.getView();
  return cardElement;
}

// Select the buttons
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");

// Select the modals
const addCardModal = new PopupWithForm(
  "#add-card-modal",
  handleAddCardFormSubmit
);
const editProfileModal = new PopupWithForm(
  "#profile-edit-modal",
  handleEditProfileFormSubmit
);

// Set up event listeners
addCardButton.addEventListener("click", () => addCardModal.open());
editProfileButton.addEventListener("click", () => editProfileModal.open());

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
