import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { API } from '../../../../shared/api/config/customers.api';
import { TCustomer } from '../../../../shared/types/table.type';

import './index.scss';

type CreateCustomerProps = {
    onCreate: (customer: TCustomer) => void;
    onCloseWindow: () => void;
};

const SimpleForm = ({ onCreate, onCloseWindow }: CreateCustomerProps): JSX.Element => {
    // * format of phone: +00000000
    const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/
    const style = {
        marginBottom: "15px",
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: ''
        },

        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
            email: Yup.string()
                .required('Required')
                .email('Invalid email address')
                .max(30, 'Must be 30 characters or less'),
            phone: Yup.string()
                .required('Required')
                .matches(phoneRegExp, 'Phone number is not valid'),
            company: Yup.string()
                .required('Required')
                .max(30, 'Must be 30 characters or less')
        }),

        onSubmit: async (values: TCustomer) => {
            const customerData = values;
            const response = await axios.post<TCustomer>(API.CUSTOMERS, customerData);
            onCreate(response.data);
            onCloseWindow()
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <TextField id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                label="First Name"
                variant="standard"
                sx={style} />

            {formik.touched.firstName && formik.errors.firstName ? (
                <div className='error'>{formik.errors.firstName}</div>
            ) : null}

            <TextField id="lastName"
                name="lastName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
                label="Last Name"
                variant="standard"
                sx={style} />

            {formik.touched.lastName && formik.errors.lastName ? (
                <div className='error'>{formik.errors.lastName}</div>
            ) : null}

            <TextField id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                label="Email Address"
                variant="standard"
                sx={style} />

            {formik.touched.email && formik.errors.email ? (
                <div className='error'>{formik.errors.email}</div>
            ) : null}

            <TextField id="phone"
                name="phone"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                label="Phone"
                variant="standard"
                sx={style} />

            {formik.touched.phone && formik.errors.phone ? (
                <div className='error'>{formik.errors.phone}</div>
            ) : null}

            <TextField id="company"
                name="company"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.company}
                label="Company"
                variant="standard"
                sx={style} />

            {formik.touched.company && formik.errors.company ? (
                <div className='error'>{formik.errors.company}</div>
            ) : null}

            <Button type="submit" variant="contained" sx={{ mt: "30px" }}>Submit</Button>
        </form>
    );
};

export default SimpleForm;