import {
  FaAtom,
  FaBookOpen,
  FaBriefcase,
  FaCalculator,
  FaGlobeAsia,
  FaLaptopCode,
  FaLanguage,
  FaPenNib,
} from "react-icons/fa";

function Subjects() {
  const subjects = [
    {
      icon: <FaCalculator />,
      title: "Mathematics",
      description: "Learn algebra, geometry, calculus, and exam problem solving.",
    },
    {
      icon: <FaAtom />,
      title: "Science",
      description: "Physics, Chemistry, and Biology tutoring with clear concepts.",
    },
    {
      icon: <FaPenNib />,
      title: "English",
      description: "Improve grammar, writing, comprehension, and communication.",
    },
    {
      icon: <FaLanguage />,
      title: "Hindi",
      description: "Professional Hindi language tutoring for all school levels.",
    },
    {
      icon: <FaBookOpen />,
      title: "Urdu",
      description: "Experienced Urdu tutors for reading, writing, and fluency.",
    },
    {
      icon: <FaLaptopCode />,
      title: "Computer Science",
      description: "Programming, logic building, and computer fundamentals.",
    },
    {
      icon: <FaGlobeAsia />,
      title: "Social Studies",
      description: "History, Geography, Civics, and structured exam revision.",
    },
    {
      icon: <FaBriefcase />,
      title: "Commerce",
      description: "Accounts, Economics, and Business Studies guidance.",
    },
  ];

  return (
    <section className="subjects-page inner-page premium-section">
      <div className="container">
        <div className="inner-hero compact-inner-hero">
          <div>
            <span className="public-eyebrow">Our Subjects</span>
            <h1>Premium subject support for every class and goal.</h1>
            <p>
              Explore a wide range of subjects taught by experienced tutors who
              make learning practical, structured, and confidence-building.
            </p>
          </div>
        </div>

        <div className="subjects-page-grid">
          {subjects.map((subject) => (
            <div className="subject-page-card premium-card" key={subject.title}>
              <span className="feature-icon">{subject.icon}</span>
              <h3>{subject.title}</h3>
              <p>{subject.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Subjects;
