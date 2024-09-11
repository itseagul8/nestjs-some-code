export type CreateUserParams= {
    email:string
    password:string
}
export type UpdateUserParams= {
    email:string
    password:string
}
export type ManageAccessParams= {
    action:string
    email:string
}