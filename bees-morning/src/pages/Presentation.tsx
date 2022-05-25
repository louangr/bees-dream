import { usePrismicDocumentByUID } from "@prismicio/react";
import TemplatesPresentation from "../components/TemplatesPresentation";

const Presentation = () => {
  const [document] = usePrismicDocumentByUID("display-unit", "presentation");

  return <TemplatesPresentation />;
};

export default Presentation;
