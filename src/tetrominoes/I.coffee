class I extends Tetromino
  constructor: ->
    @colour = "#AAEE22"
    @currentState = 0
    @states = [
      """
      .#..
      .#..
      .#..
      .#..
      """,
      """
      ....
      ####
      ....
      ....
      """
    ]
    super

