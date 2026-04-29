import ProductTables from "../components/ProductTables";
export default function AdminProducts({
  adminProducts,
  totalProductsPages,
  setAdminProducts,
  productsPage,
  setProductsPage,
}) {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="border-slate-800 px-4 py-6">
        <h1 className="text-2xl font-bold text-white">Termékek</h1>
      </div>

      <ProductTables
        adminProducts={adminProducts}
        setAdminProducts={setAdminProducts}
      />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 py-4">
        <button
          onClick={() => setProductsPage((prev) => Math.max(prev - 1, 1))}
          disabled={productsPage === 1}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            productsPage === 1
              ? "text-slate-600 cursor-not-allowed"
              : "text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60"
          }`}
        >
          ← Előző
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalProductsPages }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setProductsPage(page)}
                className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
                  productsPage === page
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <button
          onClick={() =>
            setProductsPage((prev) => Math.min(prev + 1, totalProductsPages))
          }
          disabled={productsPage === totalProductsPages}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            productsPage === totalProductsPages
              ? "text-slate-600 cursor-not-allowed"
              : "text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60"
          }`}
        >
          Következő →
        </button>
      </div>
    </div>
  );
}
