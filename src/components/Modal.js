import React, { useState } from 'react';
import { Dialog, TextField, Button } from '@material-ui/core';
import { ACTIONS } from '../actions';
import { v4 } from 'uuid';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Check from '@material-ui/icons/Check';

const styles = { form: { padding: 20 } };

const Modal = ({ onClose, open, dispatch, editMode, selectedExp }) => {
  const handleClose = () => {
    onClose();
  };
  // const [expense, setExpense] = useState(selectedExp);
  const [expenseFor, setExpenseFor] = useState(
    (selectedExp && selectedExp.expenseFor) || ''
  );
  const [amount, setAmount] = useState(
    (selectedExp && selectedExp.amount) || ''
  );
  const handleSubmit = e => {
    e.preventDefault();
    if (!amount || !expenseFor) {
      alert('Please fill both Fields!');

      return;
    }

    dispatch({
      type: ACTIONS.ADD_EXPENSE,
      payload: { id: v4(), expenseFor, date: moment().format('l'), amount }
    });
    onClose();
  };

  const updateExpense = () => {
    if (!expenseFor || !amount) {
      alert('Please fill both Fields!');
      return;
    }

    dispatch({
      type: ACTIONS.UPDATE_EXPENSE,
      payload: {
        id: selectedExp.id,
        expenseFor,
        date: selectedExp.date,
        amount
      }
    });
    onClose();
  };
  const deleteExpense = () => {
    if (window.confirm('Are You Sure?')) {
      dispatch({
        type: ACTIONS.DELETE_EXPENSE,
        payload: { id: selectedExp.id, date: selectedExp.date }
      });
      onClose();
    }
  };
  return editMode ? (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          value={expenseFor}
          autoFocus
          onChange={e => setExpenseFor(e.target.value)}
          label='Expense For'
          variant='outlined'
          maxLength={10}
        />
        <br />
        <br />
        <TextField
          type='number'
          id='outlined-basic'
          value={amount}
          onChange={e => setAmount(e.target.value)}
          label='Amount'
          variant='outlined'
        />
        <br />
        <br />
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant='contained' color='primary' onClick={updateExpense}>
            <Check />
          </Button>
          <Button variant='contained' color='secondary' onClick={deleteExpense}>
            <DeleteIcon />
          </Button>
        </div>
      </form>
    </Dialog>
  ) : (
    <Dialog
      onClose={handleClose}
      aria-labelledby='simple-dialog-title'
      open={open}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <TextField
          id='outlined-basic'
          value={expenseFor}
          autoFocus
          onChange={e => setExpenseFor(e.target.value)}
          label='Expense For'
          variant='outlined'
          maxLength={10}
        />
        <br />
        <br />
        <TextField
          type='number'
          id='outlined-basic'
          value={amount}
          onChange={e => setAmount(e.target.value)}
          label='Amount'
          variant='outlined'
        />
        <br />
        <br />
        <Button type='submit' variant='contained' color='primary'>
          Add Expense
        </Button>
      </form>
    </Dialog>
  );
};

export default Modal;
