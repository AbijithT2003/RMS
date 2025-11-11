#!/bin/bash

echo "=== SWAGGER API DATA FETCH DIAGNOSIS ==="
echo ""
echo "Testing endpoints..."
echo ""

# Check if server is running
echo "1. Checking if server is accessible on port 8080..."
if curl -s http://localhost:8080/swagger-ui.html > /dev/null; then
    echo "✓ Server is running"
else
    echo "✗ Server is NOT running on port 8080"
    echo "  Start server with: mvn spring-boot:run"
    exit 1
fi

echo ""
echo "2. Testing API endpoints..."
echo ""

# Test Swagger UI HTML
echo "📄 Swagger UI HTML:"
curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:8080/swagger-ui.html

# Test API docs JSON
echo "📋 API Docs (JSON):"
curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:8080/v3/api-docs

# Test API docs YAML
echo "📋 API Docs (YAML):"
curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:8080/v3/api-docs.yaml

echo ""
echo "3. Testing Job endpoints..."
echo ""

# Test Job endpoints
echo "GET /api/jobs (list jobs):"
curl -s -o /dev/null -w "  Status: %{http_code}\n" http://localhost:8080/api/jobs

echo ""
echo "4. Detailed API docs content (first 50 lines):"
curl -s http://localhost:8080/v3/api-docs | head -50

echo ""
echo "=== END DIAGNOSIS ==="
