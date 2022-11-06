import { loadStripe } from "@stripe/stripe-js";
// 1-> adfree idofPurcase
// 2-> become a writer
// 3-> become a elite writer
export async function checkout({ lineItems }, idOfPurchase) {
  let stripePromise = null;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY);
    }
    return stripePromise;
  };
  const stripe = await getStripe();

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/success?session_id=${idOfPurchase}`,
    cancelUrl: `${window.location.origin}`,
  });
}
