+(function(factory) {
    factory(window);
}(function(scope) {
    'use strict';

    var self;
    var proto;
    var _textSize = 2;
    var _cursorX = 0;
    var _cursorY = 0;

    function SSD1306(board) {
        this._board = board;
        self = this;
        board.send([0xF0, 0x04, 0x01, 0x0, 0xF7]);
        board.send([0xF0, 0x04, 0x01, 0x02, _cursorX, _cursorY, 0xF7]);
        board.send([0xF0, 0x04, 0x01, 0x03, _textSize, 0xF7]);
        board.send([0xF0, 0x04, 0x01, 0x01, 0xF7]);
    }

    SSD1306.prototype = proto = Object.create(Object.prototype, {
        constructor: {
            value: SSD1306
        },
        textSize: {
            get: function() {
                return _textSize;
            },
            set: function(val) {
                board.send([0xF0, 0x04, 0x01, 0x03, val, 0xF7]);
                _textSize = val;
            }
        }
    });

    proto.clear = function() {
        board.send([0xF0, 0x04, 0x01, 0x01, 0xF7]);
    }

    proto.drawImage = function(){
        board.send([0xF0, 0x04, 0x01, 0x05, 0xF7]);   
    }

    proto.print = function(cursorX, cursorY, str) {
        var len = arguments.length;
        if (len == 3) {
            _cursorX = cursorX;
            _cursorY = cursorY;
            board.send([0xF0, 0x04, 0x01, 0x02, cursorX, cursorY, 0xF7]);
        } else {
            str = cursorX;
            board.send([0xF0, 0x04, 0x01, 0x02, _cursorX, _cursorY, 0xF7]);
        }
        var strCMD = [0xF0, 0x04, 0x01, 0x04];
        for (var i = 0; i < str.length; i++) {
            strCMD.push(str.charCodeAt(i));
        }
        strCMD.push(0xF7);
        board.send(strCMD);
    }
    scope.SSD1306 = SSD1306;
}));