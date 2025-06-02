import "../styles/About.css";

function About() {
  return (
    <section className="about-section">
      <h2 className="about-title">About This Project</h2>
      <p className="about-description">
        This web app was built as a personal project to explore and demonstrate my skills in modern frontend development. It allows users to browse and search for products through a dynamic interface. Users can view categories, add items to a cart, and the app will remember their choices using localStorage.
      </p>
      <p className="about-description">
        Some of the key features include:
        <ul className="about-list">
          <li>Fast product loading using API fetch and caching with localStorage</li>
          <li>Smart category and search filtering</li>
          <li>Shopping cart with quantity updates and persistent state</li>
          <li>Fully responsive layout using Tailwind CSS</li>
          <li>Smooth animations for modals and transitions using Framer Motion</li>
        </ul>
      </p>
      <p className="about-description">
        Technologies used: <strong>React</strong>, <strong>Tailwind CSS</strong>, <strong>JavaScript (ES6+)</strong>, <strong>localStorage</strong>, and <strong>Fake Store API</strong>.
      </p>
    </section>
  );
}

export { About };