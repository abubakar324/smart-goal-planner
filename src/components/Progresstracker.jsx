import React from 'react'

const ProgressTracker = ({ goals }) => {
  const totalGoals = goals?.length || 0
  const completedGoals =
    goals?.filter((goal) => (goal.savedAmount || 0) >= (goal.targetAmount || 0)).length || 0
  const completionPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0

  const totalSaved = goals?.reduce((sum, goal) => sum + Number(goal.savedAmount || 0), 0) || 0
  const totalTarget = goals?.reduce((sum, goal) => sum + Number(goal.targetAmount || 0), 0) || 0
  const overallProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0

  // Calculate goals with approaching deadlines
  const today = new Date()
  const warningGoals = goals?.filter(goal => {
    const deadline = new Date(goal.deadline)
    const daysRemaining = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24))
    return daysRemaining <= 30 && daysRemaining >= 0 && goal.savedAmount < goal.targetAmount
  }).length || 0

  // Calculate overdue goals
  const overdueGoals = goals?.filter(goal => {
    const deadline = new Date(goal.deadline)
    return deadline < today && goal.savedAmount < goal.targetAmount
  }).length || 0

  const categoryTotals =
    goals?.reduce((acc, goal) => {
      if (!goal?.category) return acc

      if (!acc[goal.category]) {
        acc[goal.category] = { saved: 0, target: 0 }
      }
      acc[goal.category].saved += Number(goal.savedAmount || 0)
      acc[goal.category].target += Number(goal.targetAmount || 0)
      return acc
    }, {}) || {}

  return (
    <div className="progress-tracker">
      <h2>Progress Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Goals Summary</h3>
          <p>Total Goals: {totalGoals}</p>
          <p>Completed: {completedGoals}</p>
          <p>Warning (30 days): {warningGoals}</p>
          <p>Overdue: {overdueGoals}</p>
        </div>

        <div className="stat-card">
          <h3>Total Savings Progress</h3>
          <p>
            ${totalSaved.toFixed(2)} / ${totalTarget.toFixed(2)}
          </p>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${overallProgress}%` }}></div>
          </div>
          <p>{overallProgress}% of total target</p>
        </div>
      </div>

      {Object.keys(categoryTotals).length > 0 && (
        <div className="category-progress">
          <h3>Progress by Category</h3>
          {Object.entries(categoryTotals).map(([category, totals]) => {
            const percent = totals.target > 0 ? Math.round((totals.saved / totals.target) * 100) : 0
            return (
              <div key={category} className="category-item">
                <span className="category-name">{category}</span>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                </div>
                <span className="category-percent">{percent}%</span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ProgressTracker