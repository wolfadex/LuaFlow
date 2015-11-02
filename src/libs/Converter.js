import  {LuaParse} from './luaparse';

export function luaToAST(lua) {
	LuaParse.parse(lua, {
			locations: true
		});
};