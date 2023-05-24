import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card({ card, onCardClick, onLikeClick, onDeleteCard }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

  function handleLikeClick() {
    onLikeClick(card);
  }

  function handleDeleteCardClick() {
    onDeleteCard(card);
  }

  function handleCardClick() {
    onCardClick({
      isOpen: true,
      item: card,
    });
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__delete-btn"
          type="button"
          onClick={handleDeleteCardClick}
        />
      )}
      <img
        className="card__image"
        onClick={handleCardClick}
        src={card.link}
        alt={card.name}
      />
      <div className="card__title-cover">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__likes-cover">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="card__likes-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}
