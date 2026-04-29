import {
  Shirt,
  BookOpen,
  Laptop,
  Gamepad2,
  Package,
  User,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    { name: "Női", icon: User },
    { name: "Férfi", icon: Users },
    { name: "Iskolai felszerelés", icon: BookOpen },
    { name: "Elektronika", icon: Laptop },
    { name: "Szórakozás", icon: Gamepad2 },
    { name: "Egyéb", icon: Package },
  ];

  return (
    <div className="bg-slate-900 border-b border-slate-800 relative">
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />

      <div className="flex items-center overflow-x-auto scrollbar-hide py-1 px-2">
        <div className="flex items-center gap-2 mx-auto">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() =>
                navigate("/browser", { state: { category: cat.name } })
              }
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 whitespace-nowrap group shrink-0"
            >
              <cat.icon className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors duration-200" />
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
