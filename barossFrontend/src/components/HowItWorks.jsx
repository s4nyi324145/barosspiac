import Sign_up_rafiki from '../assets/Sign_up_rafiki.svg'
import Online_Groceries_cuate from '../assets/Online_Groceries_cuate.svg'
import Agreement_cuate from '../assets/Agreement_cuate.svg'
import HowItWorksCard from './HowItWorksCard'

export default function HowItWorks() {
    return (<>
        <div className="flex p-1 justify-center items-center flex-col  bg-slate-950 flex-1">
            <div className="bg-blue-500 w-20 h-2 mt-8 mb-8  rounded-full"></div>
            
            <h1 className="text-3xl text-white font-semibold mb-40">Hogy működik?</h1>

            <div className="bg-white  grid min-w-full p-5 justify-items-center pb-24  grid-cols-3">
                    <HowItWorksCard image={Sign_up_rafiki} number={1} title={"Regisztrálj ingyen"} desc={"Csak az iskolai email címed kell. Pár másodperc és már bent is vagy."}/>                   
                    <HowItWorksCard image= {Online_Groceries_cuate } number={2} title={"Add fel a hirdetésed"} desc={"Fotózd le, írj egy rövid leírást, add meg az árat — és már látják is a diák társaid."}/>                  
                    <HowItWorksCard image={Agreement_cuate } number={3} title={"Egyezzetek meg"} desc={"Írj az eladónak, beszéljétek meg a részleteket és adjátok át személyesen az iskolában"}/>
                    <a className='collapse' href="https://storyset.com/user">User illustrations by Storyset</a>
                    <a className='collapse' href="https://storyset.com/business">Business illustrations by Storyset</a>
                    <a className='collapse' href="https://storyset.com/people">People illustrations by Storyset</a>
            </div>
            
        </div>

    </>)
}