function DocumentView({ file }: any) {
  return (
    <iframe src={file} height="100%" width="100%" title="Iframe Example" />
  );
}

export default DocumentView;
