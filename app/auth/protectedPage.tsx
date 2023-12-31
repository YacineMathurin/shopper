import { redirect } from "next/navigation";
import { useContext } from "react";
import { AuthContext } from "../contexts/account";
import { useFriendStatus } from "../contexts/hooks/online";

export default function protectedPage() {
  const isOnline = useFriendStatus();

  if (!isOnline) {
    return redirect("/auth");
  }
}
