import { useEffect, useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { account } from "~/lib/appwrite.client";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    account
      .get()
      .then(() => setAllowed(true))
      .catch(() => navigate("/login", { replace: true }));
  }, [navigate]);

  if (!allowed) return null;

  return <>{children}</>;
}
