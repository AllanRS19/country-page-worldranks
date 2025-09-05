'use client';

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { CountryInfo, RelatedCountriesInfo } from "@/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import InfoCard from "./InfoCard";

const CountryDetails = () => {

    const { cca } = useParams<{ cca: string }>();
    const [countryData, setCountryData] = useState<CountryInfo | null>(null);
    const countryCCA = useRef(cca);

    useEffect(() => {
        const fetchCountryDetails = async () => {

            await new Promise((resolve) => setTimeout(resolve, 2000));

            const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCCA.current}?fields=area,borders,capital,continents,currencies,flags,name,population,subregion`);
            if (!response.ok) {
                throw new Error("There was an error fetching the data");
            }

            const data = await response.json() as CountryInfo;

            const relatedCountries: RelatedCountriesInfo[] = [];

            await Promise.all(
                data.borders.map(async (c) => {
                    const res = await fetch(`https://restcountries.com/v3.1/alpha/${c}`);
                    const country = await res.json();
                    const countryInfo = {
                        relatedCName: country[0].name.common,
                        relatedCFlags: {
                            svg: country[0].flags.svg,
                            alt: country[0].flags.alt
                        },
                        relatedCCountryCA: country[0].cca3
                    }
                    relatedCountries.push(countryInfo);
                })
            );

            data.relatedCountries = relatedCountries;

            setCountryData(data);
        }
        fetchCountryDetails();
    }, []);

    if (!countryData) {
        return (
            <div className="country-data-loader">
                <Loader2 className="size-12 animate-spin text-grey-light" />
                <h2>Loading the country data...</h2>
            </div>
        )
    }

    console.log(countryData);

    const {
        area,
        capital,
        continents: {
            [0]: continent
        },
        currencies,
        flags: {
            svg,
            alt
        },
        name: {
            common,
            official
        },
        population,
        relatedCountries,
        subregion,
    } = countryData;

    return (
        <div className="country-info">
            <div className="country-primary-info">
                <div className="country-image-container">
                    <Image
                        src={svg}
                        alt={alt}
                        width={0}
                        height={0}
                        className="size-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-1 text-center mt-7">
                    <h1 className="text-3xl font-semibold text-grey-light">{common}</h1>
                    <h2 className="text-grey-light">{official}</h2>
                </div>
                <div className="flex flex-col gap-4 md:gap-0 md:flex-row items-center md:justify-evenly mt-7">
                    <InfoCard label="Population" data={population} />
                    <InfoCard label="Area (km²)" data={area} />
                </div>
            </div>
            <div className="country-secondary-info">
                Secondary details
            </div>
        </div>
    )
}

export default CountryDetails