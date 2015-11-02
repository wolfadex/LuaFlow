import  {LuaParse} from './luaparse';

export function luaToAST(lua) {
	let chunk;

	try {
		chunk = LuaParse.parse(lua, {
				locations: true
			});
	}
	catch (e) {
		return e;
	}

	return chunk;
};