gfx = 
  tileSize: 24
  dimension: 
    x: 10
    y: 18
  init: ->
    console.log "init"
    canvas = $("#game")[0]
    @ctx = canvas?.getContext? "2d"
    return false if not @ctx
    canvas.width = @dimension.x * @tileSize
    canvas.height = @dimension.y * @tileSize
    @w = canvas.width
    @h = canvas.height
    true
  drawBlock: (x, y) ->
    @ctx.fillStyle = "#bada55";
    @ctx.fillRect(x, y, @tileSize, @tileSize);
    
  clear: ->
    @ctx.clearRect 0, 0, @w, @h