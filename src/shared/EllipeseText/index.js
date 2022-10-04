import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

function EllipseNumber({ text, component: Component, initialStrink, maxLetters, classNames }) {
  const initalMount = useRef(true);

  const [isCallaped, setIsCollapesed] = useState(initialStrink);

  const [displayText, setDisplayText] = useState(text);

  const handleCollapse = useCallback(() => {
    setDisplayText((initialText) => {
      if (!isCallaped) return text;

      const [beforeDecimal, afterDemial] = String(text).split(".");

      return [beforeDecimal ?? null, afterDemial?.substring(0, maxLetters)].join(".");
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
    <React.Fragment>
      <Component onClick={handleCollapse} classNames={classNames}>
        {displayText}
        {!isCallaped && "..."}
      </Component>
    </React.Fragment>
  );
}

EllipseNumber.defaultProps = {
  initialStrink: true,
};

EllipseNumber.propTypes = {
  text: PropTypes.string,
  component: PropTypes.Component,
  maxLetters: PropTypes.string,
  classNames: PropTypes.classNames,
  initialStrink: PropTypes.bool,
};

export default EllipseNumber;
