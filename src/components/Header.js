import React from "react";
import { Link, Route, Routes } from "react-router-dom";

export default function Header({ email, handleExit }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />

        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />

        <Route
          path="/cards"
          element={
            <div className="header__links">
              <p className="header__email">{email}</p>
              <Link to="/sign-in" className="header__link" onClick={handleExit}>
                Выйти
              </Link>
            </div>
          }
        />
      </Routes>
    </header>
  );
}
