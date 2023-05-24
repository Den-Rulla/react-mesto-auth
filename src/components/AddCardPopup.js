import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddCardPopup ({ isOpen, onClose, onAddCard, isLoading }) {
  const refName = useRef();
  const refLink = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      name: refName.current.value,
      link: refLink.current.value,
    });
  }

  useEffect(() => {
    refName.current.value = "";
    refLink.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
            name="card-add"
            title="Новое место"
            submitBtnText={isLoading ? "Сохранение..." : "Создать"}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            isSubmitDisabled={isLoading ? true : false}
          >
            <input
              ref={refName}
              className="popup__input popup__input_type_card-title"
              name="name"
              type="text"
              placeholder="Название"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="popup__error name-error" />
            <input
              ref={refLink}
              className="popup__input popup__input_type_card-img-link"
              name="link"
              type="url"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="popup__error link-error" />
          </PopupWithForm>
  )
}
