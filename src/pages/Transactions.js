import React, { useState, useEffect } from 'react';

function Transactions() {
  const [books, setBooks] = useState([]);
  const [selectedIsbn, setSelectedIsbn] = useState('');
  const [amount, setAmount] = useState(1);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setBooks(JSON.parse(localStorage.getItem('books')) || []);
    setHistory(JSON.parse(localStorage.getItem('transactions')) || []);
  }, []);

  const handleTransaction = (type) => {
    if (!selectedIsbn) {
      alert('Please select a book first.');
      return;
    }

    const updatedBooks = books.map(book => {
      if (book.isbn === selectedIsbn) {
        let newQty = Number(book.quantity);
        if (type === 'add') {
          newQty += Number(amount);
        } else if (type === 'borrow') {
          if (newQty < amount) {
            alert('Not enough stock available to borrow!');
            return book;
          }
          newQty -= Number(amount);
        }
        return { ...book, quantity: newQty };
      }
      return book;
    });

    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));

    const newLog = {
      type: type === 'add' ? 'Stock Added' : 'Book Borrowed',
      isbn: selectedIsbn,
      amount: Number(amount),
      date: new Date().toLocaleString()
    };
    const updatedHistory = [newLog, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('transactions', JSON.stringify(updatedHistory));
  };

  return (
    <div>
      <h2>Availability Management & Transactions</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <select value={selectedIsbn} onChange={(e) => setSelectedIsbn(e.target.value)}>
          <option value="">Select a Book</option>
          {books.map((b, i) => (
            <option key={i} value={b.isbn}>{b.title} (Stock: {b.quantity})</option>
          ))}
        </select>
        <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} style={{ width: '60px' }} />
        <button onClick={() => handleTransaction('add')} style={{ background: '#d4edda' }}>Add Stock</button>
        <button onClick={() => handleTransaction('borrow')} style={{ background: '#f8d7da' }}>Deduct (Borrow)</button>
      </div>

      <h3>Transaction History Log</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            [{h.date}] <strong>{h.type}</strong> - ISBN: {h.isbn} (Qty: {h.amount})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Transactions;