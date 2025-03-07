import Select from "react-select";
import { PlanData } from "../../types/generics.types";

interface FormDataProps {
  planData: PlanData;
  handleChange: (name: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegionChange: (selectedRegions: any) => void;
  handleQuantityChange: (
    regionName: string,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  availableRegions: { name: string; keyword: string }[];
}

export const RenderForm = ({
  planData,
  handleChange,
  availableRegions,
  handleQuantityChange,
  handleRegionChange,
}: FormDataProps) => {
  const regionOptions = availableRegions.map((region) => ({
    value: region.keyword,
    label: region.name,
  }));

  return (
    <div className="flex flex-col p-1 gap-3">
      <div>
        <p className="text-sm text-gray-700 font-medium">Plan Name</p>
        <input
          type="text"
          className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Type here"
          onChange={(e) => handleChange("name", e)}
          value={planData.name}
        />
      </div>
      <div className="flex gap-2">
        <div>
          <p className="text-sm text-gray-700 font-medium">CPU Name</p>
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("cpu.name", e)}
            value={planData.cpu.name}
          />
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">CPU Cores</p>
          <input
            type="number"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("cpu.cores", e)}
            value={planData.cpu.cores}
          />
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">CPU Speed</p>
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("cpu.speed", e)}
            value={planData.cpu.speed}
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-medium">RAM</p>
        <span className="flex items-end gap-1">
          <input
            type="number"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("ram", e)}
            value={planData.ram}
          />
          <span className="text-sm text-gray-700 font-medium flex"> GB</span>
        </span>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-medium">Storage</p>
        <span className="flex items-end gap-1">
          <input
            type="text"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("storage", e)}
            value={planData.storage}
          />
          <span className="text-sm text-gray-700 font-medium flex"> GB</span>
        </span>
      </div>
      <div className="flex gap-2">
        <div>
          <p className="text-sm text-gray-700 font-medium">Network Total</p>
          <input
            type="number"
            className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type here"
            onChange={(e) => handleChange("network.total", e)}
            value={planData.network.total}
          />
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">Network Speed</p>
          <span className="flex items-end gap-1">
            <input
              type="text"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
              onChange={(e) => handleChange("network.speed", e)}
              value={planData.network.speed}
            />
            <span className="text-sm text-gray-700 font-medium">/sec</span>
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <p className="text-sm text-gray-700 font-medium">Monthly Price</p>
          <span className="flex items-end gap-1">
            <input
              type="number"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
              onChange={(e) => handleChange("price.monthly", e)}
              value={planData.price.monthly}
            />
            <span className="text-sm text-gray-700 font-medium">$/mo</span>
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-700 font-medium">Hourly Price</p>
          <span className="flex items-end gap-1">
            <input
              type="number"
              className="mt-1 w-full border rounded-md py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type here"
              onChange={(e) => handleChange("price.hourly", e)}
              value={planData.price.hourly}
            />
            <span className="text-sm text-gray-700 font-medium">$/hr</span>
          </span>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-700 font-medium">Select Regions</p>
        <Select
          isMulti
          options={regionOptions}
          onChange={handleRegionChange}
          className="mt-1"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        {planData.regions.map((region, index) => (
          <div
            key={index}
            className="flex gap-2 items-center border rounded-md p-1"
          >
            <p className="text-sm text-gray-700 font-medium">{region.name}</p>
            <input
              type="number"
              className="w-12 border rounded-md py-1 px-1 text-sm"
              placeholder="Quantity"
              value={region.quantity}
              onChange={(e) => handleQuantityChange(region.name, e)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
