import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

export default function StatusFilter(props) {
  return (
    <div className="relative z-10">
      <Listbox value={props.selectedStatus} onChange={props.setSelectedStatus}>
        <div className="relative">
          <Listbox.Button className="relative cursor-pointer rounded-[4px] bg-white py-2 pl-3 pr-10 text-left text-sm hover:text-sonic-silver border">
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
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5  text-sm">
              {props.status.map((item) => (
                <Listbox.Option
                  key={item.id}
                  value={item.type}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pr-10 hover:text-sonic-silver ${
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
