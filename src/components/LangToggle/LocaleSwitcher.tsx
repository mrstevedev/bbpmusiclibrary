"use client";
import Image from "next/image";
import { useTransition } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { constructNewPathname } from "@/util/index";

import styles from "@/styles/LangSwitcher.module.scss";
import { MATCH } from "@/constants/index";

export default function LocaleSwitcher() {
  const localeActive = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSelect = (_, event) => {
    const newPath = constructNewPathname(localeActive, pathname);

    startTransition(() => {
      const searchUrl = MATCH.MATCH_URL;
      const regex = new RegExp(searchUrl, "g");
      if (pathname.match(regex)) {
        router.replace(`/${event.target.value}/${newPath}`);
        return;
      }
      router.replace(`/${event.target.value}`);
    });
  };
  return (
    <Dropdown onSelect={(eventKey, event) => handleSelect(eventKey, event)}>
      <DropdownButton
        id="dropdown-item-button"
        title={
          <>
            <Image
              src="/images/globe.png"
              alt="Globe"
              width={16}
              height={16}
              className={styles.BBP_LangSwitcher__Icon}
            />
            <span style={{ textTransform: "uppercase" }}>{localeActive}</span>
          </>
        }
        size="sm"
      >
        <Dropdown.Item
          as="button"
          value="en"
          className={styles.BBP_LangSwitcher__Item}
        >
          <span className="fi fi-um"></span>English
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="se"
          className={styles.BBP_LangSwitcher__Item}
        >
          <span className="fi fi-se"></span>Swedish
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="de"
          className={styles.BBP_LangSwitcher__Item}
        >
          <span className="fi fi-de"></span>Deutsch
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="fr"
          className={styles.BBP_LangSwitcher__Item}
        >
          <span className="fi fi-nl"></span>Français
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="es"
          className={styles.BBP_LangSwitcher__Item}
        >
          <span className="fi fi-mx"></span>Español
        </Dropdown.Item>
      </DropdownButton>
    </Dropdown>
  );
}
