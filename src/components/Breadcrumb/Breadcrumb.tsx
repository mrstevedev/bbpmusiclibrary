"use client";
import { usePathname, useRouter } from "next/navigation";
import { BreadcrumbItem } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { TBreadcrumbProps } from "src/types/types";
import { Container } from "react-bootstrap";

export default function BreadcrumbComponent({
  homeElement,
  activeClasses,
  listClasses,
  capitalizeLinks,
}: TBreadcrumbProps) {
  const paths = usePathname();
  const router = useRouter();
  const pathNames = paths?.split("/").filter((path) => path);
  const slug = pathNames?.at(-1);

  return (
    <Container
      fluid={
        paths === "/" || paths === "/about" || paths === "/contact"
          ? true
          : false
      }
    >
      <Breadcrumb style={{ margin: "2rem 0 0 0" }}>
        <BreadcrumbItem onClick={() => router.push("/")}>
          {homeElement}
        </BreadcrumbItem>
        {pathNames?.map((link, index) => {
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
    </Container>
  );
}
