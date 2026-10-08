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

describe("API unit contracts", () => {
  describe("missing required field → 400/422", () => {
    for (const route of ROUTES) {
      const body = route.sample_body;
      if (!body || typeof body !== "object" || Array.isArray(body) || Object.keys(body).length < 2) continue;
      for (const omitKey of Object.keys(body)) {
        it(`${route.method} ${route.path} missing '${omitKey}' → 400/422`, async () => {
          const partial = Object.fromEntries(Object.entries(body).filter(([k]) => k !== omitKey));
          const requestPath = route.request_path || route.path;
          const response = await fetch(`${BASE_URL}${requestPath}`, {
            method: route.method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(partial),
          });
          expect([400, 422]).toContain(response.status);
        });
      }
    }
  });

  describe("auth rejection → 401", () => {
    for (const route of ROUTES) {
      if (!route.auth_required) continue;
      it(`${route.method} ${route.path} without token → 401`, async () => {
        const requestPath = route.request_path || route.path;
        const response = await fetch(`${BASE_URL}${requestPath}`, { method: route.method });
        expect(response.status).toBe(401);
      });
    }
  });

  describe("wrong method → 405", () => {
    for (const route of ROUTES) {
      const wrong = route.method === "GET" ? "POST" : "GET";
      it(`wrong method ${wrong} on ${route.path} → 405`, async () => {
        const requestPath = route.request_path || route.path;
        const response = await fetch(`${BASE_URL}${requestPath}`, { method: wrong });
        expect(response.status).toBe(405);
      });
    }
  });
});
