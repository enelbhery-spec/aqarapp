import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminPngquant from "imagemin-pngquant";
import imageminWebp from "imagemin-webp";

(async () => {
  try {
    console.log("🔧 جاري ضغط الصور في مجلد public ...");

    await imagemin(["public/**/*.{jpg,jpeg,png,webp}"], {
      destination: "public",
      plugins: [
        imageminMozjpeg({ quality: 75 }),
        imageminPngquant({ quality: [0.6, 0.8] }),
        imageminWebp({ quality: 75 }),
      ],
    });

    console.log("✅ تم ضغط الصور بنجاح!");
  } catch (error) {
    console.error("❌ حدث خطأ أثناء ضغط الصور:", error);
  }
})();
