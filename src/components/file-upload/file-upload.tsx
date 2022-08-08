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
import { FILESIZE, URL } from "../../constants/file-constant";
import "./file-upload.css";

function DropzoneFile({
  title,
  extension,
  icon,
  setSkipBtn,
  setState,
  setCount,
  setdefaultValue
}: {
  title: string;
  extension: string[];
  icon: string;
  setSkipBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setdefaultValue: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [FileError, setFileError] = useState("");
  const [progress, setProgress] = useState(0);

  function anticon() {
    switch (icon) {
      case "FileDoneOutlined":
        return <FileDoneOutlined className="icon-style" />;
      case "SettingOutlined":
        return <SettingOutlined className="icon-style" />;
      case "CalendarOutlined":
        return <CalendarOutlined className="icon-style" />;
      default:
        return "";
    }
  }
  function iconfunction() {
    return <WarningOutlined className="icon-style-wrong" />;
  }
  const ProjectDefaultValue = async () => {
    const result = await axios.get(`${URL}/projectsug`);
    setdefaultValue(result.data);
  };

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file: any) => {
      const splitedData = file.name.split(".");
      const fileextension = splitedData[1];
      if (extension.includes(fileextension)) {
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
          setTimeout(() => {
            setSkipBtn(true);
            ProjectDefaultValue();
            setState({ ...file, title });
            setCount((prev: number) => prev + 1);
            setFileError("");
          }, 2000);
        } else {
          setFileError("Upload file less than 100MB");
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
    <Dropzone onDrop={onDrop} multiple>
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
                fontSize: "12px",
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
