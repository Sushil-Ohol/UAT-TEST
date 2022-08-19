/* eslint-disable react/jsx-props-no-spreading */
/* File upload component */
import { WarningFilled } from "@ant-design/icons";
import axios from "axios";
import Hexagon from "components/hexagon/hexagon";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { FILESIZE, APIs } from "constants/index";
import "./file-upload.css";
import {
  DrawingsetIcon,
  ScheduleIcon,
  SpecificationdocIcon
} from "components/svg-icons";

function Fileupload({
  width,
  height,
  title,
  extension,
  icon,
  setSkipBtn,
  setState,
  setCount,
  setDefaultValue,
  hexagoanStyle
}: {
  width: string;
  height: string;
  title: string;
  extension: string[];
  icon: string;
  setSkipBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setDefaultValue: React.Dispatch<React.SetStateAction<any>>;
  hexagoanStyle: any;
}) {
  const { V1_URL: URL } = APIs;
  const [fileError, setFileError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [hoverColor, setHoverColor] = useState("");

  function antIcon() {
    switch (icon) {
      case "FileDoneOutlined":
        return (
          <SpecificationdocIcon
            width={width}
            height={height}
            fileError={fileError}
            selectedFile={selectedFile}
            className={`${hexagoanStyle.className} ${
              selectedFile && "green-text"
            } ${fileError && "error-text"}`}
          />
        );
      case "SettingOutlined":
        return (
          <DrawingsetIcon
            width={width}
            height={height}
            fileError={fileError}
            selectedFile={selectedFile}
            className={`${hexagoanStyle.className} ${
              selectedFile && "green-text"
            } ${fileError && "error-text"}`}
          />
        );
      case "CalendarOutlined":
        return (
          <ScheduleIcon
            width={width}
            height={height}
            fileError={fileError}
            selectedFile={selectedFile}
            className={`${hexagoanStyle.className} ${
              selectedFile && "green-text"
            } ${fileError && "error-text"}`}
          />
        );
      default:
        return "";
    }
  }
  function iconfunction() {
    return <WarningFilled className={hexagoanStyle.errorStyleClass} />;
  }
  const ProjectDefaultValue = async () => {
    const result = await axios.get(`${URL}/projectsug`);
    setDefaultValue(result.data);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 1) {
      acceptedFiles.forEach(async (file: any) => {
        const splitedData = file.name.split(".");
        const fileextension = splitedData[1];
        if (extension.includes(fileextension.toUpperCase())) {
          if (file.size < FILESIZE) {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("title", title);

            await axios.post(`${URL}/fileUpload`, formData, {
              onUploadProgress: (progressEvent) => {
                const progressCount = Math.ceil(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
                setProgress(progressCount);
              }
            });
            setSelectedFile(file.path);
            setTimeout(() => {
              setSkipBtn(true);
              setHoverColor("green");
              ProjectDefaultValue();
              setState({ ...file, title });
              setCount((prev: number) => prev + 1);
              setFileError("");
            }, 4000);
          } else {
            setHoverColor("red");
            setFileError("Upload file less than 100MB");
            setTimeout(() => {
              setHoverColor("");
              setFileError("");
            }, 4000);
          }
        } else {
          setFileError(() => {
            return `Upload ${extension} file `;
          });
          setHoverColor("red");
          setState({ path: "", title: "" });
          setSelectedFile("");
          setProgress(0);
          setTimeout(() => {
            setHoverColor("");
            setFileError("");
          }, 4000);
        }
      });
    } else {
      setHoverColor("red");
      setFileError("only single file");
      setTimeout(() => {
        setHoverColor("");
        setFileError("");
      }, 4000);
    }
  };
  const colorCode: any = {
    white: "white",
    dragActive: "rgba(0, 208, 255, 0.1)",
    dialogActive: "#c2c1bf",
    orange: "#f0efed",
    black: "black",
    blue: "#5eafd8",
    lightGrey: "#f0efed"
  };

  return (
    <Dropzone onDrop={onDrop} multiple>
      {({ getRootProps, getInputProps, isDragActive, isFileDialogActive }) => {
        return (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Hexagon
                color={hoverColor}
                img=""
                filename={selectedFile}
                progressBar={progress}
                error={fileError}
                wrongIcon={true && iconfunction}
                icon={true && antIcon}
                text={isDragActive ? "Drag file here" : title}
                sideLength={hexagoanStyle.hexagoanSize}
                borderRadius={0}
                fill="rgba(128, 128, 128, 0.001)"
                shadow={
                  isDragActive
                    ? colorCode.dragActive
                    : (isFileDialogActive && colorCode.blue) ||
                      ((fileError || selectedFile || progress > 0) &&
                        colorCode.white) ||
                      colorCode.lightGrey
                }
                textStyle={{
                  fontFamily: "sans-serif",
                  fontSize: hexagoanStyle.textSize,
                  fill:
                    (isFileDialogActive && colorCode.dialogActive) ||
                    colorCode.black
                }}
                isactive={isFileDialogActive}
              />
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}
export default Fileupload;
