export type LabelForm = {
  car_brand: string;
  car_model: string;
  car_year: string;
  show_vin: boolean;
  car_vin: string;
  vin_img: string;
  show_plate: boolean;
  car_plate: string;
  plate_img: string;
  show_logo: boolean;
  car_logo: string;
};

export type Label = LabelForm & {
  id: number;
  user_id: number;
  date: string;
  branch_id: number;
  labels_number: number;
  purchase_number: string;
  price: string;
};
