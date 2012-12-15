class Tetromino
  x: 0
  y: 0
  currentState: 0
  states: []
  lastChange: utils.now()
  lastMove: utils.now()
  blocks: []
  asciiMap: null
  
  constructor: (@x, @y) -> # set x and y automatically
    if @states.length > 0
      @asciiMap = (row.split "" for row in @states[@currentState].split "\n")
  
  nextState: ->
    return if utils.now() - @lastChange < 200 # only change every x ms
    @currentState++
    @currentState = 0 if @currentState > @states.length - 1
    @lastChange = utils.now()
    @currentState
  
  prevState: ->
    return if utils.now() - @lastChange < 200 # only change every x ms
    @currentState--
    @currentState = @states.length - 1 if @currentState < 0
    @lastChange = utils.now()
    @currentState
  
  update: ->
    @nextState() if keys.up
    #@prevState() if keys.down
    _x = @x
    _y = @y
    if (keys.left or keys.right or keys.down) and utils.now() - @lastMove > 200
      @lastMove = utils.now()
      if keys.left
        _x -= 1
      if keys.right
        _x += 1
      if keys.down
        _y += 1
    moveAllowed = true
    @map = for row, y in @asciiMap
      for col, x in row
        switch col
          when "#"
            newX = x + _x
            newY = y + _y
            moveAllowed = false if newX >= 10 or newX < 0 or newY >= 18
    if moveAllowed
      @x = _x
      @y = _y
  
  render: (gfx) ->
    # Loop over map and create the blocks
    @map = for row, y in @asciiMap
      for col, x in row
        switch col
          when "#"
            gfx.drawBlock( (gfx.tileSize * x) + (@x * gfx.tileSize), (gfx.tileSize * y) + (@y * gfx.tileSize))
          # draw a block for every # and add the x and y position of the tetromino