import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface pie {
  responsive: boolean;
  plugins: {
    legend: {
      display: boolean;
      position?: 'center' | 'left' | 'top' | 'right' | 'bottom';
    };
  };
}

export const lineOptions = {
  responsive: true,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      border: {
        color: '#000',
      },
      ticks: {
        display: false,
      },
    },
    y: {
      border: {
        color: '#000',
      },
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
    },
  },
};

export const pieOptions: pie = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};
