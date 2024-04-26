import { useDispatch, useSelector } from "react-redux";

import { addTrackingNum, getTrackingNum } from "../../../context/shipmentSlice";

import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function TrackingCodeInput() {
  const dispatch = useDispatch();

  const trackingNum = useSelector(getTrackingNum);

  return (
    <FormControl>
      <FormLabel fontSize={12} fontWeight="none" color="#718096">
        Tracking code
      </FormLabel>
      <Input
        type="text"
        value={trackingNum}
        onChange={(e) => {
          dispatch(addTrackingNum(e.target.value));
        }}
        fontSize={17}
        _focusVisible={{
          border: ".1px",
          borderColor: "#CFCFCF",
          _hover: {
            borderColor: "#003EFF",
          },
        }}
        _hover={{
          borderColor: "#CFCFCF",
          borderWidth: "1px",
        }}
        required
      />
    </FormControl>
  );
}
