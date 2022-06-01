import {forward, sample} from 'effector';
import {$service, dialogJoinEvent, dialogJoinFx, serviceConnectEvent, serviceConnectFx} from './index';

forward({
    from: serviceConnectEvent,
    to: serviceConnectFx,
})

sample({
    source: $service,
    clock: dialogJoinEvent,
    fn: (service, dialogId) => ({
        service,
        dialogId,
    }),
    target: dialogJoinFx
})
