import Header from "../components/Header";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <Header />
      <main className="mx-auto flex w-full max-w-[1536px] flex-col px-6 py-8 sm:px-8">
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
        <p className="mt-4 text-[#94a3b8]">
          Welcome to your professional interview preparation dashboard.
        </p>
      </main>
    </div>
  );
};

export default DashboardLayout;
