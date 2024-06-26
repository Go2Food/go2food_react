import React, { useRef, useState } from 'react';

const HorizontalScroll = ({ children, className, scrollEndFunc=() => {} }) => {
  const scrollContainerRef = useRef(null);
  // const [isDragging, setIsDragging] = useState(false);
  // const [startX, setStartX] = useState(0);

  // const handleMouseDown = (event) => {
  //   setIsDragging(true);
  //   setStartX(event.clientX);
  // };

  // const handleMouseUp = () => {
  //   setIsDragging(false);
  //   return;
  // };

  // const handleMouseMove = (event) => {
  //   if (!isDragging) return;
  //   const currentScrollLeft = scrollContainerRef.current.scrollLeft
  //   const deltaX = event.clientX - startX;
  //   scrollContainerRef.current.scrollLeft -= deltaX;
  //   setStartX(event.clientX); // Update startX for next drag movement
  //   const isAtEnd = scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth >= scrollContainerRef.current.scrollWidth;
  //   if (isAtEnd) {
  //     if (currentScrollLeft !== scrollContainerRef.current.scrollLeft)
  //     {
  //       scrollEndFunc()
  //       console.log("end")
  //     }
  //   }
  // };

  const handleWheel = (event) => {
    const currentScrollLeft = scrollContainerRef.current.scrollLeft
    scrollContainerRef.current.scrollBy(event.deltaY/2, 0);
    const isAtEnd = scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth >= scrollContainerRef.current.scrollWidth;
    if (isAtEnd) {
      if (currentScrollLeft !== scrollContainerRef.current.scrollLeft)
      {
        scrollEndFunc()
      }
    }
  };

  const handleTouchMove = () => {
    const isAtEnd = scrollContainerRef.current.scrollLeft + scrollContainerRef.current.clientWidth >= scrollContainerRef.current.scrollWidth;
    if (isAtEnd) {
      scrollEndFunc()
      console.log("end")
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      // onMouseDown={handleMouseDown}
      // onMouseLeave={handleMouseUp}
      // onMouseUp={handleMouseUp}
      // onMouseMove={handleMouseMove}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      style={{
        overflowX: 'scroll',
        display: 'flex',
        overscrollBehavior: 'contain',
      }}
      className={className}
    >
      {children}
    </div>
  );
};

export default HorizontalScroll;