import { useState, useEffect } from 'react'

export default function useInitialState(API) {
    const [videos, setVideo] = useState(0)

    useEffect(() => {
        fetch(API)
            .then((response) => response.json())
            .then((data) => setVideo(data))
    }, [])

    return videos
}
