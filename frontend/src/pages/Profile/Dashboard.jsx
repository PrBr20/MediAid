import React from "react";

const Dashboard = () => {
  return (
    <div className="flex-col space-y-5">
      <h1 className="font-bold text-3xl">Dashboard</h1>
      <hr className="border-black" />

      <div className="flex space-x-3 justify-between">
        <div className="rounded-xl border bg-card text-card-foreground shadow w-1/3">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow w-1/3">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
        </div>

        <div className="rounded-xl border bg-card text-card-foreground shadow w-1/3">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
