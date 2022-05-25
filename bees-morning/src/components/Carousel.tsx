import React from "react";

export const CarouselItem = ({ children }: any) => {
  return <div className="carousel-item">{children}</div>;
};

const Carousel = ({ children }: any) => {
  return (
    <div className="carousel">
      <div className="inner" style={{ transform: "translateX(-0%)" }}>
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, { witdh: "100%" });
        })}
      </div>
    </div>
  );
};

export default Carousel;
