// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { environment } from "../../config/environment";
// import { useAppSelector } from "../../hooks/redux";
// import axios from "../../lib/apiConfig";
// import {
//   setBilling,
//   setHostname,
//   setOS,
//   setRaid,
//   setRegion,
//   setSshKey,
//   setToInitial,
// } from "../../redux/reducer/resourcesReducer";
// import {
//   selectActiveProject,
//   selectUser,
// } from "../../redux/selectors/userSelector";
// import { RootState } from "../../redux/store";
// import { PlanData } from "../../types/generics.types";
// import { LeftHandItems, RightHandItems } from "./details-components";

// export type SSHItem = {
//   label: string;
//   key: string;
// };

// export const RenderDetails = ({ plan }: { plan: PlanData }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const details = useSelector((state: RootState) => state.renderDetails);
//   const currentProject = useAppSelector(selectActiveProject);
//   const [sshItems, setSshItems] = useState<SSHItem[]>([]);
//   const [locations, setLocations] = useState([]);
//   const [os, setOs] = useState<string[]>([]);
//   const { user } = useAppSelector(selectUser);

//   useEffect(() => {
//     if (currentProject?.sshKeys) {
//       const sshData = currentProject.sshKeys.map((item) => ({
//         label: item.name,
//         key: item.key,
//       }));

//       setSshItems(sshData);
//     }
//   }, [currentProject]);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const response = await axios.get(
//           `${environment.VITE_API_URL}/ordering/locations`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setLocations(response?.data?.data?.result);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchLocations();
//   }, []);

//   useEffect(() => {
//     const fetchOS = async () => {
//       try {
//         const response = await axios.get(
//           `${environment.VITE_API_URL}/ordering/os`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         setOs(response?.data?.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchOS();
//   }, []);

//   const handleDeployment = async () => {
//     try {
//       const payload = {
//         location: details.region?.id || 1,
//         hostname: details.hostname,
//         template: details.os?.id,
//         raid: details.raid,
//         billing: details.billing,
//         projectId: currentProject?._id,
//         clientId: user?.dcimUserId,
//         ssh: details.ssh,
//       };

//       const config = {
//         url: `${environment.VITE_API_URL}/ordering`,
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         data: payload,
//       };

//       const response = await axios(config);

//       if (response.status === 200 || response.status === 201) {
//         toast.success("Successfully Deployed!");
//         dispatch(setToInitial());
//         navigate("/resources");
//       }
//     } catch (error: any) {
//       console.error("Error deploying server:", error);
//       toast.error(error?.response?.data?.message);
//     }
//   };

//   console.log(details);

//   const handleDispatch = (actionType: string, payload: any) => {
//     switch (actionType) {
//       case "SET_REGION":
//         dispatch(setRegion(payload));
//         break;
//       case "SET_OS":
//         dispatch(setOS(payload));
//         break;
//       case "SET_RAID":
//         dispatch(setRaid(payload));
//         break;
//       case "SET_BILLING":
//         dispatch(setBilling(payload));
//         break;
//       case "SET_HOSTNAME":
//         dispatch(setHostname(payload));
//         break;
//       case "SET_SSH_KEY":
//         dispatch(setSshKey(payload));
//         break;
//       case "RESET":
//         dispatch(setToInitial());
//         break;
//       default:
//         console.warn(`Unknown action: ${actionType}`);
//     }
//   };

//   return (
//     <div className="py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full mb-20 sm:mb-0">
//       <h1 className="text-lg font-medium py-1">{plan.name}</h1>
//       <div className="flex flex-col sm:flex-row w-full gap-4 xl:gap-8">
//         <LeftHandItems
//           handleDeployment={handleDeployment}
//           os={os}
//           sshItems={sshItems}
//           handleDispatch={handleDispatch}
//           details={details}
//         />
//         <RightHandItems
//           locations={locations}
//           handleDispatch={handleDispatch}
//           details={details}
//         />
//       </div>
//     </div>
//   );
// };
