// ─────────────────────────────────────────────────────────────
//  WHERE MUSKAN'S ANSWERS ARE SENT
// ─────────────────────────────────────────────────────────────
// A static site can't email you on its own, so we use Formspree (free).
//
// SETUP (takes ~2 minutes):
//   1. Go to https://formspree.io and sign up (free).
//   2. Click "New Form", give it a name, use YOUR email as the recipient.
//   3. Formspree gives you an endpoint like:  https://formspree.io/f/abcdwxyz
//   4. Paste that URL between the quotes below.
//
// The FIRST time she submits, Formspree emails YOU to confirm the form once.
// After that, every set of answers lands in your inbox automatically. 💌
//
// Leave it as an empty string ('') to disable auto-send (only the on-screen
// recap + Copy/WhatsApp/Email buttons will be used).

export const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzjlbon";
