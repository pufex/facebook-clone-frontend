export type User = {
    _id: string,
    name: string,
    surname: string,
    email: string,
    password: string,
    profile_picture_id: string,
    background_picture_id: string,
}

export type RegisterObject = {
    name: string,
    surname: string,
    email: string,
    password: string,
}