import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../../application/contexts/account";
import { useFriendStatus } from "../../application/contexts/hooks/online";

export default function protectedPage() {
  const isOnline = useFriendStatus();

  if (!isOnline) {
    return redirect("/auth");
  }
}
