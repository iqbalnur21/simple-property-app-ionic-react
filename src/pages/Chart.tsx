import React, { useEffect, useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSplitPane,
} from "@ionic/react";
import { Property } from "../types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "./Chart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Chart: React.FC = () => {
  const [data, setData] = useState<{ [key: string]: number }>({});
  const [medianData, setMedianData] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const localityCount: { [key: string]: number } = {};
    const localityPrices: { [key: string]: number[] } = {};

    const properties = JSON.parse(
      localStorage.getItem("properties") || "[]"
    ) as Property[];
    properties.forEach((property: Property) => {
      const key = `${property.city}, ${property.state}`;

      localityCount[key] = (localityCount[key] || 0) + 1;

      if (!localityPrices[key]) {
        localityPrices[key] = [];
      }
      localityPrices[key].push(property.price);
    });

    const medianPrices: { [key: string]: number } = {};
    Object.keys(localityPrices).forEach((key) => {
      const prices = localityPrices[key];
      prices.sort((a, b) => a - b);
      const mid = Math.floor(prices.length / 2);
      medianPrices[key] =
        prices.length % 2 !== 0
          ? prices[mid]
          : (prices[mid - 1] + prices[mid]) / 2;
    });

    setData(localityCount);
    setMedianData(medianPrices);
  }, []);

  const barData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: "Number of Properties",
        data: Object.values(data),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieData = {
    labels: Object.keys(medianData),
    datasets: [
      {
        label: "Median Property Price",
        data: Object.values(medianData),
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <IonSplitPane>
      <IonPage>
        <IonContent>
          <IonItem>
            <IonLabel>Statistics of Properties by Locality</IonLabel>
          </IonItem>
          <div className="chart-container">
            <div className="chart-item">
              <Bar
                data={barData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
            <div className="chart-item">
              <Pie
                data={pieData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: true } },
                }}
              />
            </div>
          </div>
        </IonContent>
      </IonPage>
    </IonSplitPane>
  );
};

export default Chart;
