import { Fragment } from "react";
import SingleItemBuyNowButton from "@/components/Buttons/SingleItemBuyNowButton";

export default function TracksTab({
  cart,
  product,
  products,
  handleAddSingleItemTrackToCart,
}) {
  return (
    <Fragment>
      <strong>Tracklist for {product.name}</strong>
      <p style={{ fontSize: "0.9rem" }}>
        Individual tracks can be purchased for $4.99 each
      </p>
      <ol>
        {products.nodes.map((item) => (
          <li key={item.databaseId} className="pt-1">
            {item.name}{" "}
            <SingleItemBuyNowButton
              cart={cart}
              item={item}
              handleAddSingleItemTrackToCart={handleAddSingleItemTrackToCart}
            />
          </li>
        ))}
      </ol>
    </Fragment>
  );
}
