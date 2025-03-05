import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NOTIFY_TYPE } from '../constants/constants';
import { setNotifications } from '../redux/reducer/notificationsSlice';

const useApiOperation = () => {
    const dispatch = useDispatch();
    const [apiError, setApiError] = useState(null);
    const [apiLoading, setApiLoading] = useState(false);

    const resetApiOperation = () => {
        setApiError(null);
        setApiLoading(false);
    };
    const startApiOperation = () => {
        resetApiOperation();
        setApiLoading(true);
    };
    const terminateApiOperation = (message = [], mode = NOTIFY_TYPE.Error) => {
        if (message?.length) {
            dispatch(setNotifications({ type: mode, messages: message }));
        }
        setApiLoading(false);
    };

    return {
        setApiError,
        resetApiOperation,
        apiError,
        startApiOperation,
        terminateApiOperation,
        apiLoading,
    };
};

export { useApiOperation };
