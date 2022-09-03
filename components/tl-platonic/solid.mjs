const viewBoxWidth = 40;
const solids = [
	{ name: "Tetrahedron", element: "Fire", color: "red" }, 
	{ name: "Cube", element: "Earth", color: "green" }, 
	{ name: "Octahedron", element: "Air", color: "yellow" }, 
	//{ name: "Dodecahedron", element: "Aether", color: "white" }, 
	{ name: "Icosahedron", element: "Water", color: "blue" }
];

const initSolid = (name) => {
	const v = viewBoxWidth / 4;
	const vo = v + v / 2;
	const gr = (vo * (Math.sqrt(5) - 1)) / 2; // golden ratio

	const polyData = {
		Tetrahedron: {
			vertices: [
				[v, v, v],
				[-v, -v, v],
				[v, -v, -v],
				[-v, v, -v]
			],
			faces: [
				[0, 1, 2],
				[0, 3, 1],
				[3, 2, 0],
				[2, 3, 1]
			]
		},
		Cube: {
			vertices: [
				[v, v, v],
				[-v, v, v],
				[-v, -v, v],
				[v, -v, v],
				[v, v, -v],
				[-v, v, -v],
				[-v, -v, -v],
				[v, -v, -v]
			],
			faces: [
				[0, 1, 2, 3],
				[1, 0, 4, 5],
				[2, 1, 5, 6],
				[3, 2, 6, 7],
				[0, 3, 7, 4],
				[7, 6, 5, 4]
			]
		},
		Octahedron: {
			vertices: [
				[vo, 0, 0],
				[0, vo, 0],
				[0, 0, vo],
				[0, -vo, 0],
				[0, 0, -vo],
				[-vo, 0, 0]
			],
			faces: [
				[0, 1, 2],
				[0, 2, 3],
				[0, 3, 4],
				[0, 4, 1],
				[5, 2, 1],
				[5, 3, 2],
				[5, 4, 3],
				[5, 1, 4]
			]
		},
		Icosahedron: {
			vertices: [
				[gr, 0, vo],
				[-gr, 0, vo],
				[gr, 0, -vo],
				[-gr, 0, -vo],
				[0, vo, gr],
				[0, vo, -gr],
				[0, -vo, gr],
				[0, -vo, -gr],
				[vo, gr, 0],
				[vo, -gr, 0],
				[-vo, gr, 0],
				[-vo, -gr, 0]
			],
			faces: [
				[0, 1, 4],
				[1, 0, 6],
				[2, 3, 5],
				[3, 2, 7],
				[4, 5, 8],
				[5, 4, 10],
				[6, 7, 11],
				[7, 6, 9],
				[8, 9, 0],
				[9, 8, 2],
				[10, 11, 3],
				[11, 10, 1]
			]
		}
	};

	return [polyData[name].vertices, polyData[name].faces];
};

const solidsData = {};

for (const e of solids.map(solid => solid.name)) {
	const [vData, fData] = initSolid(e);
	solidsData[e] = {
		vertices: vData,
		faces: fData
	};
}

export { viewBoxWidth, solids, solidsData };