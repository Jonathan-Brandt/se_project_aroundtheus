import "../pages/index.css";
import "./utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "./utils/constants.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

const popupWithImage = new PopupWithImage("#preview-modal");
popupWithImage.setEventListeners();

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
  modalAddForm.reset(); // clear the form
  addCardFormValidator.disableButton(); // disable the button
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
editProfileButton.addEventListener("click", () => {
  const { job, name } = userInfo.getUserInfo(); // get the data
  // here you'll insert the job, name into the inputs value
  editProfileModal.open();
});

editProfileModal.setEventListeners();
addCardModal.setEventListeners();

//dev note for reviewer below

// sorry about all of the resubmitions! I have been busy with college as this week was finals week. I thought maybe id need to send you the node_modules folder too to make my code work because I was not getting the error you were and all my modals worked.
