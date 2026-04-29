import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import api from "../config/api.js";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function FilterCategories({ filter, setFilter }) {
  const [categories, setCategories] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState("");
  const navigate = useNavigate();

  const location = useLocation();

  useEffect(() => {
    if (location.state?.category)
      setFilter((prev) => ({ ...prev, category: location.state.category }));
  }, []);

  {
    /*Get categories - main_category, sub_category , items */
  }
  const getCategories = async () => {
    try {
      const response = await api.get("/category/getCategory");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    setFilter((filter) => ({
      ...filter,
      category: openCategory || location.state?.category,
      subcategory: openSubcategory,
      item: selectedItem,
    }));
  }, [openCategory, openSubcategory, selectedItem]);

  return (
    <>
      <div className="flex flex-col p-3 gap-1">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
          Kategóriák
        </h2>
        {categories.map((category) => (
          <div key={category.name}>
            {/* Main category */}
            <button
              onClick={() => {
                setOpenCategory(
                  openCategory === category.name ? null : category.name,
                );
                setOpenSubcategory(null);
                setSelectedItem(null);
              }}
              className={`w-full ${filter.category === category.name ? "bg-blue-700" : " "} flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white ${filter.category === category.name ? "" : "hover:bg-slate-800"} transition-all duration-200 group`}
            >
              <span>{category.name}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-500 ${filter.category === category.name ? "text-white" : "group-hover:text-slate-300"}  transition-all duration-200 ${
                  openCategory === category.name ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Sub category */}
            {openCategory === category.name && (
              <div
                className={`ml-2 border-l  mt-2 ${filter.category === category.name ? "border-blue-700/80" : " border-slate-700/60"} pl-2 flex flex-col gap-0.5  mb-1`}
              >
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.name}>
                    <button
                      onClick={() => {
                        setOpenSubcategory(
                          openSubcategory === subcategory.name
                            ? null
                            : subcategory.name,
                        );
                        setSelectedItem(null);
                      }}
                      className={`w-full ${filter.subcategory === subcategory.name ? "bg-blue-500 text-white" : "text-slate-400 "} flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium  hover:text-white ${filter.category === category.name ? "" : "hover:bg-slate-800"} transition-all duration-200 group`}
                    >
                      <span>{subcategory.name}</span>
                      <ChevronDown
                        className={`w-3 h-3 text-slate-600 ${filter.subcategory === subcategory.name ? "text-white" : "group-hover:text-slate-300"} transition-all duration-200 ${
                          openSubcategory === subcategory.name
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>

                    {/* Items */}
                    {openSubcategory === subcategory.name && (
                      <div
                        className={`ml-2 border-l ${filter.subcategory === subcategory.name ? "border-blue-700" : "border-slate-700/40"}  pl-2 flex flex-col gap-0.5 mt-2 mb-1`}
                      >
                        {subcategory.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() =>
                              filter.item == item.name
                                ? setSelectedItem(null)
                                : setSelectedItem(item.name)
                            }
                            className={`w-full text-left px-3 py-1.5 rounded-lg ${filter.item == item.name ? "text-blue-900 font-semibold bg-white" : "text-slate-500 hover:text-blue-400 hover:bg-slate-800/40"} text-xs  transition-all duration-200`}
                          >
                            {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
