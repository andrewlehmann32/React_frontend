import { useState } from "react";
import { Switch } from "@radix-ui/react-switch";

export const ToggleButton = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => setIsEnabled(!isEnabled);

  return (
    <div className="flex items-center space-x-4 pt-1">
      {/* <label htmlFor="toggle" className="text-sm font-medium">
        {isEnabled ? "Enabled" : "Disabled"}
      </label> */}
      <Switch
        id="toggle"
        checked={isEnabled}
        onCheckedChange={handleToggle}
        className={`w-10 h-6 rounded-full relative transition-colors ${
          isEnabled ? "bg-blue-500" : "bg-gray-100"
        }`}
      >
        <span
          className={`absolute w-4 h-4  rounded-full top-1 transition-transform ${
            isEnabled ? "translate-x-0 bg-white" : "-translate-x-4 bg-gray-300"
          }`}
        />
      </Switch>
    </div>
  );
};
