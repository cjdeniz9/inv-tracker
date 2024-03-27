export default function Notes(props) {
  return (
    <div className="mt-8">
      <div className="w-full bg-gray-98 drop-shadow-md rounded">
        <div className="p-4">
          <div className="flex py-2">
            <h5 className="text-raisin-black">Notes</h5>
          </div>
          <div className="w-full flex text-[15px] text-onyx-gray pt-2 pl-3 bg-white h-24 border rounded">
            <p>{props.activeProduct[0].notes}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
