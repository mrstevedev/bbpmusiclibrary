import { Fragment, useEffect } from "react";

export default function CartItemDisplaySalesTax({
  price,
  setPriceWithSalesTax,
}) {
  const calculated = (Number(price) * 1.1).toFixed(2);
  const difference = Number(calculated) - price;
  const differenceToFixed = difference.toFixed(2);

  useEffect(() => {
    setPriceWithSalesTax(calculated);
  }, [calculated, differenceToFixed, setPriceWithSalesTax]);
  return <Fragment>${differenceToFixed}</Fragment>;
}
