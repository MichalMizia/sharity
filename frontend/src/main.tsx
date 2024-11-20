import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ToastContainer position="bottom-right" draggable />
    <App />
  </QueryClientProvider>
);
