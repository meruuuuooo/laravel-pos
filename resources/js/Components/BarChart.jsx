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

/**
 * BarChart Component
 * @param {Array} labels - Array of labels for the X-axis.
 * @param {Array} data - Array of sales data for the Y-axis.
 */
export default function BarChart({ labels, data }) {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Sales (PHP)',
                data,
                backgroundColor: 'rgba(237, 0, 166, 0.6)',
                borderColor: 'rgba(237, 0, 166, 1)',
                borderWidth: 2,
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
            x: {
                title: {
                    display: true,
                    text: 'Time Frame',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Total Sales (PHP)',
                },
            },
        },
    };

    return <Bar data={chartData} options={options} />;
}
