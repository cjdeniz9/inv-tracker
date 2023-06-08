import { useState } from "react";

import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { useEffect } from "react";

export default function UploadImage(props) {
  const uploader = Uploader({
    apiKey: "public_W142hy36kB1izTruKyEXxBayzhD4",
  });
  const uploaderOptions = {
    multi: false,
    styles: {
      colors: {
        primary: "#003EFF",
      },
    },
  };

  const [inventory, setInventory] = useState(
    () => JSON.parse(localStorage.getItem("inventory")) || []
  );

  const [files, setFiles] = useState([]);

  const MyUploadButton = ({ setFiles }) => (
    <UploadButton
      uploader={uploader}
      options={uploaderOptions}
      onComplete={setFiles}
    >
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
      // Tip: save 'filePath' to your DB (not 'fileUrl').
      const filePath = file.filePath;
      const fileUrl = uploader.url(filePath, "thumbnail"); // "raw" for un-transformed file.
    });

  let addImg = inventory.map((item) => {
    if (item.id === props.activeProductId && files.length !== 0) {
      return {
        ...item,
        img: files[0].fileUrl,
      };
    }
    return item;
  });

  useEffect(() => {
    localStorage.setItem("inventory", JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    setInventory(addImg);
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
