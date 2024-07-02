import styles from "@/styles/CoverImage.module.scss";

export default function CoverImage() {
  return (
    <>
      <div
        className={`hero-img ${styles.cover__image}`}
        style={{
          backgroundImage: `url(${"https://d1hx41nm7bdfp5.cloudfront.net/wp-content/uploads/2024/06/06162849/img1200.webp"})`,
        }}
      ></div>
    </>
  );
}
