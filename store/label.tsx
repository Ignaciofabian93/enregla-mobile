import { Label } from "@/types/label";
import { create } from "zustand";

export const defaultLabel: Label = {
  id: 0,
  user_id: 0,
  branch_id: 0,
  purchase_number: "",
  labels_number: 0,
  date: "",
  has_vin: false,
  has_logo: false,
  has_plate: false,
  logo: "",
  plate: "",
  vin: "",
  price: "",
};

type LabelStore = {
  labelData: Label;
  handleLabelData: (field: string, value: string | boolean) => void;
};

const useLabelStore = create<LabelStore>((set) => ({
  labelData: defaultLabel,
  handleLabelData: (field, value) =>
    set((state) => ({
      labelData: {
        ...state.labelData,
        [field]: value,
      },
    })),
}));

export default useLabelStore;
