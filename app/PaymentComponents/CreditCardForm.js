import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const CreditCardForm = ({ open, onClose, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardholderName] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvv, setCvv] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ cardNumber, cardHolderName, expMonth,expYear, cvv });
    onClose(); 
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">New Credit Card</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter your credit card details below.
        </DialogContentText>
        <form onSubmit={handleSubmit} className='flex space-y-2 flex-col'>
          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Cardholder Name"
            value={cardHolderName}
            onChange={(e) => setCardholderName(e.target.value)}
            fullWidth
            required
          />
          <div className='flex'>
            <TextField
                label="Expiry Month"
                value={expMonth}
                onChange={(e) => setExpMonth(e.target.value)}
                fullWidth
                required
            />
            <TextField
                label="Expiry Year"
                value={expYear}
                onChange={(e) => setExpYear(e.target.value)}
                fullWidth
                required
            />
          </div>
          
          <TextField
            label="CVV"
            value={cvv}
            onChange={(e)=> setCvv(e.target.value)}
            fullWidth
            required
            type="password" // Hide CVV input
          />
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            Add Card
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreditCardForm;
