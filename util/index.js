// Helper functions

// Add Commas to string of Categories
export function createLink(categories, tag) {
  return categories.map((cat) => {
    let linkGroup = "";

    linkGroup +=
      `<${tag} class="category-link" href="/category/` +
      cat.name.toLowerCase().trim().split(/\s+/).join("-") +
      '">' +
      " " +
      cat.name +
      `</${tag}>`;
      
    return linkGroup;
  });
}

export function trimString(string, length) {
  return string.length > length ? string.substring(0, length) + "..." : string;
}

export function getFloatVal(string) {
  let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];

  return null !== floatValue
    ? parseFloat(parseFloat(floatValue).toFixed(2))
    : "";
}

export function addFirstProduct(product) {
  let productPrice = getFloatVal(product.price);

  let newCart = {
    products: [],
    totalProductsCount: 1,
    totalProductsPrice: productPrice,
  };

  const newProduct = createNewProduct(product, productPrice);
  newCart.products.push(newProduct);

  localStorage.setItem("product", JSON.stringify(newCart));
  return newCart;
}

/**
 * Create a new Product Object
 *
 * @param {*} product
 * @param {*} productPrice
 * @param {*} qty
 * @returns
 */
export function createNewProduct(product, productPrice, qty) {
  return {
    databaseId: product.databaseId,
    image: product.image.mediaItemUrl,
    download: product.downloads,
    name: product.name,
    price: productPrice,
    slug: product.slug,
    qty: qty,
    totalPrice: parseFloat((productPrice * qty).toFixed(2)),
  };
}

export function updateCart( existingCart, product, qtyToBeAdded, newQty = false ) {

  const updatedProducts = getUpdatedProducts( existingCart.products, product, qtyToBeAdded, newQty = false )

}

export function getUpdatedProducts( existingProductsInCart, product, qtyToBeAdded, newQty = false ) {
  
  const productExistsIndex = isProductInCart( existingProductsInCart, product.productId )

}

/**
 * 
 * Return index of the product if it exists
 * 
 * @param {*} existingProductsInCart 
 * @param {*} productId 
 * @returns 
 */
export function isProductInCart( existingProductsInCart, productId ) {

  const returnItemThatExists = ( item, index ) => {

    if(productId = item.productId) {
      return item
    }
  } 

  const newArray = existingProductsInCart.filter( returnItemThatExists )

  return existingProductsInCart.indexOf( newArray[0] )

}

export function removeProduct(id) {
  const products = localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product"))
    : [];

  let index;

  for (let i = 0; i < products.products.length; i++) {
    if (products.products[i].productId === id) {
      index = i;
      break;
    }
  }
  if (index === undefined) return;
  products.products.splice(index, 1);
  products.totalProductsCount = null;
  products.totalProductsPrice = null;
  localStorage.setItem("product", JSON.stringify(products));
}
