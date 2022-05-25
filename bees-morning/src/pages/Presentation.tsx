import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

const Presentation = () => {
  const [document] = usePrismicDocumentByUID("display-unit", "presentation");

  function TextSliceType1({ slice }: any) {
    return (
      <section>
        <div className="left-info">
          <PrismicRichText field={slice.primary.left_text} />
        </div>
        <div className="right-info">
          <PrismicRichText field={slice.primary.right_text} />
        </div>
      </section>
    );
  }

  function TextSliceType2({ slice }: any) {
    const src = prismicH.asImageSrc(slice.primary.image);
    if (src !== null) {
      return (
        <section>
          <img src={src} alt={slice.primary.image.alt} />
        </section>
      );
    } else {
      return (
        <section>
          <img alt={slice.primary.image.alt} />
        </section>
      );
    }
  }

  function TextSliceType3({ slice }: any) {
    return (
      <section>
        <PrismicRichText field={slice.primary.center_text} />
      </section>
    );
  }

  return (
    <SliceZone
      slices={document?.data.body}
      components={{
        presentation_type_1: TextSliceType1,
        presentation_type_2: TextSliceType2,
        presentation_type_3: TextSliceType3,
      }}
    />
  );
};

export default Presentation;
