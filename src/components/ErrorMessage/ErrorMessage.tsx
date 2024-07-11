import s from "./ErrorMessage.module.css";

type Props = {
  error: string;
};

export const ErrorMessage = ({ error }: Props) => {
  return <div className={s.error}>{error}</div>;
};
