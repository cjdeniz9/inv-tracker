import { Tab } from "@chakra-ui/react";

const TabIndex = ({ title }) => {
  return (
    <Tab fontSize="small" _selected={{ fontWeight: "600" }}>
      {title}
    </Tab>
  );
};

export default TabIndex;
