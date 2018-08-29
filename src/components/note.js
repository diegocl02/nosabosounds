/* @flow */

import React from "react";

interface Props {
  size: string;
  color: string;
  onNoteClicked: () => void;
  radius: ?string
}

export const Note = (props: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.0"
      width={props.size}
      height={props.size}
      onClick={() => props.onNoteClicked()}
      fill={props.color}
      id="svg1497"
    >
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 290.281 290.281"
        enableBackground="new 0 0 290.281 290.281;"
        xmlSpace="preserve"
      >
        <path
          id="XMLID_958_"
          d="M205.367,0h-30v173.646c-6.239-2.566-13.111-3.922-20.305-3.922c-17.458,0-35.266,7.796-48.857,21.388
	            c-25.344,25.343-28.516,63.407-7.072,84.853c9.232,9.232,22.016,14.316,35.995,14.316c17.458,0,35.266-7.796,48.857-21.388
	            c11.843-11.843,19.308-26.842,21.018-42.234c0.244-2.198,0.355-4.38,0.355-6.537h0.01V0z"
        />
      </svg>
    </svg>
  );
};

export const WholeNote = (props: Props) => {
  return (
    <svg
      width={props.size}
      height={props.size}
      onClick={() => props.onNoteClicked()}
      fill={props.color}
    >
      <circle cx={props.radius} cy={props.radius} r={props.radius} stroke="black" strokeWidth="0.1" />
    </svg>
  );
};
