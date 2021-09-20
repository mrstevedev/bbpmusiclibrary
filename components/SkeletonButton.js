import Skeleton from "react-loading-skeleton";

const SkeletonButton = () => (
  <span className="skeleton-loading-container">
    <Skeleton height={55} width={260}  />
  </span>
);

export default SkeletonButton;
