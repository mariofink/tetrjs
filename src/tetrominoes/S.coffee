class S extends Tetromino
  constructor: ->
    @colour = "#bada55"
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

