export interface RegisterUser
{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}

interface Token
{
    access:string;
    refresh:string;
}

export interface successRegister
{
    success:string;
    token:Token;
    userId:number
}

export interface emailTakenError
{
    fail:string
}