const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">
        Admin Dashboard
      </h1>
      <p className="text-slate-600">
        Only logged-in admins can see this page.
      </p>
    </div>
  );
};

export default Dashboard;
