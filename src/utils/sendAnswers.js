/**
 * Sends reemal's answers to your Formspree endpoint so they arrive in your
 * inbox automatically. No-op if no endpoint is configured. Never throws —
 * a failed send should never break the celebration.
 */
export async function sendAnswers(endpoint, answers) {
  if (!endpoint || !answers?.length) return { ok: false, skipped: true };

  const message = answers
    .map((a, i) => `${i + 1}. ${a.question}\n   -> ${a.answer}`)
    .join("\n\n");

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "reemal's birthday answers 💖",
        from: "reemal (birthday site)",
        message,
      }),
    });
    return { ok: res.ok };
  } catch (err) {
    console.warn("Could not auto-send answers:", err);
    return { ok: false, error: String(err) };
  }
}
