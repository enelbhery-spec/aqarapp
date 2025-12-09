export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { message, link } = req.body;

  if (!message)
    return res.status(400).json({ error: "Message is required" });

  const PAGE_ID = process.env.FACEBOOK_PAGE_ID;
  const PAGE_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const API_VER = process.env.FACEBOOK_API_VERSION;

  const url = `https://graph.facebook.com/${API_VER}/${PAGE_ID}/feed`;

  const form = new URLSearchParams();
  form.append("message", message);
  if (link) form.append("link", link);
  form.append("access_token", PAGE_TOKEN);

  try {
    const fbRes = await fetch(url, { method: "POST", body: form });
    const data = await fbRes.json();

    if (!fbRes.ok) return res.status(400).json(data);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
