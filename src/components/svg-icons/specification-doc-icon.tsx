/* Specificationdoc component */
import { colorCode } from "../../constants";

export default function SpecificationdocIcon({
  progress,
  width,
  height,
  selectedFile,
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
      width={width}
      height={height}
      viewBox="0 0 28 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="fill-hover"
        d="M7.4375 7.5H20.5625M7.4375 14.0625H20.5625M7.4375 20.625H14M4.8125 0.9375H23.1875C25.3621 0.9375 27.125 2.70038 27.125 4.875V31.125C27.125 33.2996 25.3621 35.0625 23.1875 35.0625H4.8125C2.63788 35.0625 0.875 33.2996 0.875 31.125V4.875C0.875 2.70038 2.63788 0.9375 4.8125 0.9375Z"
        stroke={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
        strokeWidth="1.52"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
