/*
 * robotfindskitten-minisphere v1.0
 * Yet another robotfindskitten clone
 * Copyright (c) 2017 Eggbertx
*/

Object.assign(Sphere.Game, {
	name: "robotfindskitten",
	author: "Eggbertx",
	summary: "Yet another robotfindskitten clone",
	resolution: '800x600',
	main: 'rfk.mjs',
});

install('@/', files('rfk.mjs'));
