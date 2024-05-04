"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/Related.module.scss";
import { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";

export default function RelatedItem({ product }) {
  const curSlide = useRef(0);

  const { edges: products } = product.related;

  useEffect(() => {
    const slides = document.querySelectorAll(".slide") as any;

    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${index * 100}%)`;
    });
  });

  const handleSlidePrev = () => {
    const slides = document.querySelectorAll(".slide") as any;
    let maxSlide = slides.length - 1;
    if (curSlide.current === 0) {
      curSlide.current = maxSlide;
    } else {
      curSlide.current--;
    }

    slides.forEach((slide, index) => {
      console.log(index, curSlide);
      slide.style.transform = `translateX(${
        100 * (index - curSlide.current)
      }%)`;
    });
  };

  const handleSlideNext = () => {
    const slides = document.querySelectorAll(".slide") as any;
    let maxSlide = slides.length - 1;
    // console.log(curSlide, maxSlide);

    if (curSlide.current === maxSlide) {
      curSlide.current = 0;
    } else {
      curSlide.current++;
    }

    slides.forEach((slide, index) => {
      console.log(index, curSlide);
      slide.style.transform = `translateX(${
        100 * (index - curSlide.current)
      }%)`;
    });
  };

  return (
    <div className={styles.related__slider}>
      {products.map((data) => (
        <div key={data.node.id} className={`${styles.related__slide} slide`}>
          <Link href={data.node.slug}>
            <Image
              width={200}
              height={200}
              src={data.node.image.mediaItemUrl}
              alt={data.node.name}
            />
          </Link>
        </div>
      ))}

      <Button
        type="button"
        onClick={handleSlidePrev}
        className={`${styles["related__btn"]} ${styles["related__btn--prev"]} btn__prev`}
        aria-describedby="carousel-status-s0-0-32-3-0-0[6]-4-match-media-0-ebay-carousel"
        aria-label="Go to previous slide - Samsung Cell Phones &amp; Smartphones"
        aria-disabled="true"
        variant="light"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.2426 6.34317L14.8284 4.92896L7.75739 12L14.8285 19.0711L16.2427 17.6569L10.5858 12L16.2426 6.34317Z"
            fill="currentColor"
          />
        </svg>
      </Button>
      <Button
        type="button"
        onClick={handleSlideNext}
        className={`${styles["related__btn"]} ${styles["related__btn--next"]} btn__next`}
        aria-describedby="carousel-status-s0-0-32-3-0-0[6]-4-match-media-0-ebay-carousel"
        aria-label="Go to next slide - Samsung Cell Phones &amp; Smartphones"
        variant="light"
      >
        <svg
          className={styles.next__btn}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5858 6.34317L12 4.92896L19.0711 12L12 19.0711L10.5858 17.6569L16.2427 12L10.5858 6.34317Z"
            fill="currentColor"
          />
        </svg>
      </Button>
    </div>
  );
}
