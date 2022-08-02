/* eslint-disable react/jsx-props-no-spreading */
/* File upload component */
import {
  FileDoneOutlined,
  SettingOutlined,
  CalendarOutlined,
  WarningOutlined
} from "@ant-design/icons";
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
  setCount
}: {
  title: string;
  extension: string[];
  icon: string;
  IconStyle: object;
  setSkipBtn: React.Dispatch<React.SetStateAction<boolean>>;
  setState: any;
  setCount: any;
}) {
  // const [selectedFile, setSelectedFile] = useState("");
  const [FileError, setFileError] = useState("");
  const maxfilesize = 1048570;
  // const textStyle = {
  //   fontFamily: "Source Sans Pro",
  //   fontSize: "12px"
  // };
  const WrongIconStyle: any = {
    color: "red",
    display: "inline-block",
    position: "absolute",
    top: "80px",
    left: "73px",
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
  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file: any) => {
      extension.forEach((item: any) => {
        const splitedData = file.name.split(".");
        const fileextension = splitedData[1];
        if (item === fileextension) {
          if (file.size < maxfilesize) {
            setSkipBtn(true);

            setState({ ...file, title });
            setCount((prev: number) => prev + 1);
            setFileError("");
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
    });
  };

  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {({ getRootProps, getInputProps, isDragActive }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Hexagon
              icon={FileError ? iconfunction : anticon}
              text={FileError || isDragActive ? "Drag file here" : title}
              sideLength={100}
              borderRadius={0}
              fill="rgba(128, 128, 128, 0.001)"
              shadow={isDragActive ? "rgba(0, 208, 255, 0.1)" : "#e2e2e2"}
              textStyle={{
                fontFamily: "Source Sans Pro",
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
