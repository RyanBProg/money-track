# Money Track

Money Track is a full-stack web application that helps users manage their personal transactions. It provides a simple interface to log, view, and sort income and expenses.

This project is built with a modern tech stack:

- **Frontend**: Vite, React, TypeScript
- **Backend**: Node.js, Express
- **Database**: MongoDB (via Mongoose ORM)

---

## Features

- Log transactions with details such as name, price, description, and date.
- Mark transactions as income or expense.
- Paginate through transaction history for large datasets.
- Sort transactions by date or price.
- Dynamic UI updates with React and TypeScript.
- API-powered backend with Express and MongoDB for scalable data handling.

---

## Tech Stack

### Frontend

- **Framework**: React (via Vite for fast builds)
- **Language**: TypeScript
- **Styling**: Custom CSS

### Backend

- **Framework**: Node.js with Express
- **Database**: MongoDB (via Mongoose ORM)

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- Yarn or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ryanbprog/money-track.git
   cd transaction-logger
   ```

2. Install dependencies for the frontend:

   ```bash
   cd frontend
   npm install
   ```

3. Install dependencies for the backend:
   ```bash
   cd ../backend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory with the following variables:

   ```env
   MONGO_URL=your_mongodb_connection_string
   ```

### Running the Application

1. Start the backend server:

   ```bash
   cd backend
   npm run backend
   ```

2. Start the frontend development server:

   ```bash
   cd frontend
   npm run frontend
   ```

3. Open your browser and navigate to `http://localhost:5173`.

---

## Future Improvements

- Add user authentication and authorization.
- Export transaction data to CSV/Excel.
- Integrate charts for visualizing income vs. expense trends.
- Implement category tagging for transactions.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Built with ❤️ using modern web technologies.
