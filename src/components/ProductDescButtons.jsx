import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Flag, Pencil, Trash2 } from "lucide-react";
export default function ProductDescButton({
  openReportModal,
  productDetail,
  setOpenReportModal,
}) {
  const { user } = useAuth();
  if (!user) return null;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-end gap-2">
        {user?.user_id !== productDetail?.user_id && (
          <button
            onClick={() =>
              user ? setOpenReportModal(true) : navigate("/login")
            }
            className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-white border border-red-500/30 hover:bg-red-500/20 px-3 py-2 rounded-xl transition-all duration-200"
          >
            <Flag className="w-4 h-4" />
            Jelentés
          </button>
        )}
      </div>
    </>
  );
}
