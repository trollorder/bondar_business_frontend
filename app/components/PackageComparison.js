import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const PackageComparison = ({ packageDataMongoDb }) => {
    const sortedPackageDataMongoDb = packageDataMongoDb.slice(); // Create a copy to avoid mutation
    sortedPackageDataMongoDb.sort((packageA, packageB) => packageA.price - packageB.price);

      
    const packageHeaders = sortedPackageDataMongoDb.map((eachPackage) => eachPackage.itemName); // Extract non-ID properties as headers
    const Benefits = [
        "hasInsights",
        "hasAnalytics",
        "hasBenchmarks",
        "minimumCustomersPerMonth",
        "numberOfAssets",
        "hasEmailReminders",
        "hasMonthlyReports",
    ]

    function getRowHeader(headerName) {
        switch (headerName) {
          case "hasInsights":
            return "Insights";
          case "hasAnalytics":
            return "Analytics";
          case "hasBenchmarks":
            return "Benchmarks";
          case "minimumCustomersPerMonth":
            return "Customers Per Month";
          case "numberOfAssets":
            return "Asset Count";
          case "hasEmailReminders":
            return "Email Reminders";
          case "hasMonthlyReports":
            return "Monthly Reports";
          default:
            return headerName; // Fallback to original name
        }
      }
      

    return (
        <div>
        <Typography variant="h6">Package Comparison</Typography>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight:'bold'}}>Benefits</TableCell>
                {packageHeaders.map((header) => (
                    <TableCell key={header} style={{fontWeight:'bold'}}>{header}</TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Benefits.map((eachBenefit) => (
                        <TableRow key={eachBenefit}>
                            <TableCell>{getRowHeader(eachBenefit)}</TableCell>
                            {sortedPackageDataMongoDb.map((eachPackage) =>(
                                <TableCell key={`${eachBenefit}_${eachPackage._id}`}>
                                    {typeof eachPackage[eachBenefit] === 'boolean'
                                        ? eachPackage[eachBenefit] ? 'Yes' : 'No'
                                        : eachPackage[eachBenefit]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                }

                
            </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
};

export default PackageComparison;
