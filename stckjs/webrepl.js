(function () {
    /*
        Code is borrowed and modified from WebREPL by Torbjørn Marø.
        Huge thanks to him!
        https://github.com/tormaroe/webrepl
        http://programmeringsbloggen.no/2013/02/22/webrepl-en-javascript-basert-kommandolinje/
    */

	/*
		ISSUES:

		The keymap makes it impossible to write many characters. 
		My Norwegian keyboard complicates the issue as well.

        17.08.2016 teodoran: Updated to work with my keymap. Your milage vary...
        04.09.2016 teodoran: Now using MousetrapJS. This should fix the issues. Maybe push this to upstream?

	*/

    if (!window.webrepl) {
        window.webrepl = {};
    }

    var scrollBottom = function () {
    	$(document).scrollTop($(document).height());
    };

    var blink = function (show) {
        $('#cursor').toggle(show);
        setTimeout(function () { blink(!show); }, 600);
    };

    var makeHistoryController = function () {
		var commandHistory = [],
            commandCount = 0;
        
    	return {
    		push: function (text) {
                commandHistory.push(text);
                commandCount = commandHistory.length;
    		},
    		hasUp: function () { return commandCount > 0; },
    		up: function () {
    			if (this.hasUp()) {
                    commandCount--;
                    return commandHistory[commandCount];
                }
            },
            down: function () {
	            if (commandCount < commandHistory.length - 1) {
                    commandCount++;
                    return commandHistory[commandCount];
                }
                else {
                    commandCount = commandHistory.length;
                    return "";
                }
            }
    	};
    };

    webrepl.make = function (config) {
    	var $container = config.container;
    	var prompt = config.prompt;
        var $currentConsoleLine;
        var history = makeHistoryController();
        var runningCommand = false;

        var newCommandLine = function () {
            $container.append('<div><span class="path">' + prompt + '</span><span class="console"></span><span id="cursor">_</span></div>');
            $currentConsoleLine = $('.console:last');
        };

        var bindKeys = function () {
            Mousetrap.bind('up', function () {
                if (history.hasUp()) {
                    $currentConsoleLine.html(history.up());
                }
                return false;
            });

            Mousetrap.bind('down', function () {
                $currentConsoleLine.html(history.down());
                return false;
            });

            Mousetrap.bind('backspace', function () {
                var t = $currentConsoleLine.text();
                $currentConsoleLine.text(t.substr(0, t.length - 1));
                return false;
            });

            Mousetrap.bind('esc', function () {
                $currentConsoleLine.html('');
                return false;
            });

            Mousetrap.bind('enter', function () {
                var text = $currentConsoleLine.text();
                $('#cursor').remove();
                if (text == '') {
                    newCommandLine();
                    $(document).scrollTop($(document).height());
                }
                else {
                    runningCommand = true;
                    var $output = $('<div class="output"></div>');
                    $container.append($output);
                    $output.html(config.commandHandler(text, config.state));
                    if (runningCommand) {
                        runningCommand = false;
                        newCommandLine();
                    }
                    scrollBottom();
                    history.push(text);
                }
                return false;
            });

            Mousetrap.bind('ctrl+c', function () {
                if (runningCommand) {
                    runningCommand = false;
                    newCommandLine();
                    scrollBottom();
                }
                return false;
            });

            Mousetrap.bind('space', function () {
                $currentConsoleLine.text($currentConsoleLine.text() + ' ');
                return false;
            });

            var lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'æ', 'ø', 'å'],
                uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'Æ', 'Ø', 'Å'],
                numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                operators = ['[', ']', '|', '+', '-', '*', '/', '%', '=', '>', '<', '?', '`', '#', '.', ' '],
                allChars = lowercase.concat(uppercase, numbers, operators);

            allChars.forEach(function (char) {
                Mousetrap.bind(char, function () {
                    $currentConsoleLine.text($currentConsoleLine.text() + char);
                    return false;
                });
            });
        };

        (function () {
            var welcomeText = (config.welcome ? config.welcome : "Welcome to WebREPL!") + '<br /><br />';
            $container.html(welcomeText);
            newCommandLine();
            bindKeys();
            blink(true);
        }());

        return {
        	clear: function () { $container.empty(); },
        	setPrompt: function (text) { prompt = text; }
        };
    };
}());