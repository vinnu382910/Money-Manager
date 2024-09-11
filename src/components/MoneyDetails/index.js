// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expensesAmount, balanceAmount} = props

  return (
    <div className="money-details-container">
      <div className="balance-container">
        <img
          className="details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
        />
        <div>
          <p className="details-text">Your Balance</p>
          <p className="details-amount" data-testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>
      <div className="income-container">
        <img
          className="details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png "
          alt="income"
        />
        <div>
          <p className="details-text">Your Income</p>
          <p className="details-amount" data-testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>
      <div className="expensesContainer">
        <img
          className="details-img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
        />
        <div>
          <p className="details-text">Your Expenses</p>
          <p className="details-amount" data-testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </div>
  )
}
export default MoneyDetails
