import styles from "../styles/Hero.module.scss";

export default function ImageHero(props) {
  console.log('props in hero image', props)
  return (
    <>
      <div className={`hero-img ${styles.Bonita__Hero}`} style={{
        background: `url(${ props.mediaItemUrl }) center -530px no-repeat`
      }}></div>
    </>
  );
}
