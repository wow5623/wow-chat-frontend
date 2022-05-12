import {forward} from 'effector';
import {$users, getAllUsersEvent, getAllUsersFx} from './index';

forward({
    from: getAllUsersEvent,
    to: getAllUsersFx,
})

forward({
    from: getAllUsersFx.doneData,
    to: $users,
})
