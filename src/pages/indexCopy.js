import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import "../pages/index.css";

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                  Elements                                  */
/* -------------------------------------------------------------------------- */

/*Generics*/

const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const closeButtons = document.querySelectorAll(".modal__close");

/*Profile*/

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = document.querySelector(
  "#profile-modal-close-button"
);
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-name");
const profileDescriptionInput = document.querySelector("#profile-description");
const profileEditForm = profileEditModal.querySelector("#modal-edit-form");

/*Cards*/

const addCardModal = document.querySelector("#add-card-modal");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardModalCloseButton = document.querySelector("#card-modal-close-button");
const cardTitleInput = addCardModal.querySelector(".modal__input_type_title");
const cardUrlInput = addCardModal.querySelector(".modal__input_type_url");
const newCardEditForm = addCardModal.querySelector("#add-card-form");

/*Preview*/

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseButton = document.querySelector(
  "#preview-modal-close-button"
);
const previewModalImage = previewModal.querySelector(".modal__image");
const previewModalCaption = previewModal.querySelector(".modal__caption");

/*Form Validators*/
const newCardFormValidator = new FormValidator(config, newCardEditForm);
newCardFormValidator.enableValidation();

const profileFormValidator = new FormValidator(config, profileEditForm);
profileFormValidator.enableValidation();

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closePopUp(popup) {
  popup.classList.remove("modal_opened");
  popup.removeEventListener("mousedown", handleCloseOverlay);
  document.removeEventListener("keydown", handleCloseEsc);
}

function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.addEventListener("mousedown", handleCloseOverlay);
  document.addEventListener("keydown", handleCloseEsc);
}

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListElement.prepend(cardElement);
}

function handleImageClick(name, link) {
  previewModalImage.src = link;
  previewModalImage.alt = name;
  previewModalCaption.textContent = name;
  openPopup(previewModal);
}
/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */
function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListElement);
  e.target.reset();
  newCardFormValidator.disableButton();
  closePopUp(addCardModal);
}

function handleDeleteCard(e) {
  e.target.closest(".card").remove();
}

function handlePreviewClose(e) {
  e.preventDefault();
  closePopUp(previewModal);
}

function handleCloseOverlay(e) {
  if (e.target.classList.contains("modal_opened")) {
    closePopUp(e.target);
  }
}

function handleCloseEsc(e) {
  if (e.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopUp(modal);
  }
}

/* -------------------------------------------------------------------------- */
/*                                Event Lisenters                               */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

newCardEditForm.addEventListener("submit", handleAddCardSubmit);

addNewCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closePopUp(popup));
});

/* -------------------------------------------------------------------------- */
/*                              Template Function                             */
/* -------------------------------------------------------------------------- */

initialCards.forEach((cardData) => renderCard(cardData));
