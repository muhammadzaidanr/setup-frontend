import { useState } from "react";

import Header from "./components/Header";
import FormRoutine from "./components/FormRoutine";
import DaftarRoutine from "./components/DaftarRoutine";
import RingkasanRoutine from "./components/RingkasanRoutine";

function App() {
  const [daftarRoutine, setDaftarRoutine] = useState([]);
  const [namaBaru, setNamaBaru] = useState("");
  const [fokusBaru, setFokusBaru] = useState("");

  function tambahRoutine() {
    if (namaBaru.trim() === "" || fokusBaru.trim() === "") {
      return;
    }

    const routineBaru = {
      id: Date.now(),
      nama: namaBaru,
      fokus: fokusBaru,
    };

    setDaftarRoutine([...daftarRoutine, routineBaru]);

    setNamaBaru("");
    setFokusBaru("");
  }

  return (
    <div>
      <Header judul="SetUp" />

      <FormRoutine
        namaBaru={namaBaru}
        setNamaBaru={setNamaBaru}
        fokusBaru={fokusBaru}
        setFokusBaru={setFokusBaru}
        tambahRoutine={tambahRoutine}
      />

      <RingkasanRoutine jumlah={daftarRoutine.length} />

      <DaftarRoutine daftarRoutine={daftarRoutine} />
    </div>
  );
}

export default App;