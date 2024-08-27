import { SupplyRequest } from "@/constants/templates";
import { GetLocalBranch } from "@/sqlite/branch";
import { GetLocalSession } from "@/sqlite/session";
import { Branch } from "@/types/branch";
import { Session } from "@/types/session";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { useEffect, useState } from "react";

type Form = {
  acid: number;
  paper: number;
  yellow_catalyzer: number;
  blue_catalyzer: number;
  wood_sticks: number;
  pen: number;
  pen_battery: number;
};

export default function useProfile() {
  const [branch, setBranch] = useState<Branch>();
  const [user, setUser] = useState<Session>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [form, setForm] = useState<Form>({
    acid: 0,
    paper: 0,
    yellow_catalyzer: 0,
    blue_catalyzer: 0,
    wood_sticks: 0,
    pen: 0,
    pen_battery: 0,
  });

  useEffect(() => {
    getLocalData();
    getLocalSession();
  }, []);

  const getLocalData = async () => {
    const response = await GetLocalBranch();
    setBranch(response as Branch);
  };

  const getLocalSession = async () => {
    const response = await GetLocalSession();
    setUser(response as Session);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleForm = (field: string, value: number) => {
    setForm({ ...form, [field]: value });
  };

  const print = async () => {
    const html = SupplyRequest({
      acid: form.acid,
      paper: form.paper,
      yellowCatalyzer: form.yellow_catalyzer,
      blueCatalyzer: form.blue_catalyzer,
      woodSticks: form.wood_sticks,
      pen: form.pen,
      penBattery: form.pen_battery,
    });
    const result = await printToFileAsync({ html, height: 297, width: 210 });
    console.log("result: ", result);
    await shareAsync(result.uri);
  };

  return { branch, user, handleShowModal, showModal, handleCloseModal, form, handleForm, print };
}
