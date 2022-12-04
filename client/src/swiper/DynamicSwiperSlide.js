import SwiperSlide from './DynamicSwiper';

const DynamicSwiperSlide = ({ image, title }) => {
  return (
    <SwiperSlide>
      <img src={image} />
      <h1>{title}</h1>
    </SwiperSlide>
  );
};

export default DynamicSwiperSlide;
