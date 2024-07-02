import { render, screen } from "@testing-library/react";
import ProductHeader from "@/components/Home/ProductHeader";
import ProductItem from "@/components/Home/ProductItem";

/**
 * HOME PAGE TESTS
 */

describe("Test the products on the homepage", () => {
  it("Should have a heading", () => {
    render(<ProductHeader length={undefined} />); // 1. ARRANGE
    const elem = screen.getByRole("heading", {
      name: /Latest Releases Showing/i,
    });
    expect(elem).toBeInTheDocument();
  });

  it("Should have a length of 1 or more products", async () => {
    render(<ProductHeader length={1} />); // 1. ARRANGE
    const elem = await screen.findByTestId(/products-length/i); // 2. ACT
    expect(Number(elem.textContent)).toBeGreaterThan(0); // 3. ASSERT
  });

  it("Should render 1 or more product items", async () => {
    render(
      <ProductItem
        id={1}
        product={{
          databaseId: 399,
          image: {
            mediaItemUrl:
              "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
          },
          name: "Ambition",
          price: "$29.99",
          regularPrice: "$29.99",
          salePrice: null,
          slug: "ambition",
        }}
      />
    );
    const elem = await screen.findAllByTestId(/product-item/i);
    expect(elem.length).toBeGreaterThan(0);
  });
});

/**
 * Mock API
 */

// jest.mock("@apollo/client", () => ({
//   __esModule: true,
//   default: {
//     get: () => ({
//       data: {
//         products: {
//           edges: [
//             {
//               node: {
//                 databaseId: 399,
//                 image: {
//                   __typename: "MediaItem",
//                   mediaItemUrl:
//                     "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
//                 },
//                 link: "https://bbpmusiclib.wpenginepowered.com/product/ambition/",
//                 name: "Ambition",
//                 price: "$300.00",
//                 regularPrice: "29.99",
//                 salePrice: null,
//                 slug: "ambition",
//                 __typename: "SimpleProduct",
//               },
//             },
//           ],
//         },
//       },
//     }),
//   },
// }));
