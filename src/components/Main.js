import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-image"
            src={currentUser.avatar}
            alt="Аватар"
          />
          <button
            className="profile__avatar-edit-btn"
            type="button"
            onClick={props.onAvatar}
          />
        </div>
        <div className="profile__info">
          <div className="profile__title-cover">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              onClick={props.onEditProfile}
              type="button"
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddCard}
        />
      </section>
      <section className="elements">
        <ul className="cards-list">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onDeleteCard={props.onDeleteCard}
              onLikeClick={props.onLikeClick}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
