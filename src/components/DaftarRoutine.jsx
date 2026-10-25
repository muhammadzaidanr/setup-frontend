import CardRoutine from "./CardRoutine";

function DaftarRoutine(props) {
  return (
    <section>
      <h2>Daftar Routine</h2>

      {props.daftarRoutine.length === 0 ? (
        <p>Belum ada data routine.</p>
      ) : (
        <div>
          {props.daftarRoutine.map((routine) => (
            <CardRoutine
              key={routine.id}
              nama={routine.nama}
              fokus={routine.fokus}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default DaftarRoutine;