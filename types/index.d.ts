import { Dispatch, SetStateAction } from "react";

declare interface CountriesData {
    area: number;
    name: {
        common: string;
    };
    flags: {
        alt: string;
        svg: string;
    };
    population: number;
    region: string;
    unMember: boolean;
    independent: boolean;
    cca3: string;
}

declare interface RelatedCountriesInfo {
    relatedCName: string;
    relatedCFlags: { 
        svg: string, 
        alt: string 
    };
    relatedCCountryCA: string;
}

declare interface CountryInfo {
    area: number;
    borders: string[];
    capital: string[];
    continents: string[];
    currencies: Array<object>;
    flags: {
        svg: string;
        alt: string;
    }
    languages: object;
    name: {
        common: string;
        official: string;
    };
    population: number;
    relatedCountries: RelatedCountriesInfo[];
    subregion: string;
}

declare interface CountryInfoTableProps {
    countrySecondaryInfo: {
        label: string;
        value: string | string[] | Record<string>;
    }[];
}

declare interface CountriesDataTableProps {
    countries?: CountriesData[];
}

declare interface FetchResultMessageProps {
    type: 'error' | 'warning';
    setIsRetry?: (value: boolean) => void;
}

declare interface SearchInputProps {
    setSearch: (searchTerm: string) => void;
}

declare interface SortDropdownProps {
    sortByText: string;
    setSortByText: (selectedOption: string) => void;
}

declare interface RegionSelectorProps {
    regions: string[];
    setRegions: Dispatch<SetStateAction<string[]>>;
}

declare interface StatusCheckboxProps {
    statuses: string[];
    setStatuses: Dispatch<SetStateAction<string[]>>;
}

declare interface FilterOptionsProps {
    sortByText: string;
    setSortByText: (sortText: string) => void;
    regions: string[];
    setRegions: Dispatch<SetStateAction<string[]>>;
    statuses: string[];
    setStatuses: Dispatch<SetStateAction<string[]>>;
}