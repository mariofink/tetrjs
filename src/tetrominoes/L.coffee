class L extends Tetromino
  constructor: ->
    @colour = "#22AAFF"
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

