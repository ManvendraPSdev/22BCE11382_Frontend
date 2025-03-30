# Trademark Search Interface

A modern Next.js application for searching and filtering trademarks, built with React, TypeScript, and Tailwind CSS.

![Trademark Search Interface](public/preview.png)

## Features

- **Powerful Trademark Search**: Search through thousands of trademarks with real-time results
- **Advanced Filtering**: Filter trademarks by status, owner, law firm, and attorney
- **Interactive UI**: Clean, modern interface with intuitive controls
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time API Integration**: Connects to a trademark database API

## Technologies Used

- **Next.js 14+**: For server-side rendering and optimized performance
- **React 18**: For building the interactive UI
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For responsive, utility-first styling
- **React Icons**: For UI icons
- **API Integration**: RESTful API connection to trademark database

## Getting Started

### Prerequisites

- Node.js 18.x or newer
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/trademark-search.git
   cd trademark-search
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
/
├── public/              # Static assets
│   └── Logo.png         # Application logo
├── src/
│   ├── app/             # Next.js app directory
│   │   ├── components/  # React components
│   │   │   ├── Filters.tsx       # Filter sidebar component
│   │   ├── services/    # Service layer for API calls
│   │   │   └── trademarkService.ts  # Trademark API service
│   │   ├── types.ts     # TypeScript types and interfaces
│   │   └── page.tsx     # Main application page
│   └── styles/          # CSS styles
└── next.config.js       # Next.js configuration
```

## API Integration

The application connects to the trademark API at `https://vit-tm-task.api.trademarkia.app/api/v3/us`. The API supports:

- Searching trademarks by query
- Filtering by status, owner, attorney, and law firm
- Pagination of results
- Aggregations for filter options

## Features in Detail

### Trademark Search

Users can search for trademarks using the search bar. The application sends a request to the API and displays the results.

### Status Filtering

Trademarks can be filtered by their status:
- Registered (green)
- Pending (yellow)
- Abandoned (red)
- Others (blue)

### Entity Filtering

Users can filter trademarks by:
- Owners
- Law Firms
- Attorneys

Each filter category has its own search functionality to find specific entities.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- Design inspired by Trademarkia's interface
- Data provided by trademark API
