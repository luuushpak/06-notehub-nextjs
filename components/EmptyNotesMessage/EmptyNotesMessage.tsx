import css from "./EmptyNotesMessage.module.css";

export default function EmptyNotesMessage() {
  return <p className={css.text}>No notes found for this search</p>;
}
