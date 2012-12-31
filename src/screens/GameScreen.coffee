class GameScreen extends Screen
  levelNumber: 0
  levelArray: []
  blockHeap: []
  constructor: (gfx) ->
    # create level array to hold tetromnio positions
    for [0...gfx.dimension.y]
      @levelArray.push ("." for num in [0...gfx.dimension.x])
    
    @tetromino = new L(3, 0, @)
  
  nextTetromino: () ->
    @tetromino = new O(3, 0, @)
  
  blockify: (blocks) ->
    console.log "blockify", blocks
    for block in blocks
      @levelArray[block.y][block.x] = "X"
      @blockHeap.push block
      
  renderBlockHeap: () ->
    for block in @blockHeap
      gfx.drawBlock (gfx.tileSize * block.x), (gfx.tileSize * block.y), block.col
  
  update: ->
    @tetromino.update()
      
  render: (gfx) ->
    # Render the level
    gfx.ctx.save()
    @renderBlockHeap()
    @tetromino.render(gfx)
    # Render the game
    $("#debug").html("");
    for row in @levelArray
      $("#debug").append(row.join("") + "<br>");
    
    gfx.ctx.restore()
    