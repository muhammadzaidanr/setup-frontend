import { useEffect, useState } from "react";
import CardRoutine from "./CardRoutine";

function ReferensiRoutine() {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [percobaan, setPercobaan] = useState(0);
  const [simulasiError, setSimulasiError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    let aktif = true;

    async function ambilRoutine() {
      setLoading(true);
      setError("");
      setRoutines([]);

      const timeout = setTimeout(() => {
        controller.abort();
      }, 15000);

      try {
        // Endpoint salah dipakai hanya untuk simulasi error.
        const endpoint = simulasiError
          ? `${import.meta.env.BASE_URL}api/tidak-ada.json`
          : `${import.meta.env.BASE_URL}api/routines.json`;

        const response = await fetch(endpoint, {
          signal: controller.signal,
          cache: "no-store",
        });

        // fetch tidak otomatis menganggap HTTP 404/500 sebagai error.
        if (!response.ok) {
          throw new Error(`Permintaan gagal: HTTP ${response.status}.`);
        }

        // Vite dapat mengembalikan HTML untuk alamat yang tidak tersedia.
        const contentType = response.headers.get("content-type") || "";

        if (!contentType.includes("application/json")) {
          throw new Error("Endpoint tidak mengembalikan data JSON.");
        }

        const data = await response.json();

        const valid =
          Array.isArray(data) &&
          data.every(
            (item) =>
              item !== null &&
              Number.isInteger(item.id) &&
              typeof item.nama === "string" &&
              typeof item.fokus === "string"
          ) &&
          new Set(data.map((item) => item.id)).size === data.length;

        if (!valid) {
          throw new Error("Format data routine tidak valid.");
        }

        if (aktif) {
          setRoutines(data);
        }
      } catch (err) {
        if (aktif) {
          setError(
            err.name === "AbortError"
              ? "Permintaan terlalu lama. Silakan coba lagi."
              : `Gagal memuat referensi routine. ${err.message}`
          );
        }
      } finally {
        clearTimeout(timeout);

        if (aktif) {
          setLoading(false);
        }
      }
    }

    ambilRoutine();

    // Hentikan request saat komponen dilepas atau request diganti.
    return () => {
      aktif = false;
      controller.abort();
    };
  }, [percobaan, simulasiError]);

  function cobaLagi() {
    setSimulasiError(false);
    setPercobaan((nilai) => nilai + 1);
  }

  function jalankanSimulasiError() {
    setSimulasiError(true);
    setPercobaan((nilai) => nilai + 1);
  }

  return (
    <section
      aria-labelledby="judul-referensi"
      aria-busy={loading}
      style={{ marginTop: "32px", padding: "20px" }}
    >
      <h2 id="judul-referensi">Referensi Routine</h2>
      <p>Contoh routine dari mock API untuk menyusun latihanmu.</p>

      {loading && (
        <p role="status" style={{ marginTop: "16px" }}>
          Memuat referensi routine...
        </p>
      )}

      {!loading && error && (
        <div role="alert" style={{ marginTop: "16px" }}>
          <p style={{ color: "#d32f2f" }}>{error}</p>
          <button type="button" onClick={cobaLagi}>
            Coba Lagi
          </button>
        </div>
      )}

      {!loading && !error && (
        <div>
          <p role="status" style={{ marginTop: "16px" }}>
            Berhasil memuat {routines.length} referensi routine.
          </p>

          {routines.length === 0 ? (
            <p>Belum ada referensi routine.</p>
          ) : (
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: "12px",
              }}
            >
              {routines.map((routine) => (
                <li
                  key={routine.id}
                  style={{
                    border: "1px solid #aaa",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <CardRoutine
                    nama={routine.nama}
                    fokus={routine.fokus}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "16px",
          flexWrap: "wrap",
        }}
      >
        <button type="button" onClick={cobaLagi} disabled={loading}>
          Muat Ulang
        </button>

        <button
          type="button"
          onClick={jalankanSimulasiError}
          disabled={loading}
        >
          Simulasi Error
        </button>
      </div>
    </section>
  );
}

export default ReferensiRoutine;