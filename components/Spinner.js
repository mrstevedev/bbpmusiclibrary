export default function Spinner() {
  return (
    <>
      <div
        className="spinner-border"
        style={{ width: '1rem', height: '1rem' }}
        role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
}
