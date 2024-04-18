export type RequestProps = {
  body: {
    payment_method: any;
    coupon: string;
    product_name: string;
    email: string;
    name: string;
    price: string;
    admin_area_1: string;
    admin_area_2: string;
    state: string;
    city: string;
    address: string;
    address_line_1: string;
    postal_code: string;
    country_code: string;
    phone: string;
    databaseId: number;
  };
};

export type ResponseProps = {
  status: (arg0: number) => {
    (): any;
    new (): any;
    json: { (arg0: { message: string }): any; new (): any };
  };
  json: (arg0: { status: string }) => void;
};
