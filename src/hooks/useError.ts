import { useContext } from 'react';

import { ErrorsContext } from './contexts/errorsContext';

// ==============================|| AUTH HOOKS ||============================== //

const useError = () => {
    const context = useContext(ErrorsContext);

    if (!context) throw new Error('context must be use inside provider');

    return context;
};

export default useError;