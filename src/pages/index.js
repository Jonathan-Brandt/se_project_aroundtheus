import "../pages/index.css";
import "./utils/constants.js";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import ConfirmPopup from "../components/ConfirmPopup.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards } from "./utils/constants.js";
import API from "../components/API.js";

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

const popupWithImage = new PopupWithImage("#preview-modal");
popupWithImage.setEventListeners();

const confirmPopup = new ConfirmPopup("#confirmationModal");

const profileImage = document.querySelector(".profile__image");

const profileImageModal = new PopupWithForm(
  "#profile-image-modal",
  handleProfileImageFormSubmit
);
profileImage.addEventListener("click", () => {
  profileImageModal.open();
});

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

const cardContainer = document.querySelector(".cards__list"); // The container for the cards

// Functions

function handleImageClick(data) {
  popupWithImage.open(data);
}

function handleEditProfileFormSubmit(inputValues) {
  const { title, description } = inputValues;
  api
    .updateProfile(title, description)
    .then((data) => {
      userInfo.setUserInfo({
        name: data.name,
        job: data.about,
      });
      document.querySelector("#profile-name").textContent = data.name;
      document.querySelector("#profile-description").textContent = data.about;
    })
    .catch((err) => console.error(`Error updating profile:", ${err}`));
  editProfileModal.close();
}

function handleDeleteCard(card) {
  {
    confirmPopup.setSubmitFunction(() => {
      api
        .deleteCard(card._id)
        .then(() => {
          card.remove();
        })
        .catch((err) => {
          console.error(`Error deleting card: ${err}`);
        });
      confirmPopup.close();
    });

    confirmPopup.open();
  }
}

function handleAddCardFormSubmit(inputValues) {
  addCardModal.setSaving(true);
  const cardData = { name: inputValues.title, link: inputValues.url };
  api
    .addCard(cardData)
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardSection.addItem(cardElement);
      addCardModal.close();
      modalAddForm.reset(); // clear the form
      addCardFormValidator.disableButton(); // disable the button
    })
    .finally(() => addCardModal.setSaving(false));
}

function createCard(data) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleLikeClick
  );
  const cardElement = card.getView();
  return cardElement;
}

function handleProfileImageFormSubmit(inputValues) {
  const imageData = { avatar: inputValues.avatar };
  api.updateProfilePicture(imageData).then((data) => {
    userInfo.setUserInfo(data);
    profileImageModal.close();
  });
}

// Select the buttons
const addCardButton = document.querySelector(".profile__add-button");
const editProfileButton = document.querySelector(".profile__edit-button");
const confirmationButton = document.querySelector(".confirmation__button");

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
  const { job, name } = userInfo.getUserInfo();
  editProfileModal.open();
});

editProfileModal.setEventListeners();
addCardModal.setEventListeners();
confirmPopup.setEventListeners();
profileImageModal.setEventListeners();

//The Accursed API
const api = new API({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c371b666-258b-4f19-aeb9-028c93427d7f",
    "Content-Type": "application/json",
  },
});

//The Foul Spawn of the API Demon
api.getInitialCards().then((cards) => {
  cardSection.renderItems(cards);
});

api.getUserInfo().then((data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.about,
  });
});

function handleLikeClick(card) {
  if (card._isLiked) {
    api
      .dislikeCard(card._id)
      .then(() => {
        card.setIsLiked(false);
        card.renderLike();
      })
      .catch((err) => console.error("Error disliking card:", err));
  } else {
    api
      .likeCard(card._id)
      .then(() => {
        card.setIsLiked(true);
        card.renderLike();
      })
      .catch((err) => console.error("Error liking card:", err));
  }
}
