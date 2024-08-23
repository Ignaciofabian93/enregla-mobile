export const validate_email = (data: string) => data.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data);

export const validate_password = (data: string) => data.length > 0 && !/^[A-Z0-9]{4,}$/i.test(data);

export const validate_rut = (data: string) => data.length > 0 && !/^[0-9]{7,8}-[0-9]{1}$/i.test(data);

export const validate_plate = (data: string) => data.length > 0 && !/^[A-Z0-9]{2}-[A-Z0-9]{2}-[A-Z0-9]{2}$/i.test(data);
export const validate_vin = (data: string) => data.length > 0 && !/^[A-Z0-9]{17}$/i.test(data);
