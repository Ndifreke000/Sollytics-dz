# 🚀 Sollytics-dz: Next-Gen Solana Analytics Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.x-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Network-purple?style=for-the-badge&logo=solana)](https://solana.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)](https://supabase.com/)
[![Tests](https://img.shields.io/badge/Tests-Jest%20%7C%20Cypress-red?style=for-the-badge&logo=jest)](https://jestjs.io/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/ndifreke000s-projects/v0-solana-query-tool)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/HxtcWeDSZVV)

> 📊 Professional-grade analytics and visualization platform for the Solana blockchain, featuring AI-powered insights and real-time data analysis.

![Sollytics Dashboard Preview](public/dashboard-preview.png)

## ✨ Features

### 🎯 Core Capabilities
- **Real-time Analytics Dashboard**
  - Live transaction monitoring
  - Network health metrics
  - Validator statistics
  - Stablecoin analytics

- **Advanced Query System**
  - 🤖 AI-assisted query building
  - 📝 Visual query constructor
  - 💾 Query templates and sharing
  - 🔄 Real-time data updates

- **Visualization Suite**
  - 📈 Interactive charts and graphs
  - 🎨 Customizable dashboards
  - 📊 Data export capabilities
  - 🖼️ Presentation-ready visuals

### 🛠️ Technical Features
- **Modern Tech Stack**
  - Next.js 14 with App Router
  - TypeScript for type safety
  - Radix UI components
  - Supabase backend

- **Developer Experience**
  - 🧪 Comprehensive test suite (Jest + Cypress)
  - 📝 Well-documented codebase
  - 🔧 Easy local development
  - ⚡ Fast build times

## 🚀 Getting Started

### Prerequisites
- Node.js 20.x or later
- pnpm (recommended) or npm
- Solana CLI tools (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ndifreke000/Sollytics-dz.git
   cd Sollytics-dz
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configurations
   ```

4. **Run development server**
   ```bash
   pnpm dev
   # or run with full stack
   pnpm dev:full
   ```

Visit `http://localhost:3000` to see your instance running! 🎉

## 📖 Documentation

Detailed documentation is available in the `/docs` directory:
- [API Reference](docs/API.md)
- [Dashboard Guide](docs/DASHBOARD_GUIDE.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## 🧪 Testing

We maintain high code quality through comprehensive testing:

```bash
# Run unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run E2E tests with Cypress
pnpm cypress:run
```

## 🔐 Security

Security is our top priority. The platform includes:
- 🔒 End-to-end encryption
- 🔑 Secure authentication
- 🛡️ Rate limiting
- 📝 Audit logging

## 🌟 Key Components

- **AI Assistant**: Intelligent query suggestions and data interpretation
- **Visual Query Builder**: No-code query construction interface
- **Real-time Analytics**: Live network monitoring and metrics
- **Contract Monitoring**: Smart contract activity tracking
- **Marketplace**: Community-driven dashboard templates and queries

## 🤝 Contributing

We love contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:
- Code of Conduct
- Development process
- Pull request procedure
- Coding standards

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Solana Foundation for blockchain infrastructure
- Our amazing community of contributors
- All the open-source projects that make this possible

---

<div align="center">

**[Website](https://sollytics-dz.com)** | **[Documentation](https://docs.sollytics-dz.com)** | **[Community](https://discord.gg/sollytics)**

Built with ❤️ by the Sollytics Team

</div>

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/ndifreke000s-projects/v0-solana-query-tool](https://vercel.com/ndifreke000s-projects/v0-solana-query-tool)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/HxtcWeDSZVV](https://v0.app/chat/projects/HxtcWeDSZVV)**

## ✅ Features Checklist

### 🎨 Frontend Features (Completed)
- ✅ **Real-time WebSocket connections** - Live data updates every 5 seconds
- ✅ **Enhanced dashboard drag-and-drop** - Widget reordering with visual feedback
- ✅ **Advanced data visualization** - Interactive charts with zoom, filter, export
- ✅ **Comprehensive error boundaries** - Graceful error handling with retry options
- ✅ **Mobile responsiveness** - Hamburger menu, sticky navigation, responsive grids, adaptive chart heights
- ✅ **Dashboard sharing** - Public/private sharing with collaborator management
- ✅ **Data export functionality** - CSV, JSON, PDF, PNG export options
- ✅ **Advanced query builder** - SQL syntax highlighting with autocomplete
- ✅ **Keyboard shortcuts** - Power user shortcuts (Ctrl+S, Ctrl+Enter, F1)
- ✅ **Template marketplace** - Dashboard templates with search and categories
- ✅ **Loading states** - Skeleton loaders and progress indicators
- ✅ **Live transaction throughput** - Real-time TPS visualization
- ✅ **Top program activity** - Most active programs with progress bars
- ✅ **AI data interpretation** - GPT-powered blockchain analysis

### 🔧 Backend Features (Completed)
- ✅ **Real Solana RPC integration** - Rate limiting, timeouts, error handling
- ✅ **JWT authentication system** - Access/refresh tokens with bcrypt hashing
- ✅ **Supabase database** - User management, dashboard persistence, caching
- ✅ **API rate limiting** - 100 requests/minute with IP tracking
- ✅ **Real-time data indexing** - Caching layer with TTL for performance
- ✅ **Query engine with AI** - Enhanced with AI insights and optimization
- ✅ **WebSocket server** - Real-time updates for slots, TPS, AI analysis
- ✅ **AI model integration** - GPT-OSS-120B for blockchain data interpretation
- ✅ **Data backup system** - Automated caching and synchronization
- ✅ **Security middleware** - Request validation and error handling

### 🤖 AI Integration Points (Completed)
- ✅ **Real-time network analysis** - AI interprets data every 3 minutes
- ✅ **Query result insights** - AI analyzes patterns and suggests optimizations
- ✅ **Risk assessment** - Low/medium/high risk evaluation with confidence scores
- ✅ **Performance recommendations** - AI-powered optimization suggestions
- ✅ **Data pattern recognition** - Blockchain trend analysis and insights

### 📊 Live Analytics Dashboard (Completed)
- ✅ **Network metrics** - Current slot, epoch, transaction count, health status
- ✅ **Performance charts** - TPS over time with interactive visualization
- ✅ **Supply distribution** - Circulating vs non-circulating SOL with pie charts
- ✅ **Validator statistics** - Active validators, stake distribution, performance
- ✅ **Block production rate** - Real-time block production visualization
- ✅ **Network health monitoring** - Comprehensive network status dashboard

### 🔍 Query System (Completed)
- ✅ **SQL-like query interface** - Advanced query builder with syntax highlighting
- ✅ **Query templates** - Pre-built queries for common blockchain analysis
- ✅ **Query history** - Saved queries with execution tracking
- ✅ **Result visualization** - Table and chart views for query results
- ✅ **AI query insights** - Performance analysis and optimization suggestions
- ✅ **Export capabilities** - Multiple format export for query results

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## 🏆 Development Status - All Core Features Complete!

Sollytics-dz has successfully implemented all planned core features across frontend, backend, and AI integration. The platform now provides a comprehensive Solana analytics experience with professional-grade visualizations, real-time data processing, and intelligent insights.

## Development Priorities

### 🎨 Frontend Improvements

**Completed ✅:**
- Real-time WebSocket connections for live data updates
- Enhanced dashboard drag-and-drop widget editing with deletion
- Advanced data visualization components (interactive charts, filters, color palettes)
- Comprehensive error boundaries and loading states
- Mobile responsiveness optimization (adaptive layouts, responsive charts)
- Dashboard sharing and collaboration features
- Data export functionality (PDF/CSV/JSON/PNG)
- Advanced query builder UI with syntax highlighting and AI assistance
- Keyboard shortcuts for power users (Ctrl+S, Ctrl+Enter, F1)
- Dashboard templates marketplace with search and categories
- Custom widget creation interface with multiple visualization types

**Future Enhancements:**
- Notification system for alerts and updates
- Dark/light theme improvements
- Advanced dashboard collaboration features
- Real-time collaborative editing

### 🔧 Backend Improvements

**Completed ✅:**
- Real Solana RPC integration with proper error handling
- JWT-based authentication system with refresh tokens
- Supabase database implementation with user management
- API rate limiting and security middleware
- Real-time data indexing and caching layer
- Query engine with actual blockchain data processing
- Dashboard persistence and sharing APIs
- WebSocket server for real-time updates
- Data backup and synchronization services
- AI model integration (GPT-OSS-120B) for data analysis

**Future Enhancements:**
- User management and subscription system
- API documentation with OpenAPI/Swagger
- Error tracking and monitoring (Sentry/DataDog)
- Performance analytics and optimization
- Automated testing suite (unit/integration)
- CI/CD pipeline improvements

### ⛓️ Smart Contract Integration (Next Phase)

**Planned Features:**
- Wallet connection integration (Phantom, Solflare, etc.)
- Transaction parsing and analysis tools
- Token metadata and price feed integration
- NFT collection analytics
- DeFi protocol integration (DEX data, lending protocols)
- Custom program/contract monitoring
- Governance proposal tracking
- Staking rewards calculator
- Cross-chain bridge monitoring
- MEV (Maximum Extractable Value) analysis
- Validator performance prediction models
- Custom smart contract deployment tools

## 📊 Platform Highlights

### 🎨 Advanced Visualization Features
- **Professional Color Palettes**: 6 curated color schemes (Default, Ocean, Sunset, Forest, Fire, Purple)
- **Multiple Chart Types**: Bar, line, pie charts, and counter displays with full customization
- **Responsive Design**: Adaptive layouts and chart heights for optimal mobile experience
- **Interactive Elements**: Zoom, filter, export capabilities across all visualizations

### 🤖 AI-Powered Analytics
- **Real-time Analysis**: AI interprets network data every 3 minutes for main dashboard
- **Live Transaction Insights**: 1-minute refresh cycle for transaction analysis
- **Risk Assessment**: Automated low/medium/high risk evaluation with confidence scores
- **Query Optimization**: AI-powered query suggestions and performance recommendations

### 🛠️ Professional Dashboard Builder
- **Dune Analytics Workflow**: Save queries with visualizations → select for dashboard creation
- **Drag-and-Drop Interface**: Grid-based widget placement with visual feedback
- **Widget Management**: Full CRUD operations including hover-activated deletion
- **Sharing & Export**: Public/private sharing with PDF, PNG, CSV export options

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start backend services (WebSocket + Database)
npm run server

# Start both frontend and backend
npm run dev:full
```

## 🔧 Environment Setup

Copy `.env.example` to `.env.local` and configure:

```bash
VITE_SUPABASE_PROJECT_ID=yxpbcuoyahjdharayzgs
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cGJjdW95YWhqZGhhcmF5emdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5Njc2NzIsImV4cCI6MjA3MTU0MzY3Mn0.sH4CrEtGEnfO1ns9k6Ppt24kRG398HHznVgkX9EGlQs
VITE_SUPABASE_URL=https://yxpbcuoyahjdharayzgs.supabase.co
SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
WS_PORT=8080
```

## 🗺️ Next Steps Roadmap

### 🧪 Phase 1: Comprehensive Testing & Security
- ✅ **End-to-end Testing**: Cypress test suite for critical user flows
- ✅ **Backend Testing**: Jest/Supertest for API endpoints and WebSocket server
- **Load Testing**: WebSocket server performance under high concurrent connections
- **Security Audits**: Snyk/SonarQube scans for vulnerabilities and code quality
- **Performance Monitoring**: Real-time error tracking and performance metrics

### 👥 Phase 2: User Onboarding & Feedback
- ✅ **Onboarding Wizard**: Step-by-step guide for new users (dashboard creation, query building)
- **Feedback Collection**: In-app feedback system with PostHog/Mixpanel integration
- **Closed Beta**: Launch with Solana community for real-world testing and feedback
- **User Analytics**: Track feature usage and identify improvement opportunities

### 📚 Phase 3: Documentation & Internal Tools
- ✅ **Comprehensive Guides**: Expand README with tutorials (dashboard creation, query optimization)
- ✅ **Admin Dashboard**: Monitor user activity, RPC errors, WebSocket load, and system health
- ✅ **API Documentation**: OpenAPI/Swagger specs for all endpoints
- **Developer Resources**: SDK examples and integration guides

### 💰 Phase 4: Stablecoin Analytics (Solana-first)
- ✅ **USDC/USDT Dashboards**: Supply tracking, inflows/outflows, mint/burn events
- ✅ **AI Stablecoin Insights**: Risk assessment and trend analysis for stablecoin markets
- ✅ **SPL Token Integration**: Direct Solana RPC integration for token program data
- **Market Analysis**: Cross-exchange stablecoin flow tracking and arbitrage detection

### 🔌 Phase 5: API & External Access
- ✅ **REST API Endpoints**: `/api/queries/execute`, `/api/metrics/stablecoins`, `/api/dashboards`
- ✅ **API Key Management**: JWT-based authentication with rate limiting and usage analytics
- ✅ **Webhook Alerts**: Real-time notifications (TPS drops, high stablecoin redemptions, network issues)
- **Third-party Integrations**: Slack, Discord, Telegram bot notifications

### 📊 Phase 6: Spreadsheet Integration
- ✅ **Google Sheets Plugin**: Live Solana metrics directly in spreadsheets
- ✅ **Excel Add-in**: Native Microsoft Excel integration for blockchain data
- ✅ **Pre-built Templates**: Ready-to-use templates for network monitoring and analysis
- **Automated Reports**: Scheduled data exports and email reports

### 🌐 Phase 7: Multi-Chain Expansion
- ✅ **Blockchain Abstraction**: Generalized blockchain adapters (`blockchain/` module)
- ✅ **Ethereum Support**: ethers.js + Alchemy API integration
- ✅ **Cross-chain Dashboards**: Comparative analytics (Solana TPS vs Ethereum gas fees)
- ✅ **Universal Query Engine**: Chain-agnostic SQL-like queries across multiple blockchains

### 🎨 Phase 8: Advanced No-Code Features
- ✅ **Visual Query Builder**: Drag-and-drop interface for non-technical users
- ✅ **Community Marketplace**: User-generated dashboard templates and queries
- **Advanced Widgets**: Custom visualization types and interactive components
- **Collaboration Tools**: Real-time dashboard editing and team workspaces

---

*Each phase builds upon the previous one, ensuring a stable foundation while continuously expanding capabilities and user value.*