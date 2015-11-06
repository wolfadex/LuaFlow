import {UUID} from './UUID';

let uuid = new UUID();

class Converter {
	toAST({file, language = 'lua'}) {
		let result;

		switch (language.toLowerCase()) {
			case 'lua':
				result = this._luaToAST(file);
				break;
		}

		return result;
	}

	addUUIDs(o) {
		let me = this;

		Object.keys(o).forEach(function(k) {
			if (o.key === undefined) {
				o.key = uuid.newUUID();
			}

			if (k === 'body') {
				let a = [];
				// should be a map
				o[k].forEach(function(bo) {
					a.push(me.addUUIDs(bo));
				});

				o[k] = a;
			}
		});

		return o;
	}

	linkToParents(o, r) {
		if (o.parentKey === undefined) {
			let t = (o.type ? o.type.toLowerCase() : undefined);

		    if (t === 'assignmentstatement') {
		    	o.parentKey = this._findParent(r, 'localstatement', o.variables[0].name);
			}
			else if (t === 'callstatement') {
				o.parentKey = this._findParent(r, 'functiondeclaration', o.expression.base.name);
			}
		}

		if (o.body) {
			let me = this;
			let arr = [];

			o.body.forEach(function(bo) {
				arr.push(me.linkToParents(bo, o));
			});

			o.body = arr;
		}

		return o;
	}

	_findParent(o, typeToFind, name) {
		let res;

		if (o.body) {
			o.body.forEach(function(bo) {
				if (bo.type.toLowerCase() === typeToFind) {
					if ((bo.variables && bo.variables[0].name === name ) || (bo.parameters && bo.parameters[0].name === name)) {
						res = bo.key;
					}
				}
			});
		}

		return res;
	}

	_luaToAST(lua) {
		let chunk;

		try {
			chunk = luaparse.parse(lua, {
					locations: true
				});
		}
		catch (e) {
			return {
					result: e,
					success: false
				};
		}

		return {
				result: chunk,
				success: true
			};
	}
}

export {Converter}