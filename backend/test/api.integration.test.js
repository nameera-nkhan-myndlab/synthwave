const ROUTES = [
  {
    "method": "GET",
    "path": "/api/health",
    "request_path": "/api/health",
    "auth_required": false,
    "success_status": 200,
    "sample_body": null,
    "response_keys": [
      "status"
    ],
    "expects_json": true
  },
  {
    "method": "GET",
    "path": "/api/projects",
    "request_path": "/api/projects",
    "auth_required": false,
    "success_status": 200,
    "sample_body": null,
    "response_keys": [],
    "expects_json": true
  },
  {
    "method": "GET",
    "path": "/api/projects/:id",
    "request_path": "/api/projects/1",
    "auth_required": false,
    "success_status": 200,
    "sample_body": null,
    "response_keys": [
      "description",
      "featured",
      "id",
      "imageUrl",
      "liveUrl",
      "projectSkills",
      "repoUrl",
      "sortOrder",
      "title"
    ],
    "expects_json": true
  },
  {
    "method": "POST",
    "path": "/api/projects",
    "request_path": "/api/projects",
    "auth_required": false,
    "success_status": 201,
    "sample_body": null,
    "response_keys": [
      "description",
      "featured",
      "id",
      "sortOrder",
      "title"
    ],
    "expects_json": true
  },
  {
    "method": "PUT",
    "path": "/api/projects/:id",
    "request_path": "/api/projects/1",
    "auth_required": false,
    "success_status": 200,
    "sample_body": null,
    "response_keys": [
      "description",
      "featured",
      "id",
      "sortOrder",
      "title"
    ],
    "expects_json": true
  },
  {
    "method": "DELETE",
    "path": "/api/projects/:id",
    "request_path": "/api/projects/1",
    "auth_required": false,
    "success_status": 204,
    "sample_body": null,
    "response_keys": [],
    "expects_json": false
  },
  {
    "method": "GET",
    "path": "/api/skills",
    "request_path": "/api/skills",
    "auth_required": false,
    "success_status": 200,
    "sample_body": null,
    "response_keys": [],
    "expects_json": true
  },
  {
    "method": "POST",
    "path": "/api/skills",
    "request_path": "/api/skills",
    "auth_required": false,
    "success_status": 201,
    "sample_body": null,
    "response_keys": [
      "category",
      "id",
      "name",
      "proficiency"
    ],
    "expects_json": true
  },
  {
    "method": "DELETE",
    "path": "/api/skills/:id",
    "request_path": "/api/skills/1",
    "auth_required": false,
    "success_status": 204,
    "sample_body": null,
    "response_keys": [],
    "expects_json": false
  },
  {
    "method": "POST",
    "path": "/api/contact",
    "request_path": "/api/contact",
    "auth_required": false,
    "success_status": 201,
    "sample_body": null,
    "response_keys": [
      "createdAt",
      "email",
      "id",
      "message",
      "name"
    ],
    "expects_json": true
  },
  {
    "method": "GET",
    "path": "/api/contact",
    "request_path": "/api/contact",
    "auth_required": false,
    "success_status": 200,
    "sample_body": null,
    "response_keys": [],
    "expects_json": true
  },
  {
    "method": "POST",
    "path": "/api/chat",
    "request_path": "/api/chat",
    "auth_required": false,
    "success_status": 201,
    "sample_body": null,
    "response_keys": [
      "reply"
    ],
    "expects_json": true
  }
];
const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3001";

function authHeaders(route) {
  if (!route.auth_required) return {};
  const token = process.env.TEST_AUTH_TOKEN || "test-token";
  return { Authorization: `Bearer ${token}` };
}

describe("API integration contracts", () => {
  for (const route of ROUTES) {
    it(`${route.method} ${route.path} should return ${route.success_status}`, async () => {
      const hasBody = route.sample_body && typeof route.sample_body === "object" && !Array.isArray(route.sample_body);
            const requestPath = route.request_path || route.path;
            const response = await fetch(`${BASE_URL}${requestPath}`, {
        method: route.method,
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(route),
        },
        body: hasBody ? JSON.stringify(route.sample_body) : undefined,
      });

      expect(response.status).toBe(route.success_status);

      if (route.expects_json) {
        const body = await response.json();
        if (Array.isArray(route.response_keys) && route.response_keys.length && body && !Array.isArray(body)) {
          for (const key of route.response_keys) {
            expect(body).toHaveProperty(key);
          }
        }
      }
    });
  }
});
