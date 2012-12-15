keys = 
  up: false
  down: false
  left: false
  right: false
  fire: false
  space: false
  
  reset: ->
    @up = @down = @left = @right = @fire = false
    
  trigger: (keyCode, isDown) ->
    # handle key event  
    switch keyCode
      when 32 then @space = isDown
      when 37 then @left = isDown
      when 39 then @right = isDown
      when 38 then @up = isDown
      when 40 then @down = isDown

$(document).keydown (e) -> 
  keys.trigger e.keyCode, true
$(document).keyup (e) -> 
  keys.trigger e.keyCode, false