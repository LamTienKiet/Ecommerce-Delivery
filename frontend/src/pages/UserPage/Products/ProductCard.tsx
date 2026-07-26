import type { ProductResponse } from "../../../type_auth_api/products/product.api";

interface ProductCardProps {
  product: ProductResponse;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#2F3D34] bg-[#182720] transition duration-300 hover:-translate-y-1 hover:border-[#B7913C]">
      {/* Image */}
      <div className="h-64 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-110"
        />
      </div>

      {/* Body */}
      <div className="p-6">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#7C2233] px-3 py-1 text-xs uppercase tracking-widest text-white">
            Signature
          </span>

          <span
            className={`text-sm ${
              product.isAvailable ? "text-green-400" : "text-red-400"
            }`}
          >
            ● {product.isAvailable ? "Available" : "Sold Out"}
          </span>
        </div>

        {/* Name */}
        <h3 className="mt-5 font-serif text-2xl text-[#F1E9D8]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#A9B4A4]">
          {product.description}
        </p>

        {/* Preparation */}
        <div className="mt-5 text-sm text-[#A9B4A4]">
          ⏱ {product.preparationTime} mins
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-[#314036] pt-5">
          <span className="font-serif text-3xl text-[#B7913C]">
            {product.price.toLocaleString("vi-VN")}₫
          </span>

          <div className="flex gap-2">
            <button className="rounded-lg border border-[#B7913C] px-4 py-2 text-sm text-[#F1E9D8] hover:bg-[#B7913C] hover:text-[#121B16]">
              Edit
            </button>

            <button className="rounded-lg bg-[#7C2233] px-4 py-2 text-sm text-white hover:bg-[#651A29]">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
