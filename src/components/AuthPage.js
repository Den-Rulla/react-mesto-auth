import React from "react";

export default function AuthPage({
  name,
  title,
  buttonText,
  onSubmit,
  children,
}) {
  return (
    <section className={`auth auth_type_${name}`}>
      <div className="auth__container">
        <h2 className="auth__title">{title}</h2>
        <form className="auth__form" name={`${name}`} onSubmit={onSubmit}>
          {children}
          <button className="auth__button" type="submit">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
