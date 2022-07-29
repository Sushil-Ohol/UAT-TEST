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
  IconStyle
}: {
  title: string;
  extension: string[];
  icon: string;
  IconStyle: object;
}) {
  const [selectedFile, setSelectedFile] = useState("");
  const [FileError, setFileError] = useState("");
  const maxfilesize = 1048570;
  const textStyle = {
    fontFamily: "Source Sans Pro",
    fontSize: "2evm",
    fill: FileError ? "red" : "grey"
  };
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
        if (
          file.type === `application/${item}` ||
          file.type === `text/${item}`
        ) {
          if (file.size < maxfilesize) {
            setSelectedFile(file.path);
            setFileError("");
          } else {
            setFileError("Please upload file less than 1MB");
          }
        } else {
          setFileError(() => {
            if (title !== "Schedule") return "Only PDF file allowed";
            return "Only xls,xlsx and csv file";
          });
        }
      });
    });
  };

  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Hexagon
              icon={FileError ? iconfunction : anticon}
              text={`${selectedFile}` || FileError || title}
              sideLength={100}
              borderRadius={0}
              fill="rgba(128, 128, 128, 0.001)"
              shadow="#e2e2e2"
              textStyle={textStyle}
            />
          </div>
        </section>
      )}
    </Dropzone>
  );
}
export default DropzoneFile;
