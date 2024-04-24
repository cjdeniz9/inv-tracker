import ReactTimeAgo from "react-time-ago";

import { Box, Text } from "@chakra-ui/react";

const TimelineBox = ({ text, date }) => {
  return (
    <Box className="mt-6 py-3 px-4 bg-gray-98 rounded">
      <Text className="text-lg" mb={1}>
        {text}
      </Text>
      <ReactTimeAgo date={date} locale="en-US" className="text-slate-gray" />
    </Box>
  );
};

export default TimelineBox;
