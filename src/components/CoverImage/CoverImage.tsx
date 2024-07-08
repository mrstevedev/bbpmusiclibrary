import { IMAGE } from "@/constants/index";
import styles from "@/styles/CoverImage.module.scss";

export default function CoverImage() {
  return (
    <>
      <div
        className={`hero-img ${styles.BBP_Cover__Image}`}
        style={{
          backgroundImage: `url(${IMAGE.IMAGE_SP1200})`,
        }}
      ></div>
    </>
  );
}
