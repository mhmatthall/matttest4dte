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
        // Show an error message on the form if the login was unsuccessful
        alert(err);
      });
  };

  return (
    <Button
      labelText="Logout"
      altText="Logout button"
      iconSrc="/img/icons/logout-light.svg"
      onClick={handleClick}
    />
  );
}
