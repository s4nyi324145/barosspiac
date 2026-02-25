
export default function HowItWorksCard({image,number,title,desc}){

    return(<>
            
            <div className=' relative max-w-60 bg-white border-2 shadow-lg hover:-translate-y-5 cursor-pointer transition-transform  border-gray-200 mt-[-120px]  rounded-md p-5 text-center flex flex-col gap-2 items-center'>
                    <div className='absolute bg-white border-2 border-gray-200   rounded-full text-xl w-12 h-12 flex items-center justify-center   top-[-25px] backdrop-blur-sm '>
                        <p className='border-2 border-slate-950 rounded-full px-2.5 py-0.5'>{number}</p>
                    </div>
                    <img className='max-w-xs ' src={image} alt="Regisztráció illusztráció" />
                    <h1 className='text-xl font-semibold text-blue-800'>{title}</h1>
                    <p className='text-sm'>{desc}</p>
                </div>

    
    </>)
}