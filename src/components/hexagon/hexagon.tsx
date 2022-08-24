/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/static-property-placement */
import React, { Component } from "react";
import { Progress } from "antd";
import PropTypes from "prop-types";
import { colorCode } from "constants/index";
import { generateHexSVG } from "./generateHex";

const elevationStyleActive = () => {
  return {
    cursor: "pointer",
    transition: "all 0.1s ease",
    transform: "translateY(0px)"
  };
};

export default class Hexagon extends Component {
  thHexagonStyleNormal: any;

  thHexagonStyleActive: any;

  static defaultProps: {
    color: string;
    progressBar: number;
    sideLength: number;
    borderRadius: number;
    fill: string;
    stroke: string;
    error: string;
    strokeWidth: number;
    elevation: number;
    shadow: string;
    filename: string;
    img: string;
    icon: string;
    wrongIcon: string;
    text: string;
    textStyle: {};
    styles: { normal: {}; hover: {}; active: {} };
    href: null;
    target: null;
    isactive: boolean;
    onClick: () => void;
  };

  static propTypes: {
    color: PropTypes.Requireable<string>;
    progressBar: PropTypes.Requireable<number>;
    sideLength: PropTypes.Requireable<number>;
    borderRadius: PropTypes.Requireable<number>;
    fill: PropTypes.Requireable<string>;
    stroke: PropTypes.Requireable<string>;
    strokeWidth: PropTypes.Requireable<number>;
    elevation: PropTypes.Requireable<number>;
    shadow: PropTypes.Requireable<string>;
    filename: PropTypes.Requireable<string>;
    img: PropTypes.Requireable<string>;
    icon: PropTypes.Requireable<any>;
    error: PropTypes.Requireable<any>;
    wrongIcon: PropTypes.Requireable<any>;
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
    isactive: PropTypes.Requireable<boolean>;
    onClick: PropTypes.Requireable<(...args: any[]) => any>;
  };

  constructor(props: {} | Readonly<{}>) {
    super(props);
    const {
      elevation,
      stroke,
      strokeWidth,
      styles: { normal, active }
    }: any = this.props;

    const thHexagonStyleBase = {
      userSelect: "none",
      stroke,
      strokeWidth: `${strokeWidth}px`,
      transition: "all 0.2s ease"
    };

    this.thHexagonStyleNormal = { ...thHexagonStyleBase, ...normal };

    this.thHexagonStyleActive = {
      ...thHexagonStyleBase,
      ...(elevation ? elevationStyleActive() : {}),
      ...active
    };

    this.state = {
      thHexagonStyle: this.thHexagonStyleNormal
    };
  }

  render() {
    const {
      color,
      progressBar,
      sideLength,
      borderRadius,
      elevation,
      shadow,
      filename,
      text,
      textStyle,
      href,
      target,
      onClick,
      fill,
      icon,
      wrongIcon,
      error,
      img,
      isactive
    }: any = this.props;
    const { thHexagonStyle }: any = this.state;
    const width = Math.sqrt(3) * sideLength;
    const height = 2 * sideLength + elevation;
    const fontSizeOffset = textStyle.fontSize
      ? 0.3 * parseInt(textStyle.fontSize, 10)
      : 0;
    const textArray = text.split(" ");

    const hexagon = (
      <>
        <path fill={fill} d={generateHexSVG(sideLength, borderRadius)} />
        <image href={img} x={0.15 * width} y={0.12 * height} />
        <text fill="#bbb" strokeWidth="0" style={textStyle}>
          <tspan
            x={width / 2}
            y={(1.1 * height) / 2 + 3}
            textAnchor="middle"
            style={{ fontSize: textStyle.fontSize }}
            className={isactive ? "text-first-active" : "text-first"}
          >
            {textArray[0]}
          </tspan>
          <tspan
            x={width / 2}
            y={(1.2 * height) / 2 + fontSizeOffset + 5}
            textAnchor="middle"
            style={{ fontSize: textStyle.fontSize }}
            className={isactive ? "text-first-active" : "text-first"}
          >
            {textArray[1]}
          </tspan>

          <tspan
            x={width / 2}
            y={(1.4 * height) / 2 + fontSizeOffset + 2}
            textAnchor="middle"
            style={{
              fill: colorCode.error,
              fontSize: sideLength === "100" ? "10px" : "8px"
            }}
          >
            <div>{filename}</div>
            {error && error}
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
          stroke={
            progressBar > 0
              ? (progressBar === 100 && !isactive && colorCode.success) ||
                (isactive && colorCode.process) ||
                colorCode.process
              : (error && colorCode.error) || colorCode.process
          }
          strokeWidth="3"
          strokeDasharray={isactive ? "0,0" : "4,4"}
          className="styled-element"
          onMouseOver={(e: any) => {
            e.target.style.color = color;
          }}
          onMouseOut={(e: any) => {
            e.target.style.color = "";
          }}
          id="styledelement"
        >
          <svg y={elevation}>
            <path fill={shadow} d={generateHexSVG(sideLength, borderRadius)} />
          </svg>
          <g
            style={thHexagonStyle}
            strokeWidth="4"
            onMouseLeave={() =>
              this.setState({ thHexagonStyle: this.thHexagonStyleNormal })
            }
            onMouseDown={() =>
              this.setState({ thHexagonStyle: this.thHexagonStyleActive })
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
        {error && wrongIcon()}
        {progressBar > 0 && !error && (
          <Progress
            className="progressBar"
            style={{
              height: "20px",
              textAlign: "center",
              width: sideLength === 100 ? "60%" : "80%",
              position: "absolute",
              bottom: sideLength === 100 ? `${+sideLength - 60}px` : "30px",
              left: sideLength === 100 ? "35px" : "11px"
            }}
            percent={progressBar}
          />
        )}
      </>
    );
  }
}

Hexagon.defaultProps = {
  color: "",
  progressBar: 0,
  sideLength: 100,
  borderRadius: 12,
  fill: "white",
  stroke: "#bbb",
  strokeWidth: 0,
  elevation: 0,
  shadow: "#f6f5f2",
  filename: "filename",
  img: "",
  icon: "",
  error: "",
  wrongIcon: "",
  text: "",
  textStyle: {},
  styles: {
    normal: {},
    hover: {},
    active: {}
  },
  href: null,
  target: null,
  isactive: false,
  onClick: () => {}
};

Hexagon.propTypes = {
  color: PropTypes.string,
  progressBar: PropTypes.number,
  sideLength: PropTypes.number,
  borderRadius: PropTypes.number,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  elevation: PropTypes.number,
  shadow: PropTypes.string,
  filename: PropTypes.string,
  img: PropTypes.string,
  icon: PropTypes.func,
  error: PropTypes.string,
  wrongIcon: PropTypes.func,
  text: PropTypes.string,
  textStyle: PropTypes.object,
  styles: PropTypes.shape({
    normal: PropTypes.object,
    hover: PropTypes.object,
    active: PropTypes.object
  }),
  href: PropTypes.string,
  target: PropTypes.string,
  isactive: PropTypes.bool,
  onClick: PropTypes.func
};
