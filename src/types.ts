export type ImageDeclaration = {
    _id: string,
    user_id: string,
    chunksAmount: number,
    size: number
}

export type ImageChunk = {
    _id: string,
    image_id: string,
    chunkNumber: number,
    data: string,
}

export type ImageObject = {
    id: string,
    loading: boolean,
    error: string,
    data: string,
}

export type UserProperties = {
    _id: string,
    name: string,
    surname: string,
    email: string,
    password: string,
}

export type ResponseUser = UserProperties & {
    profile_picture_id: string | null,
    background_picture_id: string | null,
}

export type User = UserProperties & {
    profile_picture: ImageObject | null,
    background_picture: ImageObject | null,
}

export type RegisterObject = {
    name: string,
    surname: string,
    email: string,
    password: string,
}

export type LoginObject = {
    email: string,
    password: string,
}