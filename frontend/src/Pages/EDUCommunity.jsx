import {
  FaRocket,
  FaLightbulb,
  FaHandsHelping,
  FaRegSmileWink,
  FaRegHeart,
} from "react-icons/fa";
import { GiBookshelf, GiGraduateCap } from "react-icons/gi";
import { IoSparkles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const EDUData = [
  {
    name: "Scholarship Opportunities",
    image: "src/assets/profile1.webp",
    description:
      "Are there any scholarships available for international students applying to universities in Sri Lanka?",
    aosDelay: "0",
    icon: <GiGraduateCap className="text-white text-xl" />,
  },
  {
    name: "Effective Study Techniques",
    image: "src/assets/profile2.webp",
    description:
      "What are some proven study techniques to help with exam preparation and time management?",
    aosDelay: "300",
    icon: <FaLightbulb className="text-white text-xl" />,
  },
  {
    name: "University Applications",
    image: "src/assets/profile3.avif",
    description:
      "How can I improve my university application essay to increase my chances of acceptance?",
    aosDelay: "1000",
    icon: <GiBookshelf className="text-white text-xl" />,
  },
];

const EDUCommunity = () => {
  const navigate = useNavigate();
  return (
    <>
      <span id="about"></span>
      <div className="py-14 sm:pb-24 bg-gradient-to-b from-purple-50 to-white -mt-6">
        <div className="container mx-auto px-6 lg:px-16 py-12">
          {/* Header */}
          <div className="space-y-5 pb-12 text-center">
            <div
              data-aos="fade-up"
              className="flex items-center justify-center gap-3 mb-2"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-purple-100 rounded-full blur-lg opacity-60 animate-pulse"></div>
                <GiGraduateCap className="text-4xl text-purple-600 relative z-10" />
              </div>
              <h2 className="text-3xl font-bold text-purple-800 sm:text-4xl font-sans">
                SkillShare Learning Community
              </h2>
            </div>
            <p
              data-aos="fade-up"
              className="sm:px-60 text-purple-600 max-w-3xl mx-auto text-lg"
            >
              Collaborate with peers, share insights, and unlock academic
              success in our vibrant learning ecosystem.{" "}
              <span className="inline-block">📚</span>
            </p>

            <div
              className="flex justify-center mt-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="flex items-center gap-4 bg-purple-100 text-purple-800 px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300 border border-purple-200 ">
                <IoSparkles className="text-purple-500 animate-spin-slow" />
                <span className="font-medium">2.4k+ Active Members</span>
                <FaRegHeart className="animate-pulse text-purple-500" />
              </div>
            </div>
          </div>

          {/* Discussions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
            {EDUData.map((item) => (
              <div
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={item.aosDelay}
                className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden border border-purple-50"
              >
                <div className="absolute inset-0 bg-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="flex justify-center mb-6 relative">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="rounded-full w-24 h-24 border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300 object-cover"
                    />
                    <div className="absolute -bottom-2 right-0 bg-purple-500 p-3 rounded-full shadow-md transform group-hover:-translate-y-1 transition-transform duration-300">
                      {item.icon}
                    </div>
                  </div>
                </div>

                <div className="relative space-y-4">
                  <div className="bg-purple-50 p-4 rounded-xl mb-4 border border-purple-100">
                    <p className="text-purple-800 italic font-medium">
                      "{item.description}"
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold text-purple-800">
                      {item.name}
                    </h3>
                    <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors">
                      <span className="text-sm font-semibold">Explore</span>
                      <FaRocket className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center" data-aos="fade-up">
            <button
              onClick={() => navigate("/admin/users")} // ✅ Correct navigation
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <FaRegSmileWink className="text-xl animate-bounce" />
              Join Our Learning Circle
              <FaHandsHelping className="text-xl animate-pulse" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EDUCommunity;
