import { FormControl, FormLabel, Input } from "@chakra-ui/react";

export default function TrackingCodeInput({ value, onChange }) {
  return (
    <FormControl>
      <FormLabel fontSize={12} fontWeight="none" color="#718096">
        Tracking code
      </FormLabel>
      <Input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
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
