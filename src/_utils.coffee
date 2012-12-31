utils =
  now: -> new Date().getTime()
  snap: (value, snapSize) -> 
    Math.floor(value / snapSize) * snapSize
  
  rand: (min, max) ->
    if not max?
      max = min
      min = 0
    range = max - min
    Math.floor (Math.random() * range) + min
    
  getRandomColour: ->
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  
  ###
    The counter function takes a maximum value to count to, and a speed (default is 100ms). Dividing the current time by the speed results in the number of steps that have occurred since JavaScript’s epoch: January 1, 1970. This only becomes useful when we take the modulus of those steps by the maximum value. Now we have a counter that counts to our maximum value, then resets—ad infinitum!
  ###
  counter: (max, speed = 100) -> Math.floor @now() / speed % max