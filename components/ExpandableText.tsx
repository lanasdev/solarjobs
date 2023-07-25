"use client";
import { useState } from "react";
import clsx from "clsx";

// https://css-tricks.com/line-clampin/
// maxLines is max 6

const ExpandableText = ({
  content,
  maxLines = 6,
  classNames,
}: {
  content: string;
  maxLines: number;
  classNames: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="group" onClick={() => setExpanded(!expanded)}>
      {expanded ? (
        <>
          <p className={clsx(``, classNames)}>{content}</p>
          <span className="group-hover:underline hover:underline">
            See less
          </span>
        </>
      ) : (
        <>
          <p className={clsx(`line-clamp-${maxLines}`, classNames)}>
            {content}
          </p>
          <span className="group-hover:underline hover:underline">
            See more
          </span>
        </>
      )}
    </div>
  );
};

export default ExpandableText;
