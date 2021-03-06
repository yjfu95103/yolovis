! function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e(t.d3 = t.d3 || {})
}(this, function(t) {
    "use strict";

    function L(t) {
        var e = t.slice(0),
            r = 0;
        e.push(e[0]);
        for (var o = 0; o <= t.length - 1; o++) {
            var n = o + 1,
                c = e[o].rotated,
                d = e[n].rotated;
            r += (d.x - c.x) * (d.y + c.y)
        }
        return 0 < r
    }

    function N(t) {
        for (var e = 0, r = 0, o = 0, n = t.length, c = n - 1; 0 <= c; c--) e += t[c].rotated.x, r += t[c].rotated.y, o += t[c].rotated.z;
        return {
            x: e / n,
            y: r / n,
            z: o / n
        }
    }

    function f(t, e) {
        var r = e.rotateCenter;
        t.x -= r[0], t.y -= r[1], t.z -= r[2];
        var o, n, c, d, a, i, u, f, y, x, p, z, j = (o = t, n = e.z, c = Math.sin(n), d = Math.cos(n), {
                x: o.x * d - o.y * c,
                y: o.x * c + o.y * d,
                z: o.z
            }),
            h = (a = j, i = e.y, u = Math.sin(i), f = Math.cos(i), {
                x: a.z * u + a.x * f,
                y: a.y,
                z: a.z * f - a.x * u
            }),
            l = (y = h, x = e.x, p = Math.sin(x), z = Math.cos(x), {
                x: y.x,
                y: y.y * z - y.z * p,
                z: y.y * p + y.z * z
            });
        return l.x += r[0], l.y += r[1], l.z += r[2], l
    }

    function w(t, e, r, o) {
        for (var n = t.length - 1; 0 <= n; n--) {
            var c = t[n];
            c.rotated = f({
                x: r.x(c),
                y: r.y(c),
                z: r.z(c)
            }, o), c.centroid = c.rotated, c.projected = e.project(c.rotated, e)
        }
        return t
    }

    function h(t, e, r, o) {
        for (var n = t.length - 1; 0 <= n; n--) {
            var c = t[n],
                d = w([c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7]], e, r, o),
                a = d[0],
                i = d[1],
                u = d[2],
                f = d[3],
                y = d[4],
                x = d[5],
                p = d[6],
                z = d[7],
                j = [a, i, u, f],
                h = [z, p, x, y],
                l = [y, x, i, a],
                v = [f, u, p, z],
                g = [y, a, f, z],
                s = [i, x, p, u];
            j.centroid = N(j), h.centroid = N(h), l.centroid = N(l), v.centroid = N(v), g.centroid = N(g), s.centroid = N(s), j.ccw = L(j), h.ccw = L(h), l.ccw = L(l), v.ccw = L(v), g.ccw = L(g), s.ccw = L(s), j.face = "front", h.face = "back", l.face = "left", v.face = "right", g.face = "top", s.face = "bottom";
            var I = [j, h, l, v, g, s];
            c.faces = I, c.centroid = {
                x: (l.centroid.x + v.centroid.x) / 2,
                y: (g.centroid.y + s.centroid.y) / 2,
                z: j.centroid.z + h.centroid.z / 2
            }
        }
        return t
    }

    function l(t, e, r, o) {
        for (var n = w(t, e, r, o), c = 0, d = [], a = e.row, i = n.length / a - 1; 0 < i; i--)
            for (var u = a - 1; 0 < u; u--) {
                var f = u + i * a,
                    y = f - 1,
                    x = y - a + 1,
                    p = x - 1,
                    z = [n[f], n[x], n[p], n[y]];
                z.plane = "plane_" + c++, z.ccw = L(z), z.centroid = N(z), d.push(z)
            }
        return d
    }

    function v(t, e, r, o) {
        for (var n = t.length - 1; 0 <= n; n--) {
            for (var c = t[n], d = c.length / 2, a = parseInt(d), i = c.length - 1; 0 <= i; i--) {
                var u = c[i];
                u.rotated = f({
                    x: r.x(u),
                    y: r.y(u),
                    z: r.z(u)
                }, o), u.projected = e.project(u.rotated, e)
            }
            c.centroid = a === d ? N([c[d - 1], c[d]]) : {
                x: c[a].rotated.x,
                y: c[a].rotated.y,
                z: c[a].rotated.z
            }
        }
        return t
    }

    function g(t, e, r, o) {
        for (var n = t.length - 1; 0 <= n; n--) {
            var c = t[n],
                d = c[0],
                a = c[1];
            d.rotated = f({
                x: r.x(d),
                y: r.y(d),
                z: r.z(d)
            }, o), a.rotated = f({
                x: r.x(a),
                y: r.y(a),
                z: r.z(a)
            }, o), d.projected = e.project(d.rotated, e), a.projected = e.project(a.rotated, e), c.centroid = N(c)
        }
        return t
    }

    function s(t, e, r, o) {
        for (var n = t.length - 1; 0 <= n; n--) {
            var c = t[n],
                d = c[0],
                a = c[1],
                i = c[2],
                u = c[3];
            d.rotated = f({
                x: r.x(d),
                y: r.y(d),
                z: r.z(d)
            }, o), a.rotated = f({
                x: r.x(a),
                y: r.y(a),
                z: r.z(a)
            }, o), i.rotated = f({
                x: r.x(i),
                y: r.y(i),
                z: r.z(i)
            }, o), u.rotated = f({
                x: r.x(u),
                y: r.y(u),
                z: r.z(u)
            }, o), d.projected = e.project(d.rotated, e), a.projected = e.project(a.rotated, e), i.projected = e.project(i.rotated, e), u.projected = e.project(u.rotated, e), c.ccw = L(c), c.centroid = N(c)
        }
        return t
    }

    function I(t, e, r, o) {
        for (var n = t.length - 1; 0 <= n; n--) {
            var c = t[n],
                d = c[0],
                a = c[1],
                i = c[2];
            d.rotated = f({
                x: r.x(d),
                y: r.y(d),
                z: r.z(d)
            }, o), a.rotated = f({
                x: r.x(a),
                y: r.y(a),
                z: r.z(a)
            }, o), i.rotated = f({
                x: r.x(i),
                y: r.y(i),
                z: r.z(i)
            }, o), d.projected = e.project(d.rotated, e), a.projected = e.project(a.rotated, e), i.projected = e.project(i.rotated, e), c.ccw = L(c), c.centroid = N(c)
        }
        return t
    }

    function E(t) {
        for (var e = t[t.length - 1], r = "M" + e.projected.x + "," + e.projected.y, o = t.length - 2; 0 <= o; o--) {
            var n = t[o].projected;
            r += "L" + n.x + "," + n.y
        }
        return r
    }

    function M(t) {
        return "M" + t[0].projected.x + "," + t[0].projected.y + "L" + t[1].projected.x + "," + t[1].projected.y + "L" + t[2].projected.x + "," + t[2].projected.y + "L" + t[3].projected.x + "," + t[3].projected.y + "Z"
    }

    function P(t) {
        return "M" + t[0].projected.x + "," + t[0].projected.y + "L" + t[1].projected.x + "," + t[1].projected.y + "L" + t[2].projected.x + "," + t[2].projected.y + "Z"
    }

    function R(t, e) {
        return {
            x: e.origin[0] + e.scale * t.x,
            y: e.origin[1] + e.scale * t.y
        }
    }

    function C(t) {
        return t[0]
    }

    function T(t) {
        return t[1]
    }

    function A(t) {
        return t[2]
    }
    t._3d = function() {
        var e = [0, 0],
            r = 1,
            o = R,
            n = 0,
            c = 0,
            d = 0,
            a = [0, 0, 0],
            i = C,
            u = T,
            f = A,
            y = void 0,
            x = "POINT",
            p = {
                CUBE: h,
                GRID: l,
                LINE: g,
                LINE_STRIP: v,
                PLANE: s,
                POINT: w,
                SURFACE: l,
                TRIANGLE: I
            },
            z = {
                CUBE: M,
                GRID: M,
                LINE_STRIP: E,
                PLANE: M,
                SURFACE: M,
                TRIANGLE: P
            };

        function j(t) {
            return p[x](t, {
                scale: r,
                origin: e,
                project: o,
                row: y
            }, {
                x: i,
                y: u,
                z: f
            }, {
                x: n,
                y: c,
                z: d,
                rotateCenter: a
            })
        }
        return j.origin = function(t) {
            return arguments.length ? (e = t, j) : e
        }, j.scale = function(t) {
            return arguments.length ? (r = t, j) : r
        }, j.rotateX = function(t) {
            return arguments.length ? (n = t, j) : n
        }, j.rotateY = function(t) {
            return arguments.length ? (c = t, j) : c
        }, j.rotateZ = function(t) {
            return arguments.length ? (d = t, j) : d
        }, j.shape = function(t, e) {
            return arguments.length ? (x = t, y = e, j) : x
        }, j.rotateCenter = function(t) {
            return arguments.length ? (a = t, j) : a
        }, j.x = function(t) {
            return arguments.length ? (i = "function" == typeof t ? t : +t, j) : i
        }, j.y = function(t) {
            return arguments.length ? (u = "function" == typeof t ? t : +t, j) : u
        }, j.z = function(t) {
            return arguments.length ? (f = "function" == typeof t ? t : +t, j) : f
        }, j.sort = function(t, e) {
            var r = t.centroid.z,
                o = e.centroid.z;
            return r < o ? -1 : o < r ? 1 : o <= r ? 0 : NaN
        }, j.draw = function(t) {
            if ("POINT" !== x && "LINE" !== x) return z[x](t)
        }, j
    }, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});