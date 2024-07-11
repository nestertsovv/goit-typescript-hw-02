import { TailSpin } from "react-loader-spinner";

import s from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={s.wrapper}>
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
