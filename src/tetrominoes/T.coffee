class T extends Tetromino
  constructor: ->
    @currentState = 0
    @states = [
      """
      .#..
      ###.
      ....
      ....
      """,
      """
      .#..
      ##..
      .#..
      ....
      """,
      """
      ....
      ###.
      .#..
      ....
      """,
      """
      .#..
      .##.
      .#..
      ....
      """
    ]
    super

