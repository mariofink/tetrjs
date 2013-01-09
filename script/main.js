// Generated by CoffeeScript 1.4.0
(function() {
  var BlockHeap, GameScreen, I, J, L, O, S, Screen, T, Tetromino, Z, gfx, keys, utils,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  utils = {
    now: function() {
      return new Date().getTime();
    },
    snap: function(value, snapSize) {
      return Math.floor(value / snapSize) * snapSize;
    },
    rand: function(min, max) {
      var range;
      if (!(max != null)) {
        max = min;
        min = 0;
      }
      range = max - min;
      return Math.floor((Math.random() * range) + min);
    },
    getRandomColour: function() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16);
    },
    /*
        The counter function takes a maximum value to count to, and a speed (default is 100ms). Dividing the current time by the speed results in the number of steps that have occurred since JavaScript’s epoch: January 1, 1970. This only becomes useful when we take the modulus of those steps by the maximum value. Now we have a counter that counts to our maximum value, then resets—ad infinitum!
    */

    counter: function(max, speed) {
      if (speed == null) {
        speed = 100;
      }
      return Math.floor(this.now() / speed % max);
    }
  };

  BlockHeap = (function() {

    BlockHeap.prototype.heap = [];

    function BlockHeap(game) {
      this.game = game;
      console.log("heap");
    }

    BlockHeap.prototype.blockify = function(blocks) {
      var block, _i, _len, _results;
      console.log("blockify", blocks);
      _results = [];
      for (_i = 0, _len = blocks.length; _i < _len; _i++) {
        block = blocks[_i];
        block.blocked = true;
        _results.push(this.game.levelArray[block.y][block.x] = block);
      }
      return _results;
    };

    BlockHeap.prototype.clearRow = function(rowNo) {
      var num;
      console.log("clearRow", this.game.levelArray);
      this.game.levelArray.splice(rowNo, 1);
      return this.game.levelArray.unshift((function() {
        var _i, _ref, _results;
        _results = [];
        for (num = _i = 0, _ref = gfx.dimension.x; 0 <= _ref ? _i < _ref : _i > _ref; num = 0 <= _ref ? ++_i : --_i) {
          _results.push(null);
        }
        return _results;
      })());
    };

    BlockHeap.prototype.render = function(gfx) {
      var block, _i, _len, _ref, _results;
      _ref = this.heap;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        block = _ref[_i];
        if (block === null) {
          continue;
        }
        _results.push(gfx.drawBlock(gfx.tileSize * block.x, gfx.tileSize * block.y, block.col));
      }
      return _results;
    };

    BlockHeap.prototype.update = function() {
      var block, row, x, y, _i, _len, _ref, _results;
      this.heap = [];
      _ref = this.game.levelArray;
      _results = [];
      for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
        row = _ref[y];
        _results.push((function() {
          var _j, _len1, _results1;
          _results1 = [];
          for (x = _j = 0, _len1 = row.length; _j < _len1; x = ++_j) {
            block = row[x];
            if (block && block.blocked) {
              block.x = x;
              block.y = y;
              _results1.push(this.heap.push(block));
            } else {
              _results1.push(void 0);
            }
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    return BlockHeap;

  })();

  Tetromino = (function() {

    Tetromino.prototype.x = 0;

    Tetromino.prototype.y = 0;

    Tetromino.prototype.currentState = 0;

    Tetromino.prototype.states = [];

    Tetromino.prototype.lastChange = utils.now();

    Tetromino.prototype.lastMove = utils.now();

    Tetromino.prototype.asciiMap = null;

    Tetromino.prototype.blocks = [];

    function Tetromino(x, y, game) {
      this.x = x;
      this.y = y;
      this.game = game;
      this.colour = utils.getRandomColour();
      this.updateBlocks();
    }

    Tetromino.prototype.nextState = function() {
      if (utils.now() - this.lastChange < 200) {
        return;
      }
      this.currentState++;
      if (this.currentState > this.states.length - 1) {
        this.currentState = 0;
      }
      this.lastChange = utils.now();
      this.updateBlocks();
      return this.currentState;
    };

    Tetromino.prototype.updateBlocks = function() {
      var block, col, row, _i, _len, _ref, _x, _y;
      _ref = this.blocks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        block = _ref[_i];
        this.game.levelArray[block.y][block.x] = null;
      }
      this.blocks = [];
      this.asciiMap = (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.states[this.currentState].split("\n");
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          row = _ref1[_j];
          _results.push(row.split(""));
        }
        return _results;
      }).call(this);
      return this.map = (function() {
        var _j, _len1, _ref1, _results;
        _ref1 = this.asciiMap;
        _results = [];
        for (_y = _j = 0, _len1 = _ref1.length; _j < _len1; _y = ++_j) {
          row = _ref1[_y];
          _results.push((function() {
            var _k, _len2, _results1;
            _results1 = [];
            for (_x = _k = 0, _len2 = row.length; _k < _len2; _x = ++_k) {
              col = row[_x];
              switch (col) {
                case "#":
                  block = {
                    x: _x + this.x,
                    y: _y + this.y,
                    col: this.colour
                  };
                  this.game.levelArray[block.y][block.x] = block;
                  _results1.push(this.blocks.push(block));
                  break;
                default:
                  _results1.push(void 0);
              }
            }
            return _results1;
          }).call(this));
        }
        return _results;
      }).call(this);
    };

    Tetromino.prototype.move = function(x, y) {
      var block, lockPiece, movetoX, movetoY, _i, _len, _ref;
      lockPiece = false;
      _ref = this.blocks;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        block = _ref[_i];
        movetoY = block.y + y;
        movetoX = block.x + x;
        if (movetoX === this.game.levelArray[0].length || movetoX < 0) {
          return;
        }
        if (this.game.levelArray[block.y][movetoX] === "X") {
          return;
        }
        if (movetoY === this.game.levelArray.length) {
          lockPiece = true;
          continue;
        }
        if (this.game.levelArray[movetoY][block.x] && this.game.levelArray[movetoY][block.x].blocked) {
          lockPiece = true;
          continue;
        }
      }
      if (lockPiece) {
        this.game.nextTetromino(this);
        return;
      }
      this.x += x;
      this.y += y;
      return this.updateBlocks();
    };

    Tetromino.prototype.update = function() {
      var _x, _y;
      if (!(keys.right || keys.left || keys.down || keys.up)) {
        return;
      }
      _x = _y = 0;
      if (keys.up) {
        this.nextState();
      }
      if ((keys.left || keys.right || keys.down) && utils.now() - this.lastMove > 200) {
        this.lastMove = utils.now();
        if (keys.left) {
          _x -= 1;
        }
        if (keys.right) {
          _x += 1;
        }
        if (keys.down) {
          _y += 1;
        }
        return this.move(_x, _y);
      }
    };

    Tetromino.prototype.render = function(gfx) {
      var block, _i, _len, _ref, _results;
      _ref = this.blocks;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        block = _ref[_i];
        _results.push(gfx.drawBlock(gfx.tileSize * block.x, gfx.tileSize * block.y, this.colour));
      }
      return _results;
    };

    return Tetromino;

  })();

  I = (function(_super) {

    __extends(I, _super);

    function I() {
      this.currentState = 0;
      this.states = ["#...\n#...\n#...\n#...", "....\n####\n....\n...."];
      I.__super__.constructor.apply(this, arguments);
    }

    return I;

  })(Tetromino);

  J = (function(_super) {

    __extends(J, _super);

    function J() {
      this.currentState = 0;
      this.states = [".#..\n.#..\n##..\n....", "....\n###.\n..#.\n....", ".##.\n.#..\n.#..\n....", "#...\n###.\n....\n...."];
      J.__super__.constructor.apply(this, arguments);
    }

    return J;

  })(Tetromino);

  L = (function(_super) {

    __extends(L, _super);

    function L() {
      this.currentState = 0;
      this.states = [".#..\n.#..\n.##.\n....", "..#.\n###.\n....\n....", "##..\n.#..\n.#..\n....", "....\n###.\n#...\n...."];
      L.__super__.constructor.apply(this, arguments);
    }

    return L;

  })(Tetromino);

  O = (function(_super) {

    __extends(O, _super);

    function O() {
      this.currentState = 0;
      this.states = ["##..\n##..\n....\n...."];
      O.__super__.constructor.apply(this, arguments);
    }

    return O;

  })(Tetromino);

  S = (function(_super) {

    __extends(S, _super);

    function S() {
      this.currentState = 0;
      this.states = [".#..\n.##.\n..#.\n....", ".##.\n##..\n....\n...."];
      S.__super__.constructor.apply(this, arguments);
    }

    return S;

  })(Tetromino);

  T = (function(_super) {

    __extends(T, _super);

    function T() {
      this.currentState = 0;
      this.states = [".#..\n###.\n....\n....", ".#..\n##..\n.#..\n....", "....\n###.\n.#..\n....", ".#..\n.##.\n.#..\n...."];
      T.__super__.constructor.apply(this, arguments);
    }

    return T;

  })(Tetromino);

  Z = (function(_super) {

    __extends(Z, _super);

    function Z() {
      this.currentState = 0;
      this.states = ["..#.\n.##.\n.#..\n....", "##..\n.##.\n....\n...."];
      Z.__super__.constructor.apply(this, arguments);
    }

    return Z;

  })(Tetromino);

  Screen = (function() {

    function Screen() {}

    Screen.prototype.update = function() {};

    Screen.prototype.render = function(gfx) {};

    return Screen;

  })();

  GameScreen = (function(_super) {

    __extends(GameScreen, _super);

    GameScreen.prototype.levelNumber = 0;

    GameScreen.prototype.levelArray = [];

    GameScreen.prototype.blockHeap = null;

    GameScreen.prototype.lastChange = utils.now();

    GameScreen.prototype.shapes = ["I", "J", "L", "O", "S", "T", "Z"];

    GameScreen.prototype.tetromino = null;

    function GameScreen(gfx) {
      var num, _i, _ref;
      for (_i = 0, _ref = gfx.dimension.y; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--) {
        this.levelArray.push((function() {
          var _j, _ref1, _results;
          _results = [];
          for (num = _j = 0, _ref1 = gfx.dimension.x; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; num = 0 <= _ref1 ? ++_j : --_j) {
            _results.push(null);
          }
          return _results;
        })());
      }
      this.blockHeap = new BlockHeap(this);
      this.nextTetromino();
    }

    GameScreen.prototype.nextTetromino = function(old) {
      var next;
      if (old) {
        this.blockHeap.blockify(old.blocks);
      }
      this.checkBlocks();
      next = this.shapes[utils.rand(0, 6)];
      switch (next) {
        case "I":
          return this.tetromino = new I(3, 0, this);
        case "J":
          return this.tetromino = new J(3, 0, this);
        case "L":
          return this.tetromino = new L(3, 0, this);
        case "O":
          return this.tetromino = new O(3, 0, this);
        case "S":
          return this.tetromino = new S(3, 0, this);
        case "T":
          return this.tetromino = new T(3, 0, this);
        case "Z":
          return this.tetromino = new Z(3, 0, this);
        default:
          return console.error("shape " + next + " not defined");
      }
    };

    GameScreen.prototype.checkBlocks = function() {
      var col, complete, row, y, _i, _j, _len, _len1, _ref, _results;
      _ref = this.levelArray;
      _results = [];
      for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
        row = _ref[y];
        complete = true;
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          col = row[_j];
          if (col === null) {
            complete = false;
          }
        }
        if (complete === true) {
          console.log("clear row " + y);
          _results.push(this.blockHeap.clearRow(y));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    GameScreen.prototype.update = function() {
      if (utils.now() - this.lastChange > 500) {
        this.lastChange = utils.now();
      }
      this.tetromino.update();
      return this.blockHeap.update();
    };

    GameScreen.prototype.render = function(gfx) {
      gfx.ctx.save();
      this.blockHeap.render(gfx);
      this.tetromino.render(gfx);
      this.showDebugInfo();
      return gfx.ctx.restore();
    };

    GameScreen.prototype.showDebugInfo = function() {
      var block, row, y, _i, _j, _len, _len1, _ref, _results;
      $("#debug").html("");
      _ref = this.levelArray;
      _results = [];
      for (y = _i = 0, _len = _ref.length; _i < _len; y = ++_i) {
        row = _ref[y];
        for (_j = 0, _len1 = row.length; _j < _len1; _j++) {
          block = row[_j];
          if (block !== null) {
            $("#debug").append("<span style='color:" + block.col + "'>#</span>");
          } else {
            $("#debug").append("_");
          }
        }
        _results.push($("#debug").append(" -- " + y + "<br>"));
      }
      return _results;
    };

    return GameScreen;

  })(Screen);

  keys = {
    up: false,
    down: false,
    left: false,
    right: false,
    fire: false,
    space: false,
    reset: function() {
      return this.up = this.down = this.left = this.right = this.fire = false;
    },
    trigger: function(keyCode, isDown) {
      switch (keyCode) {
        case 32:
          return this.space = isDown;
        case 37:
          return this.left = isDown;
        case 39:
          return this.right = isDown;
        case 38:
          return this.up = isDown;
        case 40:
          return this.down = isDown;
      }
    }
  };

  $(document).keydown(function(e) {
    return keys.trigger(e.keyCode, true);
  });

  $(document).keyup(function(e) {
    return keys.trigger(e.keyCode, false);
  });

  gfx = {
    tileSize: 24,
    dimension: {
      x: 10,
      y: 18
    },
    init: function() {
      var canvas;
      console.log("init");
      canvas = $("#game")[0];
      this.ctx = canvas != null ? typeof canvas.getContext === "function" ? canvas.getContext("2d") : void 0 : void 0;
      if (!this.ctx) {
        return false;
      }
      canvas.width = this.dimension.x * this.tileSize;
      canvas.height = this.dimension.y * this.tileSize;
      this.w = canvas.width;
      this.h = canvas.height;
      return true;
    },
    drawBlock: function(x, y, colour) {
      if (colour == null) {
        colour = "#bada55";
      }
      this.ctx.fillStyle = colour;
      return this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
    },
    clear: function() {
      return this.ctx.clearRect(0, 0, this.w, this.h);
    }
  };

  this.tetrjs = {
    screen: null,
    dialog: null,
    running: false,
    init: function() {
      if (!gfx.init()) {
        alert("Sorry, no canvas");
        return;
      }
      return this.reset();
    },
    start: function() {
      return this.running = true;
    },
    stop: function() {
      return this.running = false;
    },
    reset: function() {
      this.screen = new GameScreen(gfx);
      if (!this.running) {
        this.start();
        return this.tick();
      }
    },
    tick: function() {
      var _this = this;
      if (!this.running) {
        return;
      }
      gfx.clear();
      this.update();
      this.render();
      return window.requestAnimationFrame((function() {
        return _this.tick();
      }));
    },
    update: function() {
      if (this.dialog != null) {
        return this.dialog.update();
      } else {
        return this.screen.update();
      }
    },
    render: function() {
      return this.screen.render(gfx);
    }
  };

  $(document).ready(function() {
    return tetrjs.init();
  });

}).call(this);
