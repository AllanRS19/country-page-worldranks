'use client';

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CircleAlert, CircleX, Loader2 } from "lucide-react";
import { CountryInfo, RelatedCountriesInfo } from "@/types";
import InfoCard from "./InfoCard";
import CountryInfoTable from "./CountryInfoTable";

const CountryDetails = () => {

    const { cca } = useParams<{ cca: string }>();
    const [countryData, setCountryData] = useState<CountryInfo | null>(null);
    const [isRetry, setIsRetry] = useState(false);
    const [wasErrorFetching, setWasErrorFetching] = useState(false);
    const countryCCA = useRef(cca);
    const fetchSettled = useRef(false);

    useEffect(() => {
        const fetchCountryDetails = async () => {

            try {
                setWasErrorFetching(false);

                const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCCA.current}?fields=area,borders,capital,continents,currencies,flags,name,population,subregion,languages`);
                if (!response.ok) return setWasErrorFetching(true);

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
            } catch {
                console.error("There was an error");
            } finally {
                setIsRetry(false);
            }
        }

        if (isRetry || !fetchSettled.current) {
            fetchSettled.current = true;
            fetchCountryDetails();
        }
    }, [isRetry]);

    if (!countryData && wasErrorFetching) {
        return (
            <div className="country-data-error">
                <CircleX className="size-12 text-red-500" />
                <h2>There was an error fetching the data. Please try again</h2>
                <button
                    onClick={() => setIsRetry(true)}
                >
                    Retry Fetch
                </button>
            </div>
        )
    }

    if (!countryData) {
        return (
            <div className="country-data-loader">
                <Loader2 className="size-12 animate-spin text-grey-light" />
                <h2>Loading the country data...</h2>
            </div>
        )
    }

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
        languages,
        name: {
            common,
            official
        },
        population,
        relatedCountries,
        subregion
    } = countryData;

    const countrySecondaryInfo = [
        { label: "Capital", value: capital },
        { label: "Subregion", value: subregion },
        { label: "Language", value: languages },
        { label: "Currencies", value: currencies },
        { label: "Continents", value: continent },
    ]

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
                <div className="flex flex-col gap-4 md:gap-10 md:flex-row items-center md:justify-center mt-7">
                    <InfoCard label="Population" data={population} />
                    <InfoCard label="Area (km²)" data={area} />
                </div>
            </div>
            <div className="country-secondary-info">
                <CountryInfoTable countrySecondaryInfo={countrySecondaryInfo} />
                <div className="neighbouring-countries">
                    <h3 className="text-sm text-grey-light">Neighbouring Countries</h3>
                    <div className="neighbouring-countries-grid">
                        {!countryData ? (
                            <p className="text-sm text-grey-light">Loading related countries...</p>
                        ) : relatedCountries.length > 0 ? relatedCountries.map((relatedCountryInfo, i) => (
                            <Link
                                key={i}
                                href={`/country/${relatedCountryInfo.relatedCCountryCA}`}
                                className="neighbouring-country"
                            >
                                <div className="related-country-image-container">
                                    <Image
                                        src={relatedCountryInfo.relatedCFlags.svg}
                                        alt={relatedCountryInfo.relatedCFlags.alt || relatedCountryInfo.relatedCName}
                                        width={0}
                                        height={0}
                                        className="size-full object-cover rounded-md"
                                    />
                                </div>
                                <p className="text-left text-xs text-grey-light">
                                    {relatedCountryInfo.relatedCName}
                                </p>
                            </Link>
                        )) : relatedCountries.length === 0 && (
                            <div className="flex items-center gap-3">
                                <CircleAlert className="size-6 text-orange-400" />
                                <p className="text-sm text-orange-200">This country does not have neighbouring countries</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountryDetails