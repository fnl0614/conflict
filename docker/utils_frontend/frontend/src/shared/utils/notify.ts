import { Flip, toast } from 'react-toastify';

const notify = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    let func : (message: string, options?: Parameters<typeof toast>[1]) => void;

    switch (type) {
        case 'success':
            func = toast.success;
            break;
        case 'error':
            func = toast.error;
            break;
        case 'info':
            func = toast.info;
            break;
    }
    func(message, {
        type,
        position: 'bottom-center',
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        theme: 'light',
        transition: Flip,
        pauseOnFocusLoss: false,
    });
}

export { notify };
