import React from 'react';
import { Box, Typography, Card, CardContent, CardHeader, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EditIcon from '@mui/icons-material/Edit';
const StandardCardDetails = ({ card , isDisplay }) => {
    const { cardBrand, last4, expMonth, expYear, cardholderName } = card;
    const formattedExpiry = `${expMonth}/${expYear.slice(2)}`;

    return (
        <Card style={{ backgroundColor: '#fff', borderRadius: '4px', display: 'flex', alignItems: 'center', padding: '16px' }}>
            <CardContent style={{ flex: 1, marginLeft: '16px' }}>
                <CreditCardIcon/>
                <Typography variant="body2" color="textSecondary">
                    Cardholder Name
                </Typography>
                <Typography variant="body1">{cardholderName}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Card Details
                </Typography>
                <Typography variant="body1">
                    **** **** **** {last4}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Expires
                </Typography>
                <Typography variant="body1">{formattedExpiry}</Typography>
            </CardContent>
            {!isDisplay === false && <div>
            <IconButton>
                <EditIcon style={{color:'green'}}/>
            </IconButton>
            <IconButton aria-label="Delete">
                <DeleteIcon style={{color:'red'}}/>
            </IconButton>
            </div>}
        </Card>
    );
};

export default StandardCardDetails;
