class BlockHeap
  heap: []
  constructor: (@game) ->
    console.log "heap"
    
  blockify: (blocks) ->
    console.log "blockify", blocks
    for block in blocks
      block.blocked = true
      @game.levelArray[block.y][block.x] = block
  
  clearRow: (rowNo) ->
    console.log "clearRow", @game.levelArray
    @game.levelArray.splice(rowNo, 1)
    @game.levelArray.unshift((null for num in [0...gfx.dimension.x]))
    #for val, x in @game.levelArray[rowNo]
     # @game.levelArray[rowNo][x] = null
    
  render: (gfx) ->
    for block in @heap
      if block == null
        continue
      gfx.drawBlock (gfx.tileSize * block.x), (gfx.tileSize * block.y), block.col
      
  update: ->
    @heap = []
    for row, y in @game.levelArray
      for block, x in row
        if block && block.blocked
          # set block position
          block.x = x
          block.y = y
          @heap.push block
    