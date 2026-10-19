// import { useQueryClient } from "@tanstack/react-query";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { Link } from "react-router";

export default function NoteDetail({ id, title, content }) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (noteId) => {
      await apiClient.delete(`/notes/${noteId}`);
    },
    onSuccess: (_, noteId) => {
      queryClient.invalidateQueries({ queryKey: ["notes", noteId] });
    },
  });

  return (
    <div className="border m-4 p-4 flex justify-between items-center">
      <div>
        <p>{title}</p>
        <p>{content}</p>
      </div>
      <div>
        <Link to={`/notes/edit/${id}`}>Edit </Link>
        <button onClick={() => mutate(id)}>Delete{isPending && ". . ."}</button>
      </div>
    </div>
  );
}
