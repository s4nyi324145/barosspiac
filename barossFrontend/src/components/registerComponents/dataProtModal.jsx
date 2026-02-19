export default function DataProtModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full overflow-y-auto scrollbar-hide max-h-96 max-w-lg flex flex-col gap-3 text-justify relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl text-center font-bold mb-6">
          Adatkezelési Tájékoztató
        </h2>
        <div>
          <h1 className="font-bold">1. Az adatkezelés célja</h1>

          <p>
            Az adatkezelés célja a felhasználói fiókok létrehozása és a piactér
            működtetése.
          </p>
        </div>
        <div>
          <h1 className="font-bold">2. Kezelt adatok köre</h1>

     
            A rendszer az alábbi adatokat kezelheti:
            <ul className="list-disc list-inside">
              <li>Név</li>
              <li>E-mail cím (iskolai)</li>
              <li>Osztály</li>
              <li>Profilkép (opcionális)</li>
              <li>Feltöltött hirdetések adatai</li>
            </ul>
       
        </div>
        <div>
          <h1 className="font-bold">3. Az adatkezelés jogalapja</h1>

          <p>
            Az adatkezelés a felhasználó önkéntes hozzájárulásán alapul, amelyet
            a regisztráció során ad meg.
          </p>
        </div>
        <div>
          <h1 className="font-bold">4. Az adatok tárolása</h1>

          <p>
            Az adatok kizárólag az alkalmazás adatbázisában kerülnek tárolásra,
            oktatási célból. Az adatokat harmadik fél részére nem
            továbbítjuk.{" "}
          </p>
        </div>
        <div>
          <h1 className="font-bold">5. Az adatok megőrzési ideje</h1>

          <p>
            Az adatok a felhasználói fiók törléséig, vagy a projekt lezárásáig
            kerülnek tárolásra.{" "}
          </p>
        </div>
        <div>
          <h1 className="font-bold">6. Felhasználói jogok</h1>

    
            A felhasználó jogosult:
            <ul className="list-disc list-inside">
              <li>Adatai megtekintésére</li>
              <li>Adatai módosítására</li>
              <li>Fiókjának törlésére</li>
            </ul>
            Ezt az alkalmazáson belül vagy az üzemeltetőnél kezdeményezheti.
 
        </div>
      </div>
    </div>
  );
}
