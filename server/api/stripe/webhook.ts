import Stripe from "stripe";
export default defineEventHandler(async (event) => {
    const webhookSecret = useRuntimeConfig().stripe.webhookSecretKey

    const allowedEvents: Stripe.Event.Type[] = [
        "checkout.session.completed",
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted",
        "customer.subscription.paused",
        "customer.subscription.resumed",
        "customer.subscription.pending_update_applied",
        "customer.subscription.pending_update_expired",
        "customer.subscription.trial_will_end",
        "invoice.paid",
        "invoice.payment_failed",
        "invoice.payment_action_required",
        "invoice.upcoming",
        "invoice.marked_uncollectible",
        "invoice.payment_succeeded",
        "payment_intent.succeeded",
        "payment_intent.payment_failed",
        "payment_intent.canceled",
    ] as Stripe.Event.Type[]

    const stripe = useStripe()
    const headers = event.node.req.headers;

    const body = await readRawBody(event);
    const sig = headers["stripe-signature"];
    let hookEvent: Stripe.Event;

    try {
        hookEvent = stripe.webhooks.constructEvent(
            body as string,
            sig as string,
            webhookSecret as string
        );
    } catch (err) {
        throw createError({ statusCode: 400, message: (err as Error).message });
    }

    async function processEvent(event: Stripe.Event) {
        // Skip processing if the event isn't one I'm tracking (list of all events below)
        if (!allowedEvents.includes(event.type)) return;

        // All the events I track have a customerId
        const { customer: customerId } = event?.data?.object as {
            customer: string; // Sadly TypeScript does not know this
        };

        // This helps make it typesafe and also lets me know if my assumption is wrong
        if (typeof customerId !== "string") {
            throw new Error(
                `[STRIPE HOOK][BAD] ID isn't string.\nEvent type: ${event.type}`
            );
        }

        return await useSyncStripeDataToKv(customerId);
    }


    event.waitUntil(processEvent(hookEvent));

});