class J extends Tetromino
  constructor: ->
    @colour = "#075B70"
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

