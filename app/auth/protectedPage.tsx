import { redirect } from "next/navigation";
import { useUserStatus } from "../../application/contexts/hooks/online";

export default function ProtectedPage() {
  const isOnline = useUserStatus();

  if (!isOnline) {
    return redirect("/auth");
  }
}
