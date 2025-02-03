import Stripe from "stripe"
export default async function (userId: number) {
    type STRIPE_SUB_CACHE =
        | {
            subscriptionId: string | null;
            status: Stripe.Subscription.Status;
            priceId: string | null;
            currentPeriodStart: number | null;
            currentPeriodEnd: number | null;
            cancelAtPeriodEnd: boolean;
            paymentMethod: {
                brand: string | null; // e.g., "visa", "mastercard"
                last4: string | null; // e.g., "4242"
            } | null;
        }
        | {
            status: "none";
        };

    let stripeCustomerId = await hubKV().get(`stripe:user:${userId}`)

    if (!stripeCustomerId) {
        return {}
    }

    const subData = await hubKV().get(`stripe:customer:${stripeCustomerId}`)
    return subData as STRIPE_SUB_CACHE

}