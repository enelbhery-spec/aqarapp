"use client";
import Script from "next/script";

export default function AdsterraAd() {
  return (
    <>
      <Script
        id="adsterra-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            atOptions = {
              'key' : '71ccc427e033d5bedd03426b6b870193',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          `,
        }}
      />
      <Script
        src="//www.highperformanceformat.com/71ccc427e033d5bedd03426b6b870193/invoke.js"
        strategy="afterInteractive"
      />
    </>
  );
}
