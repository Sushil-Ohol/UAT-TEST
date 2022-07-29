/* eslint-disable react/static-property-placement */
/* eslint-disable react/forbid-prop-types */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { generateHexSVG } from "./generateHex";

const elevationStyleHover = (elevation: number) => {
  return {
    cursor: "pointer",
    transform: `translateY(${elevation / 2}px)`
  };
};

const elevationStyleActive = (elevation: any) => {
  return {
    cursor: "pointer",
    transition: "all 0.1s ease",
    transform: `translateY(${elevation}px)`
  };
};

export default class Hexagon extends Component {
  thHexagonStyleNormal: any;

  thHexagonStyleHover: any;

  thHexagonStyleActive: any;

  static defaultProps: {
    sideLength: number;
    borderRadius: number;
    fill: string;
    stroke: string;
    strokeWidth: number;
    elevation: number;
    shadow: string;
    img: string;
    icon: string;
    text: string;
    textStyle: {};
    styles: { normal: {}; hover: {}; active: {} };
    href: null;
    target: null;
    onClick: () => void;
  };

  static propTypes: {
    sideLength: PropTypes.Requireable<number>;
    borderRadius: PropTypes.Requireable<number>;
    fill: PropTypes.Requireable<string>;
    stroke: PropTypes.Requireable<string>;
    strokeWidth: PropTypes.Requireable<number>;
    elevation: PropTypes.Requireable<number>;
    shadow: PropTypes.Requireable<string>;
    img: PropTypes.Requireable<string>;
    icon: PropTypes.Requireable<any>;
    text: PropTypes.Requireable<string>;
    textStyle: PropTypes.Requireable<object>;
    styles: PropTypes.Requireable<
      PropTypes.InferProps<{
        normal: PropTypes.Requireable<object>;
        hover: PropTypes.Requireable<object>;
        active: PropTypes.Requireable<object>;
      }>
    >;
    href: PropTypes.Requireable<string>;
    target: PropTypes.Requireable<string>;
    onClick: PropTypes.Requireable<(...args: any[]) => any>;
  };

  constructor(props: {} | Readonly<{}>) {
    super(props);
    const {
      elevation,
      stroke,
      strokeWidth,
      styles: { normal, hover, active }
    }: any = this.props;

    const thHexagonStyleBase = {
      userSelect: "none",
      stroke,
      strokeWidth: `${strokeWidth}px`,
      transition: "all 0.2s ease"
    };

    this.thHexagonStyleNormal = { ...thHexagonStyleBase, ...normal };
    this.thHexagonStyleHover = {
      ...thHexagonStyleBase,
      ...(elevation ? elevationStyleHover(elevation) : {}),
      ...hover
    };
    this.thHexagonStyleActive = {
      ...thHexagonStyleBase,
      ...(elevation ? elevationStyleActive(elevation) : {}),
      ...active
    };

    this.state = {
      thHexagonStyle: this.thHexagonStyleNormal
    };
  }

  render() {
    const {
      sideLength,
      borderRadius,
      elevation,
      shadow,
      img,
      text,
      textStyle,
      href,
      target,
      onClick,
      fill,
      icon
    }: any = this.props;
    const { thHexagonStyle }: any = this.state;

    const width = Math.sqrt(3) * sideLength;
    const height = 2 * sideLength + elevation;

    const fontSizeOffset = textStyle.fontSize
      ? 0.3 * parseInt(textStyle.fontSize, 10)
      : 0;

    const hexagon = (
      <>
        <path fill={fill} d={generateHexSVG(sideLength, borderRadius)} />
        <image
          href={img}
          width={0.7 * width}
          height={0.3 * height}
          x={0.1 * width}
          y={0.2 * height}
        />

        <text fill="#bbb" strokeWidth="0" style={textStyle}>
          <tspan
            x={width / 2}
            y={(1.2 * height) / 2 + fontSizeOffset}
            textAnchor="middle"
          >
            {text}
          </tspan>
        </text>
      </>
    );

    return (
      <>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          stroke="grey"
          strokeDasharray="2,2"
        >
          <svg y={elevation}>
            <path fill={shadow} d={generateHexSVG(sideLength, borderRadius)} />
          </svg>
          <g
            style={thHexagonStyle}
            onMouseOver={() =>
              this.setState({ thHexagonStyle: this.thHexagonStyleHover })
            }
            onMouseLeave={() =>
              this.setState({ thHexagonStyle: this.thHexagonStyleNormal })
            }
            onMouseDown={() =>
              this.setState({ thHexagonStyle: this.thHexagonStyleActive })
            }
            onMouseUp={() =>
              this.setState({ thHexagonStyle: this.thHexagonStyleHover })
            }
            onClick={onClick}
          >
            {!href ? (
              hexagon
            ) : (
              <a href={href} target={target || "_blank"}>
                {hexagon}
              </a>
            )}
          </g>
        </svg>
        {icon()}
      </>
    );
  }
}

Hexagon.defaultProps = {
  sideLength: 100,
  borderRadius: 12,
  fill: "white",
  stroke: "#bbb",
  strokeWidth: 0,
  elevation: 12,
  shadow: "#e2e2e2",
  img: "",
  icon: "",
  text: "",
  textStyle: {},
  styles: {
    normal: {},
    hover: {},
    active: {}
  },
  href: null,
  target: null,
  onClick: () => {}
};

Hexagon.propTypes = {
  sideLength: PropTypes.number,
  borderRadius: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  elevation: PropTypes.number,
  shadow: PropTypes.string,
  img: PropTypes.string,
  icon: PropTypes.any,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  styles: PropTypes.shape({
    normal: PropTypes.object,
    hover: PropTypes.object,
    active: PropTypes.object
  }),
  href: PropTypes.string,
  target: PropTypes.string,
  onClick: PropTypes.func
};
