const Receipt = ({ sale }) => {
    if (!sale) {
        return <p>Loading receipt...</p>;
    }

    return (
        <div
            style={{
                padding: '30px',
                maxWidth: '800px',
                margin: '0 auto',
                border: '1px solid #ddd',
                borderRadius: '8px',
                backgroundColor: '#f9f9f9',
            }}
        >
            <h1
                style={{ textAlign: 'center', fontSize: '2rem', color: '#333' }}
            >
                Receipt
            </h1>

            <div style={{ marginBottom: '20px' }}>
                <p>
                    <strong>Sale ID:</strong> {sale.id}
                </p>
                <p>
                    <strong>Date:</strong>{' '}
                    {new Date(sale.sale_date).toLocaleDateString()}
                </p>
                <p>
                    <strong>Total Amount:</strong> $
                    {sale.total_amount.toFixed(2)}
                </p>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Items</h2>

            <table
                style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    marginBottom: '20px',
                }}
            >
                <thead>
                    <tr>
                        <th
                            style={{
                                padding: '8px',
                                textAlign: 'left',
                                borderBottom: '2px solid #ddd',
                            }}
                        >
                            Product
                        </th>
                        <th
                            style={{
                                padding: '8px',
                                textAlign: 'left',
                                borderBottom: '2px solid #ddd',
                            }}
                        >
                            Quantity
                        </th>
                        <th
                            style={{
                                padding: '8px',
                                textAlign: 'left',
                                borderBottom: '2px solid #ddd',
                            }}
                        >
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sale.details.map((detail, index) => (
                        <tr key={index}>
                            <td
                                style={{
                                    padding: '8px',
                                    borderBottom: '1px solid #ddd',
                                }}
                            >
                                <strong>{detail.product_name}</strong>
                            </td>
                            <td
                                style={{
                                    padding: '8px',
                                    borderBottom: '1px solid #ddd',
                                }}
                            >
                                {detail.quantity_sold}
                            </td>
                            <td
                                style={{
                                    padding: '8px',
                                    borderBottom: '1px solid #ddd',
                                }}
                            >
                                ${detail.line_total.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Receipt;
