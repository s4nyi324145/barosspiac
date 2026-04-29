import { useState, useEffect } from "react";
import { Eye, Trash2, Check, X, Flag, User, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useToast } from "../context/toastContext";

const statusConfig = {
  pending: {
    label: "Függőben",
    bg: "bg-yellow-500/20",
    text: "text-yellow-400",
    border: "border-yellow-500/30",
  },
  resolved: {
    label: "Lezárva",
    bg: "bg-green-500/20",
    text: "text-green-400",
    border: "border-green-500/30",
  },
  rejected: {
    label: "Elutasítva",
    bg: "bg-slate-500/20",
    text: "text-slate-400",
    border: "border-slate-500/30",
  },
};

export default function AdminReports() {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedReport, setExpandedReport] = useState(null);


  {/* Get all reports with pagination */}
  const getReports = async (p = 1) => {
    try {
      const result = await api.get(`/reports/all?page=${p}`);
      setReports(result.data.reports);
      setTotalPages(result.data.totalPages);
      setPage(p);
    } catch (error) {
      console.log(error);
    }
  };

  {/* Handle status change */}
  const handleStatus = async (report_id, status) => {
    try {
      await api.put(`/reports/status/${report_id}`, { status });
      setReports((prev) =>
        prev.map((r) => (r.report_id === report_id ? { ...r, status } : r)),
      );
      showSuccess("Státusz frissítve");
    } catch (error) {
      showError("Hiba történt");
    }
  };

  {/* Handle delete */}
  const handleDelete = async (report_id) => {
    if (!window.confirm("Biztosan törlöd ezt a jelentést?")) return;
    try {
      await api.delete(`/reports/delete/${report_id}`);
      setReports((prev) => prev.filter((r) => r.report_id !== report_id));
      showSuccess("Jelentés törölve");
    } catch (error) {
      showError("Hiba történt");
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <div className="p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Jelentések</h1>
          <p className="text-slate-500 text-sm mt-1">
            Beérkezett felhasználói jelentések kezelése
          </p>
        </div>
        <div className="flex gap-2">
          {["pending", "resolved", "rejected"].map((s) => {
            const config = statusConfig[s];
            const count = reports.filter((r) => r.status === s).length;
            return (
              <div
                key={s}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${config.bg} ${config.border}`}
              >
                <span className={`text-xs font-medium ${config.text}`}>
                  {config.label}
                </span>
                <span className={`text-xs font-bold ${config.text}`}>
                  {count}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-slate-800">
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Típus
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Jelentő
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Jelentett
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Ok
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Státusz
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Dátum
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Műveletek
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {reports.map((report) => (
                <>
                  <tr
                    key={report.report_id}
                    className="hover:bg-slate-800/40 transition-colors duration-150 cursor-pointer"
                    onClick={() =>
                      setExpandedReport(
                        expandedReport === report.report_id
                          ? null
                          : report.report_id,
                      )
                    }
                  >
                    <td className="px-4 py-3 text-slate-500 text-sm">
                      #{report.report_id}
                    </td>

                    {/* Type */}
                    <td className="px-4 py-3">
                      <div
                        className={`flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full border text-xs font-medium ${
                          report.product_id
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                        }`}
                      >
                        {report.product_id ? (
                          <>
                            <Package className="w-3 h-3" /> Hirdetés
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3" /> Felhasználó
                          </>
                        )}
                      </div>
                    </td>

                    {/* Reporter */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                          {report.reporter_name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                          <p className="text-white text-sm font-medium">
                            {report.reporter_name}
                          </p>
                          <p className="text-slate-500 text-xs">
                            {report.reporter_email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Reported */}
                    <td className="px-4 py-3 text-sm">
                      {report.product_id ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${report.product_id}`);
                          }}
                          className="text-blue-400 hover:text-blue-300 hover:underline truncate max-w-32 block"
                        >
                          {report.product_title}
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/profile/${report.reported_id}`);
                          }}
                          className="text-blue-400 hover:text-blue-300 hover:underline"
                        >
                          {report.reported_name}
                        </button>
                      )}
                    </td>

                    {/* Reason */}
                    <td className="px-4 py-3 text-slate-400 text-sm">
                      {report.reason}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-3">
                      {(() => {
                        const config =
                          statusConfig[report.status] || statusConfig.pending;
                        return (
                          <span
                            className={`text-xs font-medium px-2.5 py-1 rounded-full border ${config.bg} ${config.text} ${config.border}`}
                          >
                            {config.label}
                          </span>
                        );
                      })()}
                    </td>

                    {/* Date */}
                    <td className="px-4 py-3 text-slate-500 text-sm">
                      {new Date(report.sending_date).toLocaleString("hu-HU", {
                        dateStyle: "short",
                      })}
                    </td>

                    {/* Actions */}
                    <td
                      className="px-4 py-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center gap-2">
                        {report.status === "pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatus(report.report_id, "resolved")
                              }
                              className="p-1.5 rounded-lg text-green-400 hover:text-white hover:bg-green-500/20 transition-all duration-200"
                              title="Lezárás"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleStatus(report.report_id, "rejected")
                              }
                              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                              title="Elutasítás"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {report.product_id && (
                          <button
                            onClick={() =>
                              navigate(`/product/${report.product_id}`)
                            }
                            className="p-1.5 rounded-lg text-blue-400 hover:text-white hover:bg-blue-500/20 transition-all duration-200"
                            title="Megtekintés"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(report.report_id)}
                          className="p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                          title="Törlés"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Expanded Row - Text Description */}
                  {expandedReport === report.report_id && report.text && (
                    <tr className="bg-slate-800/30">
                      <td colSpan={8} className="px-6 py-4">
                        <div className="flex items-start gap-3">
                          <Flag className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                          <div className="flex flex-col gap-1">
                            <p className="text-slate-400 text-xs uppercase tracking-wider">
                              Részletes leírás
                            </p>
                            <p className="text-slate-300 text-sm">
                              {report.text}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => getReports(page - 1)}
          disabled={page === 1}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            page === 1
              ? "text-slate-600 cursor-not-allowed"
              : "text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-800"
          }`}
        >
          ← Előző
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => getReports(p)}
            className={`w-9 h-9 rounded-xl text-sm font-medium transition-all duration-200 ${
              page === p
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => getReports(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
            page === totalPages
              ? "text-slate-600 cursor-not-allowed"
              : "text-slate-300 hover:text-white border border-slate-700/60 hover:bg-slate-800"
          }`}
        >
          Következő →
        </button>
      </div>
    </div>
  );
}
