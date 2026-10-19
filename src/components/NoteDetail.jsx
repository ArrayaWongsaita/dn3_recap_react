// import { useQueryClient } from "@tanstack/react-query";

import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import { useAuthStore } from "../stores/authStore";

export default function NoteDetail({ title, content }) {
  const token = useAuthStore((s) => s.token);
  // const queryClient = useQueryClient()

  const {} = useMutation({
    mutationFn: async (noteId) => {
      await apiClient.delete(`/notes/${noteId}`);
    },
  });

  return (
    <div className="border m-4 p-4 flex justify-between items-center">
      <div>
        <p>{title}</p>
        <p>{content}</p>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </div>
  );
}
