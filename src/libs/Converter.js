class Converter {
	luaToAST(lua) {
		let chunk;

		try {
			chunk = luaparse.parse(lua, {
					locations: true
				});
		}
		catch (e) {
			return e;
		}

		return chunk;
	}
}

export {Converter}