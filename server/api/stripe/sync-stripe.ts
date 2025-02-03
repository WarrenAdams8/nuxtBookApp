export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const stripeCustomerId = await hubKV().get(`stripe:user:${user.id}`);

    if (!stripeCustomerId) {
        return { url: '/' }
    }


    const subData = await useSyncStripeDataToKv(stripeCustomerId as string)
    return subData
})