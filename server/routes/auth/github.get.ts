import { eq } from 'drizzle-orm'

//TODO: Add proper error handling

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  async onSuccess(event, { user }) {

    //check if a user is already in database
    const userFromTable = await useDrizzle().select()
      .from(tables.users)
      .where(eq(tables.users.userId, user.id)).all()

    //insert into database
    if (userFromTable.length === 0) {
      const userInserted = await useDrizzle().insert(tables.users).values({
        userId: user.id,
        email: user.email,
        avatar: user.avatar_url
      }).returning().get()

      console.log(userInserted)
    }


    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        avatar: user.avatar_url,
      },
    });
    return sendRedirect(event, "/");
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error("GitHub OAuth error:", error);
    return sendRedirect(event, "/");
  },
});
