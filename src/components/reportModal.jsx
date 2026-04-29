import { useState } from "react";
import { X } from "lucide-react";
import api from "../config/api";
import { useToast } from "../context/toastContext";
export default function ReportModal({
  type,
  reported_id,
  product_id,
  setOpenReportModal,
}) {
  const productReportReasons = [
    { id: 1, label: "Hamis vagy félrevezető hirdetés" },
    { id: 2, label: "Nem iskolai emailes felhasználó" },
    { id: 3, label: "Nem létező termék" },
    { id: 4, label: "Sértő vagy nem megfelelő tartalom" },
    { id: 5, label: "Spam vagy ismétlődő hirdetés" },
    { id: 6, label: "Túlárazott / irreális ár" },
    { id: 7, label: "Egyéb" },
  ];

  const userReportReasons = [
    { id: 1, label: "Hamis vagy félrevezető profil" },
    { id: 2, label: "Sértő vagy nem megfelelő viselkedés" },
    { id: 3, label: "Spam vagy zaklatás" },
    { id: 4, label: "Nem iskolai emailes felhasználó" },
    { id: 5, label: "Átverés vagy csalás" },
    { id: 6, label: "Egyéb" },
  ];

  const reasons = type === "user" ? userReportReasons : productReportReasons;

  const [selectedReason, setSelectedReason] = useState(null);
  const [reasonDesc, setReasonDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const { showSuccess } = useToast();

  const sendReport = async () => {
    setLoading(true);
    try {
      const result = await api.post("/reports/report", {
        text: reasonDesc,
        product_id: product_id,
        reported_id: reported_id,
        reason: reasons[selectedReason - 1].label,
      });
      setTimeout(() => {
        setLoading(false);
        setOpenReportModal(false);
        showSuccess("Sikeres jelentés küldés, köszönjük a visszajelzésed");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="text-white flex flex-col bg-slate-900 border border-slate-700/60 rounded-2xl p-6 w-full max-w-md shadow-2xl gap-5">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold text-white">
                {type == "user"
                  ? "Felhasználó jelentése"
                  : "Hirdetés jelentése"}
              </h1>
              <p className="text-slate-500 text-xs">
                {type == "user"
                  ? "Miért akarod jelenteni ezt a felhasználót?"
                  : "Miért akarod jelenteni ezt a hirdetést?"}
              </p>
            </div>
            <button
              onClick={() => setOpenReportModal(false)}
              className="text-slate-500 hover:text-white transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Reasons */}
          <div className="flex flex-col gap-2">
            {reasons.map((report) => (
              <label
                key={report.id}
                htmlFor={report.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                  selectedReason === report.id
                    ? "bg-red-500/10 border-red-500/40 text-white"
                    : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-white"
                }`}
              >
                <input
                  id={report.id}
                  type="radio"
                  name="report"
                  className="hidden"
                  onChange={() => setSelectedReason(report.id)}
                />
                <div
                  className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-all duration-200 ${
                    selectedReason === report.id
                      ? "border-red-400"
                      : "border-slate-600"
                  }`}
                >
                  {selectedReason === report.id && (
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                  )}
                </div>
                <span className="text-sm">{report.label}</span>
              </label>
            ))}
          </div>

          {/* Description */}
          <textarea
            value={reasonDesc}
            onChange={(e) => setReasonDesc(e.target.value)}
            placeholder={
              selectedReason === 7
                ? "Írd le részletesen a problémát... (kötelező)"
                : "Opcionális: írd le részletesen a problémát..."
            }
            className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-3 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition-all duration-200 resize-none h-24"
          />

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setOpenReportModal(false)}
              className="flex-1 py-2.5 rounded-xl border border-slate-700/60 text-slate-400 hover:text-white hover:bg-slate-800 text-sm font-medium transition-all duration-200"
            >
              Mégse
            </button>
            <button
              disabled={
                !selectedReason ||
                (selectedReason === 7 && reasonDesc == "") ||
                loading
              }
              onClick={() => sendReport()}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold disabled:cursor-not-allowed transition-all duration-200 ${
                selectedReason
                  ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20"
                  : "bg-slate-800 text-slate-600 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2 justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  <p className="text-sm">Jelentés küldése</p>
                </span>
              ) : (
                "Jelentés küldése"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
