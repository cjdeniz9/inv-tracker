import { useDispatch, useSelector } from "react-redux";

import { addSaleToFirestore, clearSale, getSale } from "../context/saleSlice";
import { updateChartInFirestore } from "../../dashboard/context/chartSlice";
import { updateStatus } from "../../../context/inventorySlice";

import AlertNotif from "../../../components/alert/AlertNotif";

import useFetchChart from "../../../hooks/useFetchChart";

import { useToast } from "@chakra-ui/react";

export default function useAddSale() {
  const dispatch = useDispatch();

  const toast = useToast();

  const { chart } = useFetchChart();

  const sale = useSelector(getSale);

  const addSale = () => {
    const total =
      Number(sale.salePrice) -
      (Number(sale.salePlatformFees) + Number(sale.saleShipping));

    const matchFound = chart.filter((i) => {
      if (i.item.date.includes(sale.saleDate)) {
        return i;
      }
    });

    const newProfit =
      Number(matchFound[0].item.profit) + Number(sale.salePrice);

    const data = {
      id: matchFound[0].id,
      profit: newProfit,
    };

    if (total <= 0) {
      toast({
        position: "top",
        duration: 6000,
        render: () => (
          <AlertNotif
            status="error"
            width="96"
            title="Payout amount must be greater than $0"
          />
        ),
      });
      dispatch(clearSale());
    } else {
      dispatch(addSaleToFirestore(sale));
      dispatch(updateChartInFirestore(data));
      dispatch(clearSale());
      dispatch(updateStatus("idle"));
    }
  };

  return { addSale };
}
