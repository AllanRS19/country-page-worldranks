import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay: number = 2000) {
    const [debouncedTerm, setDebouncedTerm] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedTerm(value);
        }, delay)

        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedTerm;
}