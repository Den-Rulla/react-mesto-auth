import React, {useEffect, useRef} from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const ref = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: ref.current.value
    });
  }

  useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      submitBtnText={isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      >
      <input
        ref={ref}
        className="popup__input popup__input_type_avatar-link"
        name="avatar-link"
        type="url"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error avatar-link-error" />
      </PopupWithForm>
  )
}
