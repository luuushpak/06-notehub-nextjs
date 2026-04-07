import css from "./NoteList.module.css";
import type { Note } from "@/types/note";
import { deleteNote } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const handleDeleteNote = (id: string) => {
    mutate(id);
  };

  const { mutate, isPending } = useMutation<Note, Error, string>({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: () => {
      toast.error("Failed to delete the note. Please try again later.");
    },
  });
  return (
    <ul className={css.list}>
      {notes.map((note) => {
        const { title, id, content, tag } = note;
        return (
          <li className={css.listItem} key={id}>
            <h2 className={css.title}>{title}</h2>
            <p className={css.content}>{content}</p>
            <div className={css.footer}>
              <span className={css.tag}>{tag}</span>
              <button
                className={css.button}
                onClick={() => handleDeleteNote(id)}
                disabled={isPending}
              >
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
