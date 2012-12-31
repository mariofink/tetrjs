class GameScreen extends Screen
  levelNumber: 0
  levelArray: []
  blockHeap: null
  lastChange: utils.now()
  constructor: (gfx) ->
    # create level array to hold tetromnio positions
    for [0...gfx.dimension.y]
      @levelArray.push ("." for num in [0...gfx.dimension.x])
    @blockHeap = new BlockHeap(@)
    @tetromino = new L(3, 0, @)
  
  nextTetromino: (old) ->
    @blockHeap.blockify(old.blocks)
    @checkBlocks()
    @tetromino = new O(3, 0, @)
  
  checkBlocks: ->
    for row, y in @levelArray
      complete = true
      for col in row
        if col == "." then complete = false
      if complete == true
        console.log "clear row #{ y }"
        @blockHeap.clearRow(y)
        #clear row
        
  
  update: ->
    # move current piece down by 1 in an interval
    if utils.now() - @lastChange > 500 # only change every x ms
      #@tetromino.move(0,1)
      @lastChange = utils.now()
    @tetromino.update()
    #@blockHeap.update()
      
  render: (gfx) ->
    # Render the level
    gfx.ctx.save()
    @blockHeap.render(gfx)
    @tetromino.render(gfx)
    # Render the game
    $("#debug").html("");
    for row in @levelArray
      $("#debug").append(row.join("") + "<br>");
    
    gfx.ctx.restore()
    