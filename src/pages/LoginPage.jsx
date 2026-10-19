import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().trim().min(12),
});
export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "student56@mail.com",
      password: "1234567891011",
    },
  });

  async function hdlLogin(data) {
    try {
      await login(data);
      navigate("/notes");
    } catch (error) {
      alert(error.message);
    }
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
      <button disabled={isSubmitting}>Login{isSubmitting && ". . ."}</button>
    </form>
  );
}
// pnpm i react-hook-form @hookform/resolvers zod
// pnpm i react-hook-form
// pnpm i @hookform/resolvers
// pnpm i zod
