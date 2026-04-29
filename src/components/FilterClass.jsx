import { useEffect, useState } from "react";

export default function FilterClass({ filter, setFilter }) {
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    setFilter((filter) => ({ ...filter, subject: selectedSubject }));
  }, [selectedSubject]);

  return (
    <>
      <div className="flex flex-col p-3 gap-1">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-2 py-2">
          Tantárgy
        </h2>
        <div className="flex flex-wrap gap-2">
          {["Töri", "Magyar", "Matek", "Földrajz", "Informatika", "Angol"].map(
            (subject) => (
              <div
                key={subject}
                onClick={() =>
                  setSelectedSubject(
                    subject === selectedSubject ? null : subject,
                  )
                }
                className={`cursor-pointer rounded-full px-3 py-1 text-md font-medium border transition-all duration-200 ${
                  (subject === "Összes" && selectedSubject === "") ||
                  selectedSubject === subject
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                    : "text-slate-400 border-slate-700/60 hover:border-amber-500/30 hover:text-amber-400"
                }`}
              >
                {subject}
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}
