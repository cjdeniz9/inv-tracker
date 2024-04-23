import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

const AlertNotif = ({ status, width, title }) => {
  return (
    <Alert
      status={status}
      bg="#fff"
      border="1px"
      borderColor="#EDEDED"
      borderRadius={6}
      width={width}
    >
      <AlertIcon />
      <AlertTitle fontWeight={600}>{title}</AlertTitle>
    </Alert>
  );
};

export default AlertNotif;
