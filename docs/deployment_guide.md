# Deployment & DevOps Guide

## Stage 6: Production Server Setup
On your Ubuntu server:

1. **Install Docker & Docker Compose**:
   ```bash
   sudo apt update
   sudo apt install docker.io docker-compose -y
   sudo systemctl enable --now docker
   ```

2. **Login to Registry**:
   ```bash
   echo $GITHUB_TOKEN | docker login ghcr.io -u YOUR_GITHUB_USERNAME --password-stdin
   ```

3. **Deploy**:
   ```bash
   docker-compose pull
   docker-compose up -d
   ```

## Stage 8: Deployment Flow
`Developer Commit` → `GitHub Push` → `GitHub Actions` (Builds & Tests) → `Build Docker Images` → `Push to GHCR` → `Server Pull` → `docker-compose up -d` → `Nginx Proxy` → `User`

## Stage 9: DevOps Best Practices

### Environment Variables & Secrets
- **GitHub Secrets**: Store `DOCKER_PASSWORD`, `SSH_PRIVATE_KEY`, and `DB_PASSWORD` in GitHub Repository Secrets.
- **Docker Compose**: Use `${VARIABLE_NAME}` in `docker-compose.yml` and provide an `.env` file on the server.

### Zero Downtime Deployment
- Use **Docker Swarm** or **Kubernetes** for rolling updates.
- For simple setups, use two identical Nginx configurations and switch the `upstream` target after the new container is healthy (Blue/Green deployment shadow).

### Rollback Strategy
- Tag Docker images with the commit SHA instead of just `latest`.
- To rollback: `docker-compose stop api && docker-compose run -d api:prev-sha`.

### Logging & Monitoring
- **Logging**: Use `docker logs -f [container_id]` or ELK Stack (Elasticsearch, Logstash, Kibana) for production.
- **Monitoring**: Use **Prometheus** and **Grafana** to monitor container resource usage.
