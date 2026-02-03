import ProtectedRoute from "./ProtectedRoute";
import HomePage from "./_index";

export default function ProtectedIndex() {
  return (
    <ProtectedRoute>
      <HomePage />
    </ProtectedRoute>
  );
}

