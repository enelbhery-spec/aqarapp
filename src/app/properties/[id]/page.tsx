import { readFile } from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;

  return {
    title: `تفاصيل عقار ${id}`,
    description: "تفاصيل كاملة عن العقار",
  };
}

export default async function PropertyDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const filePath = path.join(process.cwd(), "public", "data1.json");
  const file = await readFile(filePath, "utf8");
  const properties = JSON.parse(file);

  const property = properties.find(
    (p: any) => String(p.listingId) === id
  );

  if (!property) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{property.imageAlt}</h1>
      <p className="mt-4">{property.description}</p>
      <p className="mt-2 text-green-600 font-bold">
        {property.price?.toLocaleString()} جنيه
      </p>
    </div>
  );
}