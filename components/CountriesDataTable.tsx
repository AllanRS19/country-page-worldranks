import Image from "next/image";
import { CountriesDataTableProps } from "@/types";
import { useRouter } from "next/navigation";

const CountriesDataTable = ({ countries }: CountriesDataTableProps) => {

    const router = useRouter();

    return (
        <section className="data-table-section">
            <table className="countries-data-table divide-y-2 divide-black-light">
                <thead className="table-head">
                    <tr>
                        <th className="table-header">Flag</th>
                        <th className="table-header">Name</th>
                        <th className="table-header">Population</th>
                        <th className="table-header">Area (km²)</th>
                        <th className="table-header hidden md:table-cell">Region</th>
                    </tr>
                </thead>
                <tbody>
                    {countries && countries.length > 0 ? countries.map((country, i) => (
                        <tr
                            key={i}
                            className="country-data-row"
                            onClick={() => router.push(`/country/${country.cca3.toLowerCase()}`)}
                        >
                            <td>
                                <div className="flex items-center size-[46px]">
                                    <Image
                                        src={country.flags.svg}
                                        alt={country.flags.alt}
                                        width={0}
                                        height={0}
                                        className="size-auto object-cover rounded-xs self-center"
                                    />
                                </div>
                            </td>
                            <td className="truncate">{country.name.common}</td>
                            <td className="truncate">{country.population.toLocaleString()}</td>
                            <td className="truncate">{country.area.toLocaleString()}</td>
                            <td className="hidden md:table-cell">{country.region}</td>
                        </tr>
                    )) : (
                        Array.from({ length: 12 }).map((_, i) => (
                            <tr key={i} className="skeleton-data-row">
                                <td>
                                    <div className="flag-skeleton" />
                                </td>
                                <td>
                                    <div className="data-skeleton" />
                                </td>
                                <td>
                                    <div className="data-skeleton" />
                                </td>
                                <td>
                                    <div className="data-skeleton" />
                                </td>
                                <td className="hidden md:table-cell">
                                    <div className="data-skeleton" />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </section>
    )
}

export default CountriesDataTable;