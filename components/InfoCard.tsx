const InfoCard = ({
    label,
    data
}: {
    label: string;
    data: number
}) => {
    return (
        <div className="w-fit h-[46px] flex items-center gap-4 rounded-xl px-6 bg-black-light text-grey-light">
            <p className="text-xs font-normal">{label}</p>
            <div className="h-[30px] border-[0.5px] border-black-custom" />
            <p className="text-sm">{data.toLocaleString()}</p>
        </div>
    )
}

export default InfoCard;