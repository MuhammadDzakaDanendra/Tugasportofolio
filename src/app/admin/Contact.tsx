"use client";

import { useState, useEffect } from "react";
import { updateContact, getLatestContact } from "@/app/action/Contact";

function ContactAdmin() {
  const [formData, setFormData] = useState({
    email: "",
    nomor: "",
    lokasi: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch data terbaru saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      const data = await getLatestContact();
      if (data) {
        setFormData({
          email: data.email || "",
          nomor: data.nomor || "",
          lokasi: data.lokasi || "",
        });
      }
    };
    fetchData();
  }, []);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submit form
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const submitForm = new FormData();
    submitForm.append("email", formData.email);
    submitForm.append("nomor", formData.nomor);
    submitForm.append("lokasi", formData.lokasi);

    try {
      const response = await updateContact(submitForm);
      if (response.status === "success") {
        setSuccess("Data contact berhasil disimpan");
      }
    } catch (err: any) {
      setError(err.message || "Gagal menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Contact Information</h1>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Contact"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="nomor"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nomor Telepon
            </label>
            <input
              type="text"
              id="nomor"
              name="nomor"
              value={formData.nomor}
              onChange={handleChange}
              placeholder="Nomor Telepon"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lokasi"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lokasi
            </label>
            <input
              type="text"
              id="lokasi"
              name="lokasi"
              value={formData.lokasi}
              onChange={handleChange}
              placeholder="Lokasi"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 font-semibold"
          >
            {loading ? "Saving..." : "Simpan Perubahan"}
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && <p className="text-green-500 text-center mt-4">{success}</p>}
      </div>
    </div>
  );
}

export default ContactAdmin;