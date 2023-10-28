import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import styles from "./Image.module.scss";

const cx = classNames.bind(styles);

function Image({ src, alt, isLast, setNewPage }) {
  const imgRef = useRef();

  useEffect(() => {
    if (!imgRef?.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      // If this is the last image in current list
      // and is visible
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        if (isLast) {
          setNewPage();
        }
      }
    });

    observer.observe(imgRef.current);
  }, [isLast]);

  return <img className={cx("image")} src={src} alt={alt} ref={imgRef} />;
}

export default Image;