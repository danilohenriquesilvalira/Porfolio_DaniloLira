import { useEffect, useRef } from "react";

type FilterType = {
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
};

function Filter({ selectedFilter, setSelectedFilter }: FilterType) {
  const underlineRef = useRef<HTMLSpanElement>(null);
  const filters = ["All", "Automação", "Web Development", "Mobile", "Backend", "IoT"];

  // Função para gap responsivo seguindo padrão TechExpertise
  const getFilterGap = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width <= 480) return '0.75rem';       // Mobile - gap menor
      if (width <= 768) return '1rem';          // Tablet pequeno
      if (width <= 1024) return '1.5rem';       // Tablet
      if (width <= 1440) return '2rem';         // Desktop pequeno
      if (width <= 1920) return '2.5rem';       // Desktop (1528x834)
      return '3rem';                            // Desktop grande
    }
    return '2rem';
  };

  const updateUnderlinePosition = () => {
    const activeButton = document.querySelector<HTMLButtonElement>(
      `.filter-btn[data-filter="${selectedFilter}"]`
    );
    if (activeButton && underlineRef.current) {
      const buttonWidth = activeButton.offsetWidth;
      const buttonOffsetLeft = activeButton.offsetLeft;

      underlineRef.current.style.width = `${buttonWidth}px`;
      underlineRef.current.style.left = `${buttonOffsetLeft}px`;
    }
  };

  useEffect(() => {
    const handleResize = () => updateUnderlinePosition();
    window.addEventListener("resize", handleResize);
    updateUnderlinePosition();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedFilter]);

  return (
    <div 
      className="relative flex flex-wrap mt-10 mx-auto justify-center"
      style={{ gap: getFilterGap() }}
    >
      {filters.map((filter) => (
        <button
          key={filter}
          data-filter={filter}
          className={`filter-btn ${
            selectedFilter === filter
              ? "text-white font-bold"
              : "text-gray-400 font-semibold hover:text-gray-300"
          } py-2 px-1 transition-all duration-300 hover:-translate-y-0.5`}
          onClick={() => setSelectedFilter(filter)}
          style={{
            fontSize: typeof window !== 'undefined' && window.innerWidth <= 480 ? '0.875rem' : '1rem',
            whiteSpace: 'nowrap'
          }}
        >
          {filter}
        </button>
      ))}
      <span
        ref={underlineRef}
        className="absolute bottom-0 h-1 bg-white rounded transition-all duration-300 ease-in-out"
      ></span>
    </div>
  );
}

export default Filter;