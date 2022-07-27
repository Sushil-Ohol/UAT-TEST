/* eslint-disable react/jsx-props-no-spreading */
/* File upload component */
import Hexagon from "components/hexagon/hexagon";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import "./file-upload.css";

function DropzoneFile({
  title,
  extension
}: // setFileError
{
  title: string;
  extension: string[];
  // setFileError: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [selectedFile, setSelectedFile] = useState("");
  const [FileError, setFileError] = useState("");
  const maxfilesize = 1048570;
  const textStyle = {
    fontFamily: "Source Sans Pro",
    fontSize: "2evm",
    fill: "grey"
  };
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
            setFileError("upload file less than 1 mb");
            setInterval(() => {
              setFileError("");
            }, 6000);
          }
        } else {
          setFileError(() => {
            if (title !== "Schedule") return "expected PDF";
            return `Invalid file for ${title} field  and only allow xls,xlsx and csv file`;
          });
          setInterval(() => {
            setFileError("");
          }, 6000);
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
              icon="aaa"
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
