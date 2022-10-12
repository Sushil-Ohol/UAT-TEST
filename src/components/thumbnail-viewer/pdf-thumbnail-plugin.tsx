import { thumbnailPlugin } from "@react-pdf-viewer/thumbnail";
import { Viewer, Worker } from "components/index";
import PageThumbnailPlugin from "./page-thumbnail-plugin";
import "@react-pdf-viewer/core/lib/styles/index.css";

export function PdfThumbnailViewer(props: any) {
  const { data, onClick } = props;
  const thumbnailPluginInstance = thumbnailPlugin();
  const { Cover } = thumbnailPluginInstance;
  const pageThumbnailPluginInstance = PageThumbnailPlugin({
    PageThumbnail: <Cover getPageIndex={() => 0} />
  });

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
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">
        <div
          style={{
            flex: 1,
            width: "200px",
            marginLeft: "20px"
          }}
        >
          <Viewer
            fileUrl={`${process.env.PUBLIC_URL}${data.url}`}
            plugins={[pageThumbnailPluginInstance, thumbnailPluginInstance]}
          />
        </div>
      </Worker>
    </div>
  );
}
