// import { Check, ChevronDownIcon } from "lucide-react";
// import React, { useState } from "react";
// import { countryFlags, OSOrdering } from "../../constants/constants";
// import { useAppDispatch } from "../../hooks/redux";
// import { RenderDetailsState } from "../../redux/reducer/resourcesReducer";
// import { ToggleButton } from "../shared/buttons/buttons";
// import { RDropdownMenu } from "../shared/menus/dropdown-menu";
// import { Button } from "../ui/button";

// interface LeftHandProps {
//   handleDeployment: () => void;
//   os: any;
//   sshItems: any[];
//   handleDispatch: (actionType: string, payload: any) => void;
//   details: RenderDetailsState;
// }

// interface RightHandProps {
//   locations: any[];
//   handleDispatch: (actionType: string, payload: any) => void;
//   details: RenderDetailsState;
// }

// const billing = [
//   { title: "Hourly", subTitle: "Pay as you go" },
//   { title: "Monthly", subTitle: "Pay upfront and save 5%" },
// ];

// const raid = [
//   { title: "No RAID", subTitle: "" },
//   { title: "RAID 0", subTitle: "Distributes data evenly" },
//   { title: "RAID 1", subTitle: "Distributes data evenly" },
// ];

// export const LeftHandItems = ({
//   handleDeployment,
//   handleDispatch,
//   os,
//   sshItems,
// }: LeftHandProps) => {
//   const dispatch = useAppDispatch();

//   const DisplayOperatingSystems = () => {
//     const isOsAvailable = (title: string) => {
//       const available = os.some((item) => item.split(" ")[0] === title);
//       return available;
//     };
//     return (
//       <>
//         <p className="text-xs text-gray-500">Select Operating System</p>
//         <div className="grid grid-cols-2 gap-4">
//           {OSOrdering.map((item, index) => (
//             <div
//               className={`flex flex-col gap-4 border rounded-lg px-3 py-4  justify-center items-center text-xs ${
//                 details.os?.title === item.title
//                   ? "border-sky-600"
//                   : "border-gray-200"
//               }
//                 ${
//                   !isOsAvailable(item.title)
//                     ? "opacity-50 cursor-not-allowed"
//                     : "cursor-pointer"
//                 }
//                 `}
//               key={index}
//               onClick={() => isOsAvailable(item.title) && dispatch(setOS(item))}
//             >
//               <div>{item.icon}</div>
//               <p>{item.title}</p>
//             </div>
//           ))}
//         </div>
//         <div className="border rounded-lg py-2 pl-8 flex items-center gap-2">
//           <p className="text-xs text-gray-500">OS Version:</p>
//           <div className="flex flex-wrap items-center gap-3">
//             <div className="w-5 h-5 flex items-center justify-center">
//               {details.os?.icon && React.isValidElement(details.os.icon)
//                 ? React.cloneElement(
//                     details.os.icon as React.ReactElement<
//                       React.SVGProps<SVGSVGElement>
//                     >,
//                     {
//                       width: "100%",
//                       height: "100%",
//                     }
//                   )
//                 : null}
//             </div>
//             <p className="text-xs flex">{details.os?.title} 24.03</p>
//           </div>
//         </div>
//       </>
//     );
//   };

//   const DisplaySshKeys = () => {
//     const [sshEnabled, setSshEnabled] = useState(false);

//     const handleInputChange = (label: string) => {
//       const filteredSsh = sshItems
//         .map((item) => ({ name: item.label, key: item.key }))
//         .find((item) => item.name === label);
//       if (filteredSsh) dispatch(setSshKey(filteredSsh));
//     };
//     return (
//       <div className=" text-xs text-gray-500">
//         <div className="pb-2 items-center flex justify-between ">
//           <p>SSH Keys</p>
//           <ToggleButton isChecked={sshEnabled} setIsChecked={setSshEnabled} />
//         </div>
//         <RDropdownMenu
//           items={sshItems}
//           placeholder="SSH"
//           onChange={(value) => handleInputChange(value)}
//           disabled={!sshEnabled}
//         />
//       </div>
//     );
//   };

//   const DisplayDeploymentButton = () => {
//     return (
//       <div className="flex bg-gray-100 rounded-lg p-3 justify-between items-center">
//         <div className="pl-0 lg:pl-2 text-sm ">
//           <p className="text-xs text-gray-500">My Total</p>
//           <p className="font-medium">${plan.price.hourly}/hr</p>
//         </div>
//         <Button className="lg:text-sm text-xs" onClick={handleDeployment}>
//           Deploy Server
//         </Button>
//       </div>
//     );
//   };

//   return (
//     <div className="w-full sm:w-2/6 flex flex-col gap-4">
//       <DisplayOperatingSystems />
//       <DisplaySshKeys />
//       <DisplayDeploymentButton />
//     </div>
//   );
// };

// export const RightHandItems = ({
//   handleDispatch,
//   locations,
// }: RightHandProps) => {
//   const isLocationAvailable = (title: string) => {
//     const [city] = title.split(", ");
//     return locations.some(
//       (location: { name: string }) => location.name === city
//     );
//   };

