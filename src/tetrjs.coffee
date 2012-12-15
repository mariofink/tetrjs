@tetrjs =
  screen: null
  dialog: null
  running: false
  init: -> 
    if not gfx.init()
      alert "Sorry, no canvas"
      return
    @reset()
  start: -> @running = true
  stop: -> @running = false
  reset: -> 
    @screen = new GameScreen()
    #@dialog = null
    #keys.reset()
    if not @running
      @start()
      @tick()
  tick: -> 
    return if not @running
    gfx.clear()
    @update()
    @render()
    window.requestAnimationFrame (=> @tick())
    
  update: ->
    if @dialog?
      @dialog.update()
    else 
      @screen.update()
  render: ->
    @screen.render gfx
    #@dialog.render gfx if @dialog  

$(document).ready ->
  tetrjs.init()