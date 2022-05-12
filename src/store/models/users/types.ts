export type TUser = {
    id: string;
    email: string;
    name: string;
    isEmailActivated: boolean;
}

export type TUserForMe = TUser & {
    isDialogAccepted: boolean;
    isDialogCreated: boolean;
}
