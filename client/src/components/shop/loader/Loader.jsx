import { Stack } from '@mui/material';
import { InfinitySpin } from 'react-loader-spinner';

const Loader = () =>  {
    return (
        <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
            <InfinitySpin color="#f9a01c" />
        </Stack>
    );

}



export default Loader;