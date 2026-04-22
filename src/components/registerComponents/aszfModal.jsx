

export default function AszfModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full overflow-y-auto max-h-96 scrollbar-hide max-w-lg flex flex-col gap-3 text-justify relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl text-center font-bold mb-6">
          Általános Szerződési Feltételek
        </h2>

        <div>
          <h1 className="font-bold">1. A szolgáltató adatai</h1>
          <p>
            A szolgáltatás üzemeltetője: Baross Piac – vizsgaremek alkalmazás
            Üzemeltető: Baross tanulói projekt Cél: oktatási és demonstrációs
            célú online piactér működtetése A rendszer kizárólag oktatási célból
            jött létre.
          </p>
        </div>
        <div>
          <h1 className="font-bold">2. A szolgáltatás célja</h1>
          <p>
            A Baross Piac egy zárt rendszerű online piactér, amely lehetőséget
            biztosít a felhasználók számára használt termékek meghirdetésére,
            böngészésére és egymás közötti kapcsolatfelvételre. A rendszer a
            Vinted működéséhez hasonló struktúrát követ, azonban kizárólag
            tanulási és vizsgacélból készült.
          </p>
        </div>
        <div>
          <h1 className="font-bold">3. A szolgáltatás igénybevétele</h1>
          <p>
            A szolgáltatást kizárólag a Baross intézmény aktív tanulói vehetik
            igénybe. Regisztrációval a felhasználó kijelenti, hogy: az intézmény
            tanulója valós adatokat ad meg betöltötte a 14. életévét Az
            üzemeltető jogosult a jogosulatlan felhasználói fiókok törlésére.
          </p>
        </div>
        <div>
          <h1 className="font-bold"> 4. Felhasználói kötelezettségek</h1>
          <p>
            A felhasználó vállalja, hogy: nem tölt fel jogszabályba ütköző
            tartalmat nem hirdet tiltott terméket nem sérti mások jogait nem
            használ trágár, sértő vagy zaklató kommunikációt Az üzemeltető
            jogosult a szabályokat sértő tartalmak eltávolítására.
          </p>
        </div>
        <div>
          <h1 className="font-bold"> 5. Felelősség</h1>
          <p>
            A Baross Piac kizárólag közvetítő felületként működik. Az adásvétel
            a felhasználók között jön létre, az üzemeltető nem vállal
            felelősséget: a termékek minőségéért a fizetéssel kapcsolatos
            vitákért a felhasználók közötti megállapodásokért
          </p>
        </div>
        <div>
          <h1 className="font-bold">6. A szolgáltatás megszüntetése</h1>
          <p>
            Az üzemeltető fenntartja a jogot a szolgáltatás módosítására vagy
            megszüntetésére, mivel az kizárólag oktatási célú projekt.
          </p>
        </div>
      </div>
    </div>
  );
}
