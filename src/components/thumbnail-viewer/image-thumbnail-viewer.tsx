export function ImageThumbnailViewer(props: any) {
  const { data, onClick } = props;
  return (
    <div
      onClick={() => {
        onClick(true, {
          fileName: data.fileName,
          fileUrl: data.url
        });
      }}
      onKeyDown={() => {
        onClick(true, {
          fileName: data.fileName,
          fileUrl: data.url
        });
      }}
      role="button"
      tabIndex={0}
      className="selected-document"
    >
      <img
        src={data.url}
        alt={data.fileName}
        style={{
          padding: "10px",
          width: "100%",
          height: "250px"
        }}
      />
    </div>
  );
}
