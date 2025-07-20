import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import GoalList from './components/Goallist.jsx'
import GoalForm from './components/Goalform.jsx'
import ProgressTracker from './components/Progresstracker.jsx'
import './App.css'

// Import goals data directly
import goalsData from '../db.json'

function App() {
  const [goals, setGoals] = useState(goalsData.goals || [])
  const [editingGoal, setEditingGoal] = useState(null)

  // Add a new goal
  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      savedAmount: 0, // Initialize saved amount to 0
    }
    setGoals([...goals, newGoal])
  }

  // Update an existing goal
  const updateGoal = (updatedGoal) => {
    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
    setEditingGoal(null)
  }

  // Delete a goal
  const deleteGoal = (id) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  // Update saved amount for a goal
  const updateSavedAmount = (id, amount) => {
    const goalToUpdate = goals.find((goal) => goal.id === id)
    const updatedGoal = {
      ...goalToUpdate,
      savedAmount: parseFloat(amount),
    }
    setGoals(goals.map((goal) => (goal.id === id ? updatedGoal : goal)))
  }

  return (
    <div className="app">
      <Header />
      <div className="main-content">
        <div className="form-section">
          <GoalForm addGoal={addGoal} updateGoal={updateGoal} editingGoal={editingGoal} />
          <ProgressTracker goals={goals} />
        </div>
        <GoalList
          goals={goals}
          deleteGoal={deleteGoal}
          startEditing={setEditingGoal}
          updateProgress={updateSavedAmount} 
        />
      </div>
    </div>
  )
}

export default App