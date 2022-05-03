import {TUserInfo} from '../../../store/models/auth/types';

export type TLoginBody = {
    email: string;
    password: string;
}

export type TLoginResponse = {
    accessToken: string;
    user: TUserInfo;
}

export type TRegisterBody = {
    email: string;
    password: string;
    name: string;
}
export type TRegisterResponse = {
    accessToken: string;
    user: TUserInfo;
}
