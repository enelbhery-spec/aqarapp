import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  const baseUrl = "https://aqarapp.vercel.app";

  const { data: properties } = await supabase
    .from("properties")
    .select("slug, updated_at");

  const urls = [
    `
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.0</priority>
    </url>
    `,
    `
    <url>
      <loc>${baseUrl}/properties</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.9</priority>
    </url>
    `,
    ...(properties || []).map((p) => {
      const safeSlug = encodeURIComponent(p.slug);

      return `
      <url>
        <loc>${baseUrl}/properties/${safeSlug}</loc>
        <lastmod>${new Date(p.updated_at || Date.now()).toISOString()}</lastmod>
        <priority>0.8</priority>
      </url>
      `;
    }),
  ].join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
