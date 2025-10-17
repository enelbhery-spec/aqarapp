import { HeadlineGenerator } from "@/components/headline-generator";

export function HeadlineGeneratorSection() {
  return (
    <section id="ai-tool" className="py-20 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            خصص إعلانك باستخدام الذكاء الاصطناعي
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
            استخدم أداتنا المدعومة بالذكاء الاصطناعي لإنشاء عناوين إعلانية جذابة ومصممة خصيصًا لجذب أفضل المشترين.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
            <HeadlineGenerator />
        </div>
      </div>
    </section>
  );
}
