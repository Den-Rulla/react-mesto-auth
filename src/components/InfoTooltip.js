import React from "react";
import usePopupClose from "../hooks/usePopupClose";

export default function InfoTooltip({ isOpen, onClose, text, image }) {
  usePopupClose(isOpen, onClose);

  return (
    <section
      className={`popup  popup_type_tooltip ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container popup__container_type_tooltip">
        <button className="popup__close-btn" onClick={onClose} />
        <img className="popup__notification-img" src={image} alt={text} />
        <h2 className="popup__title popup__title_type_tooltip">{text}</h2>
      </div>
    </section>
  );
}
