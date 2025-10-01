import Categories from "@frontline/components/Categories/Categories";
import PaginationWrapper from "@frontline/components/PaginationWrapper/PaginationWrapper";
import ProductCard from "@frontline/components/Product/ProductCard";
import ProductsFilters from "@frontline/components/ProductsFilters/ProductsFilters";
import { getCategories } from "@frontline/services/categories";
import { getProducts } from "@frontline/services/products";
import { Category } from "@frontline/types/category";
import { Product } from "@frontline/types/product";
import Image from "next/image";

type ProductsPageProps = {
  searchParams: {
    categoryId?: string;
  };
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const products = await getProducts({
    categoryId: searchParams.categoryId
      ? parseInt(searchParams.categoryId)
      : undefined,
  });

  const categories = await getCategories();

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-800 text-white pl-6 shadow flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">FrontLine</span>
          </div>
        </div>
        <div className="p-6 py-6 bg-yellow-400">
          <Image
            src="/assets/images/cart.webp"
            width={35}
            height={35}
            alt="Cart"
            className=""
          />
        </div>
      </header>

      <div className="container mx-auto px-4 my-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters */}
          <div className="w-full lg:w-1/4 space-y-4">
            <Categories categories={categories} />
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
    </div>
  );
}
