import { useEffect, useState } from "react";
import { GetLocalLabels } from "@/sqlite/labels";
import { LocalLabel } from "@/types/label";

export default function useHome() {
  const [labels, setLabels] = useState<LocalLabel[]>([]);

  useEffect(() => {
    fetchLocalLabels();
  }, []);

  const fetchLocalLabels = async () => {
    const response = await GetLocalLabels();
    setLabels(response);
  };

  return { labels };
}
