import React from 'react';
import { Card, CardContent, Grid, Typography, ListItem, ListItemText } from '@mui/material';

const SelectedPlanCard = ({ catalogObject }) => {
  const { itemName, numberOfAssets, hasInsights, hasAnalytics, hasBenchmarks, hasEmailReminders, hasMonthlyReports } = catalogObject;

  return (
    <Card className="text-start">
      <CardContent>
        <Typography variant="h5" component="div">
          Plan Details
        </Typography>
        <br />
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={6}>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">Plan Name</Typography>}
                secondary={<Typography variant="body2">{itemName}</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">Number of Assets</Typography>}
                secondary={<Typography variant="body2">{numberOfAssets}</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">Has Insights</Typography>}
                secondary={<Typography variant="body2">{hasInsights ? 'Yes' : 'No'}</Typography>}
              />
            </ListItem>
          </Grid>

          {/* Right Column */}
          <Grid item xs={6}>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">Has Analytics</Typography>}
                secondary={<Typography variant="body2">{hasAnalytics ? 'Yes' : 'No'}</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">Has Benchmarks</Typography>}
                secondary={<Typography variant="body2">{hasBenchmarks ? 'Yes' : 'No'}</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">Has Email Reminders</Typography>}
                secondary={<Typography variant="body2">{hasEmailReminders ? 'Yes' : 'No'}</Typography>}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={<Typography variant="body2">Has Monthly Reports</Typography>}
                secondary={<Typography variant="body2">{hasMonthlyReports ? 'Yes' : 'No'}</Typography>}
              />
            </ListItem>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SelectedPlanCard;
