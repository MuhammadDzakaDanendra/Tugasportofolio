"use client";
import { useState, useEffect } from "react";
import { about, getLatestAbout } from "../action/about";

interface FormDataState {
  text1: string;
  text2: string;
  lokasi: string;
  email: string;
  kotak1_1: string;
  kotak1_2: string;
  kotak2_1: string;
  kotak2_2: string;
  kotak3_1: string;
  kotak3_2: string;
  kotak4_1: string;
  kotak4_2: string;
}

interface AboutResponse {
  status: string;
  text1: string;
  text2: string;
  lokasi: string;
  email: string;
  kotak1_1: string;
  kotak1_2: string;
  kotak2_1: string;
  kotak2_2: string;
  kotak3_1: string;
  kotak3_2: string;
  kotak4_1: string;
  kotak4_2: string;
}

export default function About() {
  const [formData, setFormData] = useState<FormDataState>({
    text1: "",
    text2: "",
    lokasi: "",
    email: "",
    kotak1_1: "",
    kotak1_2: "",
    kotak2_1: "",
    kotak2_2: "",
    kotak3_1: "",
    kotak3_2: "",
    kotak4_1: "",
    kotak4_2: "",
  });
  const [result, setResult] = useState<AboutResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const latestAbout = await getLatestAbout();
        if (latestAbout) {
          setFormData({
            text1:
              latestAbout.text1 ||
              "Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web yang efisien dan user-friendly.",
            text2:
              latestAbout.text2 ||
              "Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.",
            lokasi: latestAbout.lokasi || "Indonesia",
            email: latestAbout.email || "muhammaddzakihasyim@gmail.com",
            kotak1_1: latestAbout.kotak1_1 || "Frontend",
            kotak1_2:
              latestAbout.kotak1_2 || "UI/UX yang responsif dan interaktif",
            kotak2_1: latestAbout.kotak2_1 || "Backend",
            kotak2_2: latestAbout.kotak2_2 || "API yang robust dan scalable",
            kotak3_1: latestAbout.kotak3_1 || "Database",
            kotak3_2: latestAbout.kotak3_2 || "Desain dan optimasi database",
            kotak4_1: latestAbout.kotak4_1 || "Deployment",
            kotak4_2: latestAbout.kotak4_2 || "Cloud hosting dan DevOps",
          });
        } else {
          setFormData({
            text1:
              "Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web yang efisien dan user-friendly.",
            text2:
              "Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.",
            lokasi: "Indonesia",
            email: "muhammaddzakihasyim@gmail.com",
            kotak1_1: "Frontend",
            kotak1_2: "UI/UX yang responsif dan interaktif",
            kotak2_1: "Backend",
            kotak2_2: "API yang robust dan scalable",
            kotak3_1: "Database",
            kotak3_2: "Desain dan optimasi database",
            kotak4_1: "Deployment",
            kotak4_2: "Cloud hosting dan DevOps",
          });
        }
      } catch (err: any) {
        console.error("Error loading initial data:", err);
        setError("Failed to load initial data. Using default values.");
        setFormData({
          text1:
            "Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web yang efisien dan user-friendly.",
          text2:
            "Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek.",
          lokasi: "Indonesia",
          email: "muhammaddzakihasyim@gmail.com",
          kotak1_1: "Frontend",
          kotak1_2: "UI/UX yang responsif dan interaktif",
          kotak2_1: "Backend",
          kotak2_2: "API yang robust dan scalable",
          kotak3_1: "Database",
          kotak3_2: "Desain dan optimasi database",
          kotak4_1: "Deployment",
          kotak4_2: "Cloud hosting dan DevOps",
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      localStorage.setItem("aboutFormData", JSON.stringify(updatedData));
      return updatedData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => form.append(key, value));

    try {
      setLoading(true);
      setError(null);
      const response = await about(form);
      setResult(response);
    } catch (err: any) {
      setError(err.message || "An error occurred during submission");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Information</h1>
        <div onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
              <input
                type="text"
                name="text1"
                value={formData.text1}
                onChange={handleChange}
                placeholder="Introduction"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="text2"
                value={formData.text2}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                name="lokasi"
                value={formData.lokasi}
                onChange={handleChange}
                placeholder="Location"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name1: "kotak1_1", name2: "kotak1_2", placeholder1: "Skill 1 Title", placeholder2: "Skill 1 Description" },
              { name1: "kotak2_1", name2: "kotak2_2", placeholder1: "Skill 2 Title", placeholder2: "Skill 2 Description" },
              { name1: "kotak3_1", name2: "kotak3_2", placeholder1: "Skill 3 Title", placeholder2: "Skill 3 Description" },
              { name1: "kotak4_1", name2: "kotak4_2", placeholder1: "Skill 4 Title", placeholder2: "Skill 4 Description" },
            ].map((kotak, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill {index + 1} Title</label>
                <input
                  type="text"
                  name={kotak.name1}
                  value={formData[kotak.name1 as keyof FormDataState]}
                  onChange={handleChange}
                  placeholder={kotak.placeholder1}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 mb-3 transition duration-200"
                />
                <label className="block text-sm font-medium text-gray-700 mb-1">Skill {index + 1} Description</label>
                <input
                  type="text"
                  name={kotak.name2}
                  value={formData[kotak.name2 as keyof FormDataState]}
                  onChange={handleChange}
                  placeholder={kotak.placeholder2}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 transition duration-200 font-semibold"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        {result && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Submission Result</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p><span className="font-medium">Introduction:</span> {result.text1}</p>
              <p><span className="font-medium">Description:</span> {result.text2}</p>
              <p><span className="font-medium">Location:</span> {result.lokasi}</p>
              <p><span className="font-medium">Email:</span> {result.email}</p>
              <p><span className="font-medium">Skill 1 Title:</span> {result.kotak1_1}</p>
              <p><span className="font-medium">Skill 1 Description:</span> {result.kotak1_2}</p>
              <p><span className="font-medium">Skill 2 Title:</span> {result.kotak2_1}</p>
              <p><span className="font-medium">Skill 2 Description:</span> {result.kotak2_2}</p>
              <p><span className="font-medium">Skill 3 Title:</span> {result.kotak3_1}</p>
              <p><span className="font-medium">Skill 3 Description:</span> {result.kotak3_2}</p>
              <p><span className="font-medium">Skill 4 Title:</span> {result.kotak4_1}</p>
              <p><span className="font-medium">Skill 4 Description:</span> {result.kotak4_2}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}