import { CountryInfoTableProps } from "@/types";

const CountryInfoTable = ({ countrySecondaryInfo }: CountryInfoTableProps) => {
    return (
        <table className="w-full">
            <tbody>
                {countrySecondaryInfo.map((secondaryInfo, i) => {

                    let dataToDisplay: string = '';
                    const valueType = typeof secondaryInfo.value;

                    if (valueType === "string") {
                        dataToDisplay = secondaryInfo.value as string;
                    } else if (Array.isArray(secondaryInfo.value)) {
                        const arrayLength = secondaryInfo.value.length - 1;
                        secondaryInfo.value.map((info, i) => {
                            dataToDisplay += i < arrayLength ? info + ", " : info;
                        })
                    } else if (valueType === "object") {
                        const infoObject = secondaryInfo.value;
                        const objectKeys = Object.keys(infoObject);
                        for (let i = 0; i < objectKeys.length; i++) {
                            const info = infoObject[objectKeys[i]];
                            if (info.name) {
                                dataToDisplay += i < objectKeys.length - 1 ? info.name + ", " : info.name
                            } else {
                                dataToDisplay += i < objectKeys.length - 1 ? info + ", " : info
                            }
                        }
                    }

                    return (
                        <tr
                            key={i}
                            className="w-full h-[60px] text-grey-light border-t border-t-black-light"
                        >
                            <td className="pl-6 text-sm text-left truncate">{secondaryInfo.label}</td>
                            <td className="pr-6 text-sm text-right truncate">{dataToDisplay}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default CountryInfoTable;