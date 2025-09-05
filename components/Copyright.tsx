const Copyright = () => {
    return (
        <div className="hidden md:block absolute top-0 left-0 right-0 bg-black-custom text-center py-3 z-30">
            <span className="text-sm text-grey-light">
                Coded by <a href="https://allanromero-portfolio.vercel.app" className="text-blue-custom cursor-pointer pointer-events-auto hover:underline" target="_blank">
                    Allan Romero
                </a> | Challenge by <a href="https://devchallenges.io/" className="text-blue-custom cursor-pointer hover:underline" target="_blank">devChallenges.io</a>.
            </span>
        </div>
    )
}

export default Copyright;