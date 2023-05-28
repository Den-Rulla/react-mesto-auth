import React, { useState } from "react";
import AuthPage from "./AuthPage";

export default function Login({ handleLogin }) {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setFormValues({
      ...formValues,

      [name]: value,
    });
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    const { email, password } = formValues;
    handleLogin(email, password);
  }
  return (
    <>
      <AuthPage
        name="login"
        title="Вход"
        buttonText="Войти"
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
          value={formValues.email}
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
          value={formValues.password}
          onChange={handleChange}
        />
      </AuthPage>
    </>
  );
}
