import { useDispatch, useSelector } from "react-redux";

import { db } from "../../../../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { addSaleToFirestore, clearSale, getSale } from "../context/saleSlice";
import {
  getChart,
  updateChartInFirestore,
} from "../../../../dashboard/context/chartSlice";
import { updateStatus } from "../../../../../context/inventorySlice";

import AlertNotif from "../../../../../components/alert/AlertNotif";

import { useToast } from "@chakra-ui/react";

export default function useAddSale() {
  const dispatch = useDispatch();

  const toast = useToast();

  const chart = useSelector(getChart);
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
    } else if (matchFound.length !== 0) {
      const newTotal = Number(matchFound[0].item.profit) + Number(total);

      const data = {
        id: matchFound[0].id,
        updatedAmount: newTotal,
      };

      dispatch(addSaleToFirestore(sale));
      dispatch(updateChartInFirestore(data));
      dispatch(updateStatus("idle"));
    } else {
      dispatch(addSaleToFirestore(sale));
      addDoc(collection(db, "dashboard"), {
        date: sale.saleDate,
        profit: total,
        timestamp: serverTimestamp(),
      });
      dispatch(updateStatus("idle"));
    }

    dispatch(clearSale());
  };

  return { addSale };
}
