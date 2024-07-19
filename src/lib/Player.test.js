import Player from "./Player";

describe("Player", () => {
  test("should create a player", () => {
    const player = new Player();
    expect(player).toHaveProperty("gameboard");
  });
});
