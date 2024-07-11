import s from "./ErrorMessage.module.css";

export const ErrorMessage = ({ error }) => {
  return <div className={s.error}>{error}</div>;
};
