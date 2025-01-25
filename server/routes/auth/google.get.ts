import { avatar } from "#build/ui";

export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user, tokens }) {
    console.log(user);
    await setUserSession(event, {
      user: {
        id: user.sub,
        email: user.email,
        avatar: user.picture,
      },
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("Google OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
