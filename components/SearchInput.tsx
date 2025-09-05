import Image from "next/image";
import { SearchInputProps } from "@/types";

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