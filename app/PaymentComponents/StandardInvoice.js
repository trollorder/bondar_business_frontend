import React from 'react';
import { Box, Typography, Table, TableBody, TableRow, TableCell, Grid, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

const StandardInvoice = ({ invoice }) => {
  const {
    id, // component key id 
    invoiceNumber,
    title,
    primaryRecipient: { givenName, familyName, emailAddress },
    paymentRequests: [{ computedAmountMoney: { amount, currency } }],
    deliveryMethod,
    status,
    acceptedPaymentMethods: { card, bankAccount },
  } = invoice;

  return (
    <Box sx={{ padding: 2 }} className='bg-white mb-2 rounded-xl'>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <List>
            <Typography variant='body2' style={{fontWeight:'bold'}}>{title}</Typography>
            <ListItem>
                <ListItemText primary={`Invoice ${invoiceNumber}`}/>
            </ListItem>
            <ListItem>
              <ListItemText primary="Customer" secondary={`${givenName} ${familyName}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Email" secondary={emailAddress} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Delivery Method" secondary={deliveryMethod} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Status" secondary={status} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Invoice Details
      </Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Amount Due</TableCell>
            <TableCell align="right">{`${amount} ${currency}`}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Payment Methods</TableCell>
            <TableCell align="right">
              {card ? 'Card' : null} {card && bankAccount ? ' & ' : null} {bankAccount ? 'Bank Account' : null}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default StandardInvoice;
