import classNames from "classnames/bind";
import styles from "./Loader.module.scss";

const cx = classNames.bind(styles);

function Loader() {
  return (
    <div className={cx("lds-spinner")}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Loader;
