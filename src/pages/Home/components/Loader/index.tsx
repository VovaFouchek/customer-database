import { CircularProgress, Box } from '@mui/material';

const Loader = (): JSX.Element => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '50px 0' }}>
            <CircularProgress />
        </Box>
    );
}

export default Loader;