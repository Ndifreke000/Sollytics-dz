import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia'
})

export const SUBSCRIPTION_PLANS = {
  free: {
    name: 'Free',
    price: 0,
    queries: 100,
    dashboards: 3,
    features: ['Basic dashboards', 'Community support']
  },
  pro: {
    name: 'Pro',
    price: 49,
    priceId: 'price_pro_monthly',
    queries: -1, // unlimited
    dashboards: -1,
    features: ['Unlimited queries', 'Advanced AI', 'API access', 'Priority support']
  },
  enterprise: {
    name: 'Enterprise',
    price: 499,
    priceId: 'price_enterprise_monthly',
    queries: -1,
    dashboards: -1,
    features: ['White-label', 'SSO', 'Dedicated support', 'SLA', 'Custom integrations']
  }
}

export async function createCheckoutSession(priceId: string, userId: string) {
  return await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
    client_reference_id: userId,
    metadata: { userId }
  })
}

export async function createPortalSession(customerId: string) {
  return await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_URL}/billing`
  })
}