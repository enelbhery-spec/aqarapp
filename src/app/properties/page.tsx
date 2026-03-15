import { readFile } from "fs/promises";
import path from "path";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const filePath = path.join(process.cwd(), "public", "data1.json");
  const file = await readFile(filePath, "utf8");
  const allProperties = JSON.parse(file);

  const currentPage = Number(searchParams.page) || 1;
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = allProperties.slice(start, start + ITEMS_PER_PAGE);

  const totalPages = Math.ceil(allProperties.length / ITEMS_PER_PAGE);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {paginated.map((property: any) => (
          <div key={property.listingId} className="border rounded-xl p-4">
            <h3 className="font-bold">{property.imageAlt}</h3>
            <p>{property.location}</p>
            <p className="text-green-600 font-bold">
              {property.price?.toLocaleString()} جنيه
            </p>

            <Link
              href={`/properties/${property.listingId}`}
              className="text-blue-600"
            >
              تفاصيل
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/properties?page=${i + 1}`}
            className="px-4 py-2 border rounded"
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
