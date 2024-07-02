import axios, { AxiosError } from "axios";

export function trimString(string: string, length) {
  return string.length > length ? string.substring(0, length) + "..." : string;
}

export function getFloatVal(string: string) {
  let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)![0];

  return null !== floatValue
    ? parseFloat(parseFloat(floatValue).toFixed(2))
    : "";
}

type Product = {
  databaseId: any;
  image: any;
  name: any;
  price: any;
  slug: any;
  qty: any;
};

type Cart = {
  products: Product[];
  totalProductsCount: number;
  totalProductsPrice: string;
  coupon: {
    amount: number;
    code: string;
    isApplied: boolean;
  };
};

export function addFirstProduct(product) {
  const productPrice = getFloatVal(product.price) as string;

  const newCart: Cart = {
    products: [],
    totalProductsCount: 1,
    totalProductsPrice: productPrice,
    coupon: {
      amount: 0,
      code: "",
      isApplied: false,
    },
  };

  const newProduct = createNewProduct(product, productPrice, 1);
  newCart.products.push(newProduct);

  localStorage.setItem("bbp_product", JSON.stringify(newCart));
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

export function createNewProduct(product: Product, productPrice, qty) {
  return {
    databaseId: product.databaseId,
    image: product.image.mediaItemUrl,
    name: product.name,
    price: productPrice,
    slug: product.slug,
    qty: qty,
  };
}

export function addCouponToCart(existingCart, code, amount) {
  const currentCart = JSON.parse(existingCart);
  const currentCartTotalPriceDifferenceFromAmount = String(
    currentCart.totalProductsPrice - amount
  );

  const newPrice = parseFloat(currentCartTotalPriceDifferenceFromAmount);
  // .toFixed(2);

  const updatedCart = {
    products: currentCart.products,
    totalProductsCount: currentCart.totalProductsCount,
    totalProductsPrice: parseFloat(newPrice.toFixed(2)),
    coupon: {
      amount: amount,
      code: code ? code : "",
      isApplied: code ? true : false,
    },
  };

  localStorage.setItem("bbp_product", JSON.stringify(updatedCart));

  return updatedCart;
}

export function updateCart(
  existingCart,
  product,
  qtyToBeAdded,
  newQty = false
) {
  const updatedProducts = getUpdatedProducts(
    existingCart.products,
    product,
    qtyToBeAdded,
    newQty
  );

  const addPrice = (total, item) => {
    total.totalPrice += item.price;
    total.qty += item.qty;
    return total;
  };

  // Loop through the updated product array and add the totalPrice of each item to get the total
  let total = updatedProducts.reduce(addPrice, { totalPrice: 0, qty: 0 });

  const price_with_coupon = total.totalPrice - existingCart.coupon.amount;

  const updatedCart = {
    coupon: existingCart.coupon ?? false,
    products: updatedProducts,
    totalProductsCount: parseInt(total.qty),
    totalProductsPrice: !existingCart.coupon.isApplied
      ? parseFloat(total.totalPrice.toFixed(2))
      : parseFloat(price_with_coupon.toFixed(2)),
  };

  console.log("updatedCart:", updatedCart);

  localStorage.setItem("bbp_product", JSON.stringify(updatedCart));

  return updatedCart;
}

/**
 * Get updated products array.
 * Updated the product if its exists
 * and add the new product to existing cart.
 *
 *
 * @param {*} existingProductsInCart
 * @param {*} product
 * @param {*} qtyToBeAdded
 * @param {*} newQty
 * @returns
 */

export function getUpdatedProducts(
  existingProductsInCart,
  product,
  qtyToBeAdded,
  newQty = false
) {
  const productExistsIndex = isProductInCart(
    existingProductsInCart,
    product.databaseId
  );

  // if product exists ( index of that product is found in the array  ), update the product quantity and totalPrice
  if (-1 < productExistsIndex) {
    let updatedProducts = existingProductsInCart;
    let updatedProduct = updatedProducts[productExistsIndex];

    // If we have the new qty of the product available, set that else add the qtyToBeAdded
    updatedProduct.qty = newQty
      ? newQty
      : parseInt(updatedProduct.qty + qtyToBeAdded);
    updatedProduct.totalPrice = parseFloat(
      String(updatedProduct.price * updatedProduct.qty)
    ).toFixed(2);

    return updatedProducts;
  } else {
    // If product not found, push the new product to the existing products array
    let productPrice = getFloatVal(product.price);
    const newProduct = createNewProduct(product, productPrice, qtyToBeAdded);
    existingProductsInCart.push(newProduct);

    return existingProductsInCart;
  }
}

/**
 *
 * Return index of the product if it exists
 *
 * @param {*} existingProductsInCart
 * @param {*} databaseId
 * @returns
 */
export function isProductInCart(existingProductsInCart, databaseId) {
  const returnItemThatExists = (item, index) => {
    if (databaseId === item.databaseId) {
      return item;
    }
  };

  const newArray = existingProductsInCart.filter(returnItemThatExists);

  return existingProductsInCart.indexOf(newArray[0]);
}

export function removeItemFromCart(databaseId) {
  const existingCart = localStorage.getItem("bbp_product")
    ? JSON.parse(localStorage.getItem("bbp_product") as string)
    : [];

  if (1 === existingCart.products.length) {
    localStorage.removeItem("bbp_product");
    return null;
  }

  const productExistIndex = isProductInCart(existingCart.products, databaseId);

  if (-1 < productExistIndex) {
    const productToBeRemoved = existingCart.products[productExistIndex];
    const qtyToBeRemovedFromTotal = productToBeRemoved.qty;

    const priceToBeDeductedFromTotal = productToBeRemoved.price;

    let updatedCart = existingCart;

    updatedCart.products.splice(productExistIndex, 1);
    updatedCart.totalProductsCount =
      updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
    updatedCart.totalProductsPrice = Number(
      parseFloat(
        String(updatedCart.totalProductsPrice - priceToBeDeductedFromTotal)
      ).toFixed(2)
    );

    localStorage.setItem("bbp_product", JSON.stringify(updatedCart));
    return updatedCart;
  } else {
    return existingCart;
  }
}

export function formatPhoneNumber(str) {
  const cleaned = ("" + str).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ")" + match[2] + "-" + match[3];
  }
  return null;
}

