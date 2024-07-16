import { TProductSoundcloud } from "@/types/types";
import styles from "@/styles/Soundcloud.module.scss";

export default function SoundcloudPlayer({ product }: TProductSoundcloud) {
  return (
    <div>
      <iframe
        key={product.databaseId}
        width="100%"
        height="300"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${product.sku}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`}
      ></iframe>
      <a
        href="https://soundcloud.com/bbpmusiclibrary"
        title="BBP Music Library"
        target="_blank"
        className={styles.BBP_Soundcloud__Name}
      >
        BBP Music Library
      </a>{" "}
      ·{" "}
      <a
        href={product.name}
        title={product.name}
        target="_blank"
        className={styles.BBP_Soundcloud__ShortDescription}
      >
        {product.name}
      </a>
      {/* <iframe
        key={product.databaseId}
        width="100%"
        height="300"
        src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${product.sku}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true`}
      ></iframe>
      <a
        href="https://soundcloud.com/bbpmusiclibrary"
        title="BBP Music Library"
        target="_blank"
        rel="noreferrer"
        className={styles.BBP_Soundcloud__Name}
      >
        BBP Music Library
      </a>
      ·
      <a
        href={product.name}
        title={product.name}
        target="_blank"
        rel="noreferrer"
        className={styles.BBP_Soundcloud__ShortDescription}
      >
        {product.name}
      </a> */}
    </div>
  );
}
