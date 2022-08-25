/* eslint-disable react/jsx-props-no-spreading */
/* File upload component */
import { WarningFilled } from "@ant-design/icons";
import Hexagon from "components/hexagon/hexagon";
import React, { useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useAppDispatch } from "store";
import { FILESIZE } from "constants/index";
import "./file-upload.css";
import {
  DrawingsetIcon,
  ScheduleIcon,
  SpecificationdocIcon
} from "components/svg-icons";
import { getProjectSuggest } from "store/slices/project-suggest";
import { PostProjectFile } from "services/file-upload";

function Fileupload({
  width,
  height,
  title,
  extension,
  icon,
  setSkipBtn,
  setState,
  setCount,
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
  hexagoanStyle: any;
}) {
  const dispatch = useAppDispatch();
  const [fileError, setFileError] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [hoverColor, setHoverColor] = useState("");

  function antIcon() {
    switch (icon) {
      case "FileDoneOutlined":
        return (
          <SpecificationdocIcon
            progress={progress}
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
    return (
      <WarningFilled
        className={
          title === "Schedule"
            ? "icon-style-wrong-screen-first1"
            : hexagoanStyle.errorStyleClass
        }
      />
    );
  }
  const ProjectDefaultValue = () => {
    dispatch(getProjectSuggest());
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
            PostProjectFile(formData, setProgress);
            setSelectedFile(file.path);
            setTimeout(() => {
              setHoverColor("green");
              ProjectDefaultValue();
              setState({ ...file, title });
              setCount((prev: number) => prev + 1);
              setFileError("");
            }, 1000);
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
            // setFileError("");
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
    black: "#00000080",
    blue: "#007AFF",
    lightGrey: "#00000005"
  };
  useEffect(() => {
    if (progress > 99) {
      setSkipBtn(false);
    }
  }, [progress, setSkipBtn]);
  return (
    <Dropzone onDrop={onDrop} multiple>
      {({ getRootProps, getInputProps, isDragActive, isFileDialogActive }) => {
        return (
          <section>
            <div {...getRootProps()}>
              <input
                {...getInputProps()}
                accept={extension
                  .map((item) => `.${item.toLowerCase()}`)
                  .toString()}
              />
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
                  fontFamily: "inter",
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
