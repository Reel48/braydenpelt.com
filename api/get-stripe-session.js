import Stripe from 'stripe';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!stripeSecretKey) {
    return res.status(500).json({ error: 'Stripe secret key not set in environment variables.' });
  }
  const { session_id } = req.query;
  if (!session_id) {
    return res.status(400).json({ error: 'Missing session_id' });
  }
  const stripe = Stripe(stripeSecretKey);
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, { expand: ['line_items.data.price.product'] });
    const lineItems = await stripe.checkout.sessions.listLineItems(session_id, { expand: ['data.price.product'] });
    res.status(200).json({
      metadata: session.metadata,
      lineItems: lineItems.data,
      customer_email: session.customer_details?.email || session.customer_email || null,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to fetch session' });
  }
}; 