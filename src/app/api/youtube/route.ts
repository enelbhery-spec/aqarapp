import Parser from "rss-parser";
import { NextResponse } from "next/server";

const parser = new Parser({
  customFields: {
    item: ["yt:videoId"]
  }
});

export async function GET() {
  try {
    const feed = await parser.parseURL(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCl-Wb-nkr8XCRMgOxfkzXvw"
    );

    const videos = feed.items.slice(0, 12).map((item: any) => {
      const videoId = item["yt:videoId"];

      return {
        title: item.title,
        pubDate: item.pubDate,
        videoId,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      };
    });

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch videos" },
      { status: 500 }
    );
  }
}
