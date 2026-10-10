import { useEffect, useState } from "react";
import { CheckCircle2, AlertCircle, LoaderCircle } from "lucide-react";
import api from "../services/api";

function BackendStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let active = true;

    api
      .get("/health")
      .then(() => {
        if (active) setStatus("connected");
      })
      .catch(() => {
        if (active) setStatus("error");
      });

    return () => {
      active = false;
    };
  }, []);

  const config = {
    checking: {
      label: "Connecting to backend...",
      icon: LoaderCircle,
      classes: "bg-slate-100 text-slate-600",
    },
    connected: {
      label: "Backend connected",
      icon: CheckCircle2,
      classes: "bg-emerald-50 text-emerald-700",
    },
    error: {
      label: "Backend unavailable",
      icon: AlertCircle,
      classes: "bg-red-50 text-red-700",
    },
  };

  const current = config[status];
  const Icon = current.icon;

  return (
    <div
      role="status"
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-medium ${current.classes}`}
    >
      <Icon size={15} className={status === "checking" ? "animate-spin" : ""} />
      {current.label}
    </div>
  );
}

export default BackendStatus;
