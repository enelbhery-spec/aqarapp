"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Users,
  Building,
  Home,
  LandPlot,
  Store,
  FileText,
  BadgeDollarSign,
  AlertTriangle,
  Loader2,
  CreditCard,
  DollarSign,
  BarChart2,
} from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Stats {
  totalUsers: number;
  totalProperties: number;
  totalSubscriptions: number;
  activeSubscriptions: number;
  endedSubscriptions: number;
  totalRevenue: number;
  apartments: number;
  villas: number;
  lands: number;
  shops: number;
  forSale: number;
  forRent: number;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color,
  loading,
}: {
  title: string;
  value: number | string;
  icon: React.ElementType;
  color?: string;
  loading: boolean;
}) => (
  <Card
    className={`hover:shadow-lg transition-all border-l-4 ${
      color || "border-blue-500"
    }`}
  >
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className={`h-5 w-5 ${color?.replace("border", "text")}`} />
    </CardHeader>
    <CardContent>
      {loading ? (
        <Skeleton className="h-8 w-20" />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session) {
        router.push("/login");
        return;
      }

      // 🔹 التحقق من الدور
      const userId = session.user.id;
      const { data: userProfile } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

      if (userProfile?.role !== "super_admin") {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      setIsAdmin(true);

      // 🔹 جلب البيانات
      const [usersRes, propertiesRes, subscriptionsRes] = await Promise.all([
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("properties").select("*"),
        supabase.from("subscriptions").select("*"),
      ]);

      const totalUsers = usersRes.count || 0;
      const properties = propertiesRes.data || [];
      const subs = subscriptionsRes.data || [];

      // 🧮 تحليل العقارات حسب النوع والحالة
      const normalize = (val: string) =>
        val?.toLowerCase()?.trim()?.replace(/\s+/g, "") || "";

      const apartments = properties.filter((p) =>
        ["apartment", "شقة"].includes(normalize(p.propertyType))
      ).length;

      const villas = properties.filter((p) =>
        ["villa", "فيلا"].includes(normalize(p.propertyType))
      ).length;

      const lands = properties.filter((p) =>
        ["land", "ارض", "أرض"].includes(normalize(p.propertyType))
      ).length;

      const shops = properties.filter((p) =>
        ["shop", "محل"].includes(normalize(p.propertyType))
      ).length;

      const forSale = properties.filter((p) =>
        ["sale", "للبيع"].includes(normalize(p.status))
      ).length;

      const forRent = properties.filter((p) =>
        ["rent", "للإيجار", "للايجار"].includes(normalize(p.status))
      ).length;

      // 💰 الاشتراكات
      const totalSubscriptions = subs.length;
      const activeSubscriptions = subs.filter((s) => s.status === "نشط").length;
      const endedSubscriptions = subs.filter(
        (s) => s.status === "منتهي"
      ).length;
      const totalRevenue = subs.reduce(
        (sum, s) => sum + Number(s.price || 0),
        0
      );

      setStats({
        totalUsers,
        totalProperties: properties.length,
        totalSubscriptions,
        activeSubscriptions,
        endedSubscriptions,
        totalRevenue,
        apartments,
        villas,
        lands,
        shops,
        forSale,
        forRent,
      });

      setLoading(false);
    };

    fetchData();
  }, [router]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-10 h-10 text-primary" />
      </div>
    );

  if (!isAdmin)
    return (
      <div className="flex items-center justify-center h-screen">
        <Alert variant="destructive" className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>وصول مرفوض</AlertTitle>
          <AlertDescription>
            ليس لديك الصلاحيات لعرض لوحة التحكم.
          </AlertDescription>
        </Alert>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="container py-10 space-y-10">
        <h1 className="text-3xl font-bold mb-6">📊 لوحة التحكم</h1>

        {/* القسم الأول: ملخص عام */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="إجمالي العقارات"
            value={stats?.totalProperties ?? 0}
            icon={Building}
            color="border-blue-500"
            loading={loading}
          />
          <StatCard
            title="عدد المستخدمين"
            value={stats?.totalUsers ?? 0}
            icon={Users}
            color="border-purple-500"
            loading={loading}
          />
          <StatCard
            title="عدد الاشتراكات"
            value={stats?.totalSubscriptions ?? 0}
            icon={CreditCard}
            color="border-green-500"
            loading={loading}
          />
          <StatCard
            title="الإيرادات الكلية"
            value={`${stats?.totalRevenue ?? 0} ج.م`}
            icon={DollarSign}
            color="border-yellow-500"
            loading={loading}
          />
        </div>

        {/* القسم الثاني: تفاصيل العقارات */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">🏠 تفاصيل العقارات</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard
              title="الشقق"
              value={stats?.apartments ?? 0}
              icon={Home}
              color="border-blue-400"
              loading={loading}
            />
            <StatCard
              title="الفيلات"
              value={stats?.villas ?? 0}
              icon={Building}
              color="border-pink-400"
              loading={loading}
            />
            <StatCard
              title="الأراضي"
              value={stats?.lands ?? 0}
              icon={LandPlot}
              color="border-green-400"
              loading={loading}
            />
            <StatCard
              title="المحلات"
              value={stats?.shops ?? 0}
              icon={Store}
              color="border-orange-400"
              loading={loading}
            />
            <StatCard
              title="العقارات للبيع"
              value={stats?.forSale ?? 0}
              icon={BadgeDollarSign}
              color="border-yellow-500"
              loading={loading}
            />
            <StatCard
              title="العقارات للإيجار"
              value={stats?.forRent ?? 0}
              icon={FileText}
              color="border-purple-500"
              loading={loading}
            />
          </div>
        </div>

        {/* القسم الثالث: الاشتراكات */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">📦 تفاصيل الاشتراكات</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="نشطة"
              value={stats?.activeSubscriptions ?? 0}
              icon={BarChart2}
              color="border-green-500"
              loading={loading}
            />
            <StatCard
              title="منتهية"
              value={stats?.endedSubscriptions ?? 0}
              icon={AlertTriangle}
              color="border-red-500"
              loading={loading}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
