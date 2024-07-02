import { screen, render } from "@testing-library/react";
import ProductItem from "@/components/Product/Item/ProductItem";

describe("Test a single product on the product page", () => {
  it("Should contain product name", () => {
    render(
      <ProductItem
        key={1}
        product={{
          databaseId: 399,
          description:
            "Sed hendrerit. In auctor lobortis lacus. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Suspendisse potenti. Ut varius tincidunt libero. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Phasellus gravida semper nisi. Fusce fermentum. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Praesent ac sem eget est egestas volutpat. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Sed fringilla mauris sit amet nibh. Fusce egestas elit eget lorem.",
          downloadable: true,
          image: {
            mediaItemUrl:
              "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
            id: "cG9zdDo5MjQ=",
          },
          name: "Ambition",
          price: "$29.99",
          productCategories: { nodes: Array(1) },
          regularPrice: "$29.99",
          related: { edges: Array(10) },
          salePrice: null,
          shortDescription:
            "<strong>Tracklist for Introspection</strong>\r\n<ol>\r\n \t<li>Angelic 121 bpm (1:08)</li>\r\n \t<li>Escort 95 bpm (2:07)</li>\r\n \t<li>Gardens 83 bpm (1:51)</li>\r\n \t<li>Gobstoppers 129 bpm (1:46)</li>\r\n \t<li>Hydroplane 94 bpm (1:26)</li>\r\n \t<li>Lemon Lime 160 bpm (1:03)</li>\r\n \t<li>Magnetic 152 bpm (1:22)</li>\r\n \t<li>Reflections 150 bpm (2:11)</li>\r\n \t<li>Resurrection 124 bpm (1:18)</li>\r\n \t<li>Solitude 95 bpm (0:40)</li>\r\n</ol>",
          sku: "1237205593",
          slug: "ambition",
        }}
      />
    );

    const productName = screen.getByTestId("product-name");
    expect(productName).toHaveTextContent(/Ambition/i);
  });

  it("Should contain a product price", () => {
    render(
      <ProductItem
        key={1}
        product={{
          databaseId: 399,
          description:
            "Sed hendrerit. In auctor lobortis lacus. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Suspendisse potenti. Ut varius tincidunt libero. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Phasellus gravida semper nisi. Fusce fermentum. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Praesent ac sem eget est egestas volutpat. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Sed fringilla mauris sit amet nibh. Fusce egestas elit eget lorem.",
          downloadable: true,
          image: {
            mediaItemUrl:
              "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
            id: "cG9zdDo5MjQ=",
          },
          name: "Ambition",
          price: "$29.99",
          productCategories: { nodes: Array(1) },
          regularPrice: "$29.99",
          related: { edges: Array(10) },
          salePrice: null,
          shortDescription:
            "<strong>Tracklist for Introspection</strong>\r\n<ol>\r\n \t<li>Angelic 121 bpm (1:08)</li>\r\n \t<li>Escort 95 bpm (2:07)</li>\r\n \t<li>Gardens 83 bpm (1:51)</li>\r\n \t<li>Gobstoppers 129 bpm (1:46)</li>\r\n \t<li>Hydroplane 94 bpm (1:26)</li>\r\n \t<li>Lemon Lime 160 bpm (1:03)</li>\r\n \t<li>Magnetic 152 bpm (1:22)</li>\r\n \t<li>Reflections 150 bpm (2:11)</li>\r\n \t<li>Resurrection 124 bpm (1:18)</li>\r\n \t<li>Solitude 95 bpm (0:40)</li>\r\n</ol>",
          sku: "1237205593",
          slug: "ambition",
        }}
      />
    );
    const productPrice = screen.getByText("$29.99");
    expect(productPrice).toBeInTheDocument();
  });

  it("Should contain a product description", () => {
    const desc =
      "Sed hendrerit. In auctor lobortis lacus. Nulla consequat massa quis enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Suspendisse potenti. Ut varius tincidunt libero. Nunc egestas, augue at pellentesque laoreet, felis eros vehicula leo, at malesuada velit leo quis pede. Phasellus gravida semper nisi. Fusce fermentum. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Praesent ac sem eget est egestas volutpat. Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Sed fringilla mauris sit amet nibh. Fusce egestas elit eget lorem.";

    render(
      <ProductItem
        key={1}
        product={{
          databaseId: 399,
          description: desc,
          downloadable: true,
          image: {
            mediaItemUrl:
              "https://bbpmusiclib.wpenginepowered.com/wp-content/uploads/2024/05/BBP_012_AMBITION.webp",
            id: "cG9zdDo5MjQ=",
          },
          name: "Ambition",
          price: "$29.99",
          productCategories: { nodes: Array(1) },
          regularPrice: "$29.99",
          related: { edges: Array(10) },
          salePrice: null,
          shortDescription:
            "<strong>Tracklist for Introspection</strong>\r\n<ol>\r\n \t<li>Angelic 121 bpm (1:08)</li>\r\n \t<li>Escort 95 bpm (2:07)</li>\r\n \t<li>Gardens 83 bpm (1:51)</li>\r\n \t<li>Gobstoppers 129 bpm (1:46)</li>\r\n \t<li>Hydroplane 94 bpm (1:26)</li>\r\n \t<li>Lemon Lime 160 bpm (1:03)</li>\r\n \t<li>Magnetic 152 bpm (1:22)</li>\r\n \t<li>Reflections 150 bpm (2:11)</li>\r\n \t<li>Resurrection 124 bpm (1:18)</li>\r\n \t<li>Solitude 95 bpm (0:40)</li>\r\n</ol>",
          sku: "1237205593",
          slug: "ambition",
        }}
      />
    );

    const productDescription = screen.getByTestId("product-description");
    expect(productDescription).toContainHTML(desc);
  });
});
