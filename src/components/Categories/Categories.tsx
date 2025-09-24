import { Category } from "@frontline/types/category";
import Link from "next/link";

type Categories = {
  categories: Category[];
};

const Categories = (props: Categories) => {
  const { categories } = props;
  return (
    <div className="shadow border border-gray-200 rounded-lg p-4 bg-white">
      <h2 className="text-2xl font-semibold mb-2">Categories</h2>
      <ul className="space-y-1">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/products?categoryId=${category.id}`}
              className="text-blue-800 font-semibold capitalize hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
