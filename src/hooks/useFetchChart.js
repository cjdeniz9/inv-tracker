import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  fetchChart,
  getChart,
  getChartError,
  getChartStatus,
} from "../features/dashboard/context/chartSlice";

export default function useFetchChart() {
  const dispatch = useDispatch();

  const chart = useSelector(getChart);
  const chartStatus = useSelector(getChartStatus);
  const chartError = useSelector(getChartError);

  const handleFetchChart = useCallback(() => {
    dispatch(fetchChart());
  }, []);

  useEffect(() => {
    handleFetchChart();
  }, [handleFetchChart]);

  return { chart, chartStatus, chartError };
}
