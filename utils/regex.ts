export const validate_email = (data: string) =>
  data.length > 0 && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(data);

export const validate_password = (data: string) => data.length > 0 && !/^[A-Z0-9]{4,}$/i.test(data);
