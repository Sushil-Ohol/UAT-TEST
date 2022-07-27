/* eslint-disable react/jsx-props-no-spreading */
/* File upload component */
import Hexagon from "components/hexagon/hexagon";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

function DropzoneFile({ title }: any) {
  const [selectedFile, setSelectedFile] = useState();
  const onDrop = (acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      setSelectedFile(file.path);
    });
  };

  return (
    <Dropzone onDrop={onDrop} multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Hexagon
              text={selectedFile || title}
              sideLength={100}
              fontSize="15px"
              borderRadius={0}
              fill="rgba(128, 128, 128, 0.001)"
              shadow="#e2e2e2"
            />
          </div>
        </section>
      )}
    </Dropzone>
  );
}
export default DropzoneFile;
