import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";

import { useDispatch, useSelector } from "react-redux";

import { addSelected } from "../context/selectedSlice";
import { deleteKeyword } from "../../../context/keywordSlice";
import { deleteResults, getResults } from "../context/resultsSlice";
import { toggleCustom, toggleProduct } from "../context/showSlice";

export default function SearchList() {
  const dispatch = useDispatch();

  const results = useSelector(getResults);

  return (
    <List
      sx={{
        width: "100%",
        boxShadow:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
        bgcolor: "background.paper",
        borderRadius: 1,
        position: "relative",
        overflow: "auto",
        marginTop: 2,
        maxHeight: 400,
        zIndex: 10,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      <ListSubheader sx={{ padding: 0 }}>
        <ListItemButton
          onClick={() => {
            dispatch(deleteKeyword());
            dispatch(deleteResults());
            dispatch(toggleCustom());
            dispatch(toggleProduct());
          }}
          sx={{ color: "#003EFF" }}
        >
          <div className="flex w-4/5 hover:text-granite-gray">
            <div className="w-1/12 mr-4 flex items-center justify-center">
              <span className="text-3xl">+</span>
            </div>
            <span className="font-semibold">Create custom item</span>
          </div>
        </ListItemButton>
      </ListSubheader>
      {results &&
        results.map((item) => {
          return (
            <ListItem key={item.id} sx={{ padding: 0 }}>
              <ListItemButton
                onClick={() => {
                  dispatch(addSelected(item));
                  dispatch(deleteKeyword());
                  dispatch(deleteResults());
                  dispatch(toggleProduct());
                }}
              >
                <div className="flex py-2 w-4/5">
                  <div className="w-1/12 mr-4 bg-white flex items-center justify-center rounded">
                    <img
                      src={item.thumbnail}
                      alt="results-img"
                      className="w-10/12 py-1"
                    />
                  </div>
                  <div>
                    <span className="block">{item.shoeName}</span>
                    <span className="text-sm">{item.styleID}</span>
                  </div>
                </div>
                <div className="w-1/5 flex justify-end text-blue-ryb">
                  <div className="flex hover:text-granite-gray">
                    <span className="text-2xl">+</span>
                    <span className="ml-2 my-1.5 font-semibold">Add item</span>
                  </div>
                </div>
              </ListItemButton>
            </ListItem>
          );
        })}
    </List>
  );
}
