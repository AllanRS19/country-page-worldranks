import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortByOpions } from "@/constants";
import { SortDropdownProps } from "@/types";

const SortDropdown = ({ sortByText, setSortByText }: SortDropdownProps) => {

    const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);

    const handleSortTextChange = (selectedOption: string) => {
        setSortByText(selectedOption);
        setIsFilterDropdownOpen(false);
    }

    return (
        <div className="sort-dropdown-container">
            <p className="filter-title">Sort by</p>
            <figure
                className="sort-dropdown-trigger"
                onClick={() => setIsFilterDropdownOpen((prev) => !prev)}
            >
                <p>{sortByText}</p>
                <ChevronDown className="size-5 text-grey-light" />
            </figure>
            <ul
                className={cn(
                    "sort-dropdown",
                    isFilterDropdownOpen && "sort-dropdown-active"
                )}
            >
                {SortByOpions.map((option) => (
                    <li
                        key={option}
                        className="sort-dropdown-option"
                        onClick={() => handleSortTextChange(option)}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SortDropdown;