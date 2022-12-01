export type TColumn = {
	id: 'firstName' | 'lastName' | 'email' | 'phone' | 'company';
	label: string;
	minWidth?: number;
	align?: 'right' | 'left' | 'center';
	format?: (value: number) => string;
};

export type TCustomer = {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	phone: string | number;
	company: string;
};
