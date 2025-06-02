import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiFreelancer, SiFiverr } from 'react-icons/si';
import '../styles/Contact.css';
import UpworkLogo from '../assets/Upwork-logo.svg';

function Contact() {
  return (
    <section className="contact-section">
      <h2 className="contact-heading">Let's work together</h2>
      <p className="contact-paragraph">
        I'm open to freelance projects and collaborations. Feel free to reach out through any of the
        platforms below.
      </p>
      <div>
        <div className="contact-icons-3">
          <a
            href="https://github.com/PzvIC"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group github"
          >
            <FaGithub />
            <span className="tooltip">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/carlos-palkovic-8853b0228/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group linkedin"
          >
            <FaLinkedin />
            <span className="tooltip">LinkedIn</span>
          </a>
          <a
            href="https://www.upwork.com/freelancers/~018c23865b22ef4a88"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group"
          >
            <img src={UpworkLogo} alt="Upwork" className="upwork-logo" />
            <span className="tooltip">Upwork</span>
          </a>
        </div>
        <div className="contact-icons-2">
          <a
            href="https://www.freelancer.com/u/cpalkovic01"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group freelancer"
          >
            <SiFreelancer />
            <span className="tooltip">Freelancer</span>
          </a>
          <a
            href="https://www.fiverr.com/s/WEz0NxQ"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group fiverr"
          >
            <SiFiverr />
            <span className="tooltip">Fiverr</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export { Contact };
