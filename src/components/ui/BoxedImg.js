import { Image } from "@chakra-ui/react";

const BoxedImg = ({ img, title, p }) => {
  return (
    <div className="grid place-content-center bg-white rounded-md">
      <Image src={img} alt={title} p={p} />
    </div>
  );
};

export default BoxedImg;
