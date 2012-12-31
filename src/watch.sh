xargs -t coffee -j ../script/main.js -w -c << EOF
_utils.coffee
blockheap.coffee
./tetrominoes/Tetromino.coffee
./tetrominoes/L.coffee
./tetrominoes/O.coffee
./screens/_Screen.coffee
./screens/GameScreen.coffee
keys.coffee
gfx.coffee
tetrjs.coffee
EOF
