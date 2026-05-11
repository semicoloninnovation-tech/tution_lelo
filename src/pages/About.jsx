import {
  FaAward,
  FaBookReader,
  FaHandshake,
  FaHome,
  FaLightbulb,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";

function About() {
  const services = [
    {
      icon: <FaHome />,
      title: "Home Tuition",
      text: "Personalized one-on-one learning at home with flexible schedules.",
    },
    {
      icon: <FaUserCheck />,
      title: "Expert Tutors",
      text: "Verified subject specialists for school, language, and exam needs.",
    },
    {
      icon: <FaLightbulb />,
      title: "Flexible Learning",
      text: "Learning plans shaped around each student's pace and confidence.",
    },
  ];

  return (
    <section className="about-page inner-page premium-section">
      <div className="container">
        <div className="inner-hero about-hero">
          <div>
            <span className="public-eyebrow">About TuitionLelo</span>
            <h1>We make quality home tuition easier to discover and trust.</h1>
            <p>
              TuitionLelo connects families with verified tutors who can support
              each student's academic goals through focused, personal learning.
            </p>
          </div>

          <img
            src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80"
            alt="Students studying in a modern classroom"
          />
        </div>

        <div className="about-story-grid">
          <div className="about-section premium-card">
            <div className="about-content">
              <span className="feature-icon"><FaBookReader /></span>
              <h3>Who We Are</h3>
              <p>
                TuitionLelo is a modern home tuition platform built to help
                parents find dependable tutors for all classes and subjects.
              </p>
              <p>
                We focus on tutor quality, location fit, communication, and the
                confidence students need to keep improving.
              </p>
            </div>
          </div>

          <div className="about-section premium-card">
            <div className="about-content">
              <span className="feature-icon"><FaHandshake /></span>
              <h3>Our Mission</h3>
              <p>
                Our mission is to simplify tutor discovery while helping skilled
                educators connect with students who need their expertise.
              </p>
              <p>
                The goal is a learning experience that feels personal, reliable,
                and accessible for every family.
              </p>
            </div>
          </div>
        </div>

        <div className="about-metrics">
          <div>
            <FaShieldAlt />
            <strong>100%</strong>
            <span>Profile review</span>
          </div>
          <div>
            <FaAward />
            <strong>4.8/5</strong>
            <span>Parent satisfaction</span>
          </div>
          <div>
            <FaBookReader />
            <strong>25+</strong>
            <span>Subject categories</span>
          </div>
        </div>

        <div className="services-section">
          <div className="section-title">
            <span className="public-eyebrow">Our Services</span>
            <h2>Built for smooth learning at every step.</h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <div className="service-card premium-card" key={service.title}>
                <span className="feature-icon">{service.icon}</span>
                <h4>{service.title}</h4>
                <p>{service.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
