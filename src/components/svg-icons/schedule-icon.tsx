/* Schedule component */
import { colorCode } from "../../constants";

export default function ScheduleIcon({
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
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 42 42"
      fill="none"
    >
      <path
        d="M31.125 3.5625H4.875C2.70038 3.5625 0.9375 5.32538 0.9375 7.5V31.125C0.9375 33.2996 2.70038 35.0625 4.875 35.0625H31.125C33.2996 35.0625 35.0625 33.2996 35.0625 31.125V7.5C35.0625 5.32538 33.2996 3.5625 31.125 3.5625Z"
        stroke={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
        strokeWidth="1.52"
        strokeLinejoin="round"
      />
      <path
        d="M21.2812 18C22.3686 18 23.25 17.1186 23.25 16.0312C23.25 14.9439 22.3686 14.0625 21.2812 14.0625C20.1939 14.0625 19.3125 14.9439 19.3125 16.0312C19.3125 17.1186 20.1939 18 21.2812 18Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M27.8438 18C28.9311 18 29.8125 17.1186 29.8125 16.0312C29.8125 14.9439 28.9311 14.0625 27.8438 14.0625C26.7564 14.0625 25.875 14.9439 25.875 16.0312C25.875 17.1186 26.7564 18 27.8438 18Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M21.2812 24.5625C22.3686 24.5625 23.25 23.6811 23.25 22.5938C23.25 21.5064 22.3686 20.625 21.2812 20.625C20.1939 20.625 19.3125 21.5064 19.3125 22.5938C19.3125 23.6811 20.1939 24.5625 21.2812 24.5625Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M27.8438 24.5625C28.9311 24.5625 29.8125 23.6811 29.8125 22.5938C29.8125 21.5064 28.9311 20.625 27.8438 20.625C26.7564 20.625 25.875 21.5064 25.875 22.5938C25.875 23.6811 26.7564 24.5625 27.8438 24.5625Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M8.15625 24.5625C9.24356 24.5625 10.125 23.6811 10.125 22.5938C10.125 21.5064 9.24356 20.625 8.15625 20.625C7.06894 20.625 6.1875 21.5064 6.1875 22.5938C6.1875 23.6811 7.06894 24.5625 8.15625 24.5625Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M14.7188 24.5625C15.8061 24.5625 16.6875 23.6811 16.6875 22.5938C16.6875 21.5064 15.8061 20.625 14.7188 20.625C13.6314 20.625 12.75 21.5064 12.75 22.5938C12.75 23.6811 13.6314 24.5625 14.7188 24.5625Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M8.15625 31.125C9.24356 31.125 10.125 30.2436 10.125 29.1562C10.125 28.0689 9.24356 27.1875 8.15625 27.1875C7.06894 27.1875 6.1875 28.0689 6.1875 29.1562C6.1875 30.2436 7.06894 31.125 8.15625 31.125Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M14.7188 31.125C15.8061 31.125 16.6875 30.2436 16.6875 29.1562C16.6875 28.0689 15.8061 27.1875 14.7188 27.1875C13.6314 27.1875 12.75 28.0689 12.75 29.1562C12.75 30.2436 13.6314 31.125 14.7188 31.125Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M21.2812 31.125C22.3686 31.125 23.25 30.2436 23.25 29.1562C23.25 28.0689 22.3686 27.1875 21.2812 27.1875C20.1939 27.1875 19.3125 28.0689 19.3125 29.1562C19.3125 30.2436 20.1939 31.125 21.2812 31.125Z"
        fill={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
      />
      <path
        d="M28.5 0.9375V3.5625M7.5 0.9375V3.5625V0.9375Z"
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
      <path
        d="M35.0625 10.125H0.9375"
        stroke={
          selectedFile
            ? (progress !== 100 ? colorCode.orange : colorCode.success) ||
              colorCode.success
            : (fileError && colorCode.error) || colorCode.grey
        }
        strokeWidth="1.52"
        strokeLinejoin="round"
      />
    </svg>
  );
}
