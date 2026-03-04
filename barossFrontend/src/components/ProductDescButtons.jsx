

export default function ProductDescButton(){

    return(<>

        <div className="flex items-end gap-6">
            <button className="bg-blue-600 p-2 hover:bg-blue-500  text-white font-semibold rounded-xl transition-all duration-200 shadow-lg">
                Hírdetés Megosztás
            </button>
            <button className="bg-red-600/60 p-2 hover:bg-red-600  text-white font-semibold rounded-xl transition-all duration-200 shadow-lg">
                Hírdetés Jelentése
            </button>
        </div>
        
    </>)
}