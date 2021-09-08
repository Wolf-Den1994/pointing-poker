import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../store/rootReducer';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useTypedSelector;
