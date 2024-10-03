import { describe, expect, test } from "vitest";
import api from "./api";

describe("Example", () => {
  test("GET /hello", async () => {
    const res = await api.request("/hello/Sam");
    expect(res.status).toBe(200);
    const body = (await res.json()) as { message: string };
    expect(body).toHaveProperty("message");
    expect(body.message).toContain("Hello Sam!");
  });
});
