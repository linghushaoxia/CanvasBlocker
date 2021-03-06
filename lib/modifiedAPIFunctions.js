/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
(function(){
	"use strict";
	
	var scope;
	if ((typeof exports) !== "undefined"){
		scope = exports;
	}
	else {
		window.scope.modifiedAPIFunctions = {};
		scope = window.scope.modifiedAPIFunctions;
	}
	
	scope.checkerWrapper = function checkerWrapper(checker, object, args, callback){
		const check = checker.call(object);
		if (check.allow){
			if (check.allow === true){
				return check.original.apply(object, check.window.Array.from(args));
			}
			return callback.call(object, args, check);
		}
		check.notify("blocked");
		return undefined;
	};
}());