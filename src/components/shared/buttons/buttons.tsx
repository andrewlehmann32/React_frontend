import { Switch } from "@radix-ui/react-switch";
import { useEffect, useState } from "react";

export const ToggleButton = ({
  showLabel = false,
  disabled = false,
  isChecked = false,
  setIsChecked,
}: {
  showLabel?: boolean;
  disabled?: boolean;
  isChecked?: boolean;
  setIsChecked?: (checked: boolean) => void;
}) => {
  const [isEnabled, setIsEnabled] = useState(isChecked);
  const enabledColor = "bg-white";
  const disabledColor = "bg-gray-300";
  const enabledBgColor = "bg-blue-500";
  const disabledBgColor = "bg-gray-50";

  const handleToggle = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    if (setIsChecked) {
      setIsChecked(newState);
    }
  };

  useEffect(() => {
    setIsEnabled(isChecked);
  }, [isChecked]);

  return (
    <div className="flex items-center space-x-2 pt-1">
      <Switch
        id="toggle"
        checked={isEnabled}
        disabled={disabled}
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
