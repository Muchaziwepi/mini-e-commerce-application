# Mini E-Commerce Application

A simple full-stack online store built for the Invexom internship project. Users can browse products, view product details, add items to a cart, and complete a demonstration checkout form.

## Features

- Homepage with featured products
- Product listing and product details
- Add-to-cart functionality
- Cart quantity controls and order summary
- Demo checkout form
- Product data stored in MongoDB Atlas
- REST API for products and orders
- Prices displayed in Indian Rupees (₹)

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js REST API routes
- **Database:** MongoDB Atlas
- **Language:** TypeScript

## Project Structure

```text
app/              Pages and API routes
components/       Reusable frontend components
lib/              MongoDB connection helper
public/           Static assets
```

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Create a `.env.local` file and add your MongoDB connection string:

```env
MONGODB_URI=your_mongodb_connection_string
```

3. Start the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

- `GET /api/products` — Fetch products
- `POST /api/orders` — Submit a demonstration order

## Note

This project uses a demonstration checkout form. No real payment gateway is connected.

## Author

Built as an internship project under the mentorship of **Invexom**.

## License

This project is for educational purposes.
