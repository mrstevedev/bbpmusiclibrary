import styles from "@/styles/Banner.module.scss";

export default function Banner({
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
          className={`${styles.BBP__Banner} product-img`}
          style={{
            background: `url(${mediaItemUrl}) center -130px no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
      ) : about ? (
        <div
          className={`${styles.BBP__Banner} product-img`}
          style={{
            background: `url(${mediaItemUrl}) -54px -530px no-repeat`,
          }}
        ></div>
      ) : profile ? (
        <div
          className={`${styles.BBP__Banner} product-img`}
          style={{
            width: "100%",
            height: "250px",
            margin: "2rem 0 2rem 0",
            background: `url(${mediaItemUrl}) center -167px no-repeat`,
            backgroundSize: "cover",
          }}
        ></div>
      ) : update ? (
        <div
          className={`${styles.BBP__Banner}`}
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
