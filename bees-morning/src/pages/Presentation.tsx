import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import "../styles/_presentation.scss";
import { useEffect, useState } from "react";
import Carousel, { CarouselItem } from "../components/Carousel";

const Presentation = () => {
  const [page, setPage] = useState(0);
  const [document] = usePrismicDocumentByUID("display-unit", "presentation");
  const maxPage = document?.data.body.length;

  const checkDisplay = (index: number) => {
    if (index === page) {
      return {};
    } else {
      return { display: "none" };
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (page !== maxPage - 1) {
        setPage(page + 1);
      } else {
        setPage(0);
      }
    }, 5000);
    return () => clearTimeout(timer);
  });

  function TextSliceType1({ slice, index }: any) {
    return (
      <CarouselItem>
        <section className="slice-type-1" style={checkDisplay(index)}>
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
      </CarouselItem>
    );
  }

  function TextSliceType2({ slice, index }: any) {
    const src = prismicH.asImageSrc(slice.primary.image);
    if (src !== null) {
      return (
        <CarouselItem>
          <section className="slice-type-2" style={checkDisplay(index)}>
            <img
              className="img-center"
              src={src}
              alt={slice.primary.image.alt}
            />
          </section>
        </CarouselItem>
      );
    } else {
      return (
        <CarouselItem>
          <section className="slice-type-2">
            <img className="img-center" alt={slice.primary.image.alt} />
          </section>
        </CarouselItem>
      );
    }
  }

  function TextSliceType3({ slice, index }: any) {
    return (
      <CarouselItem>
        <section className="slice-type-3" style={checkDisplay(index)}>
          <div className="text">
            <PrismicRichText field={slice.primary.center_text} />
          </div>
        </section>
      </CarouselItem>
    );
  }

  return (
    <Carousel>
      <SliceZone
        slices={document?.data.body}
        components={{
          presentation_type_1: TextSliceType1,
          presentation_type_2: TextSliceType2,
          presentation_type_3: TextSliceType3,
        }}
      />
    </Carousel>
  );
};

export default Presentation;
