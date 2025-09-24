import Categories from "@frontline/components/Categories/Categories";
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
  const products: Product[] = await getProducts({
    categoryId: searchParams.categoryId
      ? parseInt(searchParams.categoryId)
      : undefined,
  });

  const categories: Category[] = await getCategories();

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-blue-800 text-white pl-6 shadow flex items-center justify-between mb-6">
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
      <div className="container mx-auto flex flex-col lg:flex-row gap-6">
        {/* Filters & Search - 100% on mobile/tablet, 25% on desktop */}
        <div className="w-full lg:w-1/4 space-y-4">
          <Categories categories={categories} />
          <ProductsFilters />
        </div>

        {/* Product Grid - 100% on mobile/tablet, 75% on desktop */}
        <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
