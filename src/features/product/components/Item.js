export default function Item(props) {
  return (
    <div className="w-full h-48 flex bg-gray-98 rounded">
      <div className="w-[16%]">
        <div className="min-h-full flex items-center justify-center">
          <h2>{props.activeProduct[0].size}</h2>
          {/* <span className="text-xl">US</span>
            <p className="text-xl">M</p> */}
        </div>
      </div>
      <div className="my-8 border-l border-american-silver"></div>
      <div className="2xl:w-[64%] w-[55%] m-auto">
        <div className="ml-6">
          <span className="font-medium">{props.activeProduct[0].colorway}</span>
          <br />
          <span className="text-granite-gray">
            {props.activeProduct[0].brand}
          </span>
        </div>
      </div>
      <div className="2xl:w-[20%] w-[29%] flex flex-row-reverse py-3 pr-5">
        {props.activeProduct[0].img === "" ? (
          ""
        ) : (
          <div className="bg-white w-[70%] border border-[1px] border-bright-gray rounded flex items-center justify-center">
            <img
              src={props.activeProduct[0].img}
              alt="Product Image"
              className="w-[70%]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
