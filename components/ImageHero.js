import styles from "../styles/Hero.module.scss";

export default function ImageHero(props) {

  return (
    <>
      { props.contact ? (
        <div className={`hero-img ${styles.Bonita__Hero}`} style={{
          background: `url(${ props.mediaItemUrl }) center -130px no-repeat`,
          backgroundSize: 'cover'
        }}></div>
      ) : props.about ? (
        <div className={`hero-img ${styles.Bonita__Hero}`} style={{
          background: `url(${ props.mediaItemUrl }) center -530px no-repeat`,
          // backgroundSize: 'cover'
        }}></div>
      ) : '' }
    </>
  );
}
