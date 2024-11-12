import { Box } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { EventHomePageDto } from '@/utils/interfaces/EventInterfaces';
import MiniBannerEvent from './MiniBannerEvent';

interface SliderEventsProps {
  events: EventHomePageDto[];
}

const SliderEvents = ({ events }: SliderEventsProps) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Box sx={{ marginBottom: '40px' }}>
      <Slider {...settings}>
        {events &&
          events.map((event, index) => (
            <MiniBannerEvent key={index} event={event} />
          ))}
      </Slider>
    </Box>
  );
};

export default SliderEvents;
