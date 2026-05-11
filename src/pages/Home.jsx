import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBookOpen,
  FaBrain,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaClock,
  FaLaptopCode,
  FaLanguage,
  FaMapMarkerAlt,
  FaMicroscope,
  FaQuoteLeft,
  FaShieldAlt,
  FaStar,
  FaUserGraduate,
  FaUsers,
} from "react-icons/fa";

function Home() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Tutors",
      text: "Every tutor profile is reviewed for experience, subject strength, and teaching quality.",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Local Matching",
      text: "Find tutors near your area for smoother schedules and reliable home tuition.",
    },
    {
      icon: <FaClock />,
      title: "Fast Response",
      text: "Share your requirement and get matched with suitable tutors without long waiting.",
    },
    {
      icon: <FaUsers />,
      title: "Parent Friendly",
      text: "Clear communication, flexible plans, and support designed for busy families.",
    },
  ];

  const subjects = [
    { icon: <FaBrain />, title: "Mathematics", text: "Algebra, geometry, calculus" },
    { icon: <FaMicroscope />, title: "Science", text: "Physics, chemistry, biology" },
    { icon: <FaBookOpen />, title: "English", text: "Grammar, writing, fluency" },
    { icon: <FaLanguage />, title: "Languages", text: "Hindi, Urdu, communication" },
    { icon: <FaLaptopCode />, title: "Computer Science", text: "Coding and fundamentals" },
    { icon: <FaChalkboardTeacher />, title: "Commerce", text: "Accounts and economics" },
  ];

  const tutors = [
    {
      name: "Rahul Sharma",
      subject: "Mathematics Tutor",
      image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=420&q=80",
      meta: "5+ Years Experience",
    },
    {
      name: "Priya Verma",
      subject: "Science Tutor",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=420&q=80",
      meta: "7+ Years Experience",
    },
    {
      name: "Ahmed Khan",
      subject: "English Tutor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=420&q=80",
      meta: "4+ Years Experience",
    },
  ];

  return (
    <>
      <section className="hero public-hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <span className="public-eyebrow">
              <FaStar />
              Premium home tuition network
            </span>

            <h1>Find the right tutor for confident, focused learning.</h1>

            <p>
              TuitionLelo connects students with verified home tutors for every
              class, subject, and learning goal.
            </p>

            <div className="hero-buttons">
              <Link to="/student-request" className="hero-btn">
                Book a Tutor
                <FaArrowRight />
              </Link>

              <Link to="/tutor-register" className="hero-btn secondary-btn">
                Become a Tutor
              </Link>
            </div>

            <div className="hero-trust-row">
              <span><FaCheckCircle /> Verified educators</span>
              <span><FaCheckCircle /> Flexible home classes</span>
              <span><FaCheckCircle /> Fast local matching</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80"
              alt="Students learning together"
            />

            <div className="hero-floating-card card-one">
              <FaUserGraduate />
              <div>
                <strong>2.4k+</strong>
                <span>Students guided</span>
              </div>
            </div>

            <div className="hero-floating-card card-two">
              <FaChalkboardTeacher />
              <div>
                <strong>850+</strong>
                <span>Verified tutors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-section premium-section">
        <div className="container">
          <div className="section-title">
            <span className="public-eyebrow">Why TuitionLelo</span>
            <h2>Designed for parents who want clarity and quality.</h2>
            <p>
              A cleaner way to discover trusted tutors, compare needs, and
              start learning with confidence.
            </p>
          </div>

          <div className="why-grid">
            {features.map((feature) => (
              <div className="why-card premium-card" key={feature.title}>
                <span className="feature-icon">{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="subjects-section premium-section tinted-section">
        <div className="container">
          <div className="section-title">
            <span className="public-eyebrow">Popular Subjects</span>
            <h2>Subject specialists for every learning path.</h2>
            <p>
              From foundations to exam preparation, connect with tutors who
              understand the student's pace.
            </p>
          </div>

          <div className="subjects-grid">
            {subjects.map((subject) => (
              <div className="subject-card premium-card" key={subject.title}>
                <span className="feature-icon">{subject.icon}</span>
                <h3>{subject.title}</h3>
                <p>{subject.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="works-section premium-section">
        <div className="container">
          <div className="section-title">
            <span className="public-eyebrow">How It Works</span>
            <h2>Three simple steps from request to first lesson.</h2>
          </div>

          <div className="works-grid">
            <div className="work-card premium-card">
              <div className="work-number">01</div>
              <h3>Submit Request</h3>
              <p>Tell us the class, subject, location, and preferred timing.</p>
            </div>

            <div className="work-card premium-card">
              <div className="work-number">02</div>
              <h3>Get Matched</h3>
              <p>We shortlist suitable tutors based on your learning needs.</p>
            </div>

            <div className="work-card premium-card">
              <div className="work-number">03</div>
              <h3>Start Learning</h3>
              <p>Begin personalized lessons with a tutor who fits your goals.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="tutors-section premium-section tinted-section">
        <div className="container">
          <div className="section-title">
            <span className="public-eyebrow">Featured Tutors</span>
            <h2>Meet experienced educators from our network.</h2>
          </div>

          <div className="tutors-grid">
            {tutors.map((tutor) => (
              <div className="tutor-card premium-card" key={tutor.name}>
                <img className="tutor-image" src={tutor.image} alt={tutor.name} />
                <h3>{tutor.name}</h3>
                <span>{tutor.subject}</span>
                <p>{tutor.meta}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="testimonial-section premium-section">
        <div className="container">
          <div className="section-title">
            <span className="public-eyebrow">Testimonials</span>
            <h2>Trusted by parents and students.</h2>
          </div>

          <div className="testimonial-grid">
            {[
              ["TuitionLelo helped us find an excellent math tutor within two days.", "Anjali Sharma"],
              ["The tutor quality is amazing and my child's confidence has improved.", "Rizwan Khan"],
              ["Very professional platform with experienced tutors and quick support.", "Priya Mehta"],
            ].map(([quote, name]) => (
              <div className="testimonial-card premium-card" key={name}>
                <FaQuoteLeft />
                <p>{quote}</p>
                <h4>{name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section public-cta">
        <div className="container">
          <div className="cta-content">
            <span className="public-eyebrow">Start Today</span>
            <h2>Ready to find the perfect tutor?</h2>
            <p>
              Share your requirement and let TuitionLelo connect you with a
              trusted educator near you.
            </p>

            <div className="cta-buttons">
              <Link to="/student-request" className="cta-btn">
                Book a Tutor
              </Link>

              <Link to="/tutor-register" className="cta-btn secondary-cta">
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
