import { Status } from "@/constants";
import { cn } from "@/lib/utils";
import { StatusCheckboxProps } from "@/types";

const StatusCheckbox = ({
    statuses,
    setStatuses
}: StatusCheckboxProps) => {

    const handleStatusCheck = (checkedOption: string) => {
        setStatuses((prev) =>
            prev.includes(checkedOption)
                ? statuses.filter((r) => r !== checkedOption)
                : [...prev, checkedOption]
        );
    }

    return (
        <div className="w-full flex flex-col gap-2">
            <p className="filter-title">Status</p>
            {Status.map(({ name, value }, i) => (
                <div
                    key={i}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleStatusCheck(value)}
                >
                    <div
                        className={cn(
                            "custom-checkbox",
                            statuses.includes(value) && "status-checkbox-active"
                        )}
                    />
                    <p className="text-sm text-grey-light truncate">{name}</p>
                </div>
            ))}
        </div>
    )
}

export default StatusCheckbox;