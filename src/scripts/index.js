import "../pages/index.css";

// import all the classes
import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";
import { initialCards } from "../pages/utils/constants.js";

// create instances of the classes
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__description",
});

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card-template");
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".elements__list"
);

const popupWithImage = new PopupWithImage(".modal__image");
popupWithImage.setEventListeners();

const popupWithForm = new PopupWithForm(".modal__form", (formData) => {
  userInfo.setUserInfo(formData);
});
popupWithForm.setEventListeners();

const profileEditFormValidator = new FormValidator("#profile-edit-form");
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator("#add-card-form");
addCardFormValidator.enableValidation();

formValidator.enableValidation();

cardSection.renderItems();
