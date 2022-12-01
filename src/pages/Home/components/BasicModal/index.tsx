import { useState } from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';

import { SimpleForm } from '../SimpleForm';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#F7F7F7',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const BasicModal = (): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button onClick={handleOpen} variant="outlined" sx={{ marginTop: "30px" }}>Add new customer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" align="center">
                        Fill the form
                    </Typography>
                    <SimpleForm />
                </Box>
            </Modal>
        </div >
    );
}

export default BasicModal;