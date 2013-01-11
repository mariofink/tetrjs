class I extends Tetromino
  constructor: ->
    @colour = "#F8CA00"
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

