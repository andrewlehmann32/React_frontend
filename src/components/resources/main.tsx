import React, { useState } from 'react';
import { CiCalendar, CiPlay1, CiStop1 } from 'react-icons/ci';
import { FaRegTrashAlt, FaTv } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';
import { IoIosArrowDown, IoMdRefresh } from 'react-icons/io';
import { IoCopyOutline } from 'react-icons/io5';
import { svgDrawer } from '../../lib/helpers/svgDrawer';
import { Chart } from '../generics/chart';
import { ToggleButton } from '../shared/buttons/buttons';
import { RDropdownMenu } from '../shared/menus/dropdown-menu';
import { Modal } from '../shared/popups/modal-box';
import { Button } from '../ui/button';

const properties = [
  { title: 'Host name', value: 'c2-smalll-x68-chi-1' },
  { title: 'Main IP', value: '91.242.214.195' },
  { title: 'Created', value: 'May 10th, 2023' },
  { title: 'Location', value: 'Chicago CHI' },
  { title: 'Status', value: 'On' },
  { title: 'OS', value: 'Ubuntu 24.04' },
  { title: 'Tags', value: 'Add tags' },
];
const hardwares = [
  { title: 'CPU', value: 'Xeon E-2286G CPU ...' },
  { title: 'RAM', value: '32 GB' },
  { title: 'Disk', value: '500 GB NVMe' },
  { title: 'NIC', value: '2 X 1 Gbit/s' },
];
const credentials = [
  { title: 'Username', value: 'ubuntu' },
  { title: 'Password', value: 'phQoUUOd' },
  { title: 'Login Snippet', value: 'ssh ubuntu@91.242.214.195' },
];

const chartItems = [
  { label: 'Current Billing Cycle', value: 'Current Billing Cycle' },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  alert('Copied to clipboard');
};

