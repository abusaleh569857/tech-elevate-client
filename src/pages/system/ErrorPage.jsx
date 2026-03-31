import { useNavigate } from "react-router-dom";
import Button from "@/shared/ui/Button.jsx";
import Panel from "@/shared/ui/Panel.jsx";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#cffafe_0%,#f8fafc_40%,#dbeafe_100%)] px-4 py-10">
      <Panel className="w-full max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-700">Navigation Error</p>
        <h1 className="mt-6 text-8xl font-black text-slate-900">404</h1>
        <p className="mt-6 text-2xl font-black text-slate-900">
          This page is outside the mapped route system.
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-500">
          The link may be outdated or the address may be incorrect. Head back to the main experience and continue from there.
        </p>
        <Button className="mt-8" onClick={() => navigate("/")}>Go Back Home</Button>
      </Panel>
    </div>
  );
};

export default ErrorPage;

