export type User = {
  id: number;
  name: string;
  email: string;
  rut: string;
  branch: {
    id: number;
    location: string;
    municipality: string;
    address: string;
    telephone: string;
    agency: {
      id: number;
      name: string;
    };
  };
  role: {
    id: number;
    name: string;
  };
};
