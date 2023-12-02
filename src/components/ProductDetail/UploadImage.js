import { useEffect, useState } from "react";

import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import * as Bytescale from "@bytescale/sdk";
import { UploadButton } from "@bytescale/upload-widget-react";

export default function UploadImage(props) {
  const options = {
    apiKey: process.env.REACT_APP_BYTESCALE_API_KEY,
    maxFileCount: 1,
  };

  const id = props.activeProductId;

  const [files, setFiles] = useState([]);

  const MyUploadButton = ({ setFiles }) => (
    <UploadButton options={options} onComplete={setFiles}>
      {({ onClick }) => (
        <button
          onClick={onClick}
          className="border py-[11px] px-3 rounded text-raisin-black font-medium"
        >
          Upload Image
        </button>
      )}
    </UploadButton>
  );

  const MyUploadedFiles = ({ files }) =>
    files.map((file) => {
      const { filePath, accountId } = file;
      const fileUrl = Bytescale.UrlBuilder.url({
        filePath,
        accountId,
        options: {
          transformation: "preset",
          transformationPreset: "thumbnail",
        },
      });
    });

  async function addImg() {
    await updateDoc(doc(db, "inventory", id), {
      img: files[0].fileUrl,
    });
    props.forceRender();
  }

  useEffect(() => {
    addImg();
  }, [files]);

  if (files.length !== 0) {
    window.location.reload();
  }

  return (
    <>
      <MyUploadButton setFiles={setFiles} />
    </>
  );
}
