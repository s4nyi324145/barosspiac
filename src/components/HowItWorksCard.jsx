
export default function HowItWorksCard({ image, number, title, desc }) {

    return (<>

        <div className="relative bg-slate-900 border border-slate-700/60 rounded-2xl p-6 pt-10 text-center flex flex-col gap-3 items-center hover:-translate-y-2 transition-transform duration-200 cursor-pointer shadow-xl">

            {/* Szám badge */}
            <div className="absolute top-[-18px] w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
                <p className="text-white font-bold text-sm">{number}</p>
            </div>

            {/* Illusztráció */}
            <img className="w-40 h-40 object-contain" src={image} alt={title} />

            {/* Szöveg */}
            <h2 className="text-lg font-semibold text-white">{title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>

        </div>


    </>)
}