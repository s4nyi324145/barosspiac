import { useState, useRef, useEffect, useEffectEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  X,
  Upload,
  ImagePlus,
  ChevronRight,
  Tag,
  MapPin,
  Package,
} from "lucide-react";
import Navbar from "../components/Navbar";
import api from "../config/api";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import { useToast } from "../context/toastContext";

export default function SellPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { product_id } = useParams();
  const isEditing = !!product_id;

  const { showSuccess, showError } = useToast()

  const conditions = [
    { id: "uj", label: "Új", desc: "Soha nem volt használva", color: "green" },
    { id: "kivalo", label: "Kiváló", desc: "Alig használt", color: "blue" },
    { id: "jo", label: "Jó", desc: "Láthatóan használt", color: "yellow" },
    {
      id: "kielegito",
      label: "Kielégítő",
      desc: "Erősen használt",
      color: "red",
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const subjects = [
    "Töri",
    "Magyar",
    "Matek",
    "Földrajz",
    "Informatika",
    "Angol",
  ];

  let savedForm = JSON.parse(localStorage.getItem("form"))

  const [form, setForm] = useState(savedForm || {
    title: "",
    desc: "",
    price: "",
    condition: "",
    size: "",
    subject: "",
    collpoint: "",
    category_id: "",
    sub_category_id: "",
    sub_sub_category_id: "",
  });
  const [images, setImages] = useState([])
  const [existingImages, setExistingImages] = useState([])
  const [dragOver, setDragOver] = useState(false);
  const [categories, setCategories] = useState([]);
  const [errorField, setErrorField] = useState("")
  const [loading, setLoading] = useState(false)

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
  //useEffect(() => {console.log(images);}, [images]);
  //useEffect(() => { console.log(form) }, [form])
  //useEffect(() => { console.log(categories) }, [categories])
  useEffect(() => {
    const getProduct = async () => {
      if (isEditing && categories.length > 0) {
        const result = await api.get(`/product/${product_id}`);
        console.log(result.data);
        const p = result.data.product_details[0];
        console.log(p);
        setForm({
          title: p.product_title || "",
          desc: p.product_desc || "",
          price: p.product_price || "",
          condition: p.product_condition || "",
          size: p.product_size || "",
          subject: p.product_subject || "",
          collpoint: p.product_collpoint || "",
          category_id: p.category_id || "",
          sub_category_id: p.sub_category_id || "",
          sub_sub_category_id: p.sub_sub_category_id || "",
        });
        setExistingImages(result.data.image)
      }
    };

    getProduct();
  }, [product_id, categories]);

  const handleImageUpload = (files) => {
    const newImages = Array.from(files)
      .slice(0, 5 - images.length)
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => { console.log(errorField) }, [errorField])

  const handleProductUpload = async () => {
    setLoading(true)
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      images.forEach((img) => formData.append("images", img.file));


      const result = await api.post("/product/postProduct", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false)
      showSuccess(result.data.message)
      navigate(`/product/${result.data.product_id}`)
      localStorage.removeItem("form")
    } catch (error) {
      showError(error.response?.data?.message || "Hiba történt a bejelentkezés során.")
      console.error(error.response)
      setErrorField(error.response?.data?.errorField || "")
      setLoading(false)
    }
  };


  const handleProductEdit = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value)
        }
      })
      formData.append('product_id', product_id)


      images.forEach(img => formData.append('images', img.file))

      const result = await api.put('/product/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      setLoading(false)
      showSuccess("Termék sikeresen módosítva")
      navigate(`/product/${product_id}`)
    } catch (error) {
      showError(error.response?.data?.message || "Hiba történt")
      setLoading(false)
    }
  }





  useEffect(() => {

    const saveToLocalStorage = async () => {
      try {
        localStorage.setItem("form", JSON.stringify(form))
      } catch (error) {
        console.log(error)
      }
    }

    if (!isEditing) {
      saveToLocalStorage()
    }

  }, [form])

  const isValid =
  form.title && form.price && form.condition &&
  form.category_id && form.sub_category_id && form.sub_sub_category_id &&
  form.collpoint &&
  (images.length > 0 || existingImages.length > 0)  

  return (
    <>
      <Navbar />
      <Categories />
      <div className="min-h-screen bg-slate-950 text-white">
        {/* Fejléc */}
        <div className="border-b border-slate-800 px-8 py-6">
          <h1 className="text-2xl font-bold text-white">
            {isEditing ? "Hírdetés szerkesztése" : "Hirdetés feladása"}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {isEditing
              ? "Módosítsd a hírdetésed adatait"
              : "Töltsd ki az adatokat és add fel a hirdetésed"}
          </p>
        </div>

        <div className="flex gap-8 p-8 flex-1 flex-col-reverse md:flex-row mx-auto">
          {/* BAL OLDAL — Form */}
          <div className=" flex flex-col flex-[0.6] gap-6">
            {/* Alapadatok */}
            <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Tag className="w-4 h-4 text-blue-400" />
                <p className="text-white font-semibold">Alapadatok</p>
              </div>

              {/* Cím */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Termék neve <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="pl. Fehér póló, Matek könyv..."
                  value={form.title}
                  onChange={(e) => {
                    setForm({ ...form, title: e.target.value });
                    if (errorField.includes("title")) setErrorField("");

                  }}
                  className={`bg-slate-800/60 border border-slate-700/60 ${errorField.includes("title") ? 'border-red-600' : ''} rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                />
              </div>

              {/* Leírás */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Leírás
                </label>
                <textarea
                  placeholder="Írd le a termék állapotát, méretét, egyéb fontos részleteket..."
                  value={form.desc}
                  onChange={(e) => setForm({ ...form, desc: e.target.value })}
                  className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none h-28"
                />
              </div>

              {/* Ár */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Ár <span className="text-red-400">*</span>
                </label>
                <div className={`flex items-center gap-3 ${errorField.includes("price") ? 'border-red-600' : ''} bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200`}>
                  <input
                    type="number"
                    placeholder="0"
                    min={0}
                    value={form.price}
                    onChange={(e) => {
                      setForm({ ...form, price: e.target.value });
                      if (errorField.includes("price")) setErrorField("");
                    }}
                    className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <span className="text-slate-500 text-sm shrink-0">Ft</span>
                </div>
              </div>
            </div>

            {/* Kategória */}
            <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Package className="w-4 h-4 text-blue-400" />
                <p className="text-white font-semibold">
                  Kategória <span className="text-red-400">*</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 text-sm text-slate-400">
                <select
                  value={form.category_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category_id: e.target.value,
                      sub_category_id: "",
                      sub_sub_category_id: "",
                    })
                  }
                  className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer"
                >
                  <option value="">Főkategória</option>
                  {categories.map((c) => (
                    <option key={c.category_id} value={c.category_id}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <ChevronRight className="w-4 h-4 shrink-0 text-slate-600" />

                <select
                  value={form.sub_category_id}
                  disabled={!form.category_id}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      sub_category_id: e.target.value,
                      sub_sub_category_id: "",
                    })
                  }
                  className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">Alkategória</option>
                  {categories
                    .find((c) => c.category_id == form.category_id)
                    ?.subcategories?.map((s) => (
                      <option key={s.sub_category_id} value={s.sub_category_id}>
                        {s.name}
                      </option>
                    ))}
                </select>

                <ChevronRight className="w-4 h-4 shrink-0 text-slate-600" />

                <select
                  value={form.sub_sub_category_id}
                  disabled={!form.sub_category_id}
                  onChange={(e) =>
                    setForm({ ...form, sub_sub_category_id: e.target.value })
                  }
                  className="flex-1 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 outline-none focus:border-blue-500 transition-all duration-200 appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <option value="">Típus</option>
                  {categories
                    .find((c) => c.category_id == form.category_id)
                    ?.subcategories?.find(
                      (s) => s.sub_category_id == form.sub_category_id,
                    )
                    ?.items?.map((i) => (
                      <option
                        key={i.sub_sub_category_id}
                        value={i.sub_sub_category_id}
                      >
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Részletek */}
            <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
                <Package className="w-4 h-4 text-blue-400" />
                <p className="text-white font-semibold">Részletek</p>
              </div>

              {/* Állapot */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">
                  Állapot <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {conditions.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setForm({ ...form, condition: c.id })}
                      className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all duration-200 ${form.condition === c.id
                        ? `bg-${c.color}-500/20 border-${c.color}-500/50 text-white`
                        : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-500 hover:text-white"
                        }`}
                    >
                      <p className="text-sm font-medium">{c.label}</p>
                      <p className="text-xs opacity-60">{c.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Méret — csak ruha kategóriáknál */}
              {(form.category_id == 1 || form.category_id == 2) && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">
                    Méret
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setForm({ ...form, size: form.size === s ? "" : s })
                        }
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${form.size === s
                          ? "bg-violet-500/20 border-violet-500/50 text-violet-300"
                          : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tantárgy — csak iskolai felszerelésnél */}
              {form.category_id == 3 && (
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-slate-300">
                    Tantárgy
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {subjects.map((s) => (
                      <button
                        key={s}
                        onClick={() =>
                          setForm({
                            ...form,
                            subject: form.subject === s ? "" : s,
                          })
                        }
                        className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200 ${form.subject === s
                          ? "bg-amber-500/20 border-amber-500/50 text-amber-300"
                          : "bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-white hover:border-slate-500"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Átadás helye */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-300">
                  Átadás helye <span className="text-red-400">*</span>
                </label>
                <div className="flex items-center gap-3 bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all duration-200">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0" />
                  <input
                    type="text"
                    placeholder="pl. Iskola bejárat, Könyvtár..."
                    value={form.collpoint}
                    onChange={(e) =>
                      setForm({ ...form, collpoint: e.target.value })
                    }
                    className="bg-transparent flex-1 outline-none text-sm text-slate-200 placeholder-slate-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* JOBB OLDAL — Képek */}
          <div className=" flex flex-col flex-[0.4] gap-4">
            <div className="bg-slate-900 border border-slate-700/60 rounded-2xl p-6 flex flex-col gap-5 sticky top-6">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ImagePlus className="w-4 h-4 text-blue-400" />
                  <p className="text-white font-semibold">
                    Képek <span className="text-red-400">*</span>
                  </p>
                </div>
                <span className="text-xs text-slate-500">
                  {images.length}/5
                </span>
              </div>

              {/* Drag & Drop zóna */}
              {images.length < 5 && (
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    handleImageUpload(e.dataTransfer.files);
                  }}
                  onClick={() => fileInputRef.current.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${dragOver
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-700 hover:border-blue-500/50 hover:bg-slate-800/30"
                    }`}
                >
                  <Upload
                    className={`w-8 h-8 ${dragOver ? "text-blue-400" : "text-slate-600"}`}
                  />
                  <div className="text-center">
                    <p className="text-sm text-slate-400">Húzd ide a képeket</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      vagy kattints a feltöltéshez
                    </p>
                  </div>
                  <p className="text-xs text-slate-600">JPG, PNG • Max 2MB</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files)}
                  />
                </div>
              )}

              {/* Képek előnézete */}
              {/* Meglévő képek megjelenítése */}
              {existingImages.length > 0 && images.length === 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-slate-500 text-xs">Jelenlegi képek — új képek feltöltésével ezek törlődnek</p>
                  <div className="grid grid-cols-2 gap-2">
                    {existingImages.map((img, i) => (
                      <div key={i} className="relative rounded-xl overflow-hidden">
                        <img src={img.product_img} className="w-full h-full object-cover" />
                        {i === 0 && (
                          <span className="absolute top-1.5 left-1.5 text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                            Borítókép
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Új képek előnézete */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {images.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden group">
                      <img src={img.preview} className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute top-1.5 left-1.5 text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full">
                          Borítókép
                        </span>
                      )}
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1.5 right-1.5 w-6 h-6 bg-black/60 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
                      >
                        <X className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Submit gomb */}
              <button
                disabled={!isValid || loading}
                onClick={() => isEditing ? handleProductEdit() : handleProductUpload()}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 mt-2 ${isValid
                  ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5"
                  : "bg-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
              >
                {isEditing ? (
                  "Hírdetés módosítása"
                ) : loading ? (
                  <div className="flex  justify-center items-center">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    <p>Betöltés...</p>
                  </div>
                ) : (
                  "Hirdetés feladása"
                )}
              </button>
              <button
                onClick={() => navigate("/browser")}
                className="w-full py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white border border-slate-700/60 hover:bg-slate-800 transition-all duration-200"
              >
                Mégse
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
