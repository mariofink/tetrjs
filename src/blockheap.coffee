class BlockHeap
  heap: []
  constructor: (@game) ->
    console.log "heap"
    
  blockify: (blocks) ->
    console.log "blockify", blocks
    for block in blocks
      @game.levelArray[block.y][block.x] = "X"
      @heap.push block
  
  clearRow: (rowNo) ->
     for val, x in @game.levelArray[rowNo]
       @game.levelArray[rowNo][x] = "."
    
  render: (gfx) ->
    for block in @heap
      gfx.drawBlock (gfx.tileSize * block.x), (gfx.tileSize * block.y), block.col
      
  update: ->
    console.log "update"
    