import { Check, ChevronDownIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { environment } from "../../config/environment";
import { OSOrdering } from "../../constants/constants";
import { useAppSelector } from "../../hooks/redux";
import axios from "../../lib/apiConfig";
import { svgDrawer } from "../../lib/helpers/svgDrawer";
import {
  RegionItem,
  setBilling,
  setHostname,
  setOS,
  setRaid,
  setRegion,
  setSshKey,
  setToInitial,
} from "../../redux/reducer/resourcesReducer";
import {
  selectActiveProject,
  selectUser,
} from "../../redux/selectors/userSelector";
import { RootState } from "../../redux/store";
import { PlanData } from "../../types/generics.types";
import { ToggleButton } from "../shared/buttons/buttons";
import { RDropdownMenu } from "../shared/menus/dropdown-menu";
import { OrderDropdownMenu } from "../shared/menus/ordering-dropdown";
import { Button } from "../ui/button";

const countryFlags: RegionItem[] = [
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

type SSHItem = {
  label: string;
  key: string;
};

export type Versions = {
  label: string;
  id: number;
  title: string;
  icon: React.ReactNode;
};

type OSList = {
  versions: Versions[];
  id?: number;
  icon: React.ReactNode;
  title: string;
  version: string;
};

export const RenderDetails = ({ plan }: { plan: PlanData }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const details = useSelector((state: RootState) => state.renderDetails);
  const currentProject = useAppSelector(selectActiveProject);
  const [sshItems, setSshItems] = useState<SSHItem[]>([]);
  const [version, setVersion] = useState<{ title: string }>();
  const [locations, setLocations] = useState([]);
  const [os, setOs] = useState<{ name: string; id: string }[]>([]);
  const [osList, setOsList] = useState<OSList[]>([]);
  const { user } = useAppSelector(selectUser);
  const [sshEnabled, setSshEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("selectedplan", plan);
  console.log("oslist", osList);

  useEffect(() => {
    if (currentProject?.sshKeys) {
      const sshData = currentProject.sshKeys.map((item) => ({
        label: item.name,
        key: item.key,
      }));

      setSshItems(sshData);
    }
  }, [currentProject]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/locations`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setLocations(response?.data?.data?.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    if (version) {
      const selectedOs = osList.find((osItem) =>
        osItem.versions.some(
          (ver: { title: string }) => ver.title === version.title
        )
      );

      if (selectedOs) {
        const selectedVersion = selectedOs.versions.find(
          (ver: { title: string }) => ver.title === version.title
        );

        console.log("selectedVersion", selectedVersion);

        dispatch(
          setOS({
            id: selectedVersion?.id,
            icon: selectedOs.icon,
            title: selectedOs.title,
            version: selectedVersion?.label || "",
          })
        );
      }
    }
  }, [version, osList, dispatch]);

  useEffect(() => {
    const fetchOS = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${environment.VITE_API_URL}/ordering/os`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const fetchedOS = response?.data?.data;

        const osWithVersions = OSOrdering.map((osItem) => {
          const versions = fetchedOS
            .filter((fetchedItem) => fetchedItem.name.includes(osItem.title))
            .map((fetchedItem) => ({
              label: fetchedItem.name,
              id: fetchedItem.id,
              title: fetchedItem.name,
              icon: osItem.icon,
            }));
          return { ...osItem, versions };
        });

        setOs(response?.data?.data);
        setOsList(osWithVersions);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    fetchOS();
  }, []);

  const isLocationAvailable = (title: string) => {
    const [city] = title.split(", ");
    return locations.some(
      (location: { name: string }) => location.name === city
    );
  };

  const isOsAvailable = (title: string) => {
    const available = os.some((item) => item.name.split(" ")[0] === title);
    return available;
  };

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
      const payload = {
        location: details.region?.id || 1,
        hostname: details.hostname,
        template: details.os?.id,
        osName: details.os?.version,
        raid: details.raid,
        billing: details.billing,
        projectId: currentProject?._id,
        clientId: user?.dcimUserId,
        ssh: details.ssh,
        planId: plan._id,
      };

      const config = {
        url: `${environment.VITE_API_URL}/ordering`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: payload,
      };

      const response = await axios(config);

      if (response.status === 200 || response.status === 201) {
        toast.success("Successfully Deployed!");
        dispatch(setToInitial());
        navigate("/resources");
      }
    } catch (error: any) {
      console.error("Error deploying server:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleInputChange = (label: string) => {
    const filteredSsh = sshItems
      .map((item) => ({ name: item.label, key: item.key }))
      .find((item) => item.name === label);
    if (filteredSsh) dispatch(setSshKey(filteredSsh));
  };

  console.log("details", details);

  const memoizedOsVersions = useMemo(
    () => details?.os?.versions,
    [details?.os?.title]
  );

  return (
    <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full mb-20 sm:mb-0">
      <h1 className="text-lg font-medium py-1">{plan.name}</h1>
      <div className="flex flex-col sm:flex-row w-full gap-4 xl:gap-8">
        <div className="w-full sm:w-2/6 flex flex-col gap-4">
          <p className="text-xs text-gray-500">Select Operating System</p>
          <div className="grid grid-cols-2 gap-4">
            {osList.map((item, index) => (
              <div
                className={`flex flex-col gap-4 border rounded-lg px-3 py-4  justify-center items-center text-xs ${
                  details.os?.title === item.title
                    ? "border-sky-600"
                    : "border-gray-200"
                }
                ${
                  !isOsAvailable(item.title)
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }    
                `}
                key={index}
                onClick={() =>
                  isOsAvailable(item.title) && dispatch(setOS(item))
                }
              >
                <div>{item.icon}</div>
                <p>{item.title}</p>
              </div>
            ))}
          </div>
          <div className="border rounded-lg py-2 pl-8 flex items-center gap-2">
            <p className="text-xs text-gray-500">OS Version:</p>
            <div className="flex flex-wrap items-center gap-3">
              {!loading ? (
                <OrderDropdownMenu
                  items={memoizedOsVersions}
                  value={details?.os?.title}
                  placeholder="OS"
                  onChange={(item) => {
                    setVersion(item);
                  }}
                />
              ) : (
                <div className="text-xs text-gray-500">Loading...</div>
              )}
            </div>
          </div>
          <div className=" text-xs text-gray-500">
            <div className="pb-2 items-center flex justify-between ">
              <p>SSH Keys</p>
              <ToggleButton
                isChecked={sshEnabled}
                setIsChecked={setSshEnabled}
              />
            </div>
            <RDropdownMenu
              items={sshItems}
              placeholder="SSH"
              onChange={(value) => handleInputChange(value)}
              disabled={!sshEnabled}
            />
          </div>
          <div className="flex bg-gray-100 rounded-lg p-3 justify-between items-center">
            <div className="pl-0 lg:pl-2 text-sm ">
              <p className="text-xs text-gray-500">My Total</p>
              <p className="font-medium">${plan.price.hourly}/hr</p>
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
                  className={`flex gap-2 sm:gap-4 rounded-lg pl-2 lg:pl-4 xl:pl-8 py-3 items-center text-xs  ${
                    details.region?.title === item.title
                      ? " bg-gray-100"
                      : "border-gray-200 border"
                  } ${
                    !isLocationAvailable(item.title)
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  key={index}
                  onClick={() =>
                    isLocationAvailable(item.title) && dispatch(setRegion(item))
                  }
                >
                  <div>{item.icon}</div>
                  <p>{item.title}</p>
                  {details.region?.title === item.title && (
                    <div className="ml-4 w-5 h-5 p-1 bg-blue-500 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <RegionSelector value={details.region} />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">RAID</p>
            <div className="grid grid-cols-3 gap-3">
              {raid.map((item, index) => (
                <div
                  className={`flex rounded-lg py-2 px-3 lg:px-6 items-center justify-between text-sm cursor-pointer ${
                    details.raid === item.title
                      ? " bg-gray-100"
                      : "border-gray-200 border"
                  }`}
                  key={index}
                  onClick={() => dispatch(setRaid(item.title))}
                >
                  <div className="flex flex-col justify-center ">
                    <div>{item.title}</div>
                    <p className=" text-[10px] ">{item.subTitle}</p>
                  </div>
                  {details.raid === item.title && (
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
                    details.billing === item.title
                      ? " bg-gray-100"
                      : "border-gray-200 border"
                  }`}
                  key={index}
                  onClick={() => dispatch(setBilling(item.title))}
                >
                  <div className="flex flex-col justify-center ">
                    <div>{item.title}</div>
                    <p className=" text-[10px] ">{item.subTitle}</p>
                  </div>
                  {details.billing === item.title && (
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
              value={details.hostname}
              onChange={(e) => dispatch(setHostname(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
