import { FC } from "react";
import { MatchData } from "~/pages/players/[player]";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

interface GraphProps {
  matches: MatchData[];
}

const PlayerGraph: FC<GraphProps> = (matches) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const dataSet = matches.matches.map((match: MatchData, index) => {
    return {
      x: index + 1,
      y: match.ranking,
    };
  });

  const data = {
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        label: "Dataset 1",
        data: dataSet,
        borderColor: "#00FD64",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Line data={data} options={options}></Line>;
};

export default PlayerGraph;
