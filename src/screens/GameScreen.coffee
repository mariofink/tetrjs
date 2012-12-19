class GameScreen extends Screen
  levelNumber: 0
  levelArray: []
  constructor: (gfx) ->
    # create level array to hold tetromnio positions
    for [0...gfx.dimension.y]
      @levelArray.push ("." for num in [0...gfx.dimension.x])
    
    @tetromino = new L(3, 0, @)
    
    console.log @levelArray
  
  update: ->
    @tetromino.update()
      
  render: (gfx) ->
    # Render the level
    gfx.ctx.save()
    @tetromino.render(gfx)
    # Render the game
    
    gfx.ctx.restore()
    