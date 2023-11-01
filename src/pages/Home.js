import '../styles/home/home.scss';
import { ReactComponent as VideoIcon } from '../assets/images/video.svg';
import HomeCard from '../components/home/HomeCard';
import HomeTestimonial from '../components/home/HomeTestimonial';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Home = () => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    arrows: false,
    centerPadding: '175px',
    slidesToShow: 3,
    speed: 500,
    responsive: [
      {
        breakpoint: 2500,
        settings: {
          slidesToShow: 5,
          centerPadding: '100px',
        },
      },
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 5,
          centerPadding: '150px',
        },
      },
      {
        breakpoint: 1930,
        settings: {
          slidesToShow: 4,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 1366,
        settings: {
          slidesToShow: 3,
          centerPadding: '175px',
        },
      },
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 2,
          centerPadding: '175px',
        },
      },
      {
        breakpoint: 1010,
        settings: {
          slidesToShow: 1,
          centerPadding: '270px',
        },
      },
      {
        breakpoint: 880,
        settings: {
          slidesToShow: 1,
          centerPadding: '200px',
        },
      },
      {
        breakpoint: 730,
        settings: {
          slidesToShow: 1,
          centerPadding: '100px',
        },
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          centerPadding: '70px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '40px',
        },
      },
      {
        breakpoint: 410,
        settings: {
          slidesToShow: 1,
          centerPadding: '20px',
        },
      },
      {
        breakpoint: 370,
        settings: {
          slidesToShow: 1,
          centerPadding: '10px',
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          centerPadding: '0',
        },
      },
    ],
  };

  return (
    <main className="home">
      <div className="section__1">
        <h1>Follow the</h1>
        <h1>Smart Money</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
          quibusdam dolor repellendus ut at beatae quasi, magnam neque
        </p>

        <button>Mint (Comming Soon)</button>

        <VideoIcon />
      </div>

      <section className="section__2">
        <h2>FEATURES</h2>

        <div className="section__2__cards">
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </div>
      </section>

      <section className="section__3">
        <h2>TESTIMONIAL</h2>

        <div style={{ color: '#fff' }}>
          <Slider {...settings}>
            <HomeTestimonial />
            <HomeTestimonial />
            <HomeTestimonial />
            <HomeTestimonial />
            <HomeTestimonial />
            <HomeTestimonial />
          </Slider>
        </div>
      </section>
    </main>
  );
};

export default Home;
