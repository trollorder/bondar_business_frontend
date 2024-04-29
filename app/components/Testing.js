import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Testing = () => {
    const [packageData, setPackageData] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
            .then((response) => {
                setPackageData(response.data.mongoDbObjects);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <h2>Package Comparison</h2>
            <div style={{ overflowX: 'auto' }}>
                <table>
                    <thead>
                        <tr>
                            <th>Package</th>
                            <th>Insights</th>
                            <th>Analytics</th>
                            <th>Benchmarks</th>
                            <th>Minimum Customers</th>
                            <th>Number of Assets</th>
                            <th>Email Reminders</th>
                            <th>Monthly Reports</th>
                            <th>Price</th>
                            <th>Active</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageData.map((pkg) => (
                            <tr key={pkg._id}>
                                <td>{pkg.itemName}</td>
                                <td>{pkg.hasInsights ? 'Yes' : 'No'}</td>
                                <td>{pkg.hasAnalytics ? 'Yes' : 'No'}</td>
                                <td>{pkg.hasBenchmarks ? 'Yes' : 'No'}</td>
                                <td>{pkg.minimumCustomersPerMonth}</td>
                                <td>{pkg.numberOfAssets}</td>
                                <td>{pkg.hasEmailReminders ? 'Yes' : 'No'}</td>
                                <td>{pkg.hasMonthlyReports ? 'Yes' : 'No'}</td>
                                <td>${pkg.price}</td>
                                <td>{pkg.isactive ? 'Yes' : 'No'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Testing;






