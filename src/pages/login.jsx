/* eslint-disable @next/next/no-html-link-for-pages */
import Button from "@/components/common/Button";
import Card from "@/components/common/Card";
import FormWrapper from "@/components/common/FormWrapper";
import ProgressIndicator from "@/components/common/ProgressIndicator";
import TextField from "@/components/common/TextField";
import Layout from "@/components/landing/Layout";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";

export default function Home() {
  const router = useRouter();
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    resetField,
    setError,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

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
    <Layout>
      <Head>
        <title>Sign in &ndash; cronicl</title>
      </Head>
      <main>
        <Card
          subhead="Sign in"
          description="Welcome back to cronicl."
          variant="outlined"
        >
          {isSubmitting && <ProgressIndicator variant="linear" />}
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Username"
                  placeholder="e.g. user123"
                  supportingText={errors.username && "Enter a username"}
                  trailingIconGlyph="cancel"
                  onTrailingIconClick={() => resetField("username")}
                  fieldType="text"
                  htmlName="username"
                  variant="outlined"
                  ref={null}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  placeholder="Password"
                  supportingText={errors.password && "Enter a password"}
                  trailingIconGlyph="cancel"
                  onTrailingIconClick={() => resetField("password")}
                  fieldType="password"
                  htmlName="password"
                  variant="outlined"
                  ref={null}
                />
              )}
            />
            {errors.root?.serverError && (
              <div>
                <p>{errors.root?.serverError.message}</p>
              </div>
            )}
            <Button
              label="Enter"
              variant="filled"
              type="submit"
              disabled={isSubmitting}
            />
          </FormWrapper>
        </Card>
      </main>
    </Layout>
  );
}
