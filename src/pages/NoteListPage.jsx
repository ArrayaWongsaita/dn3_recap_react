import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../stores/authStore";
import { apiClient } from "../api/client";

export default function NoteListPage() {
  const token = useAuthStore((s) => s.token);
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await apiClient.get("/notes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.data.items;
    },
  });
  console.log("data", data);
  if (isLoading) return <div>Loading . . .</div>;

  return <div>NoteListPage</div>;
}
