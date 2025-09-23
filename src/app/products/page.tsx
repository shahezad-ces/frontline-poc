import ProductCard from "@frontline/components/product/ProductCard";
import { getProducts } from "@frontline/services/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();

  console.log(products);

  return (
    <div className="bg-gray-50 min-h-screen px-4 py-6">
      {/* <!-- Header --> */}
      <div className="max-w-7xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Explore Products</h1>
        <p className="text-gray-500 mt-1">
          Find your next favorite item from our curated collection
        </p>
      </div>

      {/* <!-- Filters & Search --> */}
      <div className="max-w-7xl mx-auto mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search by title"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Categories</option>
            <option value="1">Electronics</option>
            <option value="2">Fashion</option>
            {/* <!-- Add more categories dynamically --> */}
          </select>
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md"
            />
            <span className="text-gray-500">–</span>
            <input
              type="number"
              placeholder="Max Price"
              className="w-24 px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
          Apply Filters
        </button>
      </div>

      {/* <!-- Product Grid Container --> */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* <!-- Product cards will be injected here --> */}
        {/* <!-- Example placeholder card --> */}
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}
