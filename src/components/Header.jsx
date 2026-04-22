import RegisterButton from "./RegisterButton"
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import api from "../config/api";

import { useEffect, useState } from "react";
export default function Header({ products }) {

    console.log(products);


    if (products.length < 3) {
        return null
    }

    const floatingCards = [
        { ...products[0], top: "top-20", left: "left-10", rotate: "rotate-6" },
        { ...products[1], top: "top-40", left: "left-32", rotate: "-rotate-6" },
        { ...products[2], top: "top-24", left: "left-72", rotate: "rotate-3" },
    ];

    const [statistics, setStatistics] = useState(null)

    const getStatistics = async () => {
        try {
            const result = await api.get('/statistics/statistics')
            setStatistics(result.data)
        } catch (error) {
            console.log(error.response)
        }
    }

    useEffect(() => {
        getStatistics()
    }, [])

    useEffect(() => {
        console.log(statistics);

    }, [statistics])


    return (
        <>
            <div className="flex flex-col lg:flex-row flex-1 p-4 lg:p-8 items-center gap-8 bg-slate-950">

                {/* Bal oldal */}
                <div className="flex-1 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">

                    {/* Badge */}
                    <div className="border items-center gap-2 border-blue-500/20 flex w-fit px-2 py-1 rounded-full bg-blue-500/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                        <p className="text-sm font-medium text-blue-400 tracking-wide">Csak DSZC Baross Gábor diákok számára</p>
                    </div>

                    {/* Cím — mobilon kisebb */}
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Adj új esélyt a cuccaidnak – építsük együtt a{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Baross</span>
                        {' '}közösségét!
                    </h1>

                    <p className="text-slate-400 text-base leading-relaxed max-w-md">
                        Vásárolj tudatosan, adj el egyszerűen! Egy hely, ahol a régi kedvencedből más új kincse válhat.
                    </p>

                    {/* Gombok */}
                    <div className="flex gap-4">
                        <Link
                            to="/browser"
                            className="text-sm font-medium bg-slate-900 text-slate-300 hover:text-white border border-slate-700/50 px-4 py-2 rounded-xl hover:bg-slate-800/60 transition-colors duration-200"
                        >
                            Böngészés
                        </Link>
                        <RegisterButton />
                    </div>

                    {/* Statisztikák — mobilon kisebb padding */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
                        {[
                            { value: statistics?.total_users || 0, label: 'Diák' },
                            { value: statistics?.total_products || 0, label: 'Hirdetés' },
                            { value: '100%', label: 'Ingyenes' },
                        ].map((stat, i) => (
                            <div key={i} className="border flex flex-col items-center bg-slate-900 px-6 py-3 rounded-xl border-slate-700/50">
                                <p className="text-white text-xl font-bold">{stat.value}</p>
                                <p className="text-slate-500 text-xs">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Jobb oldal — csak lg-től látható */}
                <div className="flex-1 hidden lg:flex relative min-h-96">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 opacity-10 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute top-48 left-0 w-80 h-80 bg-blue-600/50 rounded-full blur-3xl pointer-events-none" />
                    {floatingCards.map((card, i) => (
                        <div
                            key={i}
                            className={`absolute ${card.top} ${card.left} ${card.rotate} w-64 bg-gradient-to-br ${card.color} border border-slate-700/60 backdrop-blur-sm rounded-2xl p-4 shadow-xl`}
                        >
                            <ProductCard p={card} />
                        </div>
                    ))}
                </div>

            </div>
        </>)
}