class T extends Tetromino
  constructor: ->
    @colour = "#55adab"
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

