function levelOne(speed) {
//	console.log("in levelOne");
//	console.log(speed);
	var e1 = new basicEnemy(0, 0, speed);
	var p1 = new rapidFire(67, -200, speed);
	powerups.push(p1);
	enemies.push(e1);
	var e2 = new basicEnemy(65, 3, speed);
	enemies.push(e2);
	var e3 = new basicEnemy(135, 7, speed);
	enemies.push(e3);
	var e4 = new basicEnemy(195, 0, speed);
	enemies.push(e4);
	var e5 = new basicEnemy(260, 5, speed);
	enemies.push(e5);
	var e6 = new basicEnemy(320, 3, speed);
	enemies.push(e6);
	var e7 = new basicEnemy(383, 3, speed);
	enemies.push(e7);
	var e8 = new basicEnemy(425, 0, speed);
	enemies.push(e8);
	var e9 = new basicEnemy(476, 8, speed);
	enemies.push(e9);
	var e10 = new basicEnemy(536, 6, speed);
	enemies.push(e10);
	var e11 = new basicEnemy(590, 0, speed);
	enemies.push(e11);
	var e12 = new basicEnemy(15, -69, speed);
	enemies.push(e12);
	var e13 = new basicEnemy(70, -72, speed);
	enemies.push(e13);
	var e14 = new basicEnemy(142, -70, speed);
	enemies.push(e14);
	var e15 = new wideEnemy(200, -75, speed);
	enemies.push(e15);
	var e16 = new basicEnemy(282, -64, speed);
	enemies.push(e16);
	var e17 = new basicEnemy(341, -70, speed);
	enemies.push(e17);
	var e18 = new wideEnemy(396, -77, speed);
	enemies.push(e18);
	var e19 = new basicEnemy(470, -81, speed);
	enemies.push(e19);
	var e20 = new wideEnemy(525, -60, speed);
	enemies.push(e20);
}

function levelTwo(s) {
	var p1 = new speedUp(420, -60);
	powerups.push(p1);
	var e1 = new basicEnemy(0, 0, s);
	enemies.push(e1);
	var e2 = new fastEnemy(65, 3, s);
	enemies.push(e2);
	var e3 = new fastEnemy(135, 7, s);
	enemies.push(e3);
	var e4 = new basicEnemy(195, 0, s);
	enemies.push(e4);
	var e5 = new basicEnemy(260, 5, s);
	enemies.push(e5);
	var e6 = new basicEnemy(320, 3, s);
	enemies.push(e6);
	var e7 = new basicEnemy(383, 3, s);
	enemies.push(e7);
	var e8 = new basicEnemy(425, 0, s);
	enemies.push(e8);
	var e9 = new basicEnemy(476, 8, s);
	enemies.push(e9);
	var e10 = new basicEnemy(536, 6, s);
	enemies.push(e10);
	var e11 = new basicEnemy(590, 0, s);
	enemies.push(e11);
	var e12 = new basicEnemy(15, -69, s);
	enemies.push(e12);
	var e13 = new basicEnemy(70, -72, s);
	enemies.push(e13);
	var e14 = new basicEnemy(142, -70, s);
	enemies.push(e14);
	var e15 = new wideEnemy(200, -75, s);
	enemies.push(e15);
	var e16 = new basicEnemy(282, -64, s);
	enemies.push(e16);
	var e17 = new basicEnemy(341, -70, s);
	enemies.push(e17);
	var e18 = new wideEnemy(396, -77, s);
	enemies.push(e18);
	var e19 = new basicEnemy(470, -81, s);
	enemies.push(e19);
	var e20 = new wideEnemy(525, -60, s);
	enemies.push(e20);
	var e21 = new fastEnemy(525, -60, s);
	enemies.push(e21);
	var e22 = new basicEnemy(590, -63, s);
	enemies.push(e22);
	var e23 = new fastEnemy(0, -120, s);
	enemies.push(e23);
	var e24 = new basicEnemy(40, -136, s);
	enemies.push(e24);
	var e25 = new basicEnemy(100, -123, s);
	enemies.push(e25);
	var e26 = new basicEnemy(155, -120, s);
	enemies.push(e26);
	var e27 = new wideEnemy(212, -125, s);
	enemies.push(e27);
	var e28 = new basicEnemy(285, -129, s);
	enemies.push(e28);
	var e29 = new fastEnemy(340, -135, s);
	enemies.push(e29);
	var e30 = new basicEnemy(370, -120, s);
	enemies.push(e30);
	var e31 = new basicEnemy(427, -130, s);
	enemies.push(e31);
	var e32 = new basicEnemy(483, -126, s);
	enemies.push(e32);
	var e33 = new basicEnemy(540, -122, s);
	enemies.push(e33);
	var e34 = new fastEnemy(603, -124, s);
	enemies.push(e34);
	var e35 = new basicEnemy(39, -200, s);
	enemies.push(e35);

}

function levelThree(s) {
	var p1 = new speedUp(500, -30);
	var p2 = new rapidFire(220, -40);
	powerups.push(p1);
	powerups.push(p2);
	var e1 = new boss1(0, -70, s);
	enemies.push(e1);
}
