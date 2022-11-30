import { useEffect, useState } from 'react';

import axios from 'axios';

import { API } from '../shared/api/config/customers.api';
import { TCustomer } from '../shared/types/table.type';

const useCustomers = () => {
	const [customers, setCustomers] = useState<TCustomer[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchCustomers = async () => {
		try {
			// * imitation delay for request from server
			setTimeout(async () => {
				const response = await axios.get<TCustomer[]>(API.CUSTOMERS);
				setCustomers(response.data);
				setLoading(false);
			}, 500);
		} catch (error) {
			let errorMessage = 'Failed to do something exceptional';
			if (error instanceof Error) {
				errorMessage = error.message;
			}
			console.log(errorMessage);
		}
	};

	useEffect(() => {
		fetchCustomers();
	});

	return { customers, loading };
};

export default useCustomers;
