import { ReactNode } from "react";

export type TAbout = {
  page: {
    id: string;
    content: string;
    featuredImage: {
      node: {
        id: string;
        mediaItemUrl: string;
      };
    };
    title: string;
  };
  coupon: {};
};

export type TContact = {
  page: {
    content: string | null;
    title: string;
    featuredImage: {
      node: {
        id: string | null;
        mediaItemUrl: string | null;
      };
    };
  };
};

/** SidebarCart */
export type TSidebarProduct = {
  databaseId: number;
  image: string;
  name: string;
  price: number;
  qty: number;
  slug: string;
};

export type TSidebarCartItem = {
  product: {
    databaseId: number;
    image: string;
    name: string;
    price: number;
    qty: number;
    slug: string;
  };
  handleRemoveItem;
  couponApplied: boolean;
  couponAmount: number;
  couponCode: string;
};
/** End SidebarCart */

export type TProductItem = {
  product: {
    id: string;
    databaseId: number;
    image: string;
    name: string;
    price: number;
    qty: number;
    slug: string;
    salePrice: string;
    regularPrice: string;
    // image: {
    //   mediaItemUrl: string;
    // };
  };
  price: number;
  handleRemoveItem: (id: number) => void;
  couponApplied?: string | boolean;
};

export type HomeProductItem = {
  id: number;
  product: {
    databaseId: number;
    name: string;
    price: string;

    slug: string;
    salePrice: string | null;
    regularPrice: string;
    image: {
      mediaItemUrl: string;
    };
  };
};

export type TBreadcrumbProps = {
  homeElement: ReactNode;
  containerClasses?: string;
  listClasses?: string;
  activeClasses?: string;
  capitalizeLinks?: boolean;
};

export type TProductMobileItem = {
  databaseId: number;
  name: string;
  image: string;
  slug: string;
  qty: number;
  price: number;
  totalProductsPrice: number;
};

export type TCheckoutSidebarCartItem = {
  product: {
    databaseId: number;
    name: string;
    image: string;
    slug: string;
    qty: number;
    price: number;
  };
  products: Product[];
  productsCount: number;
  couponApplied: boolean | undefined;
  couponPrice: number;
  couponCode: string | undefined;
  setCart: (Cart: any) => void;
};

export type TProduct = {
  id: string;
  image: {
    mediaItemUrl: string;
  };
  name: string;
  price: string;
  slug: string;
  salePrice: string;
  regularPrice: string;
  databaseId: number;
  sku: string;
};

export type Option = string;

export type Attribute = {
  name: string;
  options: Option[];
};

export type Nodes = {
  nodes: Attribute[];
};

export type TProductSoundcloud = {
  product: {
    name: string;
    databaseId: number;
    sku: string;
    attributes: Nodes | null;
  };
};

export type TProducts = {
  products: TProduct[];
};

export type TProductsCategoryItems = {
  products: TProductCategoryItem[];
};

export type TProductCategoryItem = {
  id: string;
  image: {
    mediaItemUrl: string;
  };
  name: string;
  price: string;
  slug: string;
  salePrice: string;
  regularPrice: string;
  databaseId: number;
  description: string;
  sku: string;
};

export type Product = {
  id: string;
  databaseId: number;
  image: string;
  name: string;
  price: number;
  qty: number;
  slug: string;
  description: string;
  salePrice: string;
  regularPrice: string;
};

export type Products = {
  products: Product[];
};

export type TCart = {
  products: Product[];
  productsCount: number;
  totalProductsPrice: number;
  couponApplied: boolean | undefined;
};

export type TCartTotal = {
  totalProductsPrice: number;
  couponApplied: boolean | undefined;
};

export type PurchaseUnits = {
  description: string;
  amount: {
    currency_code: string;
    value: string;
  };
};

export type ExpressCart = {
  price: number;
  databaseId: number;
  productName: string;
  purchaseUnits: PurchaseUnits[];
};

// export type TProductsTabs = {
//   products: TProduct[];
//   downloads: Download[];
// };

export type Order = {
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

export type TOrder = {
  order: {
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
};

export type TSidebarCheckoutProps = {
  products: TProduct[];
  productsCount: number;
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

export type TCategoryItems = {
  name: string;
  image: {
    mediaItemUrl: string;
  };
  description: string;
  slug: string;
  price: string;
};

export type TSendMail = {
  username: string | string[] | undefined;
  session: string | string[] | undefined;
  userId: string | string[] | undefined;
};

export type TUpdateUserPassword = {
  email: string | null;
  newPassword: string;
  code: string;
  // userId: string | null;
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

/** Profile */
export type LineItem = {
  product: {
    name: string;
    databaseId: number;
    date: string;
    slug: string;
    sku: string;
    shortDescription: string;
    price: string;
    image: {
      mediaItemUrl: string;
    };
  };
};
export type ProfileOrderItem = {
  node: {
    orderNumber: string;
    datePaid: string;
    lineItems: { nodes: LineItem[] };
  };
};
