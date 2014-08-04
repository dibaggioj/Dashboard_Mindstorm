var bbNode = require("./NodeBigBangClient");

var readline = require("readline");

if (process.argv.length != 3) {
    console.log('Please supply a host.');
    process.exit(1);
}

var rlopt = { "input": process.stdin, "output": process.stdout };
var rl = readline.createInterface(rlopt);
var host = process.argv[2];

var client = new bbNode.NodeBigBangClient();
var myChannel;

client.disconnected(function () {
    console.log("The socket was disconnected, bye.");
});

console.log("Connecting to host " + host);

client.connectAnonymous(host + ':80', function (result) {
    if (result.success) {
        printToConsole("Connected!");
        startCli();
    } else {
        console.log('Failed to connect. ' + result.message);
    }
});

function startCli() {
    updatePrompt();
    rl.prompt();

    rl.on('line', function (raw) {
        var line = raw.trim();

        if (startsWith(line, "ls")) {
            doLs();
        } else if (startsWith(line, "put")) {
            doPut(line);
        } else if (startsWith(line, "del")) {
            doDel(line);
        } else if (startsWith(line, "pub ")) {
            doPublish(line);
        } else if (startsWith(line, "subs ")) {
            subscribeCommand(line);
        } else if (startsWith(line, "whoami")) {
            whoami();
        }

        rl.prompt();
    }).on('close', function () {
        console.log('Bye!');
        process.exit(0);
    });
}

function updatePrompt() {
    var promptStr = host + "@";

    if (myChannel) {
        promptStr += myChannel.name;
    }

    promptStr += ">";

    rl.setPrompt(promptStr, promptStr.length + 1);
}

function doLs() {
    if (myChannel) {
        myChannel.channelData.keys().forEach(function (key) {
            var o = myChannel.channelData.get(key);
            console.log(key + "=> " + JSON.stringify(o));
        });
        console.log("");

        console.log("subscribers: " + myChannel.subscribers());
        printToConsole("");
    } else {
        printToConsole("Not subscribed to a channel.");
    }
}

function printToConsole(obj) {
    console.log(obj);
    rl.prompt();
}

function subscribeCommand(line) {
    var args = line.split(" ");
    client.subscribe(args[1], function (err, channel) {
        myChannel = channel;

        updatePrompt();

        myChannel.onSubscribers(function (joined) {
            printToConsole("Subscriber " + joined + " joined channel " + myChannel.name);
        }, function (left) {
            printToConsole("Subscriber " + left + " left channel " + myChannel.name);
        });

        myChannel.channelData.onValue(function (key, val) {
            printToConsole("key " + key + " added.");
        }, function (key, val) {
            printToConsole("key " + key + " updated.");
        }, function (key) {
            printToConsole("key " + key + " deleted.");
        });
        printToConsole("Subscribed to " + channel.name);
        channel.onMessage(function (msg) {
            printToConsole("channel[" + channel.name + "] clientId[" + msg.senderId + "] " + msg.payload.getBytesAsUTF8());
        });
    });
}

function doPut(line) {
    if (myChannel) {
        var key = line.split(" ")[1];

        var o = lineToJson(line, 2);

        if (o) {
            myChannel.channelData.put(key, o, function (err) {
                if (err) {
                    console.log("Put error: " + err);
                }
            });
        }
    } else {
        printToConsole("Subscribe to a channel first.");
    }
}

function doDel(line) {
    var key = line.split(" ")[1];
    myChannel.channelData.del(key, function (err) {
        if (err) {
            console.log("channelData Del error: " + err);
        }
    });
}

function doPublish(line) {
    var o = lineToJson(line, 1);

    if (o) {
        myChannel.publish(o, function (err) {
            if (err) {
                console.log("Publish error:" + err);
            }
        });
    }
}

function whoami() {
    printToConsole("You are " + client.clientId());
}

function startsWith(s, search) {
    return s.substring(0, search.length) == search;
}

function lineToJson(line, start) {
    var o = {};
    var ary = line.split(" ");

    if ((ary.length - start) % 2 != 0) {
        printToConsole("Unmatched parameters, couldn't create JSON object.");
        return null;
    }

    for (var i = start; i < ary.length; i = i + 2) {
        o[ary[i]] = ary[i + 1];
    }

    return o;
}
