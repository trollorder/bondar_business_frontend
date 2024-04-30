import React from 'react';
import { Box, Typography, Table, TableBody, TableRow, TableCell, Grid, List, ListItem, ListItemText } from '@mui/material';


const StandardOrder = ({ order }) => {
    const {
        id, // dont need display is the key
        customerId, // display 
        lineItems, // Display
        totalMoney, // show
        createdAt,
        state, // OPEN or COMPLETED
    } = order;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString();
    };

  return (
    <Box sx={{ padding: 2 }} className='bg-white mb-2'>
      <Typography variant="h6" gutterBottom>
        Order Details (ID: {id})
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            <ListItem>
              <ListItemText primary="Customer ID" secondary={customerId} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Created At" secondary={formatDate(createdAt)} />
            </ListItem>
            <ListItem>
                <ListItemText primary="Total Amount" secondary={`${totalMoney.amount} ${totalMoney.currency}`}/>
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Typography variant="body2" gutterBottom sx={{ mt: 2 }}>
        Order Items
      </Typography>
      <Table>
        <TableBody>
          {lineItems.map((item) => (
            <TableRow key={item.uid}>
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell align="right">
                {item.quantity} x {`$ ${item.variationTotalPriceMoney.amount} ${item.variationTotalPriceMoney.currency}`}
              </TableCell>
            </TableRow>
          ))}
            <TableRow>
                {/* Status */}
                <Typography variant='h6'>
                    Payment Status
                </Typography>
                <Typography variant='caption'>
                    {state === 'OPEN' ? "Order is pending payment" : "Payment Completed"}
                </Typography>
            </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default StandardOrder;
