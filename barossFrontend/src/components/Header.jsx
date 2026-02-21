import RegisterButton from "./RegisterButton"
export default function Header() {


    const floatingCards = [
        { title: "Nike Air Max", price: "8 500 Ft", category: "Cipők", condition: "Jó állapot", color: "from-blue-500/20 to-blue-600/10", rotate: "-rotate-3", top: "top-16", left: "left-12" },
        { title: "Téli kabát", price: "4 200 Ft", category: "Ruhák", condition: "Új", color: "from-slate-700/80 to-slate-800/80", rotate: "rotate-2", top: "top-[150px]", left: "left-32" },
        { title: "Fizika könyv", price: "1 500 Ft", category: "Könyvek", condition: "Használt", color: "from-blue-600/20 to-slate-800/80", rotate: "-rotate-1", top: "top-[250px]", left: "left-12" },
    ];

    return (
        <>
            <div className="header flex flex-row  flex-1  p-3 items-start justify-evenly gap-4 border-b bg-slate-950 border-slate-800">
                {/*Bal oldal*/}
                <div className="p-10  flex-1 flex flex-col gap-6 ">
                    {/*Header badge */}
                    <div className="border items-center gap-2  border-blue-500/20 flex w-fit px-2 py-1 rounded-full bg-blue-500/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <p className="text-sm font-medium text-blue-400 tracking-wide">Csak DSZC Baross Gábor diákok számára</p>
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">Adj új esélyt a cuccaidnak – építsük együtt a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Baross</span> közösségét!</h1>
                    <p className="text-slate-400 text-base leading-relaxed max-w-md">Vásárolj tudatosan, adj el egyszerűen! Egy hely, ahol a régi kedvencedből más új kincse válhat.</p>
                    <div className="flex gap-4">
                        <a href="/login"
                            className="text-sm font-medium bg-slate-900 text-slate-300 hover:text-white transition-colors duration-200 border border-slate-700/50 px-4 py-2 rounded-xl hover:bg-slate-800/60"
                        >
                            Böngészés
                        </a>
                        <RegisterButton />
                    </div>
                    <div className="flex flex-wrap gap-6 mt-4 text-sm text-slate-600">
                        <div className="border flex flex-col items-center  bg-slate-900 p-3 pl-6 pr-6 rounded-xl  border-slate-700/50">
                            <p className="text-white text-xl">120+</p>
                            <p className="text-slate-500 text-xs text-center">Diák</p>
                        </div>
                        <div className="border flex flex-col items-center  pl-6 pr-6 bg-slate-900 p-3 rounded-xl  border-slate-700/50">
                            <p className="text-white text-xl">320+</p>
                            <p className="text-slate-500 text-xs text-center">Hírdtetés</p>
                        </div>
                        <div className="border flex flex-col items-center pl-6 pr-6  bg-slate-900 p-3 rounded-xl  border-slate-700/50">
                            <p className="text-white text-xl">100%</p>
                            <p className="text-slate-500 text-xs text-center">Ingyenes</p>
                        </div>
                    </div>
                </div>
                {/*Jobb oldal*/}
                <div className="flex-1 relative h-80 hidden md:block">

                    <div className="absolute  top-0 right-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
                 
                    <div className="absolute  top-48 left-0 w-80 h-80 bg-blue-600/50  rounded-full blur-3xl pointer-events-none" />
                    {floatingCards.map((card, i) => (
                        <div
                            key={i}
                            className={`absolute ${card.top} ${card.left} ${card.rotate} w-52 bg-gradient-to-br ${card.color} border border-slate-700/60 backdrop-blur-sm rounded-2xl p-4 shadow-xl`}
                            
                        >

                            <div className="w-full h-28 bg-slate-700/50 rounded-xl mb-3 flex items-center text-white justify-center text-3xl">
                                {i === 0 ? "cipő" : i === 1 ? "kabát" : "könyv"}
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-white text-sm font-semibold">{card.title}</p>
                                    <p className="text-slate-400 text-xs mt-0.5">{card.category}</p>
                                </div>
                                <span className="text-blue-400 text-sm font-bold">{card.price}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-xs bg-slate-700/60 text-slate-300 px-2 py-0.5 rounded-full">
                                    {card.condition}
                                </span>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </>)
}