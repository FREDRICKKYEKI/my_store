import { DashboardMenu } from "../DashboardMenu";

export const DashboardScreen = () => {
  return (
    <div class="dashboard">
      <DashboardMenu selected={"dashboard"} />
      <div class="dashboard-content">
        <h1>Dashboard</h1>
        <div>Info and Charts will be added here</div>
      </div>
    </div>
  );
};
