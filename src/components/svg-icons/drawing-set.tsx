/* Drawing component */
import { colorCode } from "constants/index";

export default function DrawingsetIcon({
  progress,
  selectedFile,
  width,
  height,
  fileError,
  className
}: {
  progress: number;
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
      <g id="Group_23" data-name="Group 23" transform="translate(-2525 -231)">
        <rect
          id="Rectangle_11"
          data-name="Rectangle 11"
          width="42"
          height="42"
          transform="translate(2525 231)"
          fill="transparent"
        />
        <g
          id="construct-outline_2"
          data-name="construct-outline 2"
          transform="translate(2525.688 231.75)"
        >
          <path
            id="Path_30"
            data-name="Path 30"
            d="M34.707,14.819a2.115,2.115,0,0,1-3.01,0l-1.767-1.792a2.184,2.184,0,0,1,0-3.051l4-4.055a.068.068,0,0,0,.018-.06.069.069,0,0,0-.013-.03.067.067,0,0,0-.025-.02A7.451,7.451,0,0,0,25.855,7.4c-2.034,2.047-2.15,5.121-1.4,7.808a2.179,2.179,0,0,1,0,1.167,2.157,2.157,0,0,1-.6,1l-13.6,12.808a3.244,3.244,0,0,0-.77,1.054,3.277,3.277,0,0,0,.642,3.662,3.2,3.2,0,0,0,1.081.721,3.164,3.164,0,0,0,2.533-.072,3.207,3.207,0,0,0,1.039-.781L27.52,20.957a2.118,2.118,0,0,1,.968-.6,2.094,2.094,0,0,1,1.136-.01c2.63.712,5.619.578,7.63-1.429a7.863,7.863,0,0,0,1.58-8.153.066.066,0,0,0-.08-.034.066.066,0,0,0-.027.017Z"
            transform="translate(-0.176 0)"
            fill={
              selectedFile
                ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
                  colorCode.success
                : (fileError && colorCode.error) || colorCode.grey
            }
            stroke={
              selectedFile
                ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
                  colorCode.success
                : (fileError && colorCode.error) || colorCode.grey
            }
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="2"
            className="fill-hover"
          />
          <path
            id="Path_31"
            data-name="Path 31"
            d="M25.773,23.741c3.284,3.056,7.267,6.678,8.822,7.972a1.08,1.08,0,0,1,.075,1.6l-2.677,2.676a1.123,1.123,0,0,1-1.627-.061c-1.326-1.538-4.9-5.382-7.961-8.581m-4.1-4.19c-1.4-1.363-2.044-2-2.486-2.429a1.463,1.463,0,0,1-.267-1.712,1.662,1.662,0,0,1,.281-.37l1.257-1.226a1.5,1.5,0,0,1,.452-.31,1.453,1.453,0,0,1,1.6.29c.437.424,1.237,1.2,2.679,2.608Z"
            transform="translate(-0.928 -0.464)"
            fill={
              selectedFile
                ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
                  colorCode.success
                : (fileError && colorCode.error) || colorCode.grey
            }
            stroke={
              selectedFile
                ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
                  colorCode.success
                : (fileError && colorCode.error) || colorCode.grey
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="fill-hover"
          />
          <path
            id="Path_32"
            data-name="Path 32"
            d="M1.42,15.636l2.359-2.3a.378.378,0,0,1,.273-.108.389.389,0,0,1,.273.108h0a.791.791,0,0,0,.657.222,1.478,1.478,0,0,0,.848-.33c.481-.465-.075-1.382.348-1.968A16.592,16.592,0,0,1,7.764,9.442,17.4,17.4,0,0,1,13.37,5.877,8.606,8.606,0,0,1,16.6,5.25a5.92,5.92,0,0,1,3.71,1.257,7.174,7.174,0,0,1,.824.934,6.331,6.331,0,0,0-.739-.222,5.519,5.519,0,0,0-1.6-.1A6.408,6.408,0,0,0,15.748,8.24a4.524,4.524,0,0,0-1.669,3.586c-.054,1.132.218,1.772,2.9,4.45a.529.529,0,0,1-.027.735l-1.461,1.443a.552.552,0,0,1-.765.007,21.229,21.229,0,0,0-3.609-3.06,3.694,3.694,0,0,0-1.468-.549,2.474,2.474,0,0,0-1.465.31.917.917,0,0,0-.212.16A1.134,1.134,0,0,0,8,16.932l.137.128a.371.371,0,0,1,0,.533l-2.356,2.3a.378.378,0,0,1-.273.112.39.39,0,0,1-.273-.108L1.42,16.175a.391.391,0,0,1,0-.539Z"
            transform="translate(0)"
            fill={
              selectedFile
                ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
                  colorCode.success
                : (fileError && colorCode.error) || colorCode.grey
            }
            stroke={
              selectedFile
                ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
                  colorCode.success
                : (fileError && colorCode.error) || colorCode.grey
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="fill-hover"
          />
        </g>
      </g>
    </svg>
  );
}
