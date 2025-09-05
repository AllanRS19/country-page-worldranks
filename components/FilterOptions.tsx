import { FilterOptionsProps } from "@/types";
import RegionSelector from "./RegionSelector";
import SortDropdown from "./SortDropdown";
import StatusCheckbox from "./StatusCheckbox";

const FilterOptions = ({
    sortByText,
    setSortByText,
    regions,
    setRegions,
    statuses,
    setStatuses
}: FilterOptionsProps) => {
    return (
        <aside className="filter-options">
            <SortDropdown sortByText={sortByText} setSortByText={setSortByText} />
            <RegionSelector regions={regions} setRegions={setRegions} />
            <StatusCheckbox statuses={statuses} setStatuses={setStatuses} />
        </aside>
    )
}

export default FilterOptions;