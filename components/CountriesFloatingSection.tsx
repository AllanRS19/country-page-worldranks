'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { CountriesData } from "@/types";
import useDebounce from "@/lib/hooks/useDebounce";
import SearchInput from "./SearchInput";
import FilterOptions from "./FilterOptions";
import CountriesDataTable from "./CountriesDataTable";
import FetchResultMessage from "./FetchResultMessage";

const CountriesFloatingSection = () => {
    const [countries, setCountries] = useState<CountriesData[]>([]);
    const [search, setSearch] = useState("");
    const [sortByText, setSortByText] = useState("Population");
    const [regions, setRegions] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);
    const [errorFetching, setErrorFetching] = useState("");
    const [isRetry, setIsRetry] = useState(false);

    const searchTerm = useDebounce(search, 2000);

    const fetchedOnce = useRef(false);

    // Fetch data once
    useEffect(() => {

        const initialFetch = async () => {
            try {
                setErrorFetching("");

                const response = await fetch("https://restcountries.com/v3.1/all?fields=name,flags,region,population,area,unMember,independent,cca3");
                if (!response.ok) return setErrorFetching("There was an error fetching the data");

                const data = await response.json();
                setCountries(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsRetry(false);
            }
        }

        if (isRetry || !fetchedOnce.current) {
            fetchedOnce.current = true;
            initialFetch();
        }
    }, [isRetry]);

    // Filtering logic
    const filteredCountries = useMemo(() => {
        if (!countries || countries.length <= 0) return [];

        let data = countries.length > 0 ? [...countries] : [];

        // Search
        if (searchTerm) {
            data = data.filter((c) =>
                c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Regions
        if (regions.length > 0) {
            data = data.filter((c) => regions.includes(c.region));
        }

        // Status
        if (statuses.includes("member_of_the_united_nations")) {
            data = data.filter((c) => c.unMember === true);
        }
        if (statuses.includes("independent")) {
            data = data.filter((c) => c.independent === true);
        }

        // Sort
        if (sortByText === "Population") {
            data.sort((a, b) => b.population - a.population);
        } else if (sortByText === "Area") {
            data.sort((a, b) => b.area - a.area);
        } else if (sortByText === "Name") {
            data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        }

        return data;
    }, [countries, searchTerm, sortByText, regions, statuses]);

    return (
        <section className="countries-floating-section flex-center">
            <div className="countries-section-content">
                <div className="top-section">
                    <h1 className="entries-found">
                        {errorFetching.trim() ?
                            "There was an error fetching the data"
                            : countries.length <= 0 ?
                                "Fetching the data..."
                                : `Found ${filteredCountries?.length} countries`
                        }
                    </h1>
                    <SearchInput
                        setSearch={setSearch}
                    />
                </div>
                <div className="grid-divider">
                    <FilterOptions
                        sortByText={sortByText}
                        setSortByText={setSortByText}
                        regions={regions}
                        setRegions={setRegions}
                        statuses={statuses}
                        setStatuses={setStatuses}
                    />

                    {errorFetching.trim() ? (
                        <FetchResultMessage type="error" setIsRetry={setIsRetry} />
                    ) : search && filteredCountries.length <= 0 ? (
                        <FetchResultMessage type="warning" />
                    ) : <CountriesDataTable countries={filteredCountries} />
                    }

                </div>
            </div>
        </section>
    )
}

export default CountriesFloatingSection;