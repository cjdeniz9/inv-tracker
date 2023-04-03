import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ProfitFilter(props) {
  return (
    <div className="fixed w-36">
      <Listbox value={props.selectedStatus} onChange={props.setSelectedStatus}>
        <div className="">
          <Listbox.Button className=" w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {props.selectedStatus.length >= 1
                ? `Status: ${props.selectedStatus}`
                : `Status: ${props.status[0].type}`}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className=" mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {props.status.map((item) => (
                <Listbox.Option
                  key={item.id}
                  value={item.type}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pr-10  ${
                      active ? "bg-gray-0" : "text-gray-900"
                    }`
                  }
                >
                  <span className="block truncate">{item.type}</span>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
