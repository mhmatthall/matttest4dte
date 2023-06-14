import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import style from "./LoginForm.module.scss";

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  // We intercept the form submission event so we can give the user feedback without reloading the page
  const onSubmit = async (data, event) => {
    // Prevent browser refresh
    event.preventDefault();

    await axios
      .post("/api/login", data)
      .then(async (res) => {
        // Redirect to the dashboard page if the login was successful
        if (res.status === 200) {
          router.reload();
        }
      })
      .catch((err) => {
        // Show an error message on the form if the login was unsuccessful
        setError("root.serverError", {
          type: err.response.status,
          message: err.response.data.message,
        });
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.container}>
      <div className={style.section}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <p className={style.error}>&uarr; Enter a username.</p>
        )}
      </div>
      <div className={style.section}>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <p className={style.error}>&uarr; Enter a password</p>
        )}
      </div>
      {errors.root?.serverError && (
        <div className={style.section}>
          <p className={style.serverError}>
            {errors.root?.serverError.message}
          </p>
        </div>
      )}
      <div className={style.section}>
        <button type="submit">Login</button>
      </div>
    </form>
  );
}