//   const RegionSelector = ({ value }: any) => {
//     return (
//       <div className="flex items-center justify-between border rounded-lg px-4 py-2 mt-2 ">
//         <div className="flex items-center gap-2">
//           <p className="text-xs font-medium text-gray-500">Region</p>
//           <div className="pl-4 flex items-center gap-2">
//             <div className="w-5 h-5 flex items-center justify-center">
//               {value?.icon && React.isValidElement(value.icon)
//                 ? React.cloneElement(
//                     value.icon as React.ReactElement<
//                       React.SVGProps<SVGSVGElement>
//                     >,
//                     {
//                       width: "100%",
//                       height: "100%",
//                     }
//                   )
//                 : null}
//             </div>
//             <p className="text-sm font-medium">{value?.title}</p>
//           </div>
//         </div>

//         <div className="flex items-center gap-3">
//           <p className="text-[10px] border px-2  rounded-md">$97.00/mo</p>
//           <p className=" border text-[10px] px-2  rounded-md">$0.13/hr</p>
//           <ChevronDownIcon className="w-5 h-5 text-gray-500" />
//         </div>
//       </div>
//     );
//   };
//   const DisplayRegionsOptions = () => {
//     return (
//       <div className="flex flex-col gap-2">
//         <p className="font-medium text-sm">Select Region</p>
//         <div className="grid grid-cols-3 gap-3">
//           {countryFlags.map((item, index) => (
//             <div
//               className={`flex gap-2 sm:gap-4 rounded-lg pl-2 lg:pl-4 xl:pl-8 py-3 items-center text-xs  ${
//                 details.region?.title === item.title
//                   ? " bg-gray-100"
//                   : "border-gray-200 border"
//               } ${
//                 !isLocationAvailable(item.title)
//                   ? "opacity-50 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               key={index}
//               onClick={() =>
//                 isLocationAvailable(item.title) && dispatch(setRegion(item))
//               }
//             >
//               <div>{item.icon}</div>
//               <p>{item.title}</p>
//               {details.region?.title === item.title && (
//                 <div className="ml-4 w-5 h-5 p-1 bg-blue-500 rounded-full flex items-center justify-center">
//                   <Check size={16} className="text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//         <RegionSelector value={details.region} />
//       </div>
//     );
//   };

//   const DisplayRaidOptions = () => {
//     return (
//       <div className="flex flex-col gap-2">
//         <p className="font-medium text-sm">RAID</p>
//         <div className="grid grid-cols-3 gap-3">
//           {raid.map((item, index) => (
//             <div
//               className={`flex rounded-lg py-2 px-3 lg:px-6 items-center justify-between text-sm cursor-pointer ${
//                 details.raid === item.title
//                   ? " bg-gray-100"
//                   : "border-gray-200 border"
//               }`}
//               key={index}
//               onClick={() => dispatch(setRaid(item.title))}
//             >
//               <div className="flex flex-col justify-center ">
//                 <div>{item.title}</div>
//                 <p className=" text-[10px] ">{item.subTitle}</p>
//               </div>
//               {details.raid === item.title && (
//                 <div className="ml-4 w-5 h-5 p-1 bg-blue-500 rounded-full flex items-center justify-center">
//                   <Check size={16} className="text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const DisplayBillingOptions = () => {
//     return (
//       <div className="flex flex-col gap-2">
//         <p className="font-medium text-sm">Billing</p>
//         <div className="grid grid-cols-3 gap-3">
//           {billing.map((item, index) => (
//             <div
//               className={`flex rounded-lg py-2 px-3 lg:px-6 items-center justify-between text-sm cursor-pointer ${
//                 details.billing === item.title
//                   ? " bg-gray-100"
//                   : "border-gray-200 border"
//               }`}
//               key={index}
//               onClick={() => dispatch(setBilling(item.title))}
//             >
//               <div className="flex flex-col justify-center ">
//                 <div>{item.title}</div>
//                 <p className=" text-[10px] ">{item.subTitle}</p>
//               </div>
//               {details.billing === item.title && (
//                 <div className=" w-5 h-5 p-1 bg-blue-500 rounded-full flex items-center justify-center">
//                   <Check size={16} className="text-white" />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   };

//   const DisplayServerName = () => {
//     return (
//       <div className="border flex flex-col rounded-lg p-6 gap-2 mt-6">
//         <h2 className="text-sm text-gray-800 font-medium">Host Names</h2>
//         <p className="text-xs text-gray-500 mt-1">
//           Choose a name to help identify your server. You can use alphanumeric
//           characters, dashes, and periods up to 32 characters.
//         </p>
//         <input
//           type="text"
//           className="mt-4 w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//           placeholder="c2-small-x86-chi-1"
//           value={details.hostname}
//           onChange={(e) => dispatch(setHostname(e.target.value))}
//         />
//       </div>
//     );
//   };
//   return (
//     <div className="w-full lg:w-8/12 flex flex-col px-0 xl:px-6 text-xs text-gray-500 gap-3">
//       <DisplayRegionsOptions />
//       <DisplayRaidOptions />
//       <DisplayBillingOptions />
//       <DisplayServerName />
//     </div>
//   );
// };
