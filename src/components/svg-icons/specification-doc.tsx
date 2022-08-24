/* Specificationdoc component */
import { colorCode } from "../../constants";

export default function SpecificationdocIcon({
  width,
  height,
  selectedFile,
  fileError,
  className
}: {
  width: string;
  height: string;
  selectedFile: string;
  fileError: string;
  className: string;
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 42 42"
    >
      <g id="Group_22" data-name="Group 22" transform="translate(-2436 -235)">
        <rect
          id="Rectangle_11"
          data-name="Rectangle 11"
          width="42"
          height="42"
          transform="translate(2436 235)"
          fill="transparent"
        />
        <g
          id="reader-outline_2"
          data-name="reader-outline 2"
          transform="translate(2435.125 234.063)"
        >
          <path
            id="Path_33"
            data-name="Path 33"
            d="M30.868,3.937H11.933A4.064,4.064,0,0,0,7.875,8.009V35.149a4.064,4.064,0,0,0,4.058,4.071H30.868a4.064,4.064,0,0,0,4.058-4.071V8.009A4.064,4.064,0,0,0,30.868,3.937Z"
            transform="translate(0 0)"
            stroke="none"
            fill={
              selectedFile
                ? colorCode.success
                : (fileError && colorCode.error) || colorCode.lightGrey
            }
            strokeLinejoin="round"
            strokeWidth="2"
            className="fill-hover"
          />
          <path
            id="Path_34"
            data-name="Path 34"
            d="M14.437,22.392h6.756M14.437,10.5h0Zm0,5.946h0Z"
            transform="translate(0.207 0.241)"
            stroke="white"
            fill={
              selectedFile
                ? colorCode.success
                : (fileError && colorCode.error) || colorCode.lightGrey
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
          />
        </g>
      </g>
    </svg>
  );
}
