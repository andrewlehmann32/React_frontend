export default function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-grow border-t border-[#0000001a]"></div>
      <span className="text-[#000000b3] text-xs sm:text-sm md:text-base">
        {label}
      </span>
      <div className="flex-grow border-t border-[#0000001a]"></div>
    </div>
  );
}
