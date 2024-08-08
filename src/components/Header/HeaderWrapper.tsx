"use client";
import Header from "./Header";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { useLocale } from "next-intl";

export default function HeaderWrapper() {
  const path = usePathname();
  const locale = useLocale();

  return (
    <Fragment>
      {path !== `/${locale}/checkout` ? (
        <Fragment>
          <Header />
          {path !== `/${locale}` ? (
            <Fragment>
              <Breadcrumb
                homeElement={"Home"}
                activeClasses="breadcrumb-active"
                containerClasses="flex"
                capitalizeLinks
              />
            </Fragment>
          ) : null}
        </Fragment>
      ) : null}
    </Fragment>
  );
}
