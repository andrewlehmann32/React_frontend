// import { removeFirstMessage } from "../redux/reducer/notificationsSlice";
// import { Button, buttonVariants } from "../components/ui/button";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "../hooks/redux";
// import { NOTIFY_TYPE } from "../constants/constants";
// import { FaExclamationCircle, FaCheckCircle, FaTimes } from "react-icons/fa"; // Corrected imports from react-icons
// import { Fragment } from "react";
// import { Transition } from "@headlessui/react"; // Ensure Transition is properly imported from @headlessui/react

// export const NotifyPopup = () => {
//     const dispatch = useDispatch();
//     const [show, setShow] = useState(false);
//     const { messages, type } = useAppSelector((state) => state.notifications.notifications);

//     useEffect(() => {
//         if (!messages.length) {
//             const timeoutModal = setTimeout(() => {
//                 setShow(false);
//             }, 500);
//             return () => {
//                 clearTimeout(timeoutModal);
//             };
//         }
//         if (messages.length) {
//             setShow(true);
//             const timeout = setTimeout(() => {
//                 dispatch(removeFirstMessage());
//             }, 3000);
//             return () => {
//                 clearTimeout(timeout);
//             };
//         }
//     }, [messages, dispatch]);

//     // Early return if no messages or type
//     if (!messages || !type) return null;

//     // Notification background color map
//     const notifyBgColors = {
//         [NOTIFY_TYPE.Success]: '!bg-green-100',
//         [NOTIFY_TYPE.Info]: 'bg-yellow-100',
//         [NOTIFY_TYPE.Warning]: 'bg-orange-100',
//         [NOTIFY_TYPE.Error]: 'bg-red-100',
//         default: 'bg-white-100',
//     };

//     const notificationBackgroudColor = notifyBgColors[type] || notifyBgColors.default;

//     // Icon mapping based on type
//     // const iconMap = {
//     //     [NOTIFY_TYPE.Error]: <FaExclamationCircle className="h-6 w-6 text-red-600" />,
//     //     [NOTIFY_TYPE.Success]: < FaCheckCircle className = "h-6 w-6 text-green-600" />,
//     //     [NOTIFY_TYPE.Info]: <FaCheckCircle className = "h-6 w-6 text-orange-600" />,
//     //     [NOTIFY_TYPE.Warning]: <FaCheckCircle className="h-6 w-6 text-yellow-600" />,
//     // };

//     const headerMap = {
//         [NOTIFY_TYPE.Error]: 'Error',
//         [NOTIFY_TYPE.Success]: 'Success',
//         [NOTIFY_TYPE.Info]: 'Info',
//         [NOTIFY_TYPE.Warning]: 'Warning',
//     };

//     const renderIcons = () => {
//         return iconMap[type];
//     };

//     const Header = () => {
//         return <h1 className="font-bold capitalize" > { headerMap[type]} </h1>;
//     };

//     const Messages = () => {
//         return messages.map((message, index) => (
//             <p className= "capitalize" key = { index } >
//                 & #x2022; { message }
//         </p>
//         ));
//     };

// // Early return if no type or messages
// if (!type || !messages.length) return null;

// return (
//     <div aria - live= "assertive" className = "pointer-events-none fixed inset-0 z-[999] flex items-start px-4 py-6 sm:p-6" >
//         <div className="flex w-full flex-col items-center space-y-4 sm:items-end" >
//             <Transition
//                     as={ Fragment }
// enter = "transform ease-out duration-300 transition"
// enterFrom = "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
// enterTo = "translate-y-0 opacity-100 sm:translate-x-0"
// leave = "transition ease-in duration-100"
// leaveFrom = "opacity-100"
// leaveTo = "opacity-0"
// show = { show }
//     >
//     <div className={ `pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg p-4 shadow-lg ring-1 ring-black ring-opacity-5 ${notificationBackgroudColor}` }>
//         <div className="flex items-start" >
//             <div className="flex-shrink-0" > { renderIcons() } </div>
//                 < div className = "ml-3 flex w-fit flex-1 flex-col gap-1 pt-0.5 text-sm" >
//                     <Header />
//                     < Messages />
//                     </div>
//                     < Button
// buttonStyles = "ml-4 p-0 rounded-full border-none shadow-none inline-flex rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
// textStyles = "text-gray-400"
// icon = {< FaTimes aria - hidden="true" className = "h-5 w-5" />}
// size = "EXTRASMALL" // Assuming ButtonSizes.EXTRASMALL is defined elsewhere
// variant = { buttonVariants.SECONDARY }
// onClick = {() => {
//     setShow(false);
// }}
//                             />
//     </div>
//     </div>
//     </Transition>
//     </div>
//     </div>
//     );
// };
