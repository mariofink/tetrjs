class S extends Tetromino
  constructor: ->
    @colour = "#490A3D"
    @currentState = 0
    @states = [
      """
      .#..
      .##.
      ..#.
      ....
      """,
      """
      .##.
      ##..
      ....
      ....
      """
    ]
    super

