import React from "react";
import usePopupClose from "../hooks/usePopupClose";

export default function ImagePopup({ card, onClose }) {
  usePopupClose(card.isOpen, onClose);

  return (
    <section
      className={`popup popup_type_img-scale ${
        card.isOpen ? `popup_opened` : ""
      }`}
    >
      <div className="popup__image-cover">
        <figure className="popup__figure">
          <img
            className="popup__image"
            src={card.item.link}
            alt={card.item.name}
          />
          <figcaption className="popup__caption">{card.item.name}</figcaption>
        </figure>
        <button className="popup__close-btn" type="button" onClick={onClose} />
      </div>
    </section>
  );
}
