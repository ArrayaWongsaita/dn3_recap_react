import { useNavigate, useParams } from "react-router";
import NoteForm from "../components/NoteForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/client";

export default function EditNotePage() {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: async () => {
      const res = await apiClient.get("/notes/" + noteId);
      console.log("res", res.data.data);

      return res.data.data;
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      await apiClient.patch("/notes/" + noteId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes", noteId] });
      navigate("/notes");
    },
  });

  if (isLoading) return <div> Loading . . .</div>;
  return (
    <div>
      <NoteForm submitFn={mutate} defaultValues={data} isPending={isPending} />
    </div>
  );
}
