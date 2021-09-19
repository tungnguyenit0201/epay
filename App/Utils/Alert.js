import { useCallback } from 'react';
import Navigator from 'navigations/Navigator';
import { useTranslation } from 'context/Language';
import { Images, Colors } from 'themes';

const useAlert = () => {
    const strings = useTranslation();

    const showError = useCallback(params => {
        const { title, message } = params || {};
        Navigator.showAlert({
            icon: Images.Register.Info,
            iconColor: Colors.white,
            title: title ?? strings?.error,
            message: message ?? strings?.unknownError,
        });
    }, []);

    return { showError };
};

export default useAlert;
