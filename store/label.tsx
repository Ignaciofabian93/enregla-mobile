import { create } from "zustand";
import { LocalLabel } from "@/types/label";

const defaultLabel: LocalLabel = {
  id: 0,
  work_order: "",
  label_id: 0,
  operator: "",
  operator_id: 0,
  date: "",
  branch_id: 0,
  label_quantity: 0,
  wrong_labels: 0,
  coordinates: "",
  vehicle_brand_id: 0,
  vehicle_model_id: 0,
  vehicle_year: "",
  vehicle_vin: "",
  show_vin: 0,
  show_plate: 0,
  show_logo: 0,
  vehicle_plate: "",
  print_type: "",
  description: "",
};

type labelStore = {
  labelSelected: LocalLabel;
  setLabelSelected: (label: LocalLabel) => void;
};

const useLabelStore = create<labelStore>((set) => ({
  labelSelected: defaultLabel,
  setLabelSelected: (label: LocalLabel) => set({ labelSelected: label }),
}));

export default useLabelStore;
