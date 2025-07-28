import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Overview from "./components/Overview";
import GoalForm from "./components/GoalForm";
import ActiveGoals from "./components/ActiveGoals";
import CompletedGoals from "./components/CompletedGoals";

function App() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/goals")
      .then((response) => response.json())
      .then((data) => setGoals(data))
      .catch((error) => console.error("Error fetching goals:", error));
  }, []);

  // Calculate totals for Overview
  const totalGoals = goals.length;
  const totalSaved = goals.reduce((sum, g) => sum + g.savedAmount, 0);
  const completedGoals = goals.filter((g) => g.savedAmount >= g.targetAmount).length;

  // Handlers (can be expanded to send updates to json-server)
  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
    // Optional: POST to json-server here
  };

  const handleDeposit = (goalId, amount) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId
          ? { ...goal, savedAmount: goal.savedAmount + amount }
          : goal
      )
    );
    // Optional: PATCH to json-server
  };

  const handleEdit = (goalId) => {
    const newName = prompt("Enter new goal name:");
    if (newName) {
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === goalId ? { ...goal, name: newName } : goal
        )
      );
      // Optional: PATCH to json-server
    }
  };

  const handleDelete = (goalId) => {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== goalId));
    // Optional: DELETE from json-server
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="container mx-auto p-4 space-y-6 flex-1">
        <Overview
          totalGoals={totalGoals}
          totalSaved={totalSaved}
          completedGoals={completedGoals}
        />
        <GoalForm onAddGoal={handleAddGoal} />
        <ActiveGoals
          goals={goals.filter((g) => g.savedAmount < g.targetAmount)}
          onDeposit={handleDeposit}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <CompletedGoals
          goals={goals.filter((g) => g.savedAmount >= g.targetAmount)}
          onDeposit={handleDeposit}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>
    </div>
  );
}

export default App;
