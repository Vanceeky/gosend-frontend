import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const DashboardCard = ({ title, value, change, icon, changeColor }) => {
  return (
    <Card className="p-4">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="p-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${changeColor}`}>{change}</p>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
