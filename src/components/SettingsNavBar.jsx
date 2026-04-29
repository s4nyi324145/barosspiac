import { User, Lock, Settings, Bell, Section } from "lucide-react";
import { useState } from "react";
export default function SettingsNavBar({ activeSection, setActiveSection }) {
  const navBarSections = [
    { id: "személyes", label: "Személyes adatok", icon: User },
    { id: "biztonsag", label: "Biztonság", icon: Lock },
    { id: "ertesitesek", label: "Értesítések", icon: Bell },
    { id: "fiok", label: "Fiók", icon: Settings },
  ];

  return (
    <div className="bg-slate-900 border-r  border-slate-800 md:w-52 md:min-w-52 md:min-h-screen p-3">
      <h1 className="text-white text-lg text-center md:text-left font-bold px-3 py-4">
        Beállítások
      </h1>
      <div className="flex flex-1 justify-around flex-wrap flex-row md:flex-col gap-1">
        {navBarSections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeSection === s.id
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <s.icon className="w-4 h-4 shrink-0" />
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
