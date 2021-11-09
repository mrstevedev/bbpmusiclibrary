import styles from "../styles/Hero.module.scss";

export default function ImageHero(props) {
  const { mediaItemUrl, about, contact } = props

  return (
    <>
      { contact ? (
        <div className={`hero-img ${styles.Bonita__Hero}`} style={{
          background: `url(${ mediaItemUrl }) center -130px no-repeat`,
          backgroundSize: 'cover'
        }}></div>
      ) : about ? (
        <div className={`hero-img ${styles.Bonita__Hero}`} style={{
          background: `url(${ mediaItemUrl }) center -530px no-repeat`
        }}></div>
      ) : '' }
    </>
  );
}
