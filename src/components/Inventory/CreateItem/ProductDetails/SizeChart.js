export default function SizeChart(props) {
  const shoeSizeNum = [
    {
      size: "3.5",
    },
    {
      size: "4",
    },
    {
      size: "4.5",
    },
    {
      size: "5",
    },
    {
      size: "5.5",
    },
    {
      size: "6",
    },
    {
      size: "6.5",
    },
    {
      size: "7",
    },
    {
      size: "7.5",
    },
    {
      size: "8",
    },
    {
      size: "8.5",
    },
    {
      size: "9",
    },
    {
      size: "9.5",
    },
    {
      size: "10",
    },
    {
      size: "10.5",
    },
    {
      size: "11",
    },
    {
      size: "11.5",
    },
    {
      size: "12",
    },
    {
      size: "12.5",
    },
    {
      size: "13",
    },
    {
      size: "14",
    },
    {
      size: "15",
    },
    {
      size: "16",
    },
    {
      size: "17",
    },
    {
      size: "18",
    },
  ];

  return (
    <>
      <span className="block mb-2 font-semibold">Select size to add</span>
      <div className="border-b w-full" />
      <div className="lg:grid-cols-6 grid grid-cols-9 gap-2 pt-4">
        {shoeSizeNum.map((item) => {
          const selectedColor =
            item.size === props.size
              ? "border-blue-ryb text-blue-ryb hover:border-absolute-zero hover:text-absolute-zero"
              : "";
          return (
            <input
              className={`${selectedColor} border-[1px] rounded-md py-2 text-center text-[15px] font-medium hover:border-davys-grey hover:text-davys-grey`}
              type="button"
              id="size"
              value={item.size}
              onClick={() => {
                if (props.size === item.size) {
                  props.setSize("");
                } else {
                  props.setSize(item.size);
                  props.setSizeError(false);
                }
                props.setSelected((prevState) => {
                  return {
                    ...prevState,
                    size: item.size,
                  };
                });
              }}
            />
          );
        })}
      </div>
    </>
  );
}
