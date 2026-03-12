# Production-Ready ToDo App with CI/CD Implementation Plan

This project aims to demonstrate a full-stack application with a production-grade CI/CD pipeline.

## Proposed Changes

### Project Structure [NEW]
- `backend/`: ASP.NET Core (.NET 8) Web API
- `frontend/`: React + Vite + Axios
- `docker/`: Custom Dockerfiles and Nginx configs for production
- `nginx/`: Nginx proxy configuration
- `docker-compose.yml`: Orchestration for local development and production stacking
- `.github/workflows/`: CI/CD automation with GitHub Actions

---

### Backend Components [NEW]
- **Technology**: .NET 8, Entity Framework Core, PostgreSQL
- **Key Modules**:
    - `Models/TaskItem.cs`: Task entity
    - `Data/AppDbContext.cs`: EF Core context
    - `Controllers/TasksController.cs`: RESTful API endpoints
    - `Services/AuthService.cs`: Simple JWT implementation
- **Configuration**: `appsettings.json` for development and Environment Variables for production.

---

### Frontend Components [NEW]
- **Technology**: React (Vite), Axios, CSS modules
- **Key Files**:
    - `src/services/api.js`: Axios instance and API calls
    - `src/pages/Login.jsx`: User authentication UI
    - `src/pages/Tasks.jsx`: Task list and CRUD operations
- **Configuration**: `.env` for API base URL management.

---

### Infrastructure & DevOps [NEW]
- **Docker**: Multistage builds for both Frontend and Backend
- **Nginx**: Serving static React files and proxying API requests
- **CI/CD**:
    - Build and Run Unit tests (if any)
    - Build Docker images
    - Push to Container Registry
    - (Future) SSH deployment logic

## Verification Plan

### Automated Tests
- Run `dotnet build` and `npm run build` within the CI pipeline.
- Verify Docker images build successfully.

### Manual Verification
1. Run `docker-compose up` locally to verify full stack integration.
2. Access `localhost` to check Nginx routing between Frontend and API.
3. Verify CRUD operations persist in the PostgreSQL database.
