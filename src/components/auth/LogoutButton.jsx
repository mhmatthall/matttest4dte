import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/");
    }
  };

  return (
    <button type="button" onClick={handleClick}>
      Logout
    </button>
  );
}
