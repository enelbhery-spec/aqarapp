export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      price,
      area,
      bedrooms,
      bathrooms,
      phone,
      description,
      image,
      url,
    } = body;

    const pageId = process.env.FB_PAGE_ID;
    const accessToken = process.env.FB_PAGE_ACCESS_TOKEN;

    // ==============================
    // 1️⃣ تجهيز الرسالة
    // ==============================
    const message = `
🏡 ${title}
💰 السعر: ${price}
📐 المساحة: ${area} م²
🛏 غرف النوم: ${bedrooms}
🛁 الحمامات: ${bathrooms}
📞 الهاتف: ${phone}

📌 التفاصيل كاملة:
${url}

${description}
    `;

    // ==============================
    // 2️⃣ لو في صورة → رفعها على فيسبوك
    // ==============================
    let attachedMedia = [];

    if (image) {
      const photoUrl = `https://graph.facebook.com/${pageId}/photos?url=${encodeURIComponent(
        image
      )}&published=false&access_token=${accessToken}`;

      const uploadPhoto = await fetch(photoUrl, { method: "POST" });
      const photoResult = await uploadPhoto.json();

      if (photoResult.id) {
        attachedMedia.push({ media_fbid: photoResult.id });
      }
    }

    // ==============================
    // 3️⃣ نشر البوست النهائي
    // ==============================
    const postUrl = `https://graph.facebook.com/${pageId}/feed`;

    const postResponse = await fetch(
      `${postUrl}?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          attached_media: attachedMedia,
        }),
      }
    );

    const result = await postResponse.json();
    return Response.json(result);
  } catch (err: any) {
    console.error("FACEBOOK ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
