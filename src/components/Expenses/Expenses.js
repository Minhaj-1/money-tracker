import React, { useState, useEffect } from 'react';
import { Button, Card } from '@material-ui/core';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Modal from '../Modal';
import moment from 'moment';

// import { useStore } from 'react-redux';
// import { useStore } from 'react-redux';
// import store from '../../store/Store';

const Expenses = ({ expenses, dispatch }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [curExpense, setCurExpense] = useState(0);
  const [selectedExp, setSelectedExp] = useState({});
  const [editMode, setEditMode] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
  };
  //   const [expenses, setExpenses] = useState(store());
  useEffect(() => {
    let allTotal = 0;
    // console.log('Updated');
    // const total =
    //   expenses &&
    //   expenses.reduce((total, ex) => total + parseInt(ex.amount), 0);
    // console.log('Expenses: ', expenses);
    expenses &&
      expenses.forEach(expense => {
        // let total = 0;
        let total =
          expense.expenses &&
          expense.expenses.reduce((total, exp) => {
            return total + parseInt(exp.amount);
          }, 0);

        allTotal += parseInt(total);
      });
    setCurExpense(allTotal);
  }, [expenses]);
  return (
    <div>
      <Button
        variant='contained'
        color='primary'
        onClick={() => setModalOpen(true)}>
        Add Expense&nbsp;&nbsp;
        <CloudUpload />
      </Button>
      <p>
        <b> Total Expense : &#x20B9;{curExpense}</b>
      </p>
      {modalOpen && (
        <Modal
          dispatch={dispatch}
          onClose={closeModal}
          open={modalOpen}
          editMode={editMode}
        />
      )}

      {/* Card */}

      {expenses &&
        expenses.map(expense => {
          let total = expense.expenses.reduce(
            (tot, exp) => tot + parseInt(exp.amount),
            0
          );
          return (
            total !== 0 && (
              <Card
                style={{ textAlign: 'left', marginBottom: '15px' }}
                key={expense.date}>
                <div style={{ textAlign: 'center' }}>
                  <p
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '0 20px'
                    }}>
                    <span>
                      <b> {moment(expense.date).format('LL')} </b>
                    </span>
                    <span>
                      <b>
                        &#x20B9;
                        {total}
                      </b>
                    </span>
                  </p>
                  {expense.expenses &&
                    expense.expenses.map(exp => {
                      return (
                        <div key={exp.id}>
                          <p
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              padding: '0 20px'
                            }}
                            onClick={() => {
                              setSelectedExp(exp);
                              setEditMode(true);
                            }}>
                            <span style={{ textAlign: 'left' }}>
                              {' '}
                              {exp.expenseFor}
                            </span>
                            <span> &#x20B9;{exp.amount}</span>

                            {/* <span>
                        <Create color='primary' /> <DeleteIcon color='secondary' />
                      </span> */}
                            {/* {expense.expenseFor}:{expense.amount} */}
                          </p>
                        </div>
                      );
                    })}
                </div>
              </Card>
            )
          );
        })}

      {/* Card End */}

      {editMode && (
        <Modal
          dispatch={dispatch}
          onClose={closeModal}
          open={true}
          editMode={editMode}
          selectedExp={selectedExp}
        />
      )}
    </div>
  );
};

export default Expenses;
