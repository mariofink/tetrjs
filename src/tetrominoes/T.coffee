class T extends Tetromino
  constructor: ->
    @colour = "#E97F02"
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

