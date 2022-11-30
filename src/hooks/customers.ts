import { useEffect, useState } from 'react';

import axios, { AxiosError } from 'axios';

import { API } from '../shared/api/config/customers.api';
import { TCustomer } from '../shared/types/table.type';

export const useCustomers = () => {
	const [customers, setCustomers] = useState<TCustomer[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	const fetchCustomers = async () => {
		try {
			const response = await axios.get<TCustomer[]>(API.CUSTOMERS);
			setCustomers(response.data);
			setLoading(false);
		} catch (error) {
			const errorRequest = error as AxiosError;
			setLoading(false);
			setError(errorRequest.message);
		}
	};

	useEffect(() => {
		fetchCustomers();
	});

	return { customers, loading, error };
};
