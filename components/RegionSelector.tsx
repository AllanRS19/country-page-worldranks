import { RegionSelectorProps } from "@/types";
import { RegionsOptions } from "@/constants";
import { cn } from "@/lib/utils";

const RegionSelector = ({
    regions,
    setRegions
}: RegionSelectorProps) => {

    const handleRegionSelect = (selectedRegion: string) => {
        setRegions((prev) =>
            prev.includes(selectedRegion)
                ? regions.filter((r) => r !== selectedRegion)
                : [...prev, selectedRegion]
        );
    }

    return (
        <div className="w-full">
            <p className="filter-title">Region</p>
            <div className="region-selector-wrapper">
                {RegionsOptions.map((option, i) => (
                    <div
                        key={i}
                        className={cn(
                            "region-selector-option",
                            regions.includes(option) && "region-option-active"
                        )}
                        onClick={() => handleRegionSelect(option)}
                    >
                        {option}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RegionSelector;