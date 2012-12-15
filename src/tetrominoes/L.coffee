class L extends Tetromino
  constructor: (@x, @y) ->
    @currentState = 0
    @states = [
      """
      #...
      #...
      ##..
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
      ###.
      #...
      ....
      ....
      """
    ]
    super

