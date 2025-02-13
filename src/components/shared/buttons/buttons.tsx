import { useState } from "react";
import { Switch } from "@radix-ui/react-switch";

export const ToggleButton = ({
  enabledColor = "bg-white",
  disabledColor = "bg-gray-300",
  enabledBgColor = "bg-blue-500",
  disabledBgColor = "bg-gray-100",
  showLabel = false,
}) => {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleToggle = () => setIsEnabled(!isEnabled);

  return (
    <div className="flex items-center space-x-2 pt-1">
      <Switch
        id="toggle"
        checked={isEnabled}
        onCheckedChange={handleToggle}
        className={`w-10 h-6 rounded-full relative transition-colors ${
          isEnabled ? enabledBgColor : disabledBgColor
        }`}
      >
        <span
          className={`absolute w-4 h-4 rounded-full top-1 transition-transform ${
            isEnabled
              ? `translate-x-0 ${enabledColor}`
              : `-translate-x-4 ${disabledColor}`
          }`}
        />
      </Switch>
      {showLabel && <span>{isEnabled ? "On" : "Off"}</span>}
    </div>
  );
};
