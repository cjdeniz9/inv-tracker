import { useState } from "react";

import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import { useEffect } from "react";

export default function ChangeImage(props) {
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
          Change Image
        </button>
      )}
    </UploadButton>
  );

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

  if (
    files.length !== 0 &&
    files[0].fileUrl !== props.activeProduct[0].fileUrl
  ) {
    window.location.reload();
  }

  return (
    <>
      <MyUploadButton setFiles={setFiles} />
    </>
  );
}
