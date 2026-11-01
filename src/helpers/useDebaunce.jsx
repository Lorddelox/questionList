import { useEffect, useRef, useState } from "react"

const useDebaunce = (state, delay) => {
    const [debauncedState, setDebauncedState] = useState(state)
    const timerId = useRef(null);

    useEffect(() => {
        clearTimeout(timerId.current)
        timerId.current = setTimeout(() => {
            setDebauncedState(state)
        }, delay)

        return () => clearTimeout(timerId.current)
    }, [state, delay])
    return debauncedState
}

export default useDebaunce