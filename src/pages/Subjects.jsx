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
      art: "math",
      title: "Mathematics",
      description: "Learn algebra, geometry, calculus, and exam problem solving.",
    },
    {
      icon: <FaAtom />,
      art: "science",
      title: "Science",
      description: "Physics, Chemistry, and Biology tutoring with clear concepts.",
    },
    {
      icon: <FaPenNib />,
      art: "english",
      title: "English",
      description: "Improve grammar, writing, comprehension, and communication.",
    },
    {
      icon: <FaLanguage />,
      art: "hindi",
      title: "Hindi",
      description: "Professional Hindi language tutoring for all school levels.",
    },
    {
      icon: <FaBookOpen />,
      art: "urdu",
      title: "Urdu",
      description: "Experienced Urdu tutors for reading, writing, and fluency.",
    },
    {
      icon: <FaLaptopCode />,
      art: "cs",
      title: "Computer Science",
      description: "Programming, logic building, and computer fundamentals.",
    },
    {
      icon: <FaGlobeAsia />,
      art: "sst",
      title: "Social Studies",
      description: "History, Geography, Civics, and structured exam revision.",
    },
    {
      icon: <FaBriefcase />,
      art: "commerce",
      title: "Commerce",
      description: "Accounts, Economics, and Business Studies guidance.",
    },
  ];

  return (
    <section className="subjects-page inner-page premium-section cartoon-subjects-bg">
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
            <div className={`subject-page-card premium-card subject-art-${subject.art}`} key={subject.title}>
              <span className="subject-cartoon-icon" aria-hidden="true"></span>
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
