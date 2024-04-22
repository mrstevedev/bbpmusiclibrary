import { Dispatch, SetStateAction, MouseEvent } from "react";

export type TCheckoutSidebarCartItem = {
  product: {
    databaseId: number;
    name: string;
    image: string;
    totalProductsPrice: number;
    slug: string;
    qty: number;
    price: number;
  };
  productsCount: number;
  totalProductsPrice: number;
};

export type TProduct = {
  databaseId: number;
  name: string;
  image: string;
  slug: string;
  qty: number;
  price: number;
  totalProductsPrice: number;
};

export type TCoupon = {
  amount: string;
  code: string;
  date_created: string;
  date_created_gmt: string;
  date_expires: boolean;
  date_expires_gmt: boolean;
  date_modified: string;
  date_modified_gmt: string;
  description: string;
  discount_type: string;
  email_restrictions: [];
  exclude_sale_items: true;
  excluded_product_categories: [];
  excluded_product_ids: [];
  free_shipping: boolean;
  id: number;
  individual_use: true;
  limit_usage_to_x_items: boolean;
  maximum_amount: string;
  meta_data: [];
  minimum_amount: string;
  product_categories: [];
  product_ids: [];
  status: string;
  usage_count: number;
  usage_limit: number;
  usage_limit_per_user: number;
  used_by: [];
};

export type TSidebarCheckoutProps = {
  coupon: TCoupon[];
  products: TProduct[];
  productsCount: number;
  totalProductsPrice: number;
  setAddItemToast: Dispatch<
    SetStateAction<{
      show: boolean;
      msg: string;
      type: string;
    }>
  >;
};

export type TOrders = {
  id: number;
  status: string;
  currency: string;
  version: string;
  customer_id: number;
  prices_include_tax: boolean;
  date_created: string;
  date_modified: string;
  discount_total: string;
  discount_tax: string;
  shipping_total: string;
  shipping_tax: string;
  cart_tax: string;
  total: string;
  total_tax: string;
  order_key: string;
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  line_items: [
    {
      id: number;
      name: string;
      product_id: number;
      variation_id: number;
      quantity: number;
      tax_class: string;
      subtotal: string;
      subtotal_tax: string;
      total: string;
      total_tax: string;
      taxes: [];
      meta_data: [];
      sku: string;
      price: number;
      image: {
        id: string;
        src: string;
      };
      parent_name: string | null;
    }
  ];
  payment_method: string;
  date_paid: string;
};

export type TDownload = {
  download_id: string;
  download_url: string;
  product_id: number;
  product_name: string;
  download_name: string;
  order_id: number;
  order_key: string;
  downloads_remaining: string;
  access_expires: string;
  access_expires_gmt: string;
  file: {
    name: string;
    file: string;
  };
};

export type TDownloads = {
  date: string;
  date_gmt: string;
  download_id: string;
  file_name: string;
  file_path: string;
  id: number;
  ip_address: string;
  order_id: number;
  order_number: number;
  product_id: number;
  user_id: number;
  username: string;
};

export type Categories = {
  name: string;
};

export type Related = {
  node: {
    id: string;
    image: {
      mediaItemUrl: string;
    };
    name: string;
    slug: string;
  };
};

export type TProductTabs = {
  downloads: TDownloads[];
  product: {
    databaseId: number;
    description: string;
    downloadable: true;
    image: {
      mediaItemUrl: string;
      id: string;
    };
    name: string;
    price: string;
    productCategories: {
      nodes: Categories[];
    };
    regularPrice: string;
    related: { edges: Related[] };
    salePrice: string;
    shortDescription: string;
    sku: string;
    slug: string;
  };

  handleToggleTab: (event: any) => void;
};

export type TSendMail = {
  username: string | string[] | undefined;
  nonce: string | string[] | undefined;
  userId: string | string[] | undefined;
};

export type TUpdateUserPassword = {
  email: string;
  newPassword: string;
  code: string;
};

export type TProductSingle = {
  addToCart: boolean;
  handleAddToCart: () => void;
  handleShowImageGallery: (e: MouseEvent<HTMLAnchorElement>) => void;
  product: {
    name: string;
    description: string;
    price: string;
    image: {
      mediaItemUrl: string;
    };
    productCategories: {
      nodes: TNodes[];
    };
    salePrice: string;
    regularPrice: string;
  };
};

export type TNodes = {
  name: string;
};

export type Product = {
  product: {
    databaseId: number;
    description: string;
    downloadable: true;
    image: {
      mediaItemUrl: string;
      id: string;
    };
    name: string;
    price: string;
    productCategories: {
      nodes: Categories[];
    };
    regularPrice: string;
    related: { edges: Related[] };
    salePrice: string;
    shortDescription: string;
    sku: string;
    slug: string;
  };
};
