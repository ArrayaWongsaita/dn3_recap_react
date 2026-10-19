import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../api/client";
import NoteDetail from "../components/NoteDetail";
import { Link } from "react-router";

export default function NoteListPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: async () => {
      const res = await apiClient.get("/notes");

      return res.data.data.items;
    },
  });
  console.log("data", data);
  if (isLoading) return <div>Loading . . .</div>;

  return (
    <div>
      <Link to="/notes/create">Create Note</Link>
      {data.map((item) => (
        <NoteDetail key={item.id} {...item} />
      ))}
    </div>
  );
}
