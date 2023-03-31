import { MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import React from "react";
import styles from "./Carousel.module.scss";
import {default as Image1} from './image11.png'
import { default as Image2} from "./image21.png";
import { default as Image3} from "./image31.png";
function CarouselImage() {
  return (
    <div className={styles.carouselList}>
      <MDBCarousel showControls fade>
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={1}
          src={Image1}
          alt="..."
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={2}
          src={Image2}
          alt="..."
        />
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={3}
          src={Image3}
          alt="..."
        />
      </MDBCarousel>
    </div>
  );
}

export default CarouselImage;
