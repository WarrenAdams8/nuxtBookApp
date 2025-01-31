export default eventHandler(async (event) => {
    const { user } = await requireUserSession(event)

    if (!user) {
        return { url: '/signIn' }
    }

    const customerId = await useSetCustomerId(user.id, user.email)

    const { lookup_key } = await readBody(event)

    const stripe = useStripe()

    const prices = await stripe.prices.list({
        lookup_keys: [lookup_key],
        expand: ['data.product'],
    })

    const session = await stripe.checkout.sessions.create({
        customer: customerId as string,         // 6.1
        billing_address_collection: 'auto',           // 6.2
        line_items: [                                 // 6.3
            {
                price: prices.data[0].id,
                quantity: 1,
            },
        ],
        mode: 'subscription',                         // 6.4
        success_url: `http://localhost:3000/success`, // 6.5
        cancel_url: `http://localhost:3000/cancelled`,
    })

    if (session.url) {
        return { url: session.url }
    }
})
