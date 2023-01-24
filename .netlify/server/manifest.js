export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["Alata/Alata-Regular.ttf","Alata/OFL.txt","Audiowide/Audiowide-Regular.ttf","Audiowide/OFL.txt","new_logo64.png"]),
	mimeTypes: {".ttf":"font/ttf",".txt":"text/plain",".png":"image/png"},
	_: {
		entry: {"file":"_app/immutable/start-cf7511d8.js","imports":["_app/immutable/start-cf7511d8.js","_app/immutable/chunks/index-d9db240c.js","_app/immutable/chunks/singletons-c1475a9f.js"],"stylesheets":[],"fonts":[]},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js')
		],
		routes: [
			
		],
		matchers: async () => {
			
			return {  };
		}
	}
};
