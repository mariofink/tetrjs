xargs -t coffee -j ../script/main.js -w -c << EOF
_utils.coffee
blockheap.coffee
./tetrominoes/Tetromino.coffee
./tetrominoes/I.coffee
./tetrominoes/J.coffee
./tetrominoes/L.coffee
./tetrominoes/O.coffee
./tetrominoes/S.coffee
./tetrominoes/T.coffee
./tetrominoes/Z.coffee
./screens/_Screen.coffee
./screens/GameScreen.coffee
keys.coffee
gfx.coffee
tetrjs.coffee
EOF
