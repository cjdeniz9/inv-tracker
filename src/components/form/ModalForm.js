import BtnCancel from "./BtnCancel";
import BtnSubmit from "./BtnSubmit";

import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

const ModalForm = ({ id, onSubmit, header, form, onClick }) => {
  return (
    <ModalContent>
      <form id={id} onSubmit={onSubmit}>
        <ModalHeader fontSize={25}>{header}</ModalHeader>
        {form}
        <ModalFooter>
          <BtnCancel onClick={onClick} mr={2} value="Close" />
          <BtnSubmit form={id} value="Save" />
        </ModalFooter>
      </form>
    </ModalContent>
  );
};

export default ModalForm;
