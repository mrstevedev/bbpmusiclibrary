import styles from "@/styles/Hero.module.scss";

export default function ImageHero({
  mediaItemUrl,
  about,
  contact,
  profile,
  update,
}: {
  mediaItemUrl: string | null;
  about?: boolean;
  contact?: boolean;
  profile?: boolean;
  update?: boolean;
}) {
  return (
    <>
      {contact ? (
        <div
          className={`${styles.Bonita__Hero}`}
          style={{
            background: `url(${mediaItemUrl}) center -130px no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
      ) : about ? (
        <div
          className={`${styles.Bonita__Hero}`}
          style={{
            background: `url(${mediaItemUrl}) center -530px no-repeat`,
          }}
        ></div>
      ) : profile ? (
        <div
          className={`${styles.Bonita__Hero}`}
          style={{
            height: "250px",
            margin: "2rem 0 2rem 0",
            background: `url(${mediaItemUrl}) center top no-repeat`,
          }}
        ></div>
      ) : update ? (
        <div
          className={`${styles.Bonita__Hero}`}
          style={{
            height: "250px",
            margin: "2rem 0 2rem 0",
            background: `url(${mediaItemUrl}) center top no-repeat`,
          }}
        ></div>
      ) : null}
    </>
  );
}
