import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { Carousel } from "react-bootstrap";
import "../styles/_presentation.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import Questions from "../components/Questions";

const Presentation = () => {
  const [documentDisplay] = usePrismicDocumentByUID(
    "display-unit",
    "presentation"
  );
  const [documentQuestion, documentState] = usePrismicDocumentByUID(
    "quizz-question",
    "questions"
  );
  const [index, setIndex] = useState(0);
  const [indexQuestion, setIndexQuestion] = useState(0);

  const handleSelect = (selectedIndex: number, e: any) => {
    setIndex(selectedIndex);
  };

  /**
   * Question behavior
   */
  useEffect(() => {
    if (documentState.state === "failed") {
      console.warn(
        "Blog Home document was not found. Make sure it exists in your Prismic repository"
      );
    } else {
      const numberQuestion = documentQuestion?.data.body.length;
      const interval = setInterval(() => {
        if (indexQuestion < numberQuestion - 1) {
          setIndexQuestion(indexQuestion + 1);
        } else if (indexQuestion === numberQuestion - 1) {
          setIndexQuestion(0);
        }
      }, 20000);
      return () => clearInterval(interval);
    }
  }, [documentState.state, indexQuestion, documentQuestion]);

  return (
    <div className="main-content">
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
          {documentDisplay?.data.body.map((element: any) => {
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
      {documentQuestion && (
        <Questions
          value={documentQuestion?.data.body?.[indexQuestion].primary}
        />
      )}
    </div>
  );
};

/**
 * Carousel formater
 */

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
          <img className="img-center" src={src} alt={slice.primary.image.alt} />
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

export default Presentation;
