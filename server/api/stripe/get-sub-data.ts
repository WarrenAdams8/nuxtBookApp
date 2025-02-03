import { STRIPE_SUB_CACHE } from "~~/shared/types/StripeTypes"

export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)
    const subData = await useGetSubByUserId(user.id)
    console.log(subData)
    return subData as STRIPE_SUB_CACHE
})