export function throttle(mainFunction, delay) {
  let timerFlag: undefined | ReturnType<typeof setTimeout>; // Variable to keep track of the timer
  // Returning a throttled version
  return (...args) => {
    if (timerFlag === undefined) {
      // If there is no timer currently running
      mainFunction(...args); // Execute the main function
      timerFlag = setTimeout(() => {
        // Set a timer to clear the timerFlag after the specified delay
        timerFlag = undefined; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}

export const generatePassword = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let password = "";

  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
};

export const generateSessionID = () => {
  const sessionId = new Date().getTime() + 600000;
  return sessionId.toString();
};

export const isEmailAddress = (str) => {
  if (/\@/.test(str)) {
    return true;
  }
};

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const calculateOrderAmount = (items) => {
  return items.reduce(
    (n, { amount: { value } }) => Math.round(n + parseFloat(value) * 100),
    0
  );
};

// Stripe requires cents as a string // '1499'
export const calculateOrderAmountAndSplitStripe = (items): number => {
  return items.reduce(
    (n, { amount: { value } }) => n + Math.floor((parseFloat(value) * 100) / 2),
    0
  );
};

// PayPal requires dollars as a string // '14.99' / '7.49'
export const calculateOrderAmountAndSplitPayPal = (items) => {
  return items.reduce(
    (n, { amount: { value } }) =>
      String(Math.floor((parseFloat(value) * 100) / 2) / 100),
    0
  );
};

export type Items = Item[];

export type Item = {
  amount: {
    value: string;
  };
};

export const calculatePriceWithTax = (price) => {
  return (Number(price) * 1.1).toFixed(2);
};

// export const calculateTaxFromTotal = (total) => {
//   return (Number(total) * 1.1).toFixed(2);
// };

export const groupDownloadItems = (downloads) =>
  downloads.reduce(
    (obj, item) => ({
      ...obj,
      [item.order_id]: [...(obj[item.order_id] ?? []), item],
    }),
    {}
  );

export const orderGroupedDownloadItems = (groupDownloadItems) => {
  return Object.keys(groupDownloadItems).sort((a: any, b: any) => b - a);
};
