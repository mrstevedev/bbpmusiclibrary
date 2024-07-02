"use client";
import Header from "./Header";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";

export default function HeaderWrapper() {
  const path = usePathname();

  return (
    <Fragment>
      {path !== "/checkout" ? (
        <Fragment>
          <Header />
          {path !== "/" ? (
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
