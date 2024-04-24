import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import {
  getFilteredId,
  getFilteredItem,
} from "../../../context/filteredItemSlice";

import { db } from "../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

import * as Bytescale from "@bytescale/sdk";
import { UploadButton } from "@bytescale/upload-widget-react";

export default function ChangeImage(props) {
  const options = {
    apiKey: "public_12a1ygq2G8Rv4sQMXKKvr9f8iRNW",
    maxFileCount: 1,
  };

  const filteredId = useSelector(getFilteredId);
  const filteredItem = useSelector(getFilteredItem);

  const [files, setFiles] = useState([]);

  const MyUploadButton = ({ setFiles }) => (
    <UploadButton options={options} onComplete={setFiles}>
      {({ onClick }) => (
        <button
          onClick={onClick}
          className="border py-[11px] px-3 rounded text-raisin-black font-medium"
        >
          Change Image
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
    await updateDoc(doc(db, "inventory", filteredId), {
      img: files[0].fileUrl,
    });
  }

  useEffect(() => {
    addImg();
  }, [files]);

  if (files.length !== 0 && files[0].fileUrl !== filteredItem.fileUrl) {
    window.location.reload();
  }

  return (
    <>
      <MyUploadButton setFiles={setFiles} />
    </>
  );
}
