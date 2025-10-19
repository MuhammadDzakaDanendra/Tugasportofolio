"use client";
import { useState, useEffect } from "react";
import { uploadFile, getLatestImage } from "../action/foto";

interface UploadResult {
  foto: string;
  judul: string;
  sub_judul: string;
}

function Home() {
  const [hasil, setHasil] = useState<UploadResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the latest data from tb_home
  const fetchLatestData = async () => {
    try {
      setError(null);
      const data = await getLatestImage();
      if (data) {
        setHasil({
          foto: data.foto,
          judul: data.judul || "",
          sub_judul: data.sub_judul || "",
        });
      } else {
        setHasil(null);
      }
    } catch (error: any) {
      setError(error.message || "Failed to fetch latest data");
    }
  };

  // Fetch data on mount and listen for new uploads
  useEffect(() => {
    fetchLatestData();
    window.addEventListener("imageUploaded", fetchLatestData);
    return () => window.removeEventListener("imageUploaded", fetchLatestData);
  }, []);

  const handleSubmit = async (form: FormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await uploadFile(form);
      setHasil({
        foto: response.foto,
        judul: response.judul || "",
        sub_judul: response.sub_judul || "",
      });
      window.dispatchEvent(new Event("imageUploaded"));
    } catch (error: any) {
      setError(error.message || "An error occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-8 bg-gradient-to-br from-teal-100 to-blue-100 min-h-screen">
      <header className="mb-10">
        <h1 className="text-5xl font-bold text-teal-800 text-center tracking-wide">
          Galeri Keren
        </h1>
      </header>
      <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-200">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">Unggah Foto Baru</h2>
        <div className="flex justify-center">
          <form
            className="flex flex-col space-y-6 w-full max-w-md"
            action={handleSubmit}
          >
            <div>
              <label
                htmlFor="judul"
                className="block text-sm font-medium text-teal-800 mb-1"
              >
                Judul Foto
              </label>
              <input
                type="text"
                id="judul"
                name="judul"
                placeholder="Masukkan judul foto"
                className="border border-teal-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-teal-50/50 transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="sub_judul"
                className="block text-sm font-medium text-teal-800 mb-1"
              >
                Deskripsi
              </label>
              <input
                type="text"
                id="sub_judul"
                name="sub_judul"
                placeholder="Masukkan deskripsi foto"
                className="border border-teal-300 p-3 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-teal-500 bg-teal-50/50 transition duration-200"
              />
            </div>
            <div>
              <label
                htmlFor="foto"
                className="block text-sm font-medium text-teal-800 mb-1"
              >
                Pilih Foto
              </label>
              <input
                type="file"
                id="foto"
                name="foto"
                accept="image/*"
                required
                className="border border-teal-300 p-3 rounded-xl w-full file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-teal-600 file:text-white hover:file:bg-teal-700 transition duration-200"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-teal-600 text-white p-3 rounded-xl hover:bg-teal-700 disabled:bg-teal-400 disabled:cursor-not-allowed transition duration-200 font-semibold flex items-center justify-center"
            >
              {loading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Mengunggah...
                </span>
              ) : (
                "Unggah Foto"
              )}
            </button>
          </form>
        </div>
      </div>
      {error && (
        <div className="text-red-700 text-center mt-6 bg-red-100/80 p-4 rounded-xl shadow-md" role="alert">
          {error}
        </div>
      )}
      {hasil && (
        <div className="mt-10 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-teal-200">
          <h2 className="text-2xl font-bold text-teal-700 mb-6 text-center">Foto Terbaru</h2>
          <div className="text-center">
            <p className="text-lg text-teal-800 font-medium">Judul: {hasil.judul || "Tidak ada judul"}</p>
            <p className="text-lg text-teal-800 font-medium">Deskripsi: {hasil.sub_judul || "Tidak ada deskripsi"}</p>
            <img
              src={hasil.foto}
              alt="Uploaded image"
              className="w-full max-w-lg mt-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300 mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;