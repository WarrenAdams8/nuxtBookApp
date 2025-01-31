export default async function (userId: number, userEmail: string) {
  const stripe = useStripe()
  let stripeCustomerId = await hubKV().get(`stripe:user:${userId}`)

  if (!stripeCustomerId) {
    const newCustomer = await stripe.customers.create({
      email: userEmail,
      metadata: {
        userId: userId, // DO NOT FORGET THIS
      },
    });
    // Store the relation between userId and stripeCustomerId in your KV
    await hubKV().set(`stripe:user:${userId}`, newCustomer.id);
    stripeCustomerId = newCustomer.id
  }

  return stripeCustomerId

}