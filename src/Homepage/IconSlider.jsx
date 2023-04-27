import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Tokens1 from '../assets/img/tokken/Tokens.svg';
import Tokens2 from '../assets/img/tokken/Tokens (1).svg';
import Tokens3 from '../assets/img/tokken/Tokens (2).svg';
import Tokens4 from '../assets/img/tokken/Tokens (3).svg';
import Tokens5 from '../assets/img/tokken/Tokens (4).svg';
import Tokens6 from '../assets/img/tokken/Tokens (5).svg';
import Tokens7 from '../assets/img/tokken/Tokens (6).svg';
import Tokens8 from '../assets/img/tokken/Tokens (7).svg';
import Tokens9 from '../assets/img/tokken/Tokens (8).svg';
import Tokens10 from '../assets/img/tokken/Tokens (9).svg';
import Tokens11 from '../assets/img/tokken/Tokens (10).svg';
import Tokens12 from '../assets/img/tokken/Tokens (11).svg';
import Tokens13 from '../assets/img/tokken/Tokens (12).svg';
import Tokens14 from '../assets/img/tokken/Tokens (13).svg';

    
export default class IconSlider extends Component {
    render() {
      var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        autoplaySpeed: 2000,
        slidesToShow: 14,
        slidesToScroll: 2,
        initialSlide: 0,
        autoplay: true,
        arrows: false,
        responsive: [
          {
            breakpoint: 1120,
            settings: {
              slidesToShow: 10,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 7,
              slidesToScroll: 2,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1
            }
          }
        ]
      };
      return (
        <div>
          <Slider {...settings}>
                    <div className="tokken_item">
                        <img src={Tokens1} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens2} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens3} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens4} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens5} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens6} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens7} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens8} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens9} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens10} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens11} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens12} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens13} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens14} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens1} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens2} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens3} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens4} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens5} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens6} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens7} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens8} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens9} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens10} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens11} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens12} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens13} alt="Tokken" />
                    </div>
                    <div className="tokken_item">
                        <img src={Tokens14} alt="Tokken" />
                    </div>
          </Slider>
        </div>
      );
    }
  }