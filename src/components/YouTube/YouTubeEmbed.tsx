import { TProductSoundcloud } from "@/types/types";
import styles from "@/styles/Soundcloud.module.scss";

export default function YouTubeEmbed({ product }: TProductSoundcloud) {
  const { options } = product.attributes.nodes[0];
  return (
    <div>
      <iframe
        width="100%"
        height="300"
        src={`https://www.youtube.com/embed/${options}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
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
      </a>
    </div>
  );
}
