# Sollytics-dz

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![Solana](https://img.shields.io/badge/Solana-SDK-purple?style=flat-square&logo=solana)](https://solana.com)

</div>

> A Solana blockchain analytics and visualization platform built with Next.js, TypeScript, and Supabase.

## Key Features

- **Real-time Analytics**: Interactive dashboards with live data from the Solana network.
- **Advanced Querying**: An editor to write, save, and execute custom queries against blockchain data.
- **Custom Visualizations**: Build and customize charts and graphs from query results.
- **AI-Powered Insights**: Leverage AI to interpret data and identify trends.

## Core Technologies

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS with shadcn/ui
- **Blockchain**: Solana Web3.js
- **Testing**: Jest & Cypress

## Architecture

Sollytics-dz follows a modern web application architecture:

-   **Frontend**: A Next.js application serves the user interface, providing a fast, server-rendered experience.
-   **Backend**: Next.js API routes handle backend logic, including user authentication and data fetching.
-   **Database**: Supabase provides the PostgreSQL database, authentication, and storage.
-   **Blockchain Interaction**: The application communicates directly with the Solana blockchain via an RPC URL for real-time data.

```mermaid
graph TD
    A[User] --> B{Next.js Frontend};
    B --> C[Next.js API Routes];
    C --> D[Supabase (Database & Auth)];
    C --> E[Solana RPC];
```

## Project Structure

```
.
├── app/                  # Next.js app router, pages, and API routes
├── components/           # Shared React components
├── hooks/                # Custom React hooks
├── lib/                  # Core utilities and helper functions
├── public/               # Static assets
├── styles/               # Global styles
├── supabase/             # Supabase migrations and configuration
├── tests/                # Jest and Cypress test suites
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- pnpm (or npm/yarn)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Ndifreke000/Sollytics-dz.git
    cd Sollytics-dz
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file by copying `.env.example` and fill in the required values for Supabase and Solana RPC.
    ```bash
    cp .env.example .env.local
    ```

4.  **Run the development server:**
    ```bash
    pnpm dev
    ```
    The application will be available at `http://localhost:3000`.

## Available Scripts

- `pnpm dev`: Starts the development server.
- `pnpm build`: Creates a production build.
- `pnpm start`: Starts the production server.
- `pnpm test`: Runs unit tests with Jest.
- `pnpm cypress:open`: Opens the Cypress test runner.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.