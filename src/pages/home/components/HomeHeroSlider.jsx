import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const heroSlides = [
  {
    title: "Launch Products That Feel Ready For The Future",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Discover Tools Built By Builders",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Turn Community Feedback Into Real Momentum",
    image:
      "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=1400&q=80",
  },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4500,
};

const HomeHeroSlider = () => (
  <section className="px-4 pt-4 md:px-6 lg:px-8">
    <div className="overflow-hidden rounded-[2rem] shadow-[0_32px_90px_rgba(8,47,73,0.18)]">
      <Slider {...sliderSettings}>
        {heroSlides.map((slide) => (
          <div key={slide.title}>
            <div className="relative h-[420px] w-full overflow-hidden">
              <img src={slide.image} alt={slide.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(2,6,23,0.78),rgba(8,145,178,0.48),rgba(21,128,61,0.4))]" />
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.45em] text-cyan-100">
                    Product Community
                  </p>
                  <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-white md:text-6xl">
                    {slide.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  </section>
);

export default HomeHeroSlider;
