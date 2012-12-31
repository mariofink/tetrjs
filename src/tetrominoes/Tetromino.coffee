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
    @colour = utils.getRandomColour()
    # Parse state string into a map
    @updateBlocks()
  
  nextState: ->
    return if utils.now() - @lastChange < 200 # only change every x ms
    @currentState++
    @currentState = 0 if @currentState > @states.length - 1
    @lastChange = utils.now()
    @currentState
  
  updateBlocks: ->
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
            @game.levelArray[block.y][block.x] = "#"
            @blocks.push block
            
  move: (x, y) -> 
    lockPiece = false
    # check if all blocks can be moved
    for block in @blocks
      movetoY = block.y + y
      movetoX = block.x + x
      if (movetoX) == @game.levelArray[0].length or (movetoX) < 0
        # moving left or right and hitting the boundaries of the playground
        return
      if (@game.levelArray[block.y][movetoX] == "X")
        # moving left or right and hitting a block
        return
      if (movetoY) == @game.levelArray.length 
        # moving down and hitting the bottom of the playground
        lockPiece = true
        continue
      if (@game.levelArray[movetoY][block.x] == "X")
        # moving down and hitting a block
        lockPiece = true
        continue
    if lockPiece
      @game.nextTetromino(@)
      return
    for block in @blocks
      @game.levelArray[block.y][block.x] = "."
    @x += x
    @y += y
    @updateBlocks()
  
  update: ->
    # only update if interaction took place
    if not (keys.right or keys.left or keys.down or keys.up) then return
    _x = _y = 0
    if keys.up
      @nextState()
    #@prevState() if keys.down
    if (keys.left or keys.right or keys.down) and utils.now() - @lastMove > 200
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
      
      