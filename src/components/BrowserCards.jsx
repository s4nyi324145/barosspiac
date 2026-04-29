import { useEffect, useState } from "react";
import api from "../config/api";
import ProductCard from "./ProductCard";
import { SearchX } from "lucide-react";
import ProductCardSkeleton from "./ProductCardSkeleton";
export default function BrowserCards({ filter, setFilter }) {
  const [product, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState(product);
  const [loading, setLoading] = useState(true);

  {
    /*Get all products */
  }
  const getProducts = async () => {
    try {
      const result = await api.get("/product/getProduct");
      console.log(result);
      setProducts(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  {
    /* Filter products based on the filter state */
  }

  useEffect(() => {
    let result = [...product];

    if (filter.category)
      result = result.filter((p) => p.category_name == filter.category);
    if (filter.search) {
      result = result.filter(
        (p) =>
          p.product_title.toLowerCase().includes(filter.search.toLowerCase()) ||
          p.product_desc?.toLowerCase().includes(filter.search.toLowerCase()),
      );
    }
    if (filter.subcategory)
      result = result.filter((p) => p.sub_category_name == filter.subcategory);
    if (filter.item)
      result = result.filter((p) => p.sub_sub_name == filter.item);
    if (filter.condition?.length)
      result = result.filter((p) =>
        filter.condition.includes(p.product_condition),
      );
    if (filter.size?.length)
      result = result.filter((p) => filter.size.includes(p.product_size));
    if (filter.subject)
      result = result.filter((p) => p.product_subject == filter.subject);
    if (filter.priceMin)
      result = result.filter((p) => p.product_price >= Number(filter.priceMin));
    if (filter.priceMax)
      result = result.filter((p) => p.product_price <= Number(filter.priceMax));
    if (filter.sort) {
      switch (filter.sort) {
        case "ar_csokkeno":
          result = result.sort((a, b) => b.product_price - a.product_price);
          break;
        case "ar_novekvo":
          result = result.sort((a, b) => a.product_price - b.product_price);
          break;
        case "legujabb":
          result = result.sort((a, b) => b.product_id - a.product_id);
          break;
        case "legregebbi":
          result = result.sort((a, b) => a.product_id - b.product_id);
          break;
      }
    }

    setFilteredProduct(result);
  }, [product, filter]);
  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <>
      <div className="flex flex-col">
        {filteredProduct.length > 0 && (
          <div className=" flex p-2 mb-4 bg-red-500/20 text-red-400 border ml-auto mt-2 border-red-500/30 rounded-full ">
            <p>{filteredProduct.length} találat</p>
          </div>
        )}
        <div
          className={` ${filteredProduct.length == 0 && loading === false ? "flex flex-1" : "grid"}  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto scrollbar-hide  min-h-screen max-h-screen auto-rows-min  xl:grid-cols-5 gap-3 p-4 `}
        >
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))
            : filteredProduct.map((p) => (
                <ProductCard key={p.product_id} p={p} />
              ))}

          {filteredProduct.length == 0 && loading === false && (
            <div className="flex flex-1  flex-col items-center justify-center h-96 gap-4 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                <SearchX className="w-8 h-8 text-slate-600" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white font-semibold text-lg">
                  Nincs találat
                </p>
                <p className="text-slate-500 text-sm max-w-xs">
                  Próbálj más szűrőkkel keresni, vagy töröld a jelenlegi
                  szűrőket.
                </p>
              </div>
              <button
                onClick={() =>
                  setFilter({
                    category: null,
                    subcategory: null,
                    item: null,
                    condition: [],
                    size: [],
                    subject: null,
                    priceMin: null,
                    priceMax: null,
                  })
                }
                className="text-sm text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-400/50 bg-blue-500/10 px-4 py-2 rounded-xl transition-all duration-200"
              >
                Szűrők törlése
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
