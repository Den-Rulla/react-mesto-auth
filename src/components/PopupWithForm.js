import React from "react";
import usePopupClose from "../hooks/usePopupClose";

export default function PopupWithForm({
  isOpen,
  onClose,
  onSubmit,
  title,
  name,
  children,
  submitBtnText,
  isSubmitDisabled,
}) {
  usePopupClose(isOpen, onClose);

  return (
    <section className={`popup ${isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
        <button className="popup__close-btn" type="button" onClick={onClose} />
        <h3
          className={`popup__title popup__title_type_${name}`}
          onSubmit={onSubmit}
        >
          {title}
        </h3>
        <form
          className={`popup__form popup__form_type_${name}`}
          onSubmit={onSubmit}
          name={`popup-${name}-form`}
          action="#"
        >
          {children}
          <button
            className={`popup__submit-btn popup__submit-btn_type_${name}`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            {submitBtnText}
          </button>
        </form>
      </div>
    </section>
  );
}
