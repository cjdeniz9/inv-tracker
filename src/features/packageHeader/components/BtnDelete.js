import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const BtnStyled = styled(Button)(({ theme }) => ({
  borderColor: "#CFCFCF",
  color: "#242424",
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": {
    backgroundColor: "white",
    borderColor: "#CFCFCF",
    color: "#7A7A7A",
  },
}));

export default function BtnDelete(props) {
  return (
    <BtnStyled
      onClick={() => {
        props.setIsOpenDelete(true);
      }}
      variant="outlined"
    >
      Delete
    </BtnStyled>
  );
}
