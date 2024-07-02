import styles from "@/styles/Spinner.module.scss";

export default function Spinner() {
  return (
    <>
      <div className={`spinner-border ${styles.BBP__Spinner}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
}
