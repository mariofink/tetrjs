class O extends Tetromino
  constructor: ->
    @colour = "#8A9B0F"
    @currentState = 0
    @states = [
      """
      ##..
      ##..
      ....
      ....
      """
    ]
    super

