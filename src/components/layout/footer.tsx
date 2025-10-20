
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Image src="/LOGO 100.png" alt="aqarapp logo" width={24} height={24} />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} aqarapp. جميع الحقوق محفوظة.
          </p>
        </div>
        <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground"></a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground"></a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground"></a>
        </div>
      </div>
    </footer>
  );
}
