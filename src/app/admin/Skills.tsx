import { useState, useEffect } from "react";
import { skills, getLatestSkills } from "../action/skills";
import { Code, Server, Database, Globe } from "lucide-react";

interface FormDataState {
  keterangan1: string;
  keterangan2: string;
  keterangan3: string;
  keterangan4: string;
}

interface AboutResponse {
  status: string;
  keterangan1: string;
  keterangan2: string;
  keterangan3: string;
  keterangan4: string;
}

const About: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>({
    keterangan1: "",
    keterangan2: "",
    keterangan3: "",
    keterangan4: "",
  });
  const [initialSkills, setInitialSkills] = useState<FormDataState | null>(null);
  const [result, setResult] = useState<AboutResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);

        const latestSkills = await getLatestSkills();
        const skillsData: FormDataState = {
          keterangan1:
            latestSkills.keterangan1 ||
            "React,Next.js,Vue.js,TypeScript,Tailwind CSS,HTML5/CSS3",
          keterangan2:
            latestSkills.keterangan2 ||
            "Node.js,Express.js,Python,Django,PHP,Laravel",
          keterangan3:
            latestSkills.keterangan3 ||
            "MongoDB,PostgreSQL,MySQL,Redis,SQLite,Firebase",
          keterangan4:
            latestSkills.keterangan4 ||
            "Git,Docker,AWS,Vercel,Figma,Postman,Jenkins",
        };
        setFormData(skillsData);
        setInitialSkills(skillsData);
      } catch (err: any) {
        console.error("Error loading initial data:", err);
        setError("Failed to load initial data. Using default values.");
        const defaultSkills: FormDataState = {
          keterangan1:
            "React,Next.js,Vue.js,TypeScript,Tailwind CSS,HTML5/CSS3",
          keterangan2: "Node.js,Express.js,Python,Django,PHP,Laravel",
          keterangan3: "MongoDB,PostgreSQL,MySQL,Redis,SQLite,Firebase",
          keterangan4: "Git,Docker,AWS,Vercel,Figma,Postman,Jenkins",
        };
        setFormData(defaultSkills);
        setInitialSkills(defaultSkills);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedData: FormDataState = { ...prev, [name]: value };
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
      const response: AboutResponse = await skills(form);
      setResult(response);
      setInitialSkills(null);
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
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Keahlian Teknis</h2>
        <div className="space-y-6">
          {[
            { name: "keterangan1", title: "Frontend", icon: Code },
            { name: "keterangan2", title: "Backend", icon: Server },
            { name: "keterangan3", title: "Database", icon: Database },
            { name: "keterangan4", title: "Tools", icon: Globe },
          ].map((section, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <section.icon className="w-6 h-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
              </div>
              <input
                type="text"
                name={section.name}
                value={formData[section.name as keyof FormDataState]}
                onChange={handleChange}
                placeholder={`Enter ${section.title.toLowerCase()} skills (e.g., ${section.name === "keterangan1" ? "React,Next.js" : section.name === "keterangan2" ? "Node.js,Express.js" : section.name === "keterangan3" ? "MongoDB,PostgreSQL" : "Git,Docker"})`}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
              />
              <div className="mt-3 space-y-2">
                {(result?.[section.name as keyof AboutResponse] ||
                  initialSkills?.[section.name as keyof FormDataState] ||
                  formData[section.name as keyof FormDataState])
                  .split(",")
                  .map(
                    (skill, idx) =>
                      skill.trim() && (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-gray-600">{skill.trim()}</span>
                        </div>
                      )
                  )}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200 font-semibold"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default About;