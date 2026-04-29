import Sign_up_rafiki from "../assets/Sign_up_rafiki.svg";
import Online_Groceries_cuate from "../assets/Online_Groceries_cuate.svg";
import Agreement_cuate from "../assets/Agreement_cuate.svg";
import HowItWorksCard from "./HowItWorksCard";

export default function HowItWorks() {
  return (
    <div className="flex flex-col items-center bg-slate-950 py-16 px-4">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-16">
        <div className="bg-blue-500 w-16 h-1.5 rounded-full" />
        <h1 className="text-3xl font-bold text-white">Hogy működik?</h1>
        <p className="text-slate-500 text-sm">
          Három egyszerű lépés és már adhatod-veheted a cuccokat
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full">
        <HowItWorksCard
          image={Sign_up_rafiki}
          number={1}
          title="Regisztrálj ingyen"
          desc="Csak az iskolai email címed kell. Pár másodperc és már bent is vagy."
        />
        <HowItWorksCard
          image={Online_Groceries_cuate}
          number={2}
          title="Add fel a hirdetésed"
          desc="Fotózd le, írj egy rövid leírást, add meg az árat — és már látják is a diák társaid."
        />
        <HowItWorksCard
          image={Agreement_cuate}
          number={3}
          title="Egyezzetek meg"
          desc="Írj az eladónak, beszéljétek meg a részleteket és adjátok át személyesen az iskolában."
        />
      </div>

      {/* Attributions — hidden */}
      <div className="hidden">
        <a href="https://storyset.com/user">User illustrations by Storyset</a>
        <a href="https://storyset.com/business">
          Business illustrations by Storyset
        </a>
        <a href="https://storyset.com/people">
          People illustrations by Storyset
        </a>
      </div>
    </div>
  );
}
