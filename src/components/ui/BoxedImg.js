import { Box, Image } from "@chakra-ui/react";

const BoxedImg = ({ width, img, title, padding }) => {
  return (
    <Box
      w={width}
      className="bg-white border border-[1px] border-bright-gray rounded grid place-content-center"
    >
      <Image src={img} alt={title} px={padding} />
    </Box>
  );
};

export default BoxedImg;
