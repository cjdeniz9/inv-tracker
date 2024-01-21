import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

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

export default function BtnEdit(props) {
  return (
    <BtnStyled
      onClick={() => {
        props.setIsOpenEdit(true);
      }}
      variant="outlined"
    >
      Edit
    </BtnStyled>
  );
}
