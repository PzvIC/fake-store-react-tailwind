import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <nav className="footer-nav">
        <ul className="footer-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <span className="footer-separator">|</span>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <span className="footer-separator">|</span>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export { Footer };
