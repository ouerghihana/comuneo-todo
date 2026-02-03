import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { account } from "~/lib/appwrite.client";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    account
      .get()
      .then(() => setAllowed(true))
      .catch(() => {
        setAllowed(false);
        navigate("/login", { replace: true });
      });
  }, [navigate]);

  if (allowed === null) return null;

  return <>{children}</>;
}
