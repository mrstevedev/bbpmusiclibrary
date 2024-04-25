import Link from "next/link";
import { ReactNode } from "react";
import { useRouter } from "next/router";
import { BreadcrumbItem } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";

type TBreadcrumbProps = {
  slug: string;
  homeElement: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

export default function BreadcrumbComponent({
  slug,
  homeElement,
  activeClasses,
  listClasses,
  capitalizeLinks,
}: TBreadcrumbProps) {
  const router = useRouter();
  const paths = router.asPath;
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <Breadcrumb style={{ margin: "2rem 0 0 0" }}>
      <BreadcrumbItem onClick={() => router.push("/")}>
        {homeElement}
      </BreadcrumbItem>
      {pathNames.map((link, index) => {
        let href = `/${pathNames.slice(0, index + 1).join("/")}`;
        let itemClasses = paths === href ? `${activeClasses}` : listClasses;

        let itemLink = capitalizeLinks
          ? link[0].toUpperCase() + link.slice(1, link.length)
          : link;

        return (
          <BreadcrumbItem
            key={href}
            className={itemClasses}
            onClick={() =>
              href !== "/product" && router.push(`/product/${slug}`)
            }
          >
            {itemLink}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}
