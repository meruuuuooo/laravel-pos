import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function ProductSalesComparison({ productSalesComparison }) {
    // Prepare data for the chart
    const labels = productSalesComparison.map((data) => data.product_name);
    const todayData = productSalesComparison.map((data) => data.today);
    const yesterdayData = productSalesComparison.map((data) => data.yesterday);

    const barData = {
        labels,
        datasets: [
            {
                label: "Today's Sales",
                data: todayData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: "Yesterday's Sales",
                data: yesterdayData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
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
        <div className="mx-auto w-full max-w-4xl">
            <h2 className="mb-4 text-center text-lg font-bold">
                Product Sales: Today vs Yesterday
            </h2>
            <Bar data={barData} options={options} />
        </div>
    );
}
