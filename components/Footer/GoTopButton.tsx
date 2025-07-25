"use client";
const GoTopButton = () => {
  const handleGoTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      className="flex flex-col items-center menu-btn z-20"
      onClick={handleGoTop}
    >
      <div className="beat-bars -top-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="beat-bar"></div>
        ))}
      </div>
      <span className="text-color2">ir arriba</span>
    </button>
  );
};

export default GoTopButton;
