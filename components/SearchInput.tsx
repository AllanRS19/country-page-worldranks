import { SearchInputProps } from "@/types";
import Image from "next/image";

const SearchInput = ({
    setSearch
}: SearchInputProps) => {
    return (
        <div className="search-input-container">
            <input
                type="text"
                name="q"
                className="search-input"
                placeholder="Search by Name or Region"
                onChange={(e) => setSearch(e.target.value)}
            />
            <Image
                src="/icons/Search.svg"
                alt="Search"
                width={22}
                height={22}
                className="search-icon"
            />
        </div>
    )
}

export default SearchInput;