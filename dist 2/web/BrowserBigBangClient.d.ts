/// <reference path="PewRuntime.d.ts" />
/// <reference path="WireProtocol.Protocol.d.ts" />
/// <reference path="node.d.ts" />
import pew = require("PewRuntime");
import wire = require("WireProtocol.Protocol");
import bigbang = require("./BigBangClient");
export declare module client {
    class BrowserBigBangClient extends bigbang.client.AbstractBigBangClient implements wire.WireProtocolProtocolListener {
        private socket;
        constructor();
        public connect(host: string, user: string, password: string, callback: (connectionResult: bigbang.client.ConnectionResult) => any): void;
        public connectAnonymous(host: string, callback: (connectionResult: bigbang.client.ConnectionResult) => any): void;
        public internalLogin(host: string, user: string, password: string, application: string, callback: (loginResult: bigbang.client.LoginResult) => any): void;
        public internalConnect(host: string, clientKey: string, callback: (connectionResult: bigbang.client.ConnectionResult) => any): void;
        public onDisconnect(notify: any): void;
        public sendToServer(msg: pew.PewMessage): void;
        public createCORSRequest(method: any, url: any): XMLHttpRequest;
    }
}
