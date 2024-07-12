export type Label = {
  id: number;
  user_id: number;
  date: string;
  has_vin: boolean;
  has_logo: boolean;
  has_plate: boolean;
  plate: string | null;
  vin: string | null;
  logo: string | null;
  branch_id: number;
  labels_number: number;
  purchase_number: string;
  price: string;
};
