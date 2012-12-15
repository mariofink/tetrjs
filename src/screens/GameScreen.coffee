class GameScreen extends Screen
  levelNumber: 0
  constructor: ->
    @tetromino = new L(3,3)
  
  update: ->
    @tetromino.update()
      
  render: (gfx) ->
    # Render the level
    gfx.ctx.save()
    @tetromino.render(gfx)
    # Render the game
    
    gfx.ctx.restore()
    