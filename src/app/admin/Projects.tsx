"use client";
import { useState, useEffect } from "react";
import { projects, getLatestProjects } from "../action/Projects";

interface ProjectData {
  gambar: string;
  judul: string;
  sub_judul: string;
  bahasa: string;
}

interface ProjectsResult {
  project1: ProjectData | null;
  project2: ProjectData | null;
  project3: ProjectData | null;
}

function Home() {
  const [hasil, setHasil] = useState<ProjectsResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch the latest data from tb_proyek1, tb_proyek2, tb_proyek3
  const fetchLatestData = async () => {
    try {
      setError(null);
      const data = await getLatestProjects();
      setHasil(data);
    } catch (error: any) {
      setError(error.message || "Failed to fetch latest projects data");
    }
  };

  // Fetch data on mount and listen for new uploads
  useEffect(() => {
    fetchLatestData();
    window.addEventListener("projectsUploaded", fetchLatestData);
    return () =>
      window.removeEventListener("projectsUploaded", fetchLatestData);
  }, []);

  const handleSubmit = async (form: FormData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await projects(form);
      setHasil({
        project1: response.project1,
        project2: response.project2,
        project3: response.project3,
      });
      window.dispatchEvent(new Event("projectsUploaded"));
    } catch (error: any) {
      setError(error.message || "An error occurred during upload");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-6 bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
      <div className="flex justify-center mb-8">
        <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight">
          UPLOAD Projects
        </h1>
      </div>
      <div className="flex justify-center">
        <form
          className="flex flex-col space-y-6 w-full max-w-3xl bg-white p-8 rounded-xl shadow-lg"
          action={handleSubmit}
        >
          {/* Project 1 */}
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Project 1</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="judul1"
                  className="block text-sm font-medium text-gray-800"
                >
                  Judul
                </label>
                <input
                  type="text"
                  id="judul1"
                  name="judul1"
                  placeholder="Judul Project 1"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="sub_judul1"
                  className="block text-sm font-medium text-gray-800"
                >
                  Sub Judul
                </label>
                <input
                  type="text"
                  id="sub_judul1"
                  name="sub_judul1"
                  placeholder="Sub Judul Project 1"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="bahasa1"
                  className="block text-sm font-medium text-gray-800"
                >
                  Bahasa
                </label>
                <input
                  type="text"
                  id="bahasa1"
                  name="bahasa1"
                  placeholder="Bahasa Project 1"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="gambar1"
                  className="block text-sm font-medium text-gray-800"
                >
                  Pilih Gambar
                </label>
                <input
                  type="file"
                  id="gambar1"
                  name="gambar1"
                  accept="image/*"
                  className="border border-gray-300 p-3 rounded-lg w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Project 2</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="judul2"
                  className="block text-sm font-medium text-gray-800"
                >
                  Judul
                </label>
                <input
                  type="text"
                  id="judul2"
                  name="judul2"
                  placeholder="Judul Project 2"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="sub_judul2"
                  className="block text-sm font-medium text-gray-800"
                >
                  Sub Judul
                </label>
                <input
                  type="text"
                  id="sub_judul2"
                  name="sub_judul2"
                  placeholder="Sub Judul Project 2"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="bahasa2"
                  className="block text-sm font-medium text-gray-800"
                >
                  Bahasa
                </label>
                <input
                  type="text"
                  id="bahasa2"
                  name="bahasa2"
                  placeholder="Bahasa Project 2"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="gambar2"
                  className="block text-sm font-medium text-gray-800"
                >
                  Pilih Gambar
                </label>
                <input
                  type="file"
                  id="gambar2"
                  name="gambar2"
                  accept="image/*"
                  className="border border-gray-300 p-3 rounded-lg w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition duration-200"
                />
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div className="border border-gray-200 p-6 rounded-lg bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Project 3</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="judul3"
                  className="block text-sm font-medium text-gray-800"
                >
                  Judul
                </label>
                <input
                  type="text"
                  id="judul3"
                  name="judul3"
                  placeholder="Judul Project 3"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="sub_judul3"
                  className="block text-sm font-medium text-gray-800"
                >
                  Sub Judul
                </label>
                <input
                  type="text"
                  id="sub_judul3"
                  name="sub_judul3"
                  placeholder="Sub Judul Project 3"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="bahasa3"
                  className="block text-sm font-medium text-gray-800"
                >
                  Bahasa
                </label>
                <input
                  type="text"
                  id="bahasa3"
                  name="bahasa3"
                  placeholder="Bahasa Project 3"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="gambar3"
                  className="block text-sm font-medium text-gray-800"
                >
                  Pilih Gambar
                </label>
                <input
                  type="file"
                  id="gambar3"
                  name="gambar3"
                  accept="image/*"
                  className="border border-gray-300 p-3 rounded-lg w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition duration-200"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition duration-200 font-semibold"
          >
            {loading ? (
              <span className="flex items-center justify-center">
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
                Uploading...
              </span>
            ) : (
              "Upload Projects"
            )}
          </button>
        </form>
      </div>
      {error && (
        <div className="text-red-600 text-center mt-6 font-medium bg-red-50 p-4 rounded-lg" role="alert">
          {error}
        </div>
      )}
      {hasil && (
        <div className="mt-8 space-y-8">
          <h2 className="text-3xl font-semibold text-indigo-700">Data Terbaru</h2>
          {hasil.project1 && (
            <div className="border border-gray-200 p-6 rounded-lg bg-white shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600">Project 1</h3>
              <p className="text-lg text-gray-700">
                Judul: {hasil.project1.judul || "Tidak ada judul"}
              </p>
              <p className="text-lg text-gray-700">
                Sub Judul: {hasil.project1.sub_judul || "Tidak ada sub judul"}
              </p>
              <p className="text-lg text-gray-700">
                Bahasa: {hasil.project1.bahasa || "Tidak ada bahasa"}
              </p>
              <img
                src={hasil.project1.gambar}
                alt="Project 1 image"
                className="w-full max-w-lg mt-4 rounded-lg shadow-md hover:scale-105 transition duration-300"
              />
            </div>
          )}
          {hasil.project2 && (
            <div className="border border-gray-200 p-6 rounded-lg bg-white shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600">Project 2</h3>
              <p className="text-lg text-gray-700">
                Judul: {hasil.project2.judul || "Tidak ada judul"}
              </p>
              <p className="text-lg text-gray-700">
                Sub Judul: {hasil.project2.sub_judul || "Tidak ada sub judul"}
              </p>
              <p className="text-lg text-gray-700">
                Bahasa: {hasil.project2.bahasa || "Tidak ada bahasa"}
              </p>
              <img
                src={hasil.project2.gambar}
                alt="Project 2 image"
                className="w-full max-w-lg mt-4 rounded-lg shadow-md hover:scale-105 transition duration-300"
              />
            </div>
          )}
          {hasil.project3 && (
            <div className="border border-gray-200 p-6 rounded-lg bg-white shadow-md">
              <h3 className="text-xl font-semibold text-indigo-600">Project 3</h3>
              <p className="text-lg text-gray-700">
                Judul: {hasil.project3.judul || "Tidak ada judul"}
              </p>
              <p className="text-lg text-gray-700">
                Sub Judul: {hasil.project3.sub_judul || "Tidak ada sub judul"}
              </p>
              <p className="text-lg text-gray-700">
                Bahasa: {hasil.project3.bahasa || "Tidak ada bahasa"}
              </p>
              <img
                src={hasil.project3.gambar}
                alt="Project 3 image"
                className="w-full max-w-lg mt-4 rounded-lg shadow-md hover:scale-105 transition duration-300"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;