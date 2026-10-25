function FormRoutine(props) {
  return (
    <section>
      <h2>Tambah Routine</h2>

      <form>
        <div>
          <label htmlFor="nama-routine">Nama routine:</label>
          <input
            id="nama-routine"
            type="text"
            placeholder="Contoh: Upper Body A"
            value={props.namaBaru}
            onChange={(e) => props.setNamaBaru(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="fokus-routine">Fokus latihan:</label>
          <input
            id="fokus-routine"
            type="text"
            placeholder="Contoh: Biseps, bahu, dan triseps"
            value={props.fokusBaru}
            onChange={(e) => props.setFokusBaru(e.target.value)}
          />
        </div>

        <button type="button" onClick={props.tambahRoutine}>
          Tambah
        </button>
      </form>
    </section>
  );
}

export default FormRoutine;