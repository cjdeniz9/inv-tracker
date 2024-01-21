import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Edit(props) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -107%)",
    width: 550,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 2,
    p: 3,
  };

  return (
    <Modal
      open={props.isOpenEdit}
      onClose={() => {
        props.setIsOpenEdit(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex justify-between mb-3">
          <h4>Edit package</h4>
          <button
            id="main"
            onClick={() => {
              props.setIsOpenEdit(false);
            }}
          >
            <FontAwesomeIcon icon={faXmark} className="text-2xl" />
          </button>
        </div>
        <form id="editPackageForm" onSubmit={props.addShipment}>
          <div>
            <label className="block text-xs text-raisin-black mb-2">
              Tracking number *
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Tracking code"
              type="text"
              id="trackingNum"
              value={props.trackingNum}
              onChange={(e) => {
                props.setTrackingNum(e.target.value);
              }}
              required
            />
          </div>
          <div className="phone-screen:mt-16 tablet-screen:mt-10 w-full mt-8 flex flex-row-reverse">
            <input
              className="bg-blue-ryb rounded py-2 px-3 text-white font-medium hover:bg-absolute-zero"
              type="submit"
              form="editPackageForm"
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
}
