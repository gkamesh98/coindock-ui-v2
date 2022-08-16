import React, { useCallback, useEffect, useState, useRef } from "react";

function EllipseNumber({ text, component: Component, initialStrink, maxLetters, classNames }) {
  const initalMount = useRef(true);
  const [isCallaped, setIsCollapesed] = useState(initialStrink);

  const [displayText, setDisplayText] = useState(text);
  useEffect(() => {}, [displayText]);
  const handleCollapse = useCallback(() => {
    setDisplayText(() => {
      if (!isCallaped) return text;
      const [beforeDecimal, afterDemial] = String(text).split(".");
      return [beforeDecimal ?? null, afterDemial.substring(0, maxLetters)].join(".");
    });
    setIsCollapesed((value) => !value);
  }, [maxLetters, text, isCallaped]);
  useEffect(() => {
    if (initalMount.current) {
      if (initialStrink) {
        handleCollapse();
      }
      initalMount.current = false;
    }
  }, [initialStrink, maxLetters, text, handleCollapse]);
  return (
    <Component onClick={handleCollapse} classNames={classNames}>
      {displayText}
      {!isCallaped && "..."}
    </Component>
  );
}

EllipseNumber.defaultProps = {
  initialStrink: true,
};

export default EllipseNumber;
