import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo / Title */}
        <Link
          href="/"
          className="text-2xl font-extrabold text-green-700"
        >
           وسيط عقارى أكتوبر
        </Link>

        {/* Navigation */}
        <nav className="flex gap-6 text-sm font-semibold">
          <Link
            href="/properties"
            className="text-gray-700 hover:text-green-700 transition"
          >
            العقارات
          </Link>



        </nav>
      </div>
    </header>
  );
}
