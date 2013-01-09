class O extends Tetromino
  constructor: ->
    @colour = "#DD22EE"
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

