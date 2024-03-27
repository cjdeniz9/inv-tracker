import Button from "@mui/material/Button";

export default function CustomItem(props) {
  const tabChange = (e) => {
    e.preventDefault(e);

    if (props.size === "") {
      props.setSizeError(true);
    } else {
      props.setSizeError(false);
      props.setValue("2");
    }
  };

  return (
    <form onSubmit={tabChange} id="customitem">
      <div className="w-full flex justify-between">
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">
            Name <span className="text-cinnabar-red">*</span>
          </label>
          <input
            required
            placeholder="Product name"
            type="text"
            id="name"
            value={props.name}
            onChange={(e) => {
              props.setName(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  name: e.target.value,
                };
              });
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">SKU</label>
          <input
            placeholder="12345678"
            type="number"
            id="sku"
            value={props.sku}
            onChange={(e) => {
              props.setSku(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  styleID: e.target.value,
                };
              });
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <div className="w-full flex justify-between">
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">Brand</label>
          <input
            placeholder="Jordan, Nike..."
            type="text"
            id="brand"
            value={props.brand}
            onChange={(e) => {
              props.setBrand(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  brand: e.target.value,
                };
              });
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div className="w-[49%]">
          <label className="inline-block mb-2 text-xs">Color</label>
          <input
            placeholder="Product color"
            type="text"
            id="color"
            value={props.color}
            onChange={(e) => {
              props.setColor(e.target.value);
              props.setSelected((prevState) => {
                return {
                  ...prevState,
                  color: e.target.value,
                };
              });
            }}
            className="appearance-none block w-full text-gray-700 border border-gray-100 rounded-[3px] py-2.5 px-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
      </div>
      <Button
        id="customitem"
        type="submit"
        variant="contained"
        style={{
          backgroundColor: "#003EFF",
          position: "fixed",
          bottom: "1rem",
          right: "1rem",
          fontWeight: 600,
          textTransform: "none",
        }}
      >
        Next
      </Button>
    </form>
  );
}
