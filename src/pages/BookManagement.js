import React, { useState, useEffect } from 'react';

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [isbn, setIsbn] = useState('');
  const [quantity, setQuantity] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
  }, []);

  const saveToLocalStorage = (updatedBooks) => {
    setBooks(updatedBooks);
    localStorage.setItem('books', JSON.stringify(updatedBooks));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !isbn) {
      alert('Please fill in all required fields!');
      return;
    }

    if (editIndex !== null) {
      const updatedBooks = [...books];
      updatedBooks[editIndex] = { title, author, genre, isbn, quantity: Number(quantity) };
      saveToLocalStorage(updatedBooks);
      setEditIndex(null);
    } else {
      const newBook = { title, author, genre, isbn, quantity: Number(quantity) };
      saveToLocalStorage([...books, newBook]);
    }

    setTitle('');
    setAuthor('');
    setGenre('');
    setIsbn('');
    setQuantity('');
  };

  const handleEdit = (index) => {
    const book = books[index];
    setTitle(book.title);
    setAuthor(book.author);
    setGenre(book.genre);
    setIsbn(book.isbn);
    setQuantity(book.quantity);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    saveToLocalStorage(updatedBooks);
  };

  return (
    <div>
      <h2>Book Management</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
        <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
        <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} />
        <input type="number" placeholder="Initial Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        <button type="submit">{editIndex !== null ? 'Update Book' : 'Add Book'}</button>
      </form>

      <h3>Book Inventory List</h3>
      <ul>
        {books.map((b, i) => (
          <li key={i} style={{ marginBottom: '10px' }}>
            {b.title} by {b.author} (Qty: {b.quantity}) 
            <button onClick={() => handleEdit(i)} style={{ marginLeft: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(i)} style={{ marginLeft: '5px' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookManagement;