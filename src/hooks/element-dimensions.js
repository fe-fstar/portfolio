import { useState, useEffect } from "react";

export default function useElementSize(ref) {
    const [size, setSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        setTimeout(() => {
            updateSize();
        }, 0);

        function updateSize() {
            let { width, height } = ref.current.getBoundingClientRect();
            setSize({ width, height });
        };

        window.addEventListener("resize", updateSize);

        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
}