import axios from "axios";
import { Check, ChevronDownIcon } from "lucide-react";
import React, { useReducer } from "react";
import toast from "react-hot-toast";
import { environment } from "../../config/environment";
import { svgDrawer } from "../../lib/helpers/svgDrawer";
import { ToggleButton } from "../shared/buttons/buttons";
import { Button } from "../ui/button";

type OSItem = {
  icon: React.ReactNode;
  title: string;
  version: string;
};

type RegionItem = {
  icon: React.ReactNode;
  title: string;
  id: number;
};

type State = {
  os: OSItem | null;
  region: RegionItem | null;
  raid: string | null;
  billing: string | null;
};

type Action =
  | { type: "SET_OS"; payload: OSItem }
  | { type: "SET_REGION"; payload: RegionItem }
  | { type: "SET_RAID"; payload: string }
  | { type: "SET_BILLING"; payload: string };

const initialState: State = {
  os: null,
  region: null,
  raid: null,
  billing: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_OS":
      return { ...state, os: action.payload };
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_RAID":
      return { ...state, raid: action.payload };
    case "SET_BILLING":
      return { ...state, billing: action.payload };
    default:
      return state;
  }
};

const OS: OSItem[] = [
  {
    icon: svgDrawer.centOS,
    title: "CentOS",
    version: "20.04 LTS",
  },
  {
    icon: svgDrawer.rocky,
    title: "Rocky",
    version: "20.04 LTS",
  },
  {
    icon: svgDrawer.ubuntu,
    title: "Ubuntu",
    version: "20.04 LTS",
  },
  {
    icon: svgDrawer.debian,
    title: "Debian",
    version: "20.04 LTS",
  },
  {
    icon: svgDrawer.redHat,
    title: "Red Hat",
    version: "20.04 LTS",
  },
  {
    icon: svgDrawer.windows,
    title: "Windows",
    version: "20.04 LTS",
  },
];

const countryFlags = [
  {
    icon: svgDrawer.usaFlag,
    title: "Ashburn, VA",
    id: 1,
  },
  {
    icon: svgDrawer.usaFlag,
    title: "New York, NY",
    id: 1,
  },
  {
    icon: svgDrawer.usaFlag,
    title: "Los Angeles, CA",
    id: 1,
  },
  {
    icon: svgDrawer.hongKongFlag,
    title: "Hong Kong",
    id: 1,
  },
  {
    icon: svgDrawer.germanyFlag,
    title: "Germany",
    id: 1,
  },
  {
    icon: svgDrawer.ukFlag,
    title: "United Kingdom",
    id: 1,
  },
];

const billing = [
  { title: "Hourly", subTitle: "Pay as you go" },
  { title: "Monthly", subTitle: "Pay upfront and save 5%" },
];

const raid = [
  { title: "No RAID", subTitle: "" },
  { title: "RAID 0", subTitle: "Distributes data evenly" },
  { title: "RAID 1", subTitle: "Distributes data evenly" },
];

