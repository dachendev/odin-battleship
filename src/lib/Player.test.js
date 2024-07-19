import Player from "./Player.js";

describe("Player", () => {
  test("should create a player", () => {
    const player = new Player();
    expect(player).toHaveProperty("gameboard");
  });
});
