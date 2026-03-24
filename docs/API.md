# API Documentation

## Base URL

```
http://localhost:3001/api
```

## Endpoints

### Health Check

#### GET `/health`

Check API health status.

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00Z",
    "uptime": 1234.56
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Boards

#### GET `/boards`

Get all boards with pagination.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 20) - Items per page

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "My Project",
      "description": "A great project",
      "userId": "user-123",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 42,
    "pages": 3
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### GET `/boards/:id`

Get a specific board.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My Project",
    "description": "A great project",
    "userId": "user-123",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### POST `/boards`

Create a new board.

**Request Body:**
```json
{
  "name": "My Project",
  "description": "A great project",
  "userId": "user-123"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "My Project",
    "description": "A great project",
    "userId": "user-123",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### PUT `/boards/:id`

Update a board.

**Request Body:**
```json
{
  "name": "Updated Project",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "Updated Project",
    "description": "Updated description",
    "userId": "user-123",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### DELETE `/boards/:id`

Delete a board.

**Response:**
```json
{
  "success": true,
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### Tasks

#### GET `/tasks`

Get all tasks with optional filtering.

**Query Parameters:**
- `page` (number, default: 1) - Page number
- `limit` (number, default: 20) - Items per page
- `boardId` (string, optional) - Filter by board ID
- `status` (string, optional) - Filter by status (TODO, IN_PROGRESS, DONE)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440001",
      "title": "Implement feature",
      "description": "Description of the task",
      "status": "TODO",
      "boardId": "550e8400-e29b-41d4-a716-446655440000",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### GET `/tasks/:id`

Get a specific task.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Implement feature",
    "description": "Description of the task",
    "status": "TODO",
    "boardId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### POST `/tasks`

Create a new task.

**Request Body:**
```json
{
  "title": "Implement feature",
  "description": "Description of the task",
  "status": "TODO",
  "boardId": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response:** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Implement feature",
    "description": "Description of the task",
    "status": "TODO",
    "boardId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### PUT `/tasks/:id`

Update a task.

**Request Body:**
```json
{
  "status": "IN_PROGRESS",
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Implement feature",
    "description": "Updated description",
    "status": "IN_PROGRESS",
    "boardId": "550e8400-e29b-41d4-a716-446655440000",
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### DELETE `/tasks/:id`

Delete a task.

**Response:**
```json
{
  "success": true,
  "data": null,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Error Handling

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Common Response Headers

```
Content-Type: application/json
Access-Control-Allow-Origin: *
```

## Rate Limiting

Currently not implemented. Will be added in future versions.

## Authentication

Authentication will be implemented in future versions using JWT tokens.
