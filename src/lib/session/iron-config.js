export const ironOptions = {
  cookieName: "DTE-TEST_SESSION_COOKIE",
  password: process.env.DTE_TEST_SESSION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
