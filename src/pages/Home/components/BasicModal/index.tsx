import { useState } from 'react';

import { Box, Button, Modal, Typography } from '@mui/material';

import { TCustomer } from '../../../../shared/types/table.type';
import SimpleForm from '../SimpleForm';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    width: "100%",
    bgcolor: '#F7F7F7',
    border: 'none',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

type BasicModalProps = {
    createHandler: (customer: TCustomer) => void;
};

const BasicModal = ({ createHandler }: BasicModalProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} variant="outlined" sx={{ marginTop: "30px" }}>Add new customer</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2" align="center">
                        Fill the form
                    </Typography>
                    <SimpleForm onCreate={createHandler} onCloseWindow={handleClose} />
                </Box>
            </Modal>
        </ >
    );
}

export default BasicModal;