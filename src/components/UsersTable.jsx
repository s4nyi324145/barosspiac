import { Eye, Trash2, Pencil, X, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";
import { useToast } from "../context/toastContext";

export default function UsersTables({ adminUsers, setAdminUsers }) {
  const navigate = useNavigate();
  const { showSuccess, showError } = useToast();
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({});


  {/* Delete user */}
  const handleDeleteUser = async (user_id) => {
    if (!window.confirm("Biztosan törlöd ezt a felhasználót?")) return;
    try {
      await api.delete(`/user/delete/${user_id}`);
      setAdminUsers((prev) => prev.filter((u) => u.user_id !== user_id));
      showSuccess("Felhasználó törölve");
    } catch (error) {
      showError("Hiba történt a törlés során");
    }
  };

  {/* Edit user */}
  const handleEditStart = (user) => {
    setEditingUser(user.user_id);
    setEditForm({
      fullname: user.fullname,
      email: user.email,
      userClass: user.userClass,
      role: user.role,
      verified: user.verified,
    });
  };

  {/* Save edited user */}
  const handleEditSave = async (user_id) => {
    try {
      await api.put(`/user/update/${user_id}`, editForm);
      setAdminUsers((prev) =>
        prev.map((u) => (u.user_id === user_id ? { ...u, ...editForm } : u)),
      );
      setEditingUser(null);
      showSuccess("Felhasználó frissítve");
    } catch (error) {
      console.log(error);
      showError("Hiba történt a mentés során");
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Név
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Osztály
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Létrehozva
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Szerepkör
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Státusz
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Műveletek
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {adminUsers.map((user) => {
              const isEditing = editingUser === user.user_id;
              return (
                <tr
                  key={user.user_id}
                  className="hover:bg-slate-800/40 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-slate-500 text-sm">
                    #{user.user_id}
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <input
                        value={editForm.fullname}
                        onChange={(e) =>
                          setEditForm({ ...editForm, fullname: e.target.value })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white outline-none focus:border-blue-500 w-32"
                      />
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0 overflow-hidden">
                          {user.pfp ? (
                            <img
                              src={user.pfp}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            user.fullname?.charAt(0).toUpperCase()
                          )}
                        </div>
                        <p className="text-white text-sm font-medium">
                          {user.fullname}
                        </p>
                      </div>
                    )}
                  </td>

                  {/* Email address*/}
                  <td className="px-4 py-3 text-slate-400 text-sm">
                    {isEditing ? (
                      <input
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white outline-none focus:border-blue-500 w-44"
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  {/* Class */}
                  <td className="px-4 py-3 text-slate-400 text-sm">
                    {isEditing ? (
                      <input
                        value={editForm.userClass}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            userClass: e.target.value,
                          })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white outline-none focus:border-blue-500 w-20"
                      />
                    ) : (
                      user.userClass
                    )}
                  </td>

                  {/* Created at */}
                  <td className="px-4 py-3 text-slate-500 text-sm">
                    {new Date(user.created_at).toLocaleString("hu-HU", {
                      dateStyle: "short",
                    })}
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <select
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white outline-none focus:border-blue-500"
                      >
                        <option value="regisztralt">Felhasználó</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          user.role === "admin"
                            ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            : "bg-slate-700/60 text-slate-300 border-slate-600/50"
                        }`}
                      >
                        {user.role === "admin" ? "Admin" : "Felhasználó"}
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    {isEditing ? (
                      <select
                        value={editForm.verified}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            verified: Number(e.target.value),
                          })
                        }
                        className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white outline-none focus:border-blue-500"
                      >
                        <option value={1}>Megerősítve</option>
                        <option value={0}>Nincs megerősítve</option>
                      </select>
                    ) : (
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                          user.verified === 1
                            ? "bg-green-500/20 text-green-400 border-green-500/30"
                            : "bg-red-500/20 text-red-400 border-red-500/30"
                        }`}
                      >
                        {user.verified === 1
                          ? "Megerősítve"
                          : "Nincs megerősítve"}
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleEditSave(user.user_id)}
                            className="p-1.5 rounded-lg text-green-400 hover:text-white hover:bg-green-500/20 transition-all duration-200"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setEditingUser(null)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => navigate(`/profile/${user.user_id}`)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditStart(user)}
                            className="p-1.5 rounded-lg text-blue-400 hover:text-white hover:bg-blue-500/20 transition-all duration-200"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.user_id)}
                            className="p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
