import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Product mapping
const PRODUCTS = {
  black: {
    stripeProductId: 'prod_SOurEuEBoRUUNV',
    name: '5-panel Black Hat',
    imageUrl: '/BlackBlankHatProductPicture/WhatsApp Image 2025-05-06 at 03.25.54 (2).jpeg',
  },
  grey: {
    stripeProductId: 'prod_SOusMAWgfTR2yh',
    name: '5-panel Grey Hat',
    imageUrl: '/GreyBlankHatProductPicture/WhatsApp Image 2025-05-06 at 03.25.52.jpeg',
  },
};

// Pricing logic (same as frontend)
function getUnitPrice(qty) {
  if (qty >= 5000) return 5.49;
  if (qty >= 1000) return 5.99;
  if (qty >= 400) return 6.49;
  if (qty >= 200) return 6.99;
  if (qty >= 100) return 7.49;
  if (qty >= 24) return 7.99;
  if (qty >= 1) return 14.99;
  return 14.99;
}

export default async (req, res) => {
  console.log('[Stripe Checkout] Function entered');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    console.log('[Stripe Checkout] OPTIONS preflight');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    console.error('[Stripe Checkout] Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!stripeSecretKey) {
    console.error('[Stripe Checkout] Stripe secret key not set');
    return res.status(500).json({ error: 'Stripe secret key not set in environment variables.' });
  }

  const stripe = Stripe(stripeSecretKey);

  try {
    console.log('[Stripe Checkout] Request body:', req.body);
    let items = req.body.items;
    let userId = req.body.userId;
    // Support old single-item format for backward compatibility
    if (!items && req.body.productId && req.body.quantity) {
      items = [{ productId: req.body.productId, quantity: req.body.quantity, userId: req.body.userId }];
    }
    console.log('[Stripe Checkout] Items:', items);
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.error('[Stripe Checkout] No items provided');
      return res.status(400).json({ error: 'No items provided' });
    }
    // Validate and build line_items
    const line_items = [];
    for (const item of items) {
      if (!item.productId || !PRODUCTS[item.productId]) {
        console.error('[Stripe Checkout] Invalid productId:', item.productId);
        return res.status(400).json({ error: `Invalid productId: ${item.productId}` });
      }
      if (!item.quantity || item.quantity < 1) {
        console.error('[Stripe Checkout] Invalid quantity for', item.productId, item.quantity);
        return res.status(400).json({ error: `Quantity must be at least 1 for each item.` });
      }
      const product = PRODUCTS[item.productId];
      // Use unitPrice from frontend if provided, otherwise calculate
      let unitPrice = typeof item.unitPrice === 'number' ? item.unitPrice : getUnitPrice(item.quantity);
      // Validate unitPrice matches backend calculation
      const expectedUnitPrice = getUnitPrice(item.quantity);
      if (Math.abs(unitPrice - expectedUnitPrice) > 0.01) {
        console.error('[Stripe Checkout] Unit price mismatch for', item.productId, 'Frontend:', unitPrice, 'Backend:', expectedUnitPrice);
        return res.status(400).json({ error: `Unit price mismatch for ${item.productId}.` });
      }
      line_items.push({
        price_data: {
          currency: 'usd',
          product: product.stripeProductId,
          unit_amount: Math.round(unitPrice * 100), // in cents
        },
        quantity: item.quantity,
      });
      if (!userId && item.userId) userId = item.userId;
    }
    console.log('[Stripe Checkout] Line items:', line_items);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${req.headers.origin || 'https://your-vercel-domain.vercel.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin || 'https://your-vercel-domain.vercel.app'}/blanks`,
      metadata: {
        userId: userId || '',
        items: JSON.stringify(items),
      },
    });
    console.log('[Stripe Checkout] Session created:', session.id);
    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('[Stripe Checkout] Error:', error && error.stack ? error.stack : error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}; 