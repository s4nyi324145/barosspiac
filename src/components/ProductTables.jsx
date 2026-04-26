import { Eye, Trash2, Tag, Pencil, X, Check, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import api from "../config/api"
import { useToast } from "../context/toastContext"

export default function ProductTables({ adminProducts, setAdminProducts }) {
    const navigate = useNavigate()
    const { showSuccess, showError } = useToast()
    const [editingProduct, setEditingProduct] = useState(null)
    const [editForm, setEditForm] = useState({})
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        try {
            const result = await api.get('/category/getCategory')
            setCategories(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getCategories() }, [])

    const handleDeleteProduct = async (product_id) => {
        if (!window.confirm('Biztosan törlöd ezt a hirdetést?')) return
        try {
            await api.delete(`/product/${product_id}`)
            setAdminProducts(prev => prev.filter(p => p.product_id !== product_id))
            showSuccess('Hirdetés törölve')
        } catch (error) {
            showError('Hiba történt a törlés során')
        }
    }

    const handleMarkSold = async (product_id, is_sold) => {
        try {
            await api.put(`/product/sold/${product_id}`, { is_sold })
            setAdminProducts(prev => prev.map(p =>
                p.product_id === product_id ? { ...p, is_sold } : p
            ))
            showSuccess(is_sold === 1 ? 'Eladottnak jelölve' : 'Visszaállítva aktívra')
        } catch (error) {
            showError('Hiba történt')
        }
    }

    const handleEditStart = (product) => {
        setEditingProduct(product.product_id)
        setEditForm({
            product_title: product.product_title,
            category_id: product.category_id,
            sub_category_id: product.sub_category_id,
            sub_sub_category_id: product.sub_sub_category_id,
            is_sold: product.is_sold
        })
    }

    const handleEditSave = async (product_id) => {
        try {
            await api.put(`/product/admin/update/${product_id}`, editForm)
            setAdminProducts(prev => prev.map(p =>
                p.product_id === product_id ? { ...p, ...editForm } : p
            ))
            setEditingProduct(null)
            showSuccess('Termék frissítve')
        } catch (error) {
            showError('Hiba történt a mentés során')
        }
    }

    return (
        <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-slate-800">
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">ID</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Név</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Feladó</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Kategória</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Státusz</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Feltöltés</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {adminProducts.map((product) => {
                            const isEditing = editingProduct === product.product_id
                            return (
                                <tr key={product.product_id} className="hover:bg-slate-800/40 transition-colors duration-150">

                                    <td className="px-4 py-3 text-slate-500 text-sm">#{product.product_id}</td>

                                    {/* Termék neve */}
                                    <td className="px-4 py-3">
                                        {isEditing ? (
                                            <input
                                                value={editForm.product_title}
                                                onChange={e => setEditForm({ ...editForm, product_title: e.target.value })}
                                                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-sm text-white outline-none focus:border-blue-500 w-40"
                                            />
                                        ) : (
                                            <p className="text-white text-sm font-medium max-w-32 truncate">
                                                {product.product_title}
                                            </p>
                                        )}
                                    </td>

                                    {/* Feladó */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                                            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs shrink-0">
                                                {product.pfp ? <img src={product.pfp} alt="Profilkép" className="w-full h-full object-cover " /> : product.fullname?.[0].toUpperCase()}
                                            </div>
                                            <span className="truncate max-w-24">{product.fullname}</span>
                                        </div>
                                    </td>

                                    {/* Kategória */}
                                    <td className="px-4 py-3 text-slate-400 text-sm">
                                        {isEditing ? (
                                            <div className="flex flex-col gap-1">
                                                <select
                                                    value={editForm.category_id}
                                                    onChange={e => setEditForm({
                                                        ...editForm,
                                                        category_id: Number(e.target.value),
                                                        sub_category_id: '',
                                                        sub_sub_category_id: ''
                                                    })}
                                                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-blue-500"
                                                >
                                                    {categories.map(c => (
                                                        <option key={c.category_id} value={c.category_id}>{c.name}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={editForm.sub_category_id}
                                                    onChange={e => setEditForm({
                                                        ...editForm,
                                                        sub_category_id: Number(e.target.value),
                                                        sub_sub_category_id: ''
                                                    })}
                                                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-blue-500"
                                                >
                                                    {categories.find(c => c.category_id === editForm.category_id)?.subcategories?.map(s => (
                                                        <option key={s.sub_category_id} value={s.sub_category_id}>{s.name}</option>
                                                    ))}
                                                </select>
                                                <select
                                                    value={editForm.sub_sub_category_id}
                                                    onChange={e => setEditForm({ ...editForm, sub_sub_category_id: Number(e.target.value) })}
                                                    className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs text-white outline-none focus:border-blue-500"
                                                >
                                                    {categories
                                                        .find(c => c.category_id === editForm.category_id)
                                                        ?.subcategories?.find(s => s.sub_category_id === editForm.sub_category_id)
                                                        ?.items?.map(i => (
                                                            <option key={i.sub_sub_category_id} value={i.sub_sub_category_id}>{i.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        ) : (
                                            <span className="truncate max-w-40 block">
                                                {product.category_name} › {product.sub_category_name} › {product.sub_sub_name}
                                            </span>
                                        )}
                                    </td>

                                    {/* Státusz */}
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                                            product.is_sold === 1
                                                ? 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                                                : 'bg-green-500/20 text-green-400 border-green-500/30'
                                        }`}>
                                            {product.is_sold === 1 ? 'Eladott' : 'Aktív'}
                                        </span>
                                    </td>

                                    {/* Feltöltés */}
                                    <td className="px-4 py-3 text-slate-500 text-sm">
                                        {new Date(product.product_upload).toLocaleString("hu-HU", { dateStyle: "short" })}
                                    </td>

                                    {/* Műveletek */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            {isEditing ? (
                                                <>
                                                    <button
                                                        onClick={() => handleEditSave(product.product_id)}
                                                        className="p-1.5 rounded-lg text-green-400 hover:text-white hover:bg-green-500/20 transition-all duration-200"
                                                        title="Mentés"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingProduct(null)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                                                        title="Mégse"
                                                    >
                                                        <X className="w-4 h-4" />
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button
                                                        onClick={() => navigate(`/product/${product.product_id}`)}
                                                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200"
                                                        title="Megtekintés"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleEditStart(product)}
                                                        className="p-1.5 rounded-lg text-blue-400 hover:text-white hover:bg-blue-500/20 transition-all duration-200"
                                                        title="Szerkesztés"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </button>
                                                    {product.is_sold === 0 ? (
                                                        <button
                                                            onClick={() => handleMarkSold(product.product_id, 1)}
                                                            className="p-1.5 rounded-lg text-green-400 hover:text-white hover:bg-green-500/20 transition-all duration-200"
                                                            title="Eladottnak jelölés"
                                                        >
                                                            <Tag className="w-4 h-4" />
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleMarkSold(product.product_id, 0)}
                                                            className="p-1.5 rounded-lg text-yellow-400 hover:text-white hover:bg-yellow-500/20 transition-all duration-200"
                                                            title="Visszaállítás aktívra"
                                                        >
                                                            <RotateCcw className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDeleteProduct(product.product_id)}
                                                        className="p-1.5 rounded-lg text-red-400 hover:text-white hover:bg-red-500/20 transition-all duration-200"
                                                        title="Törlés"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}