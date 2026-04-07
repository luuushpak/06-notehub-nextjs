import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onInputChange: (value: string) => void;
}

export default function SearchBox({ onInputChange }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={(event) => onInputChange(event.target.value.trim())}
    />
  );
}
