# Supabase Database Setup

## Schema Migration

To set up the database schema in your Supabase project:

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/yxpbcuoyahjdharayzgs
2. Navigate to the SQL Editor
3. Run the contents of `schema.sql` to create all tables, indexes, and RLS policies

## Tables Created

- **users**: User profiles and preferences
- **dashboards**: User dashboards with widgets
- **saved_queries**: Saved SQL queries with visualizations
- **analytics_cache**: Cached analytics data with TTL

## Security

Row Level Security (RLS) is enabled on all tables with appropriate policies:
- Users can only access their own data
- Public dashboards are readable by everyone
- Analytics cache is publicly readable for performance

## Environment Variables

Make sure these are set in your `.env.local`:

```
VITE_SUPABASE_PROJECT_ID="yxpbcuoyahjdharayzgs"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cGJjdW95YWhqZGhhcmF5emdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU5Njc2NzIsImV4cCI6MjA3MTU0MzY3Mn0.sH4CrEtGEnfO1ns9k6Ppt24kRG398HHznVgkX9EGlQs"
VITE_SUPABASE_URL="https://yxpbcuoyahjdharayzgs.supabase.co"
```