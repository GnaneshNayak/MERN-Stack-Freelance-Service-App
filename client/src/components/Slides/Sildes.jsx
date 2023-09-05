import Slider from 'infinite-react-carousel';
import './Slides.scss';

const Sildes = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slides">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Sildes;
