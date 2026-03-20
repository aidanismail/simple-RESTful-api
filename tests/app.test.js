const request = require("supertest");
const app = require("../app");

describe("Pengujian API Album Musik", () => {
  it("GET /api/albums harus merespons dengan status 200 dan format array", async () => {
    const response = await request(app).get("/api/albums");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  it("POST /api/albums harus bisa menambah data dan merespons status 201", async () => {
    const newAlbum = {
      title: "Rumours",
      artist: "Fleetwood Mac",
      release_date: "1977"
    };
    const response = await request(app).post("/api/albums").send(newAlbum);
    expect(response.statusCode).toBe(201);
    expect(response.body.data.title).toBe("Rumours");
  });
});
