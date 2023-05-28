import React, { useState } from "react";
import AuthPage from "./AuthPage";
import { Link } from "react-router-dom";

export default function Register({ handleRegister }) {
  const [formValue, setIsValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setIsValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValue;
    handleRegister(email, password);
  }

  return (
    <>
      <AuthPage
        name="register"
        title="Регистрация"
        buttonText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <input
          className="auth__input"
          name="email"
          type="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          required
          value={formValue.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          className="auth__input"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          required
          value={formValue.password}
          onChange={handleChange}
        />
      </AuthPage>
      <div className="auth__text-container">
        <p className="auth__text">
          Уже зарегистрированы?&nbsp;
          <Link to="/sign-in" className="auth__link">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
