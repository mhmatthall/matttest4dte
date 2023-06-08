export const ironOptions = {
  cookieName: "DTE-TEST_SESSION_COOKIE",
  password: process.env.SESSION_SECRET,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
