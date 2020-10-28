import { ACTIONS } from '../actions';
const addExpense = (state, expense) => {
  // console.log('State: ', state);
  // console.log('Date: ', expense.date);
  const datePresent = state.find(st => st.date === expense.date);
  if (datePresent) {
    const newState = state.map(st => {
      if (st.date === expense.date) {
        // st.expenses.map(s => {
        // if (s.id === expense.id) {
        //   s.expenseFor = expense.expenseFor;
        //   s.amount = expense.amount;
        // }
        return {
          date: st.date,
          expenses: [
            ...st.expenses,
            {
              id: expense.id,
              expenseFor: expense.expenseFor,
              date: expense.date,
              amount: expense.amount
            }
          ]
        };

        // });
      }
      return st;
    });

    return newState;
  } else {
    const newExpense = {
      date: expense.date,
      expenses: [
        {
          id: expense.id,
          expenseFor: expense.expenseFor,
          date: expense.date,
          amount: expense.amount
        }
      ]
    };
    return [newExpense, ...state];
  }
};
const updateExpense = (state, expense) => {
  const newExpenses = state.map(st => {
    // if (st.id === expense.id) {

    // }
    // const expenseDate = state;
    if (st.date === expense.date) {
      st.expenses.map(exp => {
        if (exp.id === expense.id) {
          exp.expenseFor = expense.expenseFor;
          exp.amount = expense.amount;
        }
        return exp;
      });
    }
    return st;
  });

  return newExpenses;
};
const deleteExpense = (state, expenseId, expenseDate) => {
  // return state.filter(st => st.id !== expenseId);
  const expenseDay = state.find(st => st.date === expenseDate);
  const updatedExpenseDay = expenseDay.expenses.filter(
    exp => exp.id !== expenseId
  );
  return state.map(st => {
    if (st.date === expenseDate) {
      st.expenses = updatedExpenseDay;
    }
    return st;
  });
};
const expenseReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_EXPENSE:
      // return [...state, action.payload];
      return addExpense(state, action.payload);
    case ACTIONS.UPDATE_EXPENSE:
      return updateExpense(state, action.payload);
    case ACTIONS.DELETE_EXPENSE:
      return deleteExpense(state, action.payload.id, action.payload.date);

    default:
      return state;
  }
};

export default expenseReducer;
