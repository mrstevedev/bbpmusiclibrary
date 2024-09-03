import { AppConfig } from "@/util/AppConfig";
import Link from "next/link";
import { Fragment } from "react";
import styles from "@/styles/Header.module.scss";

type CustomI18nLinkProps = {
  href: string;
  locale: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function CustomI18nLink({
  home,
  href,
  locale,
  children,
  ...props
}: CustomI18nLinkProps) {
  const isDefaultLocale = locale === AppConfig.defaultLocale;
  const path = isDefaultLocale ? href : `/${locale}${href}`;
  return (
    <Fragment>
      {!home ? (
        <Link
          href={path}
          {...props}
          className={`link ${styles.BBP_Header__Logo}}`}
          title={props.name}
        >
          {children}
        </Link>
      ) : (
        <Link
          href={path}
          {...props}
          className={styles.BBP_Header__Logo}
          title={props.name}
        >
          {children}
        </Link>
      )}
    </Fragment>
  );
}
