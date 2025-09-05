import { FetchResultMessageProps } from "@/types";
import { CircleAlert, CircleX } from "lucide-react";

const FetchResultMessage = ({ type, setIsRetry }: FetchResultMessageProps) => {
    return (
        <section className="fetch-result-message-container flex justify-center items-start">
            <div className="flex flex-col items-center gap-4">
                {type === 'error' && setIsRetry ? (
                    <>
                        <CircleX className="size-12 text-red-600" />
                        <h2 className="text-red-400 text-xl">There was an error fetching your data. Please try again.</h2>
                        <button
                            className="retry-button"
                            onClick={() => setIsRetry(true)}
                        >
                            Retry Fetch
                        </button>
                    </>
                ) : type === "warning" && (
                    <>
                        <CircleAlert className="size-12 text-orange-400" />
                        <h2 className="text-grey-light text-xl">No countries were found with your search criteria.</h2>
                    </>
                )}
            </div>
        </section>
    )
}

export default FetchResultMessage;