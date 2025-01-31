import Stripe from 'stripe'

const stripeKey = useRuntimeConfig().stripe.secretKey

export function useStripe() {
    return new Stripe(stripeKey, { apiVersion: "2025-01-27.acacia" })
}
