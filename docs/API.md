# API Documentation

## Authentication

All API requests require authentication via JWT token:

```bash
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Query Execution
```
POST /api/queries/execute
Content-Type: application/json

{
  "query": "SELECT * FROM transactions LIMIT 10",
  "format": "json"
}
```

### Dashboard Management
```
GET /api/dashboards
POST /api/dashboards
PUT /api/dashboards/:id
DELETE /api/dashboards/:id
```

### Analytics Cache
```
GET /api/cache/:key
POST /api/cache/:key
```

## Rate Limits

- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

## Response Format

```json
{
  "success": true,
  "data": {},
  "error": null,
  "timestamp": "2024-01-01T00:00:00Z"
}
```