import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
);

export default function SalesComparison({ todaysSales, yesterdaysSales }) {
    const barData = {
        labels: ['Today', 'Yesterday'],
        datasets: [
            {
                label: 'Sales (PHP)',
                data: [todaysSales, yesterdaysSales],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="mx-auto w-full max-w-2xl">
            <h2 className="mb-4 text-center text-lg font-bold">
                Today's vs Yesterday's Sales
            </h2>
            {/* <div className="mb-6">
                <h3 className="text-center font-semibold">Pie Chart</h3>
                <Pie data={pieData} />
            </div> */}
            <div>
                <Bar data={barData} options={options} />
            </div>
        </div>
    );
}
