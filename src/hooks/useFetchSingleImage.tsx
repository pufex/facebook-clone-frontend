import { axiosPublic } from "../api/api";
import { useCallback, useState } from "react";
import type { ImageChunk, ImageDeclaration, ImageObject } from "../types";

export default function useFetchSingleImage() {
    const [error, setError] = useState("")
    const [image, setImage] = useState<ImageObject | null>(null)
    const [loading, setLoading] = useState(false)

    const fetchImage = useCallback(async (declaration_id: string) => {
        setLoading(true)
        try {
            const declarationResponse = await axiosPublic.get(`/images/declaration/${declaration_id}`)
            const declaration = declarationResponse.data as ImageDeclaration
            setImage({
                id: declaration._id,
                loading: true,
                error: "",
                data: "",
            })
            setLoading(false)
            const chunksNumbers = []
            for (let i = 0; i < declaration.chunksAmount; i++) {
                chunksNumbers.push(i + 1)
            }
            try {
                const listedChunks = await Promise.all(chunksNumbers.map(async (chunkNumber): Promise<Pick<ImageChunk, "chunkNumber" | "data">> => {
                    const chunkResponse = await axiosPublic.get(`/images/chunk/${declaration._id}`)
                    const chunk = chunkResponse.data as ImageChunk
                    return {chunkNumber, data: chunk.data}
                }))
                setImage(prev => !prev
                    ? prev
                    : {
                        ...prev,
                        loading: false,
                        data: listedChunks
                            .sort((a,b) => (a.chunkNumber - b.chunkNumber))
                            .map(chunk => chunk.data)
                            .join("")
                    }
                )
            } catch (error) {
                console.log(error)
                setImage(prev => prev 
                    ? {
                        ...prev,
                        loading: false,
                        error: "Failed to fetch this iamge."
                    }
                    : null
                )
            }
        } catch (err) {
            console.log(err)
            setError("Failed to fetch this image.")
        } finally {
            setLoading(false)
        }
    }, [])

    return {
        image,
        loading,
        error,
        fetchImage
    }
}