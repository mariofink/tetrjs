class Tetromino
  x: 0
  y: 0
  currentState: 0
  states: []
  lastChange: utils.now()
  lastMove: utils.now()
  asciiMap: null
  blocks: []
  
  constructor: (@x, @y, @game) -> # set x and y automatically
    #@colour = utils.getRandomColour()
    # Parse state string into a map
    @updateBlocks()
  
  updateBlocks: ->
    # clear blocks in the level array
    for block in @blocks
      @game.levelArray[block.y][block.x] = null
    @blocks = []
    @asciiMap = (row.split "" for row in @states[@currentState].split "\n")
    # Loop over map and create the blocks
    @map = for row, _y in @asciiMap
      for col, _x in row
        switch col
          when "#"
            block = 
              x: _x + @x,
              y: _y + @y,
              col: @colour
            @game.levelArray[block.y][block.x] = block
            @blocks.push block

  rotate: ->
    return if utils.now() - @lastChange < 200 # only change every x ms
    nextState = @currentState + 1;
    nextState = 0 if nextState > @states.length - 1
    tempMap = (row.split "" for row in @states[nextState].split "\n")
    allowed = true
    # Loop over map and check if a rotation is possible
    _map = for row, _y in tempMap
      for col, _x in row
        switch col
          when "#"
            x = _x + @x
            y = _y + @y
            if x > @game.levelArray[0].length - 1 or x < 0
              allowed = false
            if (@game.levelArray[y][x] && @game.levelArray[y][x].blocked)
              allowed = false
    if allowed
      @currentState = nextState
      @lastChange = utils.now()
      @updateBlocks()
                
  move: (x, y) -> 
    lockPiece = false
    # check if all blocks can be moved
    for block in @blocks
      movetoY = block.y + y
      movetoX = block.x + x
      if (movetoX) == @game.levelArray[0].length or (movetoX) < 0
        # moving left or right and hitting the boundaries of the playground
        return
      if (@game.levelArray[block.y][movetoX] && @game.levelArray[block.y][movetoX].blocked)
        # moving left or right and hitting a block
        return
      if (movetoY) == @game.levelArray.length 
        # moving down and hitting the bottom of the playground
        lockPiece = true
        continue
      if (@game.levelArray[movetoY][block.x] && @game.levelArray[movetoY][block.x].blocked)
        # moving down and hitting a block
        lockPiece = true
        continue
    if lockPiece
      @game.nextTetromino(@)
      return
    @x += x
    @y += y
    @updateBlocks()
  
  update: ->
    # only update if interaction took place
    if not (keys.right or keys.left or keys.down or keys.up) then return
    _x = _y = 0
    if keys.up
      @rotate()
    if (keys.left or keys.right or keys.down) and utils.now() - @lastMove > 100
      @lastMove = utils.now()
      if keys.left
        _x -= 1
      if keys.right
        _x += 1
      if keys.down
        _y += 1
      @move _x, _y
  
  render: (gfx) ->
    for block in @blocks
      gfx.drawBlock (gfx.tileSize * block.x), (gfx.tileSize * block.y), @colour
      
      