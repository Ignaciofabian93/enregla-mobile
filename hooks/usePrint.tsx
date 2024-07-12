import { Label } from "@/types/label";
import { useState } from "react";

const defaultLabel: Label = {
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

export default function usePrint() {
  const [labelData, setLabelData] = useState<Label>(defaultLabel);

  const handleLabelData = (field: string, value: string | boolean) => {
    setLabelData({ ...labelData, [field]: value });
  };

  return { labelData, handleLabelData };
}
