const ProductsFilters = () => {
  return (
    <div className="shadow border border-gray-200 rounded-lg p-4 bg-white">
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>
      <input
        type="text"
        placeholder="Search by title"
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
      />
      <div className="flex gap-2">
        <div className="relative w-1/2">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
            $
          </span>
          <input
            type="number"
            placeholder="Min Price"
            className="pl-6 pr-3 py-2 w-full border border-gray-300 rounded-md"
            min={1}
          />
        </div>

        {/* Max Price */}
        <div className="relative w-1/2">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black">
            $
          </span>
          <input
            type="number"
            placeholder="Max Price"
            className="pl-6 pr-3 py-2 w-full border border-gray-300 rounded-md"
            min={1}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsFilters;
