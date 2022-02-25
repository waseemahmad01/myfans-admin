import { merge } from "lodash";
import ReactApexChart from "react-apexcharts";
// material
import { Card, CardHeader, Box } from "@mui/material";
//
// import { BaseOptionChart } from "../../charts";
import { useTranslation } from "react-i18next";

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: "Earning",
    type: "column",
    data: [0, 10000, 20000, 30000, 40000],
  },
];

export default function AppWebsiteVisits() {
  const { t } = useTranslation();
  // const chartOptions = merge(BaseOptionChart(), {
  //   stroke: { width: [0, 2, 3] },
  //   plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
  //   fill: { type: ["solid", "gradient", "solid"] },
  //   labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
  //   dataLabels: {
  //     position: "top",
  //   },
  //   xaxis: {
  //     categories: [
  //       "Jan",
  //       "Feb",
  //       "Mar",
  //       "Apr",
  //       "May",
  //       "Jun",
  //       "Jul",
  //       "Aug",
  //       "Sep",
  //       "Oct",
  //       "Nov",
  //       "Dec",
  //     ],
  //   },
  //   tooltip: {
  //     shared: true,
  //     intersect: false,
  //     y: {
  //       formatter: (y) => {
  //         if (typeof y !== "undefined") {
  //           return `${y.toFixed(0)} visits`;
  //         }
  //         return y;
  //       },
  //     },
  //   },
  // });

  return (
    <Card>
      <CardHeader
        title={`${t("Earnings_Overview")}`}
        subheader="(+43%) than last year"
      />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          // options={chartOptions}
          options={{
            // labels: ["Jan", "Mar", "May", "Jul", "Sep", "Nov"],
            stroke: {
              curve: "smooth",
            },
            colors: ["#4e73df"],
            xaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            // plotOptions: { bar: { columnWidth: "50%", borderRadius: 25 } },
            dataLabels: {
              formatter: (val) => {
                return `$${val}`;
              },
            },
            yaxis: {
              labels: {
                formatter: (val) => {
                  return `$${val}`;
                },
              },
            },
          }}
          height={364}
          // width={100}
        />
      </Box>
    </Card>
  );
}
