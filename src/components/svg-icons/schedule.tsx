/* Schedule component */
import { colorCode } from "../../constants";

export default function ScheduleIcon({
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
      <g id="Group_24" data-name="Group 24" transform="translate(-2601 -231)">
        <rect
          id="Rectangle_11"
          data-name="Rectangle 11"
          width="42"
          height="42"
          transform="translate(2601 231)"
          fill="transparent"
        />
        <g
          id="calendar-outline_2"
          data-name="calendar-outline 2"
          transform="translate(2600.063 230.063)"
        >
          <path
            id="Path_18"
            data-name="Path 18"
            d="M34.989,6.563h-27A4.044,4.044,0,0,0,3.937,10.6V34.823a4.044,4.044,0,0,0,4.05,4.037h27a4.044,4.044,0,0,0,4.05-4.037V10.6A4.044,4.044,0,0,0,34.989,6.563Z"
            transform="translate(0 0.179)"
            stroke={colorCode.lightGrey}
            fill={
              selectedFile
                ? colorCode.success
                : (fileError && colorCode.error) || colorCode.grey
            }
            strokeLinejoin="round"
            strokeWidth="2"
            className="fill-hover"
          />
          <path
            id="Path_19"
            data-name="Path 19"
            d="M24.416,21.269a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,24.416,21.269Z"
            transform="translate(0.431 0.308)"
            fill="white"
          />
          <path
            id="Path_20"
            data-name="Path 20"
            d="M30.978,21.269a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,30.978,21.269Z"
            transform="translate(0.585 0.308)"
            fill="white"
          />
          <path
            id="Path_21"
            data-name="Path 21"
            d="M24.416,27.831a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,24.416,27.831Z"
            transform="translate(0.431 0.462)"
            fill="white"
          />
          <path
            id="Path_22"
            data-name="Path 22"
            d="M30.978,27.831a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,30.978,27.831Z"
            transform="translate(0.585 0.462)"
            fill="white"
          />
          <path
            id="Path_23"
            data-name="Path 23"
            d="M11.291,27.831a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,11.291,27.831Z"
            transform="translate(0.123 0.462)"
            fill="white"
          />
          <path
            id="Path_24"
            data-name="Path 24"
            d="M17.853,27.831a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,17.853,27.831Z"
            transform="translate(0.277 0.462)"
            fill="white"
          />
          <path
            id="Path_25"
            data-name="Path 25"
            d="M11.291,34.394a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,11.291,34.394Z"
            transform="translate(0.123 0.439)"
            fill="white"
          />
          <path
            id="Path_26"
            data-name="Path 26"
            d="M17.853,34.394a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,17.853,34.394Z"
            transform="translate(0.277 0.439)"
            fill="white"
          />
          <path
            id="Path_27"
            data-name="Path 27"
            d="M24.416,34.394a2.1,2.1,0,1,0-2.1-2.1A2.1,2.1,0,0,0,24.416,34.394Z"
            transform="translate(0.431 0.439)"
            fill={selectedFile ? colorCode.success : colorCode.white}
          />
          <path
            id="Path_28"
            data-name="Path 28"
            d="M31.58,3.937v2.8M10.5,3.937v0Z"
            transform="translate(0.448 0)"
            fill="white"
            stroke={selectedFile ? colorCode.success : colorCode.white}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
          <path
            id="Path_29"
            data-name="Path 29"
            d="M39.039,13.125H3.937"
            transform="translate(0 0.263)"
            fill="white"
            stroke="white"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </g>
      </g>
    </svg>
  );
}
