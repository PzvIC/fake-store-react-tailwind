import "../styles/ImgBanner.css"

function ImgBanner({ selectedCategory }) {
  return (
    <div className={`banner-container ${selectedCategory ? 'slide-up' : ''}`}>
      <h1 className="banner-title">
        Yes, It's<br />
        All<br />
        Absolutelly Fake
      </h1>
    </div>
  );
}

export { ImgBanner }
