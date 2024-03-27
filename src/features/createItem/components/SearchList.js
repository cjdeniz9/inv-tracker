import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListSubheader from "@mui/material/ListSubheader";

export default function SearchList(props) {
  return (
    props.inputOpen && (
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
              props.setInputOpen(false);
              props.setKeyword("");
              props.setOpenCustom(true);
              props.setToggle(true);
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
        {props.results &&
          props.results.map((item) => {
            return (
              <ListItem key={item.id} sx={{ padding: 0 }}>
                <ListItemButton
                  onClick={() => {
                    props.setInputOpen(false);
                    props.setOpenCustom(false);
                    props.setSelected(item);
                    props.setToggle(true);
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
                      <span className="ml-2 my-1.5 font-semibold">
                        Add item
                      </span>
                    </div>
                  </div>
                </ListItemButton>
              </ListItem>
            );
          })}
      </List>
    )
  );
}
