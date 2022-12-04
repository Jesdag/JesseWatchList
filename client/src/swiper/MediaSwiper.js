import React, { useRef, useState, useContext } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { NavLink } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Pagination, Navigation } from 'swiper';
import styled from 'styled-components';
import { UserContext } from './../context/UserContext';
import FavButton from '../components/FavButton';
import WatchButton from '../components/WatchButton';
const MediaSwiper = ({ allGames }) => {
  const { userData } = useContext(UserContext);
  console.log(allGames);
  return (
    <StyledGameSwiper>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className='mySwiper'
      >
        {allGames.map((item) => {
          console.log(typeof item.image);
          return (
            <SwiperSlide>
              <NavLink to={`/games/${item.id}`}>
                <div>
                  <img className='swiper-image' src={item.image} />
                  <h1>{item.title}</h1>
                  {userData && (
                    <>
                      <FavButton media={item} />
                      <WatchButton media={item} />
                    </>
                  )}
                </div>
              </NavLink>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </StyledGameSwiper>
  );
};
export default MediaSwiper;
const StyledGameSwiper = styled.div`
  height: 100%;
  width: var(--full-width);
  min-height: 700px;
  border: 5px solid blue;
  .swiper {
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
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
