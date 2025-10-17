import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section id="cta" className="py-20 md:py-32">
      <div className="container text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          هل أنت مستعد للإعلان عن عقارك؟
        </h2>
        <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground md:text-xl">
          انضم إلينا الآن وابدأ في عرض عقارك لملايين المشترين والمستأجرين المحتملين. عملية التسجيل سريعة وسهلة.
        </p>
        <div className="mt-8">
          <Button asChild size="lg" style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}>
            <Link href="/register">أنشئ حسابك الآن</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
