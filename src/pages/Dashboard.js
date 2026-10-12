import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
  }, []);

  return (
    <div>
      <h2>Library Dashboard</h2>
      <p>Current book availability overview[cite: 2]:</p>
      
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f4f4f4' }}>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>ISBN</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center' }}>No books in inventory. Add some on the Books page!</td></tr>
          ) : (
            books.map((book, index) => {
              const isLowStock = Number(book.quantity) < 2; // Highlights books with fewer than 2 copies[cite: 2]
              return (
                <tr key={index} style={{ background: isLowStock ? '#ffcccc' : 'transparent' }}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.isbn}</td>
                  <td>
                    {book.quantity} {isLowStock && <strong style={{ color: 'red' }}>(Low Stock!)[cite: 2]</strong>}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;