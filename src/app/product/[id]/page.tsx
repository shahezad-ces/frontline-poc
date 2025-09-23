export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  
  return (
    <div className="p-6">
      {params.id}
    </div>
  );
}
