import { fetchNotes } from "@/lib/api";
import { DEFAULT_QUERY, DEFAULT_PAGE } from "@/constants/notes";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
async function Notes() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", DEFAULT_QUERY, DEFAULT_PAGE],
    queryFn: () => fetchNotes({ query: DEFAULT_QUERY, page: DEFAULT_PAGE }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}

export default Notes;
