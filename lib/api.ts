import axios from "axios";
import type { Note, NoteTag } from "@/types/note.ts";
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesProps {
  query: string;
  page: number;
}

interface CreateNoteProps {
  title: string;
  content: string;
  tag: NoteTag;
}

interface ApiFetchNotes {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  query: search,
  page,
}: FetchNotesProps): Promise<ApiFetchNotes> {
  const response = await api.get<ApiFetchNotes>("/notes", {
    params: {
      search,
      page,
      perPage: 12,
    },
  });

  return response.data;
}

export async function createNote(newNote: CreateNoteProps): Promise<Note> {
  const response = await api.post<Note>("/notes", newNote);

  return response.data;
}
export async function deleteNote(id: string): Promise<Note> {
  const response = await api.delete<Note>(`/notes/${id}`);

  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await api.get<Note>(`/notes/${id}`);

  return response.data;
}
