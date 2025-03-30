# Trademark Search Application

![Trademarkia Logo](public/Logo.png)

A modern web application for searching and filtering trademark information, built with Next.js and TypeScript.

## Overview

This application provides a user-friendly interface to search and explore trademark data. It fetches information from a trademark API and allows users to filter results by various parameters including status, owners, law firms, and attorneys.

## Features

- **Trademark Search**: Search for trademarks by keyword
- **Advanced Filtering**: Filter results by:
  - Status (Registered, Pending, Abandoned, Others)
  - Owners
  - Law Firms
  - Attorneys
- **Detailed Trademark Information**: View comprehensive details for each trademark:
  - Mark Identification
  - Owner Information
  - Registration/Serial Numbers
  - Filing and Status Dates
  - Class Codes
  - Mark Descriptions
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Visual Status Indicators**: Color-coded status indicators for easy identification

## Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API Integration**: Custom API service
- **State Management**: React Hooks
- **Icons**: React Icons

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Filters.tsx          # Filter sidebar component
│   │   ├── SearchBar.tsx        # Search input component
│   │   └── TrademarkCard.tsx    # Trademark result card component
│   ├── services/
│   │   └── trademarkService.ts  # API service for trademark data
│   ├── types.ts                 # TypeScript interfaces and types
│   └── page.tsx                 # Main page component
├── ...
public/
├── Logo.png                     # Application logo
└── ...
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trademark-search-app.git
cd trademark-search-app
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env.local` file in the root directory (if needed for API keys):
```
API_BASE_URL=https://vit-tm-task.api.trademarkia.app/api/v3
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## API Integration

The application connects to the Trademarkia API to fetch trademark data. The main endpoint used is:

```
https://vit-tm-task.api.trademarkia.app/api/v3/us
```

The API accepts POST requests with parameters for searching and filtering trademarks.

## Code Structure

The application follows the SOLID principles of software design:

- **Single Responsibility Principle**: Each component has a single responsibility
- **Open/Closed Principle**: Components are open for extension but closed for modification
- **Interface Segregation**: Components only receive the props they need
- **Dependency Inversion**: High-level modules depend on abstractions not implementations

## Future Enhancements

- Advanced search capabilities with boolean operators
- Export results to CSV/PDF
- User accounts for saving searches
- Internationalization support
- Dark mode support
- Real-time updates for trademark status changes


## Acknowledgments

- Trademarkia for providing the API
- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
