/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import Dropzone from "react-dropzone";
import { FileTypes } from "models/enums";
import "./file-upload.css";

type FileUploadProps = {
  title: string;
  docType: FileTypes;
  extensions: Array<string>;
};

function FileUpload(props: FileUploadProps) {
  const [selectedFiles, setSelectedFiles] = useState<any>();
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const { title, extensions } = props;

  const upload = () => {
    if (selectedFiles) {
      const selectedFile = selectedFiles[0];
      setProgress(0);
      setCurrentFile(selectedFile);
    }
  };

  const onDrop = (files: any) => {
    setMessage("");
    setSelectedFiles(undefined);
    if (files.length > 0) {
      if (extensions.includes(files[0].name.split(".")[1])) {
        setSelectedFiles(files);
      } else {
        setMessage("Invalid file tpye!");
      }
    }
  };

  return (
    <div>
      {currentFile && (
        <div className="progress">
          <div
            className="progress-bar progress-bar-info progress-bar-striped"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ width: `${progress}%` }}
          >
            {progress}%
          </div>
        </div>
      )}

      <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} onChange={upload} />
              {selectedFiles && selectedFiles[0].name ? (
                <div className="selected-file">
                  {selectedFiles && selectedFiles[0].name}
                </div>
              ) : (
                <label>{title}</label>
              )}
            </div>
          </section>
        )}
      </Dropzone>

      <div className="alert" role="alert">
        {message}
      </div>
    </div>
  );
}

export default FileUpload;
