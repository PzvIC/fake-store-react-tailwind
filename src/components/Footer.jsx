import "../styles/Footer.css";

function Footer({ onSelectCategory }) {
  const handleClick = (category) => {
    onSelectCategory(category);
  };

  return (
    <footer className="footer-container">
      <nav className="footer-nav">
        <ul className="footer-links">
          <li>
            <button onClick={() => handleClick(null)}>Home</button>
          </li>
          <li>
            <span className="footer-separator">|</span>
          </li>
          <li>
            <button onClick={() => alert("About section coming soon!")}>About</button>
          </li>
          <li>
            <span className="footer-separator">|</span>
          </li>
          <li>
            <button onClick={() => handleClick("contact")}>Contact</button>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export { Footer };
