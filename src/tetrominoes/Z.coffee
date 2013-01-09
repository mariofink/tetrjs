class Z extends Tetromino
  constructor: ->
    @currentState = 0
    @states = [
      """
      ..#.
      .##.
      .#..
      ....
      """,
      """
      ##..
      .##.
      ....
      ....
      """
    ]
    super

