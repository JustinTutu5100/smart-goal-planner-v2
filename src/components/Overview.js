function Overview({ totalGoals, totalSaved, completedGoals }) {
  return (
    <section className="w-full bg-white shadow p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Overview</h2>
      <div className="flex flex-wrap justify-center gap-4">
        <p className="bg-blue-100 text-blue-800 px-4 py-2 rounded text-lg">
          Total Goals: <span>{totalGoals}</span>
        </p>
        <p className="bg-green-100 text-green-800 px-4 py-2 rounded text-lg">
          Total Saved: ${totalSaved}
        </p>
        <p className="bg-purple-100 text-purple-800 px-4 py-2 rounded text-lg">
          Goals Completed: <span>{completedGoals}</span>
        </p>
      </div>
    </section>
  );
}
export default Overview;
