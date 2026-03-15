import { readFile } from "fs/promises";
import path from "path";

export default async function AreaPage({
  params,
}: {
  params: { area: string };
}) {
  const filePath = path.join(process.cwd(), "public", "data1.json");
  const file = await readFile(filePath, "utf8");
  const properties = JSON.parse(file);

  const filtered = properties.filter(
    (p: any) => p.area?.toLowerCase() === params.area.toLowerCase()
  );

  if (filtered.length === 0) {
    return <div>لا توجد عقارات في هذه المنطقة</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {filtered.map((property: any) => (
        <div key={property.listingId} className="border rounded-xl p-4">
          <h3 className="font-bold">{property.imageAlt}</h3>
          <p>{property.location}</p>
        </div>
      ))}
    </div>
  );
}
