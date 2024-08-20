import { FiFlag, FiPlusCircle, FiInfo } from "react-icons/fi";

export function InteractionBar() {
  return (
    <div className="flex w-full px-6 py-4 justify-between text-xs font-medium">
      <a href="#">
        <div className="flex flex-col gap-2 items-center">
          <FiFlag className="w-8 h-8" />
          <p>Report</p>
        </div>
      </a>
      <a href="#">
        <div className="flex flex-col gap-2 items-center">
          <FiPlusCircle className="w-8 h-8" />
          <p>Create Session</p>
        </div>
      </a>
      <a href="#">
        <div className="flex flex-col gap-2 items-center">
          <FiInfo className="w-8 h-8" />
          <p>Details</p>
        </div>
      </a>
    </div>
  );
}
