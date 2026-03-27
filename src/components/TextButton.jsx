export default function TextButton({ text, onClick }) {
  return (
    <button className="component-text_button" onClick={onClick}>{text}</button>
  );
}