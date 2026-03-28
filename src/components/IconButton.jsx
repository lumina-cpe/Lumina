export default function IconButton({ imagePath, onClick }) {
  return (
    <button className="component-icon_button" onClick={onClick}>
      <img src={imagePath} alt="icon" />
    </button>
  );
}