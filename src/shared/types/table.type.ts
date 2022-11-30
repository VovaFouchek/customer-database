export type TColumn = {
	id: 'firstName' | 'lastName' | 'email' | 'phone' | 'details';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
	format?: (value: number) => string;
};

export type TCustomer = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	phone: string | number;
	details: string;
};
