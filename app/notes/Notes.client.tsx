"use client";

import css from "@/app/notes/Notes.module.css";
import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import { fetchNotes } from "@/lib/api";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { DEFAULT_QUERY, DEFAULT_PAGE } from "@/constants/notes";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import { Toaster } from "react-hot-toast";
import EmptyNotesMessage from "@/components/EmptyNotesMessage/EmptyNotesMessage";
import Loader from "@/components/Loader/Loader";

function NotesClient() {
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [isModal, setIsModal] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["notes", query, page],
    queryFn: () => fetchNotes({ query, page }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const totalPages = data?.totalPages ?? 0;
  const fetchedNotes = data?.notes ?? [];

  const handleSelectPage = (selected: number) => {
    setPage(selected);
  };

  const handleInputChange = useDebouncedCallback((value: string) => {
    setQuery(value);
    setPage(1);
  }, 300);

  const handleShowModal = () => setIsModal(true);
  const handleCloseModal = () => setIsModal(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onInputChange={handleInputChange} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            selectPage={handleSelectPage}
          />
        )}
        <button className={css.button} onClick={handleShowModal}>
          Create note +
        </button>
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {fetchedNotes.length > 0 && <NoteList notes={fetchedNotes} />}
      {!isError && !isLoading && fetchedNotes.length === 0 && (
        <EmptyNotesMessage />
      )}
      {isModal && (
        <Modal handleCloseModal={handleCloseModal}>
          <NoteForm handleCloseModal={handleCloseModal} />
        </Modal>
      )}
      <Toaster position="top-center" />
    </div>
  );
}

export default NotesClient;
