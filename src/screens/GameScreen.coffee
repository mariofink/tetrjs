class GameScreen extends Screen
  levelNumber: 0
  levelArray: []
  blockHeap: null
  lastChange: utils.now()
  shapes: ["I","J","L","O","S","T","Z"]
  tetromino: null
  constructor: (gfx) ->
    # create level array to hold tetromnio positions
    for [0...gfx.dimension.y]
      @levelArray.push (null for num in [0...gfx.dimension.x])
    @blockHeap = new BlockHeap(@)
    @nextTetromino()
    #@tetromino = new T(3, 0, @)
  
  nextTetromino: (old) ->
    if old then @blockHeap.blockify(old.blocks)
    @checkBlocks()
    next = @shapes[utils.rand(0,6)]
    switch next
      when "I" then @tetromino = new I(3, 0, @)
      when "J" then @tetromino = new J(3, 0, @)
      when "L" then @tetromino = new L(3, 0, @)
      when "O" then @tetromino = new O(3, 0, @)
      when "S" then @tetromino = new S(3, 0, @)
      when "T" then @tetromino = new T(3, 0, @)
      when "Z" then @tetromino = new Z(3, 0, @)
      else console.error "shape #{ next } not defined"
  
  checkBlocks: ->
    for row, y in @levelArray
      complete = true
      for col in row
        if col == null then complete = false
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
    @blockHeap.update()
      
  render: (gfx) ->
    # Render the level
    gfx.ctx.save()
    @blockHeap.render(gfx)
    @tetromino.render(gfx)
    
    @showDebugInfo()
    # Render the game    
    gfx.ctx.restore()
    
  showDebugInfo: ->
    $("#debug").html("");
    for row, y in @levelArray
      for block in row
        if block != null 
          $("#debug").append("<span style='color:"+block.col+"'>#</span>");
        else
          $("#debug").append("_");
      $("#debug").append(" -- #{ y }<br>");
    
    
    