import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import NoteForm from "../components/NoteForm";
import { useNavigate } from "react-router";

export default function CreateNotePage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      await apiClient.post("/notes", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/notes");
    },
  });

  return (
    <div>
      <NoteForm submitFn={mutate} isPending={isPending} />
    </div>
  );
}
