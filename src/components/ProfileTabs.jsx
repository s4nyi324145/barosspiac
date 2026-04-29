import { useEffect, useState } from "react";
import api from "../config/api";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import CommentCard from "./CommentCard";
import CommentModal from "./CommentModal";
import { Tag, Star } from "lucide-react";
export default function ProfileTabs({ getUserData, user, owner }) {
  const [activeTab, setActiveTab] = useState("aktiv");
  const [selectedCards, setSelectedCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCommentModal, setOpenCommentModal] = useState(false);


  {/* Get products or ratings based on active tab */}
  const getProductCards = async () => {
    setLoading(true);

    try {
      let result;

      if (activeTab === "aktiv") {
        result = await api.get(`/product/active_product/${user.user_id}`);
      } else if (activeTab === "eladott") {
        result = await api.get(`/product/sold_product/${user.user_id}`);
      } else if (activeTab === "ertekelesek") {
        result = await api.get(`/ratings/ratings/${user.user_id}`);
      }

      setSelectedCards(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductCards();
  }, [activeTab, user.user_id]);

  useEffect(() => {
    console.log(selectedCards);
  }, [selectedCards]);

  return (
    <>
      {openCommentModal && (
        <CommentModal
          getUserData={getUserData}
          getProductCards={getProductCards}
          setOpenCommentModal={setOpenCommentModal}
        />
      )}
      <div className="flex  flex-1 justify-around md:pl-6 md:justify-start md:gap-6 ">
        {[
          { id: "aktiv", label: "Aktív hirdetések" },
          { id: "eladott", label: "Eladott hirdetések" },
          { id: "ertekelesek", label: "Értékelések" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative py-2 text-sm font-medium transition-all duration-200
            ${
              activeTab === tab.id
                ? 'text-white after:transition-all after:duration-500 after:absolute after:left-0 after:-bottom-0 after:h-[2px] after:w-full after:bg-white after:content-[""]'
                : "text-slate-500 hover:text-white after:w-0"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div
        className={`${
          activeTab === "ertekelesek"
            ? "flex flex-col   gap-3 p-4"
            : "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-4"
        }`}
      >
        {activeTab === "ertekelesek" && !owner && (
          <button
            onClick={() => setOpenCommentModal(true)}
            className="flex w-fit items-center flex-1 ml-auto  gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            <Star className="w-4 h-4" />
            Értékelés írása
          </button>
        )}
        {loading
          ? Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
          : selectedCards?.map((p) =>
              activeTab === "ertekelesek" ? (
                <CommentCard
                  getUserData={getUserData}
                  getProductCards={getProductCards}
                  key={p.rating_id}
                  p={p}
                />
              ) : (
                <ProductCard key={p.product_id} p={p} />
              ),
            )}

        {selectedCards?.length === 0 && loading == false && (
          <div className="col-span-5 flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700/60 flex items-center justify-center">
              {activeTab === "ertekelesek" ? (
                <Star className="w-8 h-8 text-slate-600" />
              ) : (
                <Tag className="w-8 h-8 text-slate-600" />
              )}
            </div>
            <div className="flex flex-col gap-1 text-center">
              <p className="text-white font-semibold">
                {activeTab === "aktiv" && "Nincs aktív hirdetés"}
                {activeTab === "eladott" && "Nincs eladott termék"}
                {activeTab === "ertekelesek" && "Nincs értékelés"}
              </p>
              <p className="text-slate-500 text-sm">
                {activeTab === "aktiv" &&
                  "Ez a felhasználó még nem adott fel hirdetést."}
                {activeTab === "eladott" &&
                  "Ez a felhasználó még nem adott el semmit."}
                {activeTab === "ertekelesek" &&
                  "Ezt a felhasználót még nem értékelték."}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
