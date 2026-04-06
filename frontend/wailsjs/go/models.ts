export namespace app {
	
	export class CaptureResult {
	    id: string;
	    imageBase64: string;
	    width: number;
	    height: number;
	    format: string;
	    source: string;
	
	    static createFrom(source: any = {}) {
	        return new CaptureResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.imageBase64 = source["imageBase64"];
	        this.width = source["width"];
	        this.height = source["height"];
	        this.format = source["format"];
	        this.source = source["source"];
	    }
	}
	export class HotkeyBindingInput {
	    action: string;
	    modifiers: string[];
	    key: string;
	
	    static createFrom(source: any = {}) {
	        return new HotkeyBindingInput(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.action = source["action"];
	        this.modifiers = source["modifiers"];
	        this.key = source["key"];
	    }
	}
	export class WindowInfo {
	    id: string;
	    title: string;
	    app: string;
	
	    static createFrom(source: any = {}) {
	        return new WindowInfo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.app = source["app"];
	    }
	}

}

export namespace entity {
	
	export class KeyCombo {
	    modifiers: string[];
	    key: string;
	
	    static createFrom(source: any = {}) {
	        return new KeyCombo(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.modifiers = source["modifiers"];
	        this.key = source["key"];
	    }
	}
	export class HotkeyBinding {
	    action: string;
	    combo: KeyCombo;
	
	    static createFrom(source: any = {}) {
	        return new HotkeyBinding(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.action = source["action"];
	        this.combo = this.convertValues(source["combo"], KeyCombo);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class HotkeyConfig {
	    bindings: HotkeyBinding[];
	
	    static createFrom(source: any = {}) {
	        return new HotkeyConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.bindings = this.convertValues(source["bindings"], HotkeyBinding);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Region {
	    x: number;
	    y: number;
	    width: number;
	    height: number;
	
	    static createFrom(source: any = {}) {
	        return new Region(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.x = source["x"];
	        this.y = source["y"];
	        this.width = source["width"];
	        this.height = source["height"];
	    }
	}
	export class Recording {
	    id: string;
	    state: string;
	    format: string;
	    region?: Region;
	    // Go type: time
	    startedAt: any;
	    duration: number;
	    outputPath: string;
	
	    static createFrom(source: any = {}) {
	        return new Recording(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.state = source["state"];
	        this.format = source["format"];
	        this.region = this.convertValues(source["region"], Region);
	        this.startedAt = this.convertValues(source["startedAt"], null);
	        this.duration = source["duration"];
	        this.outputPath = source["outputPath"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace port {
	
	export class AppConfig {
	    saveDirectory: string;
	    imageFormat: string;
	    recordFormat: string;
	    hotkeys: entity.HotkeyConfig;
	    launchAtStartup: boolean;
	    showNotifications: boolean;
	
	    static createFrom(source: any = {}) {
	        return new AppConfig(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.saveDirectory = source["saveDirectory"];
	        this.imageFormat = source["imageFormat"];
	        this.recordFormat = source["recordFormat"];
	        this.hotkeys = this.convertValues(source["hotkeys"], entity.HotkeyConfig);
	        this.launchAtStartup = source["launchAtStartup"];
	        this.showNotifications = source["showNotifications"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace usecase {
	
	export class PermissionResult {
	    screenCapture: string;
	    accessibility: string;
	    allGranted: boolean;
	
	    static createFrom(source: any = {}) {
	        return new PermissionResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.screenCapture = source["screenCapture"];
	        this.accessibility = source["accessibility"];
	        this.allGranted = source["allGranted"];
	    }
	}

}

