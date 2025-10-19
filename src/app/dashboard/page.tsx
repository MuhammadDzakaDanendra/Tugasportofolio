"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { login } from "@/app/action/auth";
import { getLatestImage } from "@/app/action/foto";
import { about, getLatestAbout } from "@/app/action/about";
import { getLatestSkills } from "@/app/action/skills";
import { getLatestProjects } from "@/app/action/Projects";
import { getLatestContact } from "@/app/action/Contact";
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Code,
  Server,
  Database,
  Globe,
} from "lucide-react";

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

export default function PortfolioWebsite() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [latestData, setLatestData] = useState<{
    foto: string;
    judul: string;
    sub_judul: string;
  } | null>(null);
  const [latestAbout, setLatestAbout] = useState<{
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
  } | null>(null);
  const [latestSkills, setLatestSkills] = useState<{
    keterangan1: string | null;
    keterangan2: string | null;
    keterangan3: string | null;
    keterangan4: string | null;
  } | null>(null);
  const [latestProjects, setLatestProjects] = useState<ProjectsResult | null>(
    null
  );
  const [latestContact, setLatestContact] = useState<{
    email: string;
    nomor: string;
    lokasi: string;
  } | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const loginRef = useRef<HTMLDivElement>(null);

  const fetchLatestData = async () => {
    try {
      setIsImageLoading(true);
      const data = await getLatestImage();
      setLatestData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsImageLoading(false);
    }
  };

  const fetchLatestAboutData = async () => {
    try {
      const data = await getLatestAbout();
      setLatestAbout(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchLatestSkillsData = async () => {
    try {
      const data = await getLatestSkills();
      setLatestSkills(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchLatestProjectsData = async () => {
    try {
      const data = await getLatestProjects();
      setLatestProjects(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const fetchLatestContactData = async () => {
    try {
      const data = await getLatestContact();
      setLatestContact(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchLatestData();
    fetchLatestAboutData();
    fetchLatestSkillsData();
    fetchLatestProjectsData();
    fetchLatestContactData();
    window.addEventListener("imageUploaded", fetchLatestData);
    window.addEventListener("projectsUploaded", fetchLatestProjectsData);
    return () => {
      window.removeEventListener("imageUploaded", fetchLatestData);
      window.removeEventListener("projectsUploaded", fetchLatestProjectsData);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      const response = await login(form);
      if (response?.error) {
        setError(response.error);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAboutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    try {
      await about(form);
      fetchLatestAboutData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        loginRef.current &&
        !loginRef.current.contains(event.target as Node)
      ) {
        setShowLogin(false);
      }
    }
    if (showLogin) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showLogin]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
  };

  const skills = {
    frontend: latestSkills?.keterangan1
      ?.split(",")
      .map((item) => item.trim())
      .filter((item) => item) || [
      "React",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML5/CSS3",
    ],
    backend: latestSkills?.keterangan2
      ?.split(",")
      .map((item) => item.trim())
      .filter((item) => item) || [
      "Node.js",
      "Express.js",
      "Python",
      "Django",
      "PHP",
      "Laravel",
    ],
    database: latestSkills?.keterangan3
      ?.split(",")
      .map((item) => item.trim())
      .filter((item) => item) || [
      "MongoDB",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Firebase",
    ],
    tools: latestSkills?.keterangan4
      ?.split(",")
      .map((item) => item.trim())
      .filter((item) => item) || [
      "Git",
      "Docker",
      "AWS",
      "Vercel",
      "Figma",
      "Postman",
    ],
  };

  const projects = latestProjects
    ? [
        latestProjects.project1 && {
          id: 1,
          title: latestProjects.project1.judul || "Project 1",
          description:
            latestProjects.project1.sub_judul || "No description available",
          tech: latestProjects.project1.bahasa
            ?.split(",")
            .map((item) => item.trim())
            .filter((item) => item) || ["Unknown"],
          image: latestProjects.project1.gambar || "/placeholder.jpg",
        },
        latestProjects.project2 && {
          id: 2,
          title: latestProjects.project2.judul || "Project 2",
          description:
            latestProjects.project2.sub_judul || "No description available",
          tech: latestProjects.project2.bahasa
            ?.split(",")
            .map((item) => item.trim())
            .filter((item) => item) || ["Unknown"],
          image: latestProjects.project2.gambar || "/placeholder.jpg",
        },
        latestProjects.project3 && {
          id: 3,
          title: latestProjects.project3.judul || "Project 3",
          description:
            latestProjects.project3.sub_judul || "No description available",
          tech: latestProjects.project3.bahasa
            ?.split(",")
            .map((item) => item.trim())
            .filter((item) => item) || ["Unknown"],
          image: latestProjects.project3.gambar || "/placeholder.jpg",
        },
      ].filter(
        (project): project is NonNullable<typeof project> => project !== null
      )
    : [];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 shadow-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-3xl font-bold text-blue-600">
              Muhammad Dzaka Danendra
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`capitalize text-lg font-medium hover:text-blue-600 transition-colors ${
                        activeSection === item ? "text-blue-600 underline underline-offset-4" : ""
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              <div className="relative" ref={loginRef}>
                <button
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
                  onClick={() => setShowLogin((prev) => !prev)}
                >
                  Login
                </button>
                {showLogin && (
                  <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg p-6 z-50">
                    <h3 className="text-xl font-semibold mb-4 text-blue-600">
                      Login
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={loginData.email}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <div>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={(e) =>
                            setLoginData({
                              ...loginData,
                              password: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-gray-900 border border-gray-300 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all"
                      >
                        Masuk
                      </button>
                      {error && <p className="text-red-500 text-sm">{error}</p>}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative bg-gray-50"
      >
        <div className="text-center z-10 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="mb-10">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-blue-600 shadow-lg">
              {isImageLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <svg
                    className="animate-spin h-8 w-8 text-blue-600"
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
                </div>
              ) : (
                <Image
                  src={latestData?.foto || ""}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900">
            {latestData?.judul || "Fullstack Developer"}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            {latestData?.sub_judul ||
              "Membangun solusi web modern dengan teknologi terdepan dan pengalaman pengguna yang luar biasa"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all"
            >
              Lihat Proyek Saya
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-medium transition-all"
            >
              Hubungi Saya
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-blue-600" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Tentang Saya
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                {latestAbout?.text1 ||
                  "Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web yang efisien dan user-friendly."}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                {latestAbout?.text2 ||
                  "Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek."}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">{latestAbout?.lokasi || "Indonesia"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-600">
                    {latestAbout?.email || "danendramd@gmail.com"}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-6 rounded-lg">
                <Code className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {latestAbout?.kotak1_1 || "Frontend"}
                </h3>
                <p className="text-gray-600">
                  {latestAbout?.kotak1_2 ||
                    " UI/UX yang responsif dan interaktif"}
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <Server className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {latestAbout?.kotak2_1 || "Backend"}
                </h3>
                <p className="text-gray-600">
                  {latestAbout?.kotak2_2 || "API yang robust dan scalable"}
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <Database className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {latestAbout?.kotak3_1 || "Database"}
                </h3>
                <p className="text-gray-600">
                  {latestAbout?.kotak3_2 || "Desain dan optimasi database"}
                </p>
              </div>
              <div className="bg-gray-100 p-6 rounded-lg">
                <Globe className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {latestAbout?.kotak4_1 || "Deployment"}
                </h3>
                <p className="text-gray-600">
                  {latestAbout?.kotak4_2 || "Cloud hosting dan DevOps"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Keahlian Teknis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(skills).map(([category, skillList]) => (
              <div
                key={category}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
              >
                <h3 className="text-xl font-semibold mb-4 capitalize text-gray-900">
                  {category}
                </h3>
                <div className="space-y-3">
                  {skillList.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-600">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Proyek Unggulan
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {projects.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-gray-900">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">
              Tidak ada proyek yang tersedia saat ini.
            </p>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-900">
            Hubungi saya
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Hubungi kalau mau yah!
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="text-gray-600">
                  {latestContact?.email || "developer@email.com"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                <p className="text-gray-600">
                  {latestContact?.nomor || "+62 123 456 7890"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lokasi</h3>
                <p className="text-gray-600">
                  {latestContact?.lokasi || "Indonesia"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6 text-gray-900 hover:text-white" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6 text-gray-900 hover:text-white" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
    </div>
  );
}