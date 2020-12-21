export interface LogginUser
{
    email:string;
    password:string;
}

export interface successResponseLogin
{
    refresh: string;
    access: string;
    fistName:string,
    userId: number;
}