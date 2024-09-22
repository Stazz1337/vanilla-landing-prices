import "./styles/main.scss";

import Swiper from "swiper";
import "swiper/css";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const swiper = new Swiper(".mySwiper", {
  modules: [Navigation],

  slidesPerView: 3,
  spaceBetween: 35,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
