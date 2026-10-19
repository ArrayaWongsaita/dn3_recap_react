import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiClient } from "../api/client";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(12),
});
export default function LoginPage() {
  const {
    register,
    formState: { errors, isLoading },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "student56@mail.com",
      password: "1234567891011",
    },
  });

  async function hdlLogin(data) {
    const res = await apiClient.post("/auth/login", data);
    console.log("res", res);
  }

  return (
    <form onSubmit={handleSubmit(hdlLogin)}>
      <div>
        <label>email</label>
        <input type="text" className="border" {...register("email")} />
        <p>{errors?.email?.message}</p>
      </div>
      <div>
        <label>password</label>
        <input type="text" className="border" {...register("password")} />
        <p>{errors?.password?.message}</p>
      </div>
      <button disabled={isLoading}>Login{isLoading && ". . ."}</button>
    </form>
  );
}
// pnpm i react-hook-form @hookform/resolvers zod
// pnpm i react-hook-form
// pnpm i @hookform/resolvers
// pnpm i zod
