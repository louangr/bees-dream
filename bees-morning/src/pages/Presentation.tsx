import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { Carousel } from "react-bootstrap";
import "../styles/_presentation.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";

const Presentation = () => {
  const [document] = usePrismicDocumentByUID("display-unit", "presentation");
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  function TextSliceType1(slice: any) {
    return (
      <Carousel.Item>
        <section className="slice-type-1">
          <div className="left-info">
            <div className="content">
              <PrismicRichText field={slice.primary.left_text} />
            </div>
          </div>
          <div className="line-break" />
          <div className="right-info">
            <div className="content">
              <PrismicRichText field={slice.primary.right_text} />
            </div>
          </div>
        </section>
      </Carousel.Item>
    );
  }

  function TextSliceType2(slice: any) {
    const src = prismicH.asImageSrc(slice.primary.image);
    if (src !== null) {
      return (
        <Carousel.Item>
          <section className="slice-type-2">
            <img
              className="img-center"
              src={src}
              alt={slice.primary.image.alt}
            />
          </section>
        </Carousel.Item>
      );
    } else {
      return (
        <Carousel.Item>
          <section className="slice-type-2">
            <img className="img-center" alt={slice.primary.image.alt} />
          </section>
        </Carousel.Item>
      );
    }
  }

  function TextSliceType3(slice: any) {
    return (
      <Carousel.Item>
        <Carousel.Caption>
          <section className="slice-type-3">
            <div className="text">
              <PrismicRichText field={slice.primary.center_text} />
            </div>
          </section>
        </Carousel.Caption>
      </Carousel.Item>
    );
  }

  return (
    <div className="carousel-wrapper">
      <Carousel
        fade
        controls={false}
        keyboard={false}
        touch={false}
        activeIndex={index}
        onSelect={handleSelect}
        indicators={false}
      >
        {document?.data.body.map((element: any) => {
          switch (element.slice_type) {
            case "presentation_type_1":
              return TextSliceType1(element);
            case "presentation_type_2":
              return TextSliceType2(element);
            case "presentation_type_3":
              return TextSliceType3(element);
          }
          return "";
        })}
      </Carousel>
    </div>
  );
};

export default Presentation;
