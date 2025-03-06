import { Alert, AlertIcon, AlertTitle, useToast } from "@chakra-ui/react";

export const ToastAlert = () => {
  const toast = useToast();
  const id = "toast-id";

  const addToast = (newRes) => {
    toast({
      id,
      position: "top",
      duration: 6000,
      render: () => (
        <Alert
          status={newRes.status}
          bg="#fff"
          border="1px"
          borderColor="#EDEDED"
          borderRadius={6}
          width={newRes.width}
        >
          <AlertIcon />
          <AlertTitle fontWeight={newRes.fontWeight}>
            {newRes.message}
          </AlertTitle>
        </Alert>
      ),
    });
  };

  return { toast, id, addToast };
};
