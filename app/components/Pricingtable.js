import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// //create states
// // "_id": "662c3af3f9b73e2dd09ad977",
// // "hasInsights": true,
// const [hasInsights, setHasInsights]=useState(false)
// // "hasAnalytics": true,
// const [hasAnalytics, setHasAnalytics]=useState(false)
// // "hasBenchmarks": true,
// const [hasBenchmarks, setHasBenchmarks]=useState(false)
// // "minimumCustomersPerMonth": 100,
// const [minimumCustomersPerMonth, setMinimumCustomersPerMonth]=useState(0)
// // "numberOfAssets": 20,
// const [numberOfAssets, setNumberofAssets]=useState(0)
// // "hasEmailReminders": true,
// const [hasEmailReminders, setHasEmailReminders]=useState(false)
// // "hasMonthlyReports": false,
// const [hasMonthlyReports, setHasMonthlyReports]=useState(false)
// // "itemName": "100USD Tier",
// const [itemName, setItemName]=useState('')
// // "price": 100,
// const [price, setPrice]=useState()
// // "isactive": true,
// const [isActive, setIsActive]=useState(false)




export default function BasicTable() {
  // useEffect(() => {
  //   console.log(packageDataID); // This will log the updated value when packageDataID changes
  //   axios.get(`${process.env.NEXT_PUBLIC_BACKENDURL}/all-catalog-items`)
  //   .then((response) => {
  //     const mongoDbObjects = response.data.mongoDbObjects;
  //     const packageObject = mongoDbObjects.find(obj => obj._id === packageDataID);
  //     if (packageObject) {
  //       setPackagePrice(packageObject.price);
  //       console.log(packageObject);
  //     } else {
  //       console.log("Package not found");
  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }, [packageDataID]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}