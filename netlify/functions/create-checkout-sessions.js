const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Payment system not configured." 
        })
      };
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1RfNsXGaJDz4Wy8ThnuuEwqf',
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: `${event.headers.origin || 'https://pinnacle-reading-advantage.netlify.app'}/student-dashboard.html?success=true&trial=true`,
      cancel_url: `${event.headers.origin || 'https://pinnacle-reading-advantage.netlify.app'}/?canceled=true`,
      subscription_data: {
        trial_period_days: 7,
      },
      billing_address_collection: 'required',
      allow_promotion_codes: true,
    });

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ sessionId: session.id })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Unable to create checkout session: " + error.message 
      })
    };
  }
};
