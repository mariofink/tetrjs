class L extends Tetromino
  constructor: ->
    @colour = "#BD1550"
    @currentState = 0
    @states = [
      """
      .#..
      .#..
      .##.
      ....
      """,
      """
      ..#.
      ###.
      ....
      ....
      """,
      """
      ##..
      .#..
      .#..
      ....
      """,
      """
      ....
      ###.
      #...
      ....
      """
    ]
    super

