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
  // Use a method to update the profile info, e.g., userInfo.setUserInfo()
  userInfo.setUserInfo(inputValues);
  editProfileModal.close(); // Close the modal after updating
  console.log(inputValues);
}

function handleAddCardFormSubmit(inputValues) {
  // Use a method to create and add a new card
  const newCard = createCard(inputValues); // Assume createCard is a method you have
  cardContainer.append(newCard); // Append the new card to the container
  addCardModal.close(); // Close the modal after adding the card
  console.log(inputValues);
}

function createCard(data) {
  // Create card elements
  const card = document.createElement("div");
  card.classList.add("card");

  const cardImage = document.createElement("img");
  cardImage.src = data.link;
  cardImage.alt = data.name;
  card.appendChild(cardImage);

  const cardTitle = document.createElement("h3");
  cardTitle.textContent = data.name;
  card.appendChild(cardTitle);

  // Return the complete card
  return card;
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
