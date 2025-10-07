import {
  Categories,
  PaginationWrapper,
  ProductCard,
  ProductsFilters,
} from "@frontline/components";
import { getCategoryDetails, getProducts } from "@frontline/services";
import type { Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { categoryId?: string };
}): Promise<Metadata> {
  const categoryId = searchParams?.categoryId;
  const selectedCategory =
    categoryId !== undefined
      ? await getCategoryDetails(parseInt(categoryId))
      : null;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const pageUrl = categoryId
    ? `${baseUrl}/products?categoryId=${categoryId}`
    : `${baseUrl}/products`;

  return {
    title: selectedCategory?.name || "All Products",
    description: selectedCategory
      ? `Browse products in the ${selectedCategory.name} category.`
      : "Explore our full range of products.",
    openGraph: {
      title: selectedCategory?.name || "All Products",
      description: selectedCategory
        ? `Browse products in the ${selectedCategory.name} category.`
        : "Explore our full range of products.",
      url: pageUrl,
      type: "website",
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

type ProductsPageProps = {
  searchParams: {
    categoryId?: string;
  };
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const categoryId = searchParams?.categoryId;

  const products = await getProducts({
    categoryId: categoryId ? parseInt(categoryId) : undefined,
  });

  // Only fetch category details if categoryId is defined
  const selectedCategory =
    categoryId !== undefined
      ? await getCategoryDetails(parseInt(categoryId))
      : null;

  return (
    <div className="container mx-auto px-4 my-6 sm:px-6 lg:px-8 gap-6">
      {selectedCategory?.name && (
        <h1 className="sm:text-2xl lg:text-3xl font-bold mb-4">
          {selectedCategory?.name}
        </h1>
      )}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters */}
        <div className="w-full lg:w-1/4 space-y-4">
          <Categories selectedCategory={selectedCategory} />
          <ProductsFilters />
        </div>

        {/* Products */}
        <div className="w-full lg:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>

      {/* Pagination aligned with product grid */}
      <div className="mt-6 w-full lg:w-3/4 lg:ml-auto">
        <PaginationWrapper />
      </div>
    </div>
  );
}
