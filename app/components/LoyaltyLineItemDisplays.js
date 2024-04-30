import { Card, CardContent, Typography } from "@mui/material";

const LoyaltyProgramLineItemCard = ({ data }) => {
  return (
    <Card className="bg-primary flex flex-col mx-2 shadow-md rounded-lg mb-4">
      <CardContent className="flex flex-col">
        <Typography variant="h5" className="font-bold text-lg mb-2">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="">
          {data.description}
        </Typography>
        <Typography variant="caption" className="">
          Cost Per Unit: ${data.costPerUnit}
        </Typography>
        <Typography variant="caption"  className="">
          Total Available: {data.totalNumberOfItemsAvailable}
        </Typography>
        <Typography variant="caption"  className="">
            Estimated Monthly Spend: ${data.estimatedSpendMonthly}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LoyaltyProgramLineItemCard;
