import { useState, useEffect } from "react";
import api from "../config/api";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { ImageOff } from "lucide-react";

export default function SimilarProducts({ productDetail }) {
  if (!productDetail) return null;

  const { product_id } = useParams();

  const [similarProducts, setSimilarProducts] = useState([]);

  {
    /* Get similar products by sub_category_id and product_id to exclude the current product from the results */
  }
  const getSimilarProducts = async () => {
    try {
      const result = await api.get(
        `/product/similar/${productDetail.sub_category_id}/${product_id}`,
      );
      setSimilarProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSimilarProducts();
  }, [product_id]);
  useEffect(() => console.log(similarProducts));

  return (
    <>
      <div className="flex flex-col  flex-1">
        <h1 className="p-5 text-xl text-center md:text-left">
          Hasonló hírdetések
        </h1>

        {similarProducts.length === 0 ? (
          <div className="flex flex-col items-center p-6 gap-3 mb-10 mt-10">
            <ImageOff className="w-12 h-12 text-slate-700" />
            <p className="text-slate-500">Nincs hasonló hírdetés</p>
          </div>
        ) : (
          <div className="grid grid-cols-2  lg:grid-cols-4   p-4 gap-4">
            {similarProducts.map((p, index) => (
              <ProductCard key={index} p={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
