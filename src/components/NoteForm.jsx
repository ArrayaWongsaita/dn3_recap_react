import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const noteSchema = z.object({
  title: z.string().trim().min(1),
  content: z.string().trim().min(1),
});

export default function NoteForm({ submitFn, defaultValues, isPending }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <div>
        <label>title</label>
        <input type="text" className="border" {...register("title")} />
        <p>{errors?.title?.message}</p>
      </div>
      <div>
        <label>content</label>
        <textarea type="text" className="border" {...register("content")} />
        <p>{errors?.content?.message}</p>
      </div>
      <button disabled={isPending}>submit{isPending && ". . ."}</button>
    </form>
  );
}
