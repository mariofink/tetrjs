class Z extends Tetromino
  constructor: ->
    @colour = "#0D9690"
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

