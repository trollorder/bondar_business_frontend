import { Card, CardContent, Typography } from "@mui/material";

const LoyaltyProgramLineItemCard = ({ data }) => {
  return (
    <Card className="bg-white shadow-md rounded-lg mb-4">
      <CardContent>
        <Typography variant="h5" component="div" className="font-bold text-lg mb-2">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="text-gray-600">
          {data.description}
        </Typography>
        <div className="flex mt-2">
          <Typography variant="body2" component="div" className="w-1/2 text-gray-600">
            Cost Per Unit: ${data.costPerUnit}
          </Typography>
          <Typography variant="body2" component="div" className="w-1/2 text-gray-600 text-right">
            Total Available: {data.totalNumberOfItemsAvailable}
          </Typography>
        </div>
        <Typography variant="body2" component="div" className="mt-2 text-gray-600">
          Estimated Monthly Spend: ${data.estimatedSpendMonthly}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LoyaltyProgramLineItemCard;
