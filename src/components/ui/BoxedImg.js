import { Box, Image } from "@chakra-ui/react";

const BoxedImg = ({ w, img, title, p }) => {
  return (
    <Box w={w} className="grid place-content-center">
      <Image src={img} alt={title} p={p} />
    </Box>
  );
};

export default BoxedImg;
