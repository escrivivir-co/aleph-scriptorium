import { describe, it, expect } from "bun:test";

describe("Hola Mundo", () => {
  it("debería pasar este test básico", () => {
    expect("hola mundo").toBe("hola mundo");
  });
});
