import { GET_PRODUCT_QUERY } from "@frontline/graphql/product";
import { query } from "@frontline/libs/ApolloClient";
import { getProductDetails } from "@frontline/services/products";
import { Product } from "@frontline/types/product";

type ProductDetailPageProps = {
  params: Promise<{
    id: number;
  }>;
};

type ProductDetails = {
  product: Product;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  const productDetails = await getProductDetails(id);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{productDetails?.title}</h1>
      <p className="text-lg text-gray-700 mb-2">${productDetails?.price}</p>
      <p className="text-gray-600 mb-4">{productDetails?.description}</p>
    </div>
  );
}
