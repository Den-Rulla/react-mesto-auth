import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function DeleteConfirmPopup({ isOpen, onClose, onDeleteConfirm, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();

    onDeleteConfirm();
  }

  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      submitBtnText={isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
}