const DisplayNameAndServerActions = () => {
  const [isReinstallModalOpen, setIsReinstallModalOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const items = [
    {
      label: 'Start Server',
      value: 'Start Server',
      icon: <CiPlay1 size={14} />,
    },
    { label: 'Stop Server', value: 'Stop Server', icon: <CiStop1 size={16} /> },
    {
      label: 'Reboot Server',
      value: 'Reboot Server',
      icon: <IoMdRefresh size={14} />,
    },
    {
      label: 'Reinstall Server',
      value: 'Reinstall Server',
      icon: <FiDownload size={14} />,
      onClick: () => setIsReinstallModalOpen(true),
    },
    { label: 'Novnc', value: 'Novnc', icon: <FaTv size={14} /> },
    {
      label: 'Destroy Server',
      value: 'Destroy Server',
      icon: <FaRegTrashAlt size={14} />,
    },
  ];
  const closeModal = () => {
    setIsReinstallModalOpen(false);
  };

  return (
    <>
      <div className='flex flex-col gap-1 text-xs text-gray-500'>
        <h1 className='text-base font-semibold text-gray-800'>Ubuntu_webdav</h1>
        <p>174.193.182.199</p>
      </div>
      <div className='relative'>
        <Button onClick={() => setIsActive(!isActive)}>Server Actions{<IoIosArrowDown/>}</Button>
        {isActive && (
          <div className='absolute bg-white border divide-y text-gray-500 text-xs top-10 right-0 rounded-md min-w-36'>
            {items.map((item, index) => (
              <div
                className={`flex items-center py-2 gap-3 px-3 hover:bg-gray-100 cursor-pointer ${
                  item.label == 'Destroy Server' ? 'text-red-500' : ''
                }
                  `}
                key={index}
                onClick={item.onClick}
              >
                <span key={index}>{item.icon}</span>
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        title='Reinstall Server'
        isOpen={isReinstallModalOpen}
        setIsOpen={setIsReinstallModalOpen}
        onSave={closeModal}
        actionButtonText='Reinstall'
        actionButtonStyles='w-full border'
      >
        <div className='w-full flex flex-col gap-6 px-3'>
          <p className='text-gray-400 text-sm font-medium'>Operating System</p>
          <RDropdownMenu
            items={items}
            placeholder='Server Actions'
          />
          <div>
            <p className='text-gray-400 text-sm font-medium'>SSH Keys</p>
            <div className='flex items-center justify-between gap-2 w-full'>
              <RDropdownMenu
                items={items}
                placeholder='Server Actions'
                className='w-1/2'
              />
              <p className='text-gray-500 text-sm w-1/2 text-center'>
                + Add New
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const DisplaySpecificaions = () => {
  return (
    <div className='grid grid-cols-3 gap-6 py-2'>
      <div className='rounded-md p-4 bg-gray-100 col-span-1'>
        <h1 className='font-medium pb-2'>Properties</h1>
        <div className='flex flex-col gap-3 text-xs'>
          {properties.map((property, index) => (
            <div
              className='flex justify-between items-center text-gray-500'
              key={index}
            >
              <p className='w-2/5'>{property.title}</p>
              <div className='w-3/5 flex items-center gap-2'>
                {property.title === 'Host name' && (
                  <p className='text-foreground'>{property.value}</p>
                )}
                {property.title === 'Main IP' && (
                  <div className='flex items-center gap-2'>
                    <IoCopyOutline
                      size={16}
                      className='cursor-pointer hover:text-gray-700'
                      onClick={() => copyToClipboard(property.value)}
                    />
                    <p className='text-foreground'>{property.value}</p>
                  </div>
                )}
                {property.title === 'Location' && (
                  <div className='flex items-center gap-2'>
                    <div className='w6 h-6'>
                      {React.isValidElement(svgDrawer.usaFlag)
                        ? React.cloneElement(svgDrawer.usaFlag, {
                            width: '100%',
                            height: '100%',
                          })
                        : null}
                    </div>
                    <p>{property.value}</p>
                  </div>
                )}
                {property.title === 'OS' && (
                  <div className='flex items-center gap-2'>
                    <div className='w6 h-6'>
                      {React.isValidElement(svgDrawer.ubuntu)
                        ? React.cloneElement(svgDrawer.ubuntu, {
                            width: '100%',
                            height: '100%',
                          })
                        : null}
                    </div>
                    <p>{property.value}</p>
                  </div>
                )}

                {property.title === 'Status' && (
                  <div className='flex items-center gap-2'>
                    <ToggleButton
                      enabledColor='bg-green-500'
                      enabledBgColor='bg-white'
                      disabledBgColor='bg-white'
                    />
                    <p>{property.value}</p>
                  </div>
                )}
                {property.title !== 'Main IP' &&
                  property.title !== 'Location' &&
                  property.title !== 'OS' &&
                  property.title !== 'Host name' &&
                  property.title !== 'Status' && <p>{property.value}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-4 text-xs col-span-2'>
        <div className='border rounded-md p-2 divide-y'>
          <div className='flex flex-wrap items-center gap-2 p-1 pb-2'>
            <h1 className='font-medium text-sm'>Billing Information</h1>
            <p className='text-gray-500'>View billing information here</p>
          </div>
          <div className='flex justify-between items-center py-5 pb-4'>
            <p className='text-gray-500'>Hourly Price</p>
            <p>$30</p>
          </div>
        </div>
        <div className='border  rounded-md p-2 divide-y'>
          <div className='flex flex-wrap items-center gap-2 p-1 pb-2'>
            <h1 className='font-medium text-sm'>Credentials</h1>
            <p className='text-gray-500'>
              View credentials to your server here
            </p>
          </div>
          <div className='flex justify-between items-center py-5 pb-4'>
            <div className='flex flex-col gap-3 text-xs w-full'>
              {credentials.map((credential, index) => (
                <div
                  className='flex justify-between items-center'
                  key={index}
                >
                  <p className='text-gray-500'>{credential.title}</p>
                  <div className='flex items-center gap-2'>
                    <IoCopyOutline
                      size={16}
                      className='cursor-pointer hover:text-gray-700'
                      onClick={() => copyToClipboard(credential.value)}
                    />
                    <p>{credential.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='rounded-md p-4 bg-gray-100 col-span-1'>
        <h1 className='font-medium pb-2'>Hardware</h1>
        <div className='flex flex-col gap-3 text-xs'>
          {hardwares.map((hardwares, index) => (
            <div
              className='flex justify-between items-center text-gray-500'
              key={index}
            >
              <p className='w-2/5 '>{hardwares.title}</p>
              <p className='w-3/5  '>{hardwares.value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='text-xs col-span-2'>
        <div className='pb-3'>
          <h1 className='font-medium py-1'>Bandwidth Information</h1>
          <p className='text-gray-500'>View your bandwidth information here</p>
        </div>
        <div className='flex flex-col border rounded-md p-3 gap-3'>
          <div className='flex justify-between items-center'>
            <p className='text-gray-500'>Inbound</p>
            <p>0 TB</p>
          </div>
          <div className='flex justify-between items-center'>
            <p className='text-gray-500'>Outbound</p>
            <p>0 TB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const DisplayTabs = () => {
  const [selected, setSelected] = useState('Total Transfer');
  const items = ['Total Transfer', '95th Percentile'];
  const selectedStyles = 'bg-white  hover:bg-white';
  return (
    <div className='px-2 py-1 bg-gray-100 rounded-md flex'>
      <div className='flex gap-1'>
        {items.map((item, index) => (
          <div
            className={`${
              selected === item ? selectedStyles : ''
            } w-[6.5rem] text-center py-1 px-2 cursor-pointer  hover:bg-gray-200 text-xs rounded-md flex items-center justify-center`}
            key={index}
            onClick={() => setSelected(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Main = () => {
  return (
    <div className='py-2 gap-2 flex flex-col pr-0 lg:pr-6 w-full '>
      <div className='flex items-start justify-between flex-wrap '>
        <DisplayNameAndServerActions />
      </div>
      <DisplaySpecificaions />
      <div className='w-full'>
        <div className='flex justify-between items-center text-gray-500 text-xs'>
          <div className='flex flex-col gap-1 text-gray-800'>
            <h1 className='text-sm'>Aggregate Traffic</h1>
            <p>
              1.27 GB / <span className='text-gray-500'>8 GB</span>
            </p>
          </div>
          <div className='flex gap-3'>
            <DisplayTabs />
            <div className='flex items-center bg-gray-100 py-1 px-4 rounded-md'>
              Current Billing Cycle <IoIosArrowDown />
            </div>
            <div className='bg-gray-100 p-2 rounded-md'>
              <CiCalendar className='text-xl' />
            </div>
          </div>
        </div>
        <Chart />
      </div>
    </div>
  );
};
