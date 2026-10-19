import { createBrowserRouter, Navigate, Outlet } from "react-router";
import LoginPage from "./pages/LoginPage";
import NoteListPage from "./pages/NoteListPage";
import CreateNotePage from "./pages/CreateNotePage";
import EditNotePage from "./pages/EditNotePage";

export const router = createBrowserRouter([
  { index: true, element: <Navigate to="/login" /> },
  { path: "/login", element: <LoginPage /> },
  {
    path: "/notes",
    element: <Outlet />,
    children: [
      { index: true, element: <NoteListPage /> },
      { path: "create", element: <CreateNotePage /> },
      { path: ":noteId", element: <EditNotePage /> },
    ],
  },
]);
