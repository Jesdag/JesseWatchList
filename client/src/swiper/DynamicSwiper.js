import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import DynamicSwiperSlide from './DynamicSwiperSlide';
// import './styles.css';

// import required modules
import { Pagination } from 'swiper';

const DynamicSwiper = ({ array }) => {
  console.log(array);
  return (
    <StyledPic>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className='mySwiper'
      >
        {array &&
          array.map((item, index) => {
            return (
              <DynamicSwiperSlide
                key={index}
                title={item.title}
                image={item.image}
              />
            );
          })}
      </Swiper>
    </StyledPic>
  );
};

const StyledPic = styled.div`
  height: 100%;
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export default DynamicSwiper;
