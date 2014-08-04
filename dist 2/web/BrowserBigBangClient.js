var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "./BigBangClient"], function(require, exports, bigbang) {
    (function (client) {
        var BrowserBigBangClient = (function (_super) {
            __extends(BrowserBigBangClient, _super);
            function BrowserBigBangClient() {
                _super.call(this);
            }
            BrowserBigBangClient.prototype.connect = function (host, user, password, callback) {
                var _this = this;
                this.internalLogin(host, user, password, host, function (loginResult) {
                    if (loginResult.authenticated) {
                        _this.internalConnect(host, loginResult.clientKey, callback);
                    } else {
                        var rslt = new bigbang.client.ConnectionResult();
                        rslt.message = loginResult.message;
                        rslt.success = false;
                        callback(rslt);
                    }
                });
            };

            BrowserBigBangClient.prototype.connectAnonymous = function (host, callback) {
                this.connect(host, null, null, callback);
            };

            BrowserBigBangClient.prototype.internalLogin = function (host, user, password, application, callback) {
                var hostname = host.split(":")[0];
                var port = host.split(":")[1];

                var protocolHash = this.wireProtocol.protocolHash;

                var url = "http://" + hostname + ":" + port;

                if (!user && !password) {
                    url += "/loginAnon?application=" + application + "&wireprotocolhash=" + protocolHash;
                } else {
                    url += "/login?username=" + user + "&password=" + password + "&application=" + application + "&wireprotocolhash=" + protocolHash;
                }

                var xhr = this.createCORSRequest('GET', url);
                if (!xhr) {
                    alert('CORS not supported');
                    return;
                }

                xhr.onload = function () {
                    var loginResult = new bigbang.client.LoginResult();
                    var json = JSON.parse(xhr.responseText);

                    loginResult.authenticated = json.authenticated;
                    loginResult.clientKey = json.clientKey;
                    loginResult.message = json.message;

                    callback(loginResult);
                };

                xhr.onerror = function () {
                    alert('Woops, there was an error making the request.');
                };

                xhr.send();
            };

            BrowserBigBangClient.prototype.internalConnect = function (host, clientKey, callback) {
                var _this = this;
                this._internalConnectionResult = callback;
                this._clientKey = clientKey;
                var ws = "ws://" + host + "/";

                this.socket = new WebSocket(ws);

                this.socket.onopen = function (event) {
                    setTimeout(function () {
                        _this.onConnect();
                    }, 0);
                };

                this.socket.onmessage = function (event) {
                    var s = event.data.toString();
                    _this.onReceiveText(s);
                };

                this.socket.onclose = function (event) {
                    if (_this._disconnectCallback) {
                        _this._disconnectCallback();
                    }
                };

                this.socket.onerror = function (event) {
                    console.error("WebSocket error: " + event);
                };
            };

            BrowserBigBangClient.prototype.onDisconnect = function (notify) {
                if (!notify) {
                    this.socket.onclose = null;
                }

                this.socket.close();
            };

            BrowserBigBangClient.prototype.sendToServer = function (msg) {
                var s = this.wireProtocol.wrapNetstring(msg);

                if (this.socket) {
                    this.socket.send(s);
                } else {
                    console.error("Send while socket is null.");
                }
            };

            BrowserBigBangClient.prototype.createCORSRequest = function (method, url) {
                var xhr = new XMLHttpRequest();
                if ("withCredentials" in xhr) {
                    xhr.open(method, url, true);
                } else if (typeof XDomainRequest != "undefined") {
                    console.log("Not capturing XDomainRequest just yet..");
                    throw new Error("Error, XDomainRequest support!");
                } else {
                    xhr = null;
                }
                return xhr;
            };
            return BrowserBigBangClient;
        })(bigbang.client.AbstractBigBangClient);
        client.BrowserBigBangClient = BrowserBigBangClient;
    })(exports.client || (exports.client = {}));
    var client = exports.client;
});