export const RenderDetails = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const RegionSelector = ({ value }: any) => {
    return (
      <div className="flex items-center justify-between border rounded-lg px-4 py-2 mt-2 ">
        <div className="flex items-center gap-2">
          <p className="text-xs font-medium text-gray-500">Region</p>
          <div className="pl-4 flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center">
              {value?.icon && React.isValidElement(value.icon)
                ? React.cloneElement(
                    value.icon as React.ReactElement<
                      React.SVGProps<SVGSVGElement>
                    >,
                    {
                      width: "100%",
                      height: "100%",
                    }
                  )
                : null}
            </div>
            <p className="text-sm font-medium">{value?.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <p className="text-[10px] border px-2  rounded-md">$97.00/mo</p>
          <p className=" border text-[10px] px-2  rounded-md">$0.13/hr</p>
          <ChevronDownIcon className="w-5 h-5 text-gray-500" />
        </div>
      </div>
    );
  };

  const handleDeployment = async () => {
  try {
    const token = localStorage.getItem("token");

    const payload = {
      data: {
        label: "c2-large-x8687", 
        type_id: 4,
        location_id: state.region?.id || 1, 
        buy_price: 10,
      },
      metadata: {
        Hostname: "Client Server", 
        "SNMP Public Community": "public", 
        "SNMP Private Community": "private", 
        OS: state.os ? `${state.os.title} ${state.os.version}` : "Unknown OS", 
        "IP Address": "149.51.229.634",
      },
    };

    const config = {
      url: `${environment.VITE_API_URL}/ordering`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        apiKey: "",
      },
      data: payload,
    };

    const response = await axios(config);

    if (response.status === 200 || response.status === 201) {
      toast.success("Successfully Deployed!")
    }
  } catch (error) {
    console.error("Error deploying server:", error);
    toast.error("Something went wrong!")
  }
};

  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full mb-20 sm:mb-0">
      <h1 className="text-lg font-medium py-1">c2.small.x86</h1>
      <div className="flex flex-col sm:flex-row w-full gap-4 xl:gap-8">
        <div className="w-full sm:w-2/6 flex flex-col gap-4">
          <p className="text-xs text-gray-500">Select Operating System</p>
          <div className="grid grid-cols-2 gap-4">
            {OS.map((item, index) => (
              <div
                className={`flex flex-col gap-4 border rounded-lg px-3 py-4  justify-center items-center text-xs cursor-pointer ${
                  state.os?.title === item.title
                    ? "border-sky-600"
                    : "border-gray-200"
                }`}
                key={index}
                onClick={() => dispatch({ type: "SET_OS", payload: item })}
              >
                <div>{item.icon}</div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          <div className="border rounded-lg py-2 pl-8 flex items-center gap-2">
            <p className="text-xs text-gray-500">OS Version:</p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-5 h-5 flex items-center justify-center">
                {state.os?.icon && React.isValidElement(state.os.icon)
                  ? React.cloneElement(
                      state.os.icon as React.ReactElement<
                        React.SVGProps<SVGSVGElement>
                      >,
                      {
                        width: "100%",
                        height: "100%",
                      }
                    )
                  : null}
              </div>
              <p className="text-xs flex">{state.os?.title} 24.03</p>
            </div>
          </div>
          <div className=" text-xs text-gray-500">
            <div className="pb-2 items-center flex justify-between ">
              <p>SSH Keys</p>
              <ToggleButton />
            </div>
            <div className="border rounded-lg py-2 px-4 ">Choose SSH Keys</div>
          </div>
          <div className="flex bg-gray-100 rounded-lg p-3 justify-between items-center">
            <div className="pl-0 lg:pl-2 text-sm ">
              <p className="text-xs text-gray-500">My Total</p>
              <p className="font-medium">$0.14/hr</p>
            </div>
            <Button className="lg:text-sm text-xs" onClick={handleDeployment}>
              Deploy Server
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-8/12 flex flex-col px-0 xl:px-6 text-xs text-gray-500 gap-3">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Select Region</p>
            <div className="grid grid-cols-3 gap-3">
              {countryFlags.map((item, index) => (
                <div
                  className={`flex gap-2 sm:gap-4 rounded-lg pl-2 lg:pl-4 xl:pl-8 py-3 items-center text-xs cursor-pointer ${
                    state.region?.title === item.title
                      ? " bg-gray-100"
                      : "border-gray-200 border"
                  }`}
                  key={index}
                  onClick={() =>
                    dispatch({ type: "SET_REGION", payload: item })
                  }
                >
                  <div>{item.icon}</div>
                  <p>{item.title}</p>
                  {state.region?.title === item.title && (
                    <div className="ml-4 w-5 h-5 p-1 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <RegionSelector value={state.region} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">RAID</p>
            <div className="grid grid-cols-3 gap-3">
              {raid.map((item, index) => (
                <div
                  className={`flex rounded-lg py-2 px-3 lg:px-6 items-center justify-between text-sm cursor-pointer ${
                    state.raid === item.title
                      ? " bg-gray-100"
                      : "border-gray-200 border"
                  }`}
                  key={index}
                  onClick={() =>
                    dispatch({ type: "SET_RAID", payload: item.title })
                  }
                >
                  <div className="flex flex-col justify-center ">
                    <div>{item.title}</div>
                    <p className=" text-[10px] ">{item.subTitle}</p>
                  </div>
                  {state.raid === item.title && (
                    <div className="ml-4 w-5 h-5 p-1 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">Billing</p>
            <div className="grid grid-cols-3 gap-3">
              {billing.map((item, index) => (
                <div
                  className={`flex rounded-lg py-2 px-3 lg:px-6 items-center justify-between text-sm cursor-pointer ${
                    state.billing === item.title
                      ? " bg-gray-100"
                      : "border-gray-200 border"
                  }`}
                  key={index}
                  onClick={() =>
                    dispatch({ type: "SET_BILLING", payload: item.title })
                  }
                >
                  <div className="flex flex-col justify-center ">
                    <div>{item.title}</div>
                    <p className=" text-[10px] ">{item.subTitle}</p>
                  </div>
                  {state.billing === item.title && (
                    <div className=" w-5 h-5 p-1 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="border flex flex-col rounded-lg p-6 gap-2 mt-6">
            <h2 className="text-sm text-gray-800 font-medium">Host Names</h2>
            <p className="text-xs text-gray-500 mt-1">
              Choose a name to help identify your server. You can use
              alphanumeric characters, dashes, and periods up to 32 characters.
            </p>
            <input
              type="text"
              className="mt-4 w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="c2-small-x86-chi-1"
              defaultValue="c2-small-x86-chi-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
