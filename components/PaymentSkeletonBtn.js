import Skeleton from "react-loading-skeleton";

const PaymentSkeletonBtn = () => (
  <span className="skeleton-loading-container">
    <Skeleton height={55} width={270}  />
  </span>
);

export default PaymentSkeletonBtn;
