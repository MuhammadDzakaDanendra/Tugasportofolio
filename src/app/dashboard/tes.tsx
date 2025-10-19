"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { login } from "@/app/action/auth";
import { getLatestImage } from "@/app/action/foto";
import { about, getLatestAbout } from "@/app/action/about";
import { getLatestSkills } from "@/app/action/skills";
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  ExternalLink,
  Code,
  Server,
  Database,
  Globe,
} from "lucide-react";

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
  const [isImageLoading, setIsImageLoading] = useState(true);
  const loginRef = useRef<HTMLDivElement>(null);

  // Function to fetch the latest image, judul, and sub_judul
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

  // Function to fetch the latest about data
  const fetchLatestAboutData = async () => {
    try {
      const data = await getLatestAbout();
      setLatestAbout(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Function to fetch the latest skills data
  const fetchLatestSkillsData = async () => {
    try {
      const data = await getLatestSkills();
      setLatestSkills(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Fetch data on mount and listen for events
  useEffect(() => {
    fetchLatestData();
    fetchLatestAboutData();
    fetchLatestSkillsData();
    window.addEventListener("imageUploaded", fetchLatestData);
    return () => {
      window.removeEventListener("imageUploaded", fetchLatestData);
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

  // Define skills data based on latestSkills, with fallback to static data
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

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Platform e-commerce lengkap dengan sistem pembayaran, manajemen inventory, dan dashboard admin.",
      tech: ["Next.js", "Node.js", "MongoDB", "Stripe"],
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Aplikasi manajemen tugas dengan fitur kolaborasi tim, real-time updates, dan tracking progress.",
      tech: ["React", "Express.js", "PostgreSQL", "Socket.io"],
      image:
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
    },
    {
      id: 3,
      title: "Learning Management System",
      description:
        "Platform pembelajaran online dengan video streaming, quiz interaktif, dan progress tracking.",
      tech: ["Vue.js", "Django", "MySQL", "AWS S3"],
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop",
      demo: "#",
      github: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/90 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center relative">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Muhammad Dzaki Hasyim
            </div>
            <div className="flex items-center space-x-8">
              <div className="hidden md:flex space-x-8">
                {["home", "about", "skills", "projects", "contact"].map(
                  (item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className={`capitalize hover:text-purple-400 transition-colors ${
                        activeSection === item ? "text-purple-400" : ""
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
              </div>
              <div className="relative" ref={loginRef}>
                <button
                  className="ml-4 px-6 py-2 bg-purple-600 hover:bg-pink-600 text-white rounded-full font-semibold shadow transition-all"
                  onClick={() => setShowLogin((prev) => !prev)}
                >
                  Login
                </button>
                {showLogin && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-lg p-6 z-50">
                    <h3 className="text-lg font-semibold mb-4 text-purple-400">
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
                          className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-purple-400"
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
                          className="w-full px-4 py-2 rounded bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-purple-400"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full py-2 bg-purple-600 hover:bg-pink-600 rounded text-white font-semibold transition-all"
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
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
        <div className="text-center z-10 px-6">
          <div className="mb-8">
            <div className="relative w-32 h-32 mx-auto mb-6 rounded-full shadow-2xl overflow-hidden">
              {isImageLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-800">
                  <svg
                    className="animate-spin h-8 w-8 text-purple-400"
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
                  src={latestData?.foto || "/portofolio.png"}
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            {latestData?.judul || "Fullstack Developer"}
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto">
            {latestData?.sub_judul ||
              "Membangun solusi web modern dengan teknologi terdepan dan pengalaman pengguna yang luar biasa"}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all shadow-lg"
            >
              Lihat Proyek Saya
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 border-2 border-purple-400 rounded-full font-semibold hover:bg-purple-400 hover:text-slate-900 transition-all"
            >
              Hubungi Saya
            </button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tentang Saya
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {latestAbout?.text1 ||
                  "Saya adalah seorang fullstack developer dengan pengalaman lebih dari 5 tahun dalam membangun aplikasi web yang efisien dan user-friendly."}
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                {latestAbout?.text2 ||
                  "Dengan keahlian di frontend dan backend development, saya mampu menangani proyek dari konsep hingga deployment. Saya selalu mengikuti perkembangan teknologi terbaru dan menerapkan best practices dalam setiap proyek."}
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span>{latestAbout?.lokasi || "Indonesia"}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>
                    {latestAbout?.email || "muhammaddzakihasyim@gmail.com"}
                  </span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
                <Code className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {latestAbout?.kotak1_1 || "Frontend"}
                </h3>
                <p className="text-slate-400">
                  {latestAbout?.kotak1_2 ||
                    " UI/UX yang responsif dan interaktif"}
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
                <Server className="w-10 h-10 text-pink-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {latestAbout?.kotak2_1 || "Backend"}
                </h3>
                <p className="text-slate-400">
                  {latestAbout?.kotak2_2 || "API yang robust dan scalable"}
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
                <Database className="w-10 h-10 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {latestAbout?.kotak3_1 || "Database"}
                </h3>
                <p className="text-slate-400">
                  {latestAbout?.kotak3_2 || "Desain dan optimasi database"}
                </p>
              </div>
              <div className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700">
                <Globe className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {latestAbout?.kotak4_1 || "Deployment"}
                </h3>
                <p className="text-slate-400">
                  {latestAbout?.kotak4_2 || "Cloud hosting dan DevOps"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Keahlian Teknis
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div
                key={category}
                className="bg-slate-800/50 p-6 rounded-xl backdrop-blur-sm border border-slate-700"
              >
                <h3 className="text-xl font-semibold mb-4 capitalize text-purple-400">
                  {category}
                </h3>
                <div className="space-y-2">
                  {skillList.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                      <span className="text-slate-300">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Proyek Unggulan
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-slate-700 hover:transform hover:scale-105 transition-all duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.demo}
                      className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm">Demo</span>
                    </a>
                    <a
                      href={project.github}
                      className="flex items-center space-x-1 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm">Code</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Mari Berkolaborasi
          </h2>
          <p className="text-xl text-slate-300 mb-12">
            Punya proyek menarik? Mari diskusikan bagaimana saya bisa membantu
            mewujudkan ide Anda
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold">Email</h3>
                <p className="text-slate-400">
                  {latestAbout?.email || "developer@email.com"}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold">WhatsApp</h3>
                <p className="text-slate-400">+62 123 456 7890</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-semibold">Lokasi</h3>
                <p className="text-slate-400">
                  {latestAbout?.lokasi || "Indonesia"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-slate-700">
        <div className="max-w-6xl mx-auto text-center text-slate-400">
          <p>
            &copy; 2025 Fullstack Developer Portfolio. Dibuat dengan ❤️
            menggunakan Next.js & Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
