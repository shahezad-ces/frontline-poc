import AddToCartButton from "@frontline/components/AddToCartButton/AddToCartButton";
import { getProductDetails } from "@frontline/services/products";
import QuantitySelector from "@frontline/stories/QuantitySelector/QuantitySelector";
import Image from "next/image";

type ProductDetailPageProps = {
  params: Promise<{
    id: number;
  }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;

  const productDetails = await getProductDetails(id);

  const imgSrc = productDetails?.images?.[0];

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const imageUrl =
    imgSrc && isValidUrl(imgSrc) ? imgSrc : "/assets/images/placeholder.jpg";

  if (!productDetails) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto my-6 px-6 py-8 grid grid-cols-1 bg-white border border-gray-200 rounded-lg">
          <div className="text-2xl text-center text-red-600">
            Failed to load product details. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="container mx-auto my-6 px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-gray-200 rounded-lg">
        {/* Left: Product Image + Thumbnails */}
        <div className="lg:col-span-4">
          <div className="border border-gray-400 rounded-lg overflow-hidden">
            <Image
              src={imageUrl}
              width={500}
              height={500}
              alt={productDetails?.title || "Product Image"}
              placeholder="blur"
              blurDataURL="/assets/images/placeholder.jpg"
              objectFit="cover"
              className="w-full object-cover rounded-md"
            />
          </div>
        </div>

        {/* Middle: Product Info */}
        <div className="lg:col-span-8 space-y-2">
          <h1 className="text-3xl font-bold">{productDetails?.title}</h1>
          <p className="text-gray-500 text-sm">
            {productDetails?.category?.name}
          </p>
          <p className="text-red-600 text-3xl font-bold">
            ${productDetails?.price}{" "}
          </p>
          <p className="text-green-600 font-semibold">Save $350 (26%)</p>

          {/* Quantity Selector */}
          <QuantitySelector min={1} max={10} />

          <p className="text-gray-500 text-sm mt-6">
            {productDetails?.description}
          </p>
          {productDetails && (
            <AddToCartButton
              product={productDetails}
              className="w-full lg:w-md bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 mt-6"
            />
          )}
        </div>
      </div>
    </>
  );
}
