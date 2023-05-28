import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip";
import Register from "./Register";
import Login from "./Login";
import imgSucces from "../images/reg-success.svg";
import imgFail from "../images/reg-fail.svg";

function App() {
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [toolTipText, setToolTipText] = useState("");
  const [openToolTip, setOpenToolTip] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    isLogged &&
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => console.log(err));
  }, [isLogged]);

  function handleEditProfileClick() {
    setIsProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleAvatarClick() {
    setIsAvatarPopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setIsDeleteCardPopupOpen(true);
    setCardToDelete(card);
  }

  function handleDeleteCard() {
    setIsLoading(true);

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== cardToDelete._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLikeClick(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    } else {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  function handleUpdateUser(name, about) {
    setIsLoading(true);

    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);

    api
      .editUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);

    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const [selectedCard, setSelectedCard] = useState({
    isOpen: false,
    item: {},
  });

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setStatus(true);
        setToolTipText("Вы успешно зарегистрировались!");
        navigate("/sign-in", { replace: true });
      })
      .catch((err) => {
        setStatus(false);
        setToolTipText("Что-то пошло не так! Попробуйте еще раз.");
        console.log(`${err}`);
      })
      .finally(() => {
        setOpenToolTip(true);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((confirm) => {
        if (confirm.token) {
          localStorage.setItem("token", confirm.token);
          setIsLogged(true);
          navigate("/cards", { replace: true });
          setUserEmail(email);
        }
      })
      .catch((err) => {
        console.log(`${err}`);
        setOpenToolTip(true);
        setStatus(false);
        setToolTipText("Что-то пошло не так! Попробуйте еще раз.");
      });
  }

  function handleExit() {
    setIsLogged(false);
    localStorage.removeItem("token");
    navigate("/sign-in", { replace: true });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getToken(token)
        .then((res) => {
          if (res) {
            setIsLogged(true);
            navigate("/cards", { replace: true });
            setUserEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, []);

  function closeAllPopups() {
    setIsProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setSelectedCard({
      isOpen: false,
      item: {},
    });
    setOpenToolTip(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={userEmail} handleExit={handleExit} />
          <main>
            <Routes>
              <Route
                path="/"
                element={
                  isLogged ? (
                    <Navigate to="/cards" replace />
                  ) : (
                    <Navigate to="/sign-up" replace />
                  )
                }
              />
              <Route
                path="/cards"
                element={
                  <ProtectedRoute
                    element={Main}
                    onEditProfile={handleEditProfileClick}
                    onAddCard={handleAddCardClick}
                    onAvatar={handleAvatarClick}
                    onDeleteCard={handleDeleteCardClick}
                    onCardClick={setSelectedCard}
                    onLikeClick={handleLikeClick}
                    cards={cards}
                    loggedIn={isLogged}
                  />
                }
              />
              <Route
                path="/sign-up"
                element={<Register handleRegister={handleRegister} />}
              />
              <Route
                path="/sign-in"
                element={<Login handleLogin={handleLogin} />}
              />
            </Routes>
          </main>

          {isLogged ? <Footer /> : ""}

          <InfoTooltip
            isOpen={openToolTip}
            onClose={closeAllPopups}
            status={status}
            text={toolTipText}
            image={status ? imgSucces : imgFail}
          />

          <EditProfilePopup
            isOpen={isProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />

          <EditAvatarPopup
            isOpen={isAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />

          <AddCardPopup
            isOpen={isAddCardPopupOpen}
            onClose={closeAllPopups}
            onAddCard={handleAddPlaceSubmit}
            isLoading={isLoading}
          />

          <DeleteConfirmPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteConfirm={handleDeleteCard}
            isLoading={isLoading}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
