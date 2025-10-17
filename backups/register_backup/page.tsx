import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import RegisterForm from "@/components/register-form"; // ✅ تم التعديل هنا

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
          <div className="max-w-md mx-auto">
            <RegisterForm /> {/* ✅ يستدعي المكون بشكل صحيح */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
