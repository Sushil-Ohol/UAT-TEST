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
import { FILESIZE, URL } from "constants/index";
import "./file-upload.css";

function Fileupload({
  title,
  extension,
  icon,
  setSkipBtn,
  setState,
  setCount,
  setdefaultValue,
  hexagoanstyle
}: {
  title: string;
  extension: string[];
  icon: string;
  setSkipBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setState: React.Dispatch<React.SetStateAction<any>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setdefaultValue: React.Dispatch<React.SetStateAction<any>>;
  hexagoanstyle: any;
}) {
  const [FileError, setFileError] = useState("");
  const [progress, setProgress] = useState(0);

  function anticon() {
    switch (icon) {
      case "FileDoneOutlined":
        return <FileDoneOutlined className={hexagoanstyle.className} />;
      case "SettingOutlined":
        return <SettingOutlined className={hexagoanstyle.className} />;
      case "CalendarOutlined":
        return <CalendarOutlined className={hexagoanstyle.className} />;
      default:
        return "";
    }
  }
  function iconfunction() {
    return <WarningOutlined className={hexagoanstyle.errorStyleClass} />;
  }
  const ProjectDefaultValue = async () => {
    const result = await axios.get(`${URL}/projectsug`);
    setdefaultValue(result.data);
  };

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length <= 1) {
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
            return `only ${extension} file allow`;
          });
          setInterval(() => {
            setFileError("");
          }, 4000);
        }
      });
    } else {
      setFileError("only single file");
      setInterval(() => {
        setFileError("");
      }, 4000);
    }
  };

  return (
    <Dropzone onDrop={onDrop} multiple>
      {({ getRootProps, getInputProps, isDragActive }) => {
        return (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Hexagon
                ProgressBar={progress}
                icon={FileError ? iconfunction : anticon}
                text={isDragActive ? "Drag file here" : FileError || title}
                sideLength={hexagoanstyle.HexagoanSize}
                borderRadius={0}
                fill="rgba(128, 128, 128, 0.001)"
                shadow={isDragActive ? "rgba(0, 208, 255, 0.1)" : "#e2e2e2"}
                textStyle={{
                  fontFamily: "sans-serif",
                  fontSize: hexagoanstyle.textSize,
                  fill: FileError ? "red" : "grey"
                }}
              />
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}
export default Fileupload;
