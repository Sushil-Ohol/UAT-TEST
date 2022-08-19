/* Cog component */

export default function CogIcon({
  width,
  height,
  className
}: {
  width: string;
  height: string;
  className: string;
}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
    >
      <g id="CogSeperateIcon" transform="translate(-0.34)">
        <rect
          id="Rectangle_41"
          data-name="Rectangle 41"
          width="20"
          height="20"
          transform="translate(0.34)"
          fill="none"
        />
        <path
          id="Path_189"
          data-name="Path 189"
          d="M10,0l8.66,5V15L10,20,1.34,15V5Z"
          fill="#999"
        />
        <circle
          id="Ellipse_4"
          data-name="Ellipse 4"
          cx="6"
          cy="6"
          r="6"
          transform="translate(4 4)"
          fill="#fff"
        />
        <path
          id="Path_190"
          data-name="Path 190"
          d="M10,6l3.464,6H6.536Z"
          fill="#888"
        />
      </g>
    </svg>
  );
}
