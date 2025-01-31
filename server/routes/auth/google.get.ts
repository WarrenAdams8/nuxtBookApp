import { eq } from 'drizzle-orm'
import useSetCustomerId from '~~/server/utils/useSetCustomerId';


export default defineOAuthGoogleEventHandler({
  async onSuccess(event, { user }) {

    const stripeCustomerId = await useSetCustomerId(user.sub, user.email)

    console.log(stripeCustomerId)

    //check if a user is already in database
    const userFromTable = await useDrizzle().select()
      .from(tables.users)
      .where(eq(tables.users.userId, user.sub)).all()

    //insert into database
    if (userFromTable.length === 0) {
      const userInserted = await useDrizzle().insert(tables.users).values({
        userId: user.sub,
        email: user.email,
        avatar: user.picture
      }).returning().get()

      console.log(userInserted)
    }



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
