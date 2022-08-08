/* eslint-disable react/jsx-props-no-spreading */
/* File upload component */
import {
  FileDoneOutlined,
  SettingOutlined,
  CalendarOutlined,
  WarningOutlined
} from "@ant-design/icons";
import axios from "axios";
import Hexagon from "components/hexagon/hexagon";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "./file-upload.css";

function DropzoneFile({
  title,
  extension,
  icon,
  IconStyle,
  setSkipBtn,
  setState,
  setCount,
  setdefaultValue
}: {
  title: string;
  extension: string[];
  icon: string;
  IconStyle: any;
  setSkipBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setdefaultValue: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [FileError, setFileError] = useState("");
  const maxfilesize = 100857000;
  const [progress, setProgress] = useState(0);
  const WrongIconStyle: any = {
    color: "red",
    display: "inline-block",
    position: "absolute",
    top: "65px",
    left: "55px",
    fontSize: "30px"
  };
  function anticon() {
    switch (icon) {
      case "FileDoneOutlined":
        return <FileDoneOutlined style={IconStyle} />;
      case "SettingOutlined":
        return <SettingOutlined style={IconStyle} />;
      case "CalendarOutlined":
        return <CalendarOutlined style={IconStyle} />;

      default:
        return "";
    }
  }
  function iconfunction() {
    return <WarningOutlined style={WrongIconStyle} />;
  }
  const ProjectDefaultValue = async () => {
    const result = await axios.get("http://localhost:5000/api/v1/projectsug");
    setdefaultValue(result.data);
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file: any) => {
      const splitedData = file.name.split(".");
      const fileextension = splitedData[1];
      if (extension.includes(fileextension)) {
        if (file.size < maxfilesize) {
          const formData = new FormData();
          formData.append("image", file);
          formData.append("title", title);

          await axios.post(
            "http://localhost:5000/api/v1/fileUpload",
            formData,
            {
              onUploadProgress: (progressEvent) => {
                const progressCount = Math.ceil(
                  (progressEvent.loaded / progressEvent.total) * 100
                );
                setProgress(progressCount);
              }
            }
          );
          setTimeout(() => {
            setSkipBtn(true);
            ProjectDefaultValue();
            setState({ ...file, title });
            setCount((prev: number) => prev + 1);
            setFileError("");
          }, 2000);
        } else {
          setFileError("Upload file less than 1MB");
          setInterval(() => {
            setFileError("");
          }, 4000);
        }
      } else {
        setFileError(() => {
          if (title !== "Schedule") return "Only PDF file allowed";
          return "Only xls,xlsx and csv file";
        });
        setInterval(() => {
          setFileError("");
        }, 4000);
      }
    });
  };

  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Hexagon
              ProgressBar={progress}
              icon={FileError ? iconfunction : anticon}
              text={isDragActive ? "Drag file here" : FileError || title}
              sideLength={80}
              borderRadius={0}
              fill="rgba(128, 128, 128, 0.001)"
              shadow={isDragActive ? "rgba(0, 208, 255, 0.1)" : "#e2e2e2"}
              textStyle={{
                fontFamily: "sans-serif",
                fontSize: IconStyle.textSize,
                fill: FileError ? "red" : "grey"
              }}
            />
          </div>
        </section>
      )}
    </Dropzone>
  );
}
export default DropzoneFile;
