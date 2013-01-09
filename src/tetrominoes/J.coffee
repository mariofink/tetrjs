class J extends Tetromino
  constructor: ->
    @colour = "#9922DD"
    @currentState = 0
    @states = [
      """
      .#..
      .#..
      ##..
      ....
      """,
      """
      ....
      ###.
      ..#.
      ....
      """,
      """
      .##.
      .#..
      .#..
      ....
      """,
      """
      #...
      ###.
      ....
      ....
      """
    ]    
    super

