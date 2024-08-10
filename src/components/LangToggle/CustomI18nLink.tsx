import { AppConfig } from "@/util/AppConfig";
import Link from "next/link";

type CustomI18nLinkProps = {
  href: string;
  locale: string;
  children: React.ReactNode;
  [key: string]: any;
};

export default function CustomI18nLink({
  href,
  locale,
  children,
  ...props
}: CustomI18nLinkProps) {
  const isDefaultLocale = locale === AppConfig.defaultLocale;
  const path = isDefaultLocale ? href : `/${locale}${href}`;
  return (
    <Link href={path} {...props} className="link" title={props.name}>
      {children}
    </Link>
  );
}
