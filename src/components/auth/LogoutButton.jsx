import Button from "@/components/common/Button";
import axios from "axios";
import { useRouter } from "next/router";

export default function LogoutButton() {
  const router = useRouter();

  const handleClick = async () => {
    axios
      .post("/api/logout")
      .then((res) => {
        // Redirect to the home page if logout successful
        if (res.status === 200) {
          router.push("/");
        }
      })
      .catch((err) => {
        // Show an error message on the form if the logout was unsuccessful
        alert(err);
      });
  };

  return <Button variant="filled" label="Log out" onClick={handleClick} />;
}
