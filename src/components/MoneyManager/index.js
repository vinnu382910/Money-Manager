import {Component} from 'react'

import './index.css'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

// Write your code here
class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionsList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    let incomeAmount = 0
    let balanceAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionsList: updatedTransactionsList})
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  render() {
    const {titleInput, amountInput, transactionsList, optionId} = this.state

    const incomeAmount = this.getIncome()
    const balanceAmount = this.getBalance()
    const expensesAmount = this.getExpenses()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="header-container">
            <h1 className="greetings-heading">Hi, Richard</h1>
            <p className="welcome-description">
              Welcome back to your
              <span className="money-manager-text"> Money Manger</span>
            </p>
          </div>
          <MoneyDetails
            incomeAmount={incomeAmount}
            balanceAmount={balanceAmount}
            expensesAmount={expensesAmount}
          />
          <div className="transactionForm-header-container">
            <form className="transaction-form" onSubmit={this.onAddTransaction}>
              <h1 className="form-heading">Add Transaction</h1>
              <label className="label" htmlFor="titleInput">
                TITLE
              </label>
              <input
                id="titleInput"
                className="input"
                placeholder="INPUT"
                value={titleInput}
                type="text"
                onChange={this.onChangeTitleInput}
              />
              <label className="label" htmlFor="amountInput">
                AMOUNT
              </label>
              <input
                id="amountInput"
                className="input"
                placeholder="AMOUNT"
                value={amountInput}
                type="text"
                onChange={this.onChangeAmountInput}
              />
              <label className="label" htmlFor="select">
                TYPE
              </label>
              <select
                className="input"
                id="select"
                value={optionId}
                onChange={this.onChangeOptionId}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <button className="button" type="submit">
                Add
              </button>
            </form>
            <div className="history-container">
              <h1 className="history-title">History</h1>
              <div className="history-table-container">
                <ul className="table-container">
                  <li className="table-header">
                    <p className="table-header-cell">Title</p>
                    <p className="table-header-cell">Amount</p>
                    <p className="table-header-cell">Type</p>
                  </li>
                  {transactionsList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteTransaction={this.deleteTransaction}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
