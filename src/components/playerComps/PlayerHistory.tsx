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
  Filler,
} from "chart.js";
import { api } from "~/utils/api";

export default function PlayerHistory(props: {
  id: string;
  w?: number;
  h?: number;
}) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
  );

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    
    elements: {
      line: {
        tension: 0,
        borderWidth: 2,
        borderColor: "rgba(35,195,91, 1)",
        fill: "start",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        backgroundColor: (context: any) => {
          const chart = context.chart as ChartJS;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return undefined;
          }

          const { top, bottom } = chartArea;

          const gradient = ctx.createLinearGradient(0, top, 0, bottom);
          gradient.addColorStop(0, "rgba(35,195,91, 0.3)");
          gradient.addColorStop(1, "rgba(35,195,91, 0)");

          return gradient;
        },
      },
      point: {
        radius: 0,
        hoverRadius: 0,
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

  let width = 500;
  let height = 80;

  if (props.w) {
    width = props.w;
  }
  if (props.h) {
    height = props.h;
  }

  const userHistory = api.users.getUserGlobalRankHistory.useQuery(
    {
      id: props.id,
    },
    { enabled: !!props.id }
  );

  if (userHistory.data) {
    const dataset = {
      labels: userHistory.data.map(
        (x) => x.date?.getDay() + " / " + x.date?.getMonth()
      ),
      datasets: [
        {
          data: userHistory.data.map((x) => x.ranking),
        },
      ],
    };
    const list = userHistory.data;
    const filteredList = list.filter((match) => match.ranking !== null);
    const len = filteredList.length;

    let matchDiff = 0;
    const currentRanking = Number(filteredList[len - 1]?.ranking); // Current ranking
    if (len < 5) {
      matchDiff = Number(filteredList[0]?.ranking);
    } else {
      matchDiff = Number(filteredList[len - 6]?.ranking);
    }

    const ranking5MatchesAgo = matchDiff;

    let increased = false;
    if (currentRanking && ranking5MatchesAgo) {
      increased = currentRanking > ranking5MatchesAgo;
    }

    const isNotRanked: boolean = filteredList.length == 0;

    return (
      <div className="flex flex-col w-[500px]">
        <div className={`flex-none`}>
          <div className="flex flex-col">
            <div className="flex items-center">
              <svg
                className={` h-5 w-5${
                  increased ? " fill-green-500" : " fill-red-500"
                } `}
                data-name="Arrow"
                viewBox="0 0 32 32"
              >
                <path
                  d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"
                  transform={`
                  ${increased ? "" : "scale (1, -1)"}
                  `}
                  transform-origin="center"
                ></path>
              </svg>
              <div className="text-3xl text-white">
                {isNotRanked
                  ? "No Match History"
                  : (currentRanking * 1000).toFixed(0)}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Line
            data={dataset}
            height={height}
            width={width}
            options={options}
          />
        </div>
      </div>
    );
  } else {
    return null;
  }
}
