import {combine, createEffect, createEvent, createStore, Store} from 'effector';
import {TUser, TUserForMe} from './types';
import {UsersService} from '../../../api/services/UsersService/UsersService';
import {createEffectWithAuthToken} from '../auth/decorators';
import {NCreateEffectWithAuthToken} from '../auth/types';
import {$myDialogs} from '../dialogs';

export const $users = createStore<TUser[] | null>(null);

export const $usersForMe: Store<TUserForMe[] | null> = combine(
{users: $users, myDialogs: $myDialogs},
    ({users, myDialogs}) => users?.map(
        user => {

            const {isDialogCreated, isDialogAccepted} = (() => {

                let [isDialogCreated, isDialogAccepted] = [false, false];

                myDialogs?.forEach(dialog => {
                    if (dialog.partner?.id === user.id) {
                        isDialogCreated = true;
                        if (dialog?.isDialogAccepted) {
                            isDialogAccepted = true;
                        }
                    }
                })

                return {
                    isDialogAccepted,
                    isDialogCreated
                }
            })()

            return {
                ...user,
                isDialogCreated,
                isDialogAccepted,
            }
        }
    ) ?? null
)

export const getAllUsersEvent = createEvent()

export const getAllUsersFx = createEffectWithAuthToken<undefined, TUser[], Error>(createEffect(
    async ({token}: NCreateEffectWithAuthToken.TEffectParamParams<undefined>) => {
        const service = new UsersService();
        return await service.getAllUsers({token})
    }
))
