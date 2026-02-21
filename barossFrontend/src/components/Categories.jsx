
import { Shirt, BookOpen, Laptop, Gamepad2, Package, User, Users } from "lucide-react";

export default function Categories() {

const categories = [
  { name: "Női",                 icon: User },
  { name: "Férfi",               icon: Users },
  { name: "Iskolai felszerelés", icon: BookOpen },
  { name: "Elektronika",         icon: Laptop },
  { name: "Szórakozás",          icon: Gamepad2 },
  { name: "Egyéb",               icon: Package },
];

    return (
  <div className="bg-slate-900 border-b flex  justify-center  border-slate-800">
    <div className="container  px-6">
      <div className="flex flex-1 items-center justify-center  gap-12 overflow-x-auto scrollbar-none py-1">
        {categories.map((cat, i) => (
          <button
            key={i}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 whitespace-nowrap group"
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