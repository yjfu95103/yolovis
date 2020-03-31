! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    var c = [],
        d = c.slice,
        e = c.concat,
        f = c.push,
        g = c.indexOf,
        h = {},
        i = h.toString,
        j = h.hasOwnProperty,
        k = {},
        l = a.document,
        m = "2.1.4",
        n = function(a, b) {
            return new n.fn.init(a, b)
        },
        o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        q = /-([\da-z])/gi,
        r = function(a, b) {
            return b.toUpperCase()
        };
    n.fn = n.prototype = {
        jquery: m,
        constructor: n,
        selector: "",
        length: 0,
        toArray: function() {
            return d.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : d.call(this)
        },
        pushStack: function(a) {
            var b = n.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a, b) {
            return n.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(n.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(d.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null)
        },
        push: f,
        sort: c.sort,
        splice: c.splice
    }, n.extend = n.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || n.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (a = arguments[h]))
                for (b in a) c = g[b], d = a[b], g !== d && (j && d && (n.isPlainObject(d) || (e = n.isArray(d))) ? (e ? (e = !1, f = c && n.isArray(c) ? c : []) : f = c && n.isPlainObject(c) ? c : {}, g[b] = n.extend(j, f, d)) : void 0 !== d && (g[b] = d));
        return g
    }, n.extend({
        expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === n.type(a)
        },
        isArray: Array.isArray,
        isWindow: function(a) {
            return null != a && a === a.window
        },
        isNumeric: function(a) {
            return !n.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isPlainObject: function(a) {
            return "object" !== n.type(a) || a.nodeType || n.isWindow(a) ? !1 : a.constructor && !j.call(a.constructor.prototype, "isPrototypeOf") ? !1 : !0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? h[i.call(a)] || "object" : typeof a
        },
        globalEval: function(a) {
            var b, c = eval;
            a = n.trim(a), a && (1 === a.indexOf("use strict") ? (b = l.createElement("script"), b.text = a, l.head.appendChild(b).parentNode.removeChild(b)) : c(a))
        },
        camelCase: function(a) {
            return a.replace(p, "ms-").replace(q, r)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, c) {
            var d, e = 0,
                f = a.length,
                g = s(a);
            if (c) {
                if (g) {
                    for (; f > e; e++)
                        if (d = b.apply(a[e], c), d === !1) break
                } else
                    for (e in a)
                        if (d = b.apply(a[e], c), d === !1) break
            } else if (g) {
                for (; f > e; e++)
                    if (d = b.call(a[e], e, a[e]), d === !1) break
            } else
                for (e in a)
                    if (d = b.call(a[e], e, a[e]), d === !1) break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(o, "")
        },
        makeArray: function(a, b) {
            var c = b || [];
            return null != a && (s(Object(a)) ? n.merge(c, "string" == typeof a ? [a] : a) : f.call(c, a)), c
        },
        inArray: function(a, b, c) {
            return null == b ? -1 : g.call(b, a, c)
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; d++) a[e++] = b[d];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, c) {
            var d, f = 0,
                g = a.length,
                h = s(a),
                i = [];
            if (h)
                for (; g > f; f++) d = b(a[f], f, c), null != d && i.push(d);
            else
                for (f in a) d = b(a[f], f, c), null != d && i.push(d);
            return e.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, e, f;
            return "string" == typeof b && (c = a[b], b = a, a = c), n.isFunction(a) ? (e = d.call(arguments, 2), f = function() {
                return a.apply(b || this, e.concat(d.call(arguments)))
            }, f.guid = a.guid = a.guid || n.guid++, f) : void 0
        },
        now: Date.now,
        support: k
    }), n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        h["[object " + b + "]"] = b.toLowerCase()
    });

    function s(a) {
        var b = "length" in a && a.length,
            c = n.type(a);
        return "function" === c || n.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    var t = function(a) {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u = "sizzle" + 1 * new Date,
            v = a.document,
            w = 0,
            x = 0,
            y = ha(),
            z = ha(),
            A = ha(),
            B = function(a, b) {
                return a === b && (l = !0), 0
            },
            C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            K = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N = M.replace("w", "w#"),
            O = "\\[" + L + "*(" + M + ")(?:" + L + "*([*^$|!~]?=)" + L + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + N + "))|)" + L + "*\\]",
            P = ":(" + M + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + O + ")*)|.*)\\)|)",
            Q = new RegExp(L + "+", "g"),
            R = new RegExp("^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$", "g"),
            S = new RegExp("^" + L + "*," + L + "*"),
            T = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            U = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            V = new RegExp(P),
            W = new RegExp("^" + N + "$"),
            X = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + O),
                PSEUDO: new RegExp("^" + P),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + L + "*(even|odd|(([+-]|)(\\d*)n|)" + L + "*(?:([+-]|)" + L + "*(\\d+)|))" + L + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp("^" + L + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + L + "*((?:-\\d)?\\d*)" + L + "*\\)|)(?=[^-]|$)", "i")
            },
            Y = /^(?:input|select|textarea|button)$/i,
            Z = /^h\d$/i,
            $ = /^[^{]+\{\s*\[native \w/,
            _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            aa = /[+~]/,
            ba = /'|\\/g,
            ca = new RegExp("\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)", "ig"),
            da = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
            },
            ea = function() {
                m()
            };
        try {
            H.apply(E = I.call(v.childNodes), v.childNodes), E[v.childNodes.length].nodeType
        } catch (fa) {
            H = {
                apply: E.length ? function(a, b) {
                    G.apply(a, I.call(b))
                } : function(a, b) {
                    var c = a.length,
                        d = 0;
                    while (a[c++] = b[d++]);
                    a.length = c - 1
                }
            }
        }

        function ga(a, b, d, e) {
            var f, h, j, k, l, o, r, s, w, x;
            if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], k = b.nodeType, "string" != typeof a || !a || 1 !== k && 9 !== k && 11 !== k) return d;
            if (!e && p) {
                if (11 !== k && (f = _.exec(a)))
                    if (j = f[1]) {
                        if (9 === k) {
                            if (h = b.getElementById(j), !h || !h.parentNode) return d;
                            if (h.id === j) return d.push(h), d
                        } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d
                    } else {
                        if (f[2]) return H.apply(d, b.getElementsByTagName(a)), d;
                        if ((j = f[3]) && c.getElementsByClassName) return H.apply(d, b.getElementsByClassName(j)), d
                    } if (c.qsa && (!q || !q.test(a))) {
                    if (s = r = u, w = b, x = 1 !== k && a, 1 === k && "object" !== b.nodeName.toLowerCase()) {
                        o = g(a), (r = b.getAttribute("id")) ? s = r.replace(ba, "\\$&") : b.setAttribute("id", s), s = "[id='" + s + "'] ", l = o.length;
                        while (l--) o[l] = s + ra(o[l]);
                        w = aa.test(a) && pa(b.parentNode) || b, x = o.join(",")
                    }
                    if (x) try {
                        return H.apply(d, w.querySelectorAll(x)), d
                    } catch (y) {} finally {
                        r || b.removeAttribute("id")
                    }
                }
            }
            return i(a.replace(R, "$1"), b, d, e)
        }

        function ha() {
            var a = [];

            function b(c, e) {
                return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e
            }
            return b
        }

        function ia(a) {
            return a[u] = !0, a
        }

        function ja(a) {
            var b = n.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function ka(a, b) {
            var c = a.split("|"),
                e = a.length;
            while (e--) d.attrHandle[c[e]] = b
        }

        function la(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c)
                while (c = c.nextSibling)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function ma(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function na(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function oa(a) {
            return ia(function(b) {
                return b = +b, ia(function(c, d) {
                    var e, f = a([], c.length, b),
                        g = f.length;
                    while (g--) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function pa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        c = ga.support = {}, f = ga.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, m = ga.setDocument = function(a) {
            var b, e, g = a ? a.ownerDocument || a : v;
            return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = g.documentElement, e = g.defaultView, e && e !== e.top && (e.addEventListener ? e.addEventListener("unload", ea, !1) : e.attachEvent && e.attachEvent("onunload", ea)), p = !f(g), c.attributes = ja(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), c.getElementsByTagName = ja(function(a) {
                return a.appendChild(g.createComment("")), !a.getElementsByTagName("*").length
            }), c.getElementsByClassName = $.test(g.getElementsByClassName), c.getById = ja(function(a) {
                return o.appendChild(a).id = u, !g.getElementsByName || !g.getElementsByName(u).length
            }), c.getById ? (d.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && p) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }, d.filter.ID = function(a) {
                var b = a.replace(ca, da);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete d.find.ID, d.filter.ID = function(a) {
                var b = a.replace(ca, da);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), d.find.TAG = c.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    while (c = f[e++]) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, d.find.CLASS = c.getElementsByClassName && function(a, b) {
                return p ? b.getElementsByClassName(a) : void 0
            }, r = [], q = [], (c.qsa = $.test(g.querySelectorAll)) && (ja(function(a) {
                o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\f]' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + L + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + L + "*(?:value|" + K + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]")
            }), ja(function(a) {
                var b = g.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + L + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:")
            })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function(a) {
                c.disconnectedMatch = s.call(a, "div"), s.call(a, "[s!='']:x"), r.push("!=", P)
            }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    while (b = b.parentNode)
                        if (b === a) return !0;
                return !1
            }, B = b ? function(a, b) {
                if (a === b) return l = !0, 0;
                var d = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === g || a.ownerDocument === v && t(v, a) ? -1 : b === g || b.ownerDocument === v && t(v, b) ? 1 : k ? J(k, a) - J(k, b) : 0 : 4 & d ? -1 : 1)
            } : function(a, b) {
                if (a === b) return l = !0, 0;
                var c, d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    h = [a],
                    i = [b];
                if (!e || !f) return a === g ? -1 : b === g ? 1 : e ? -1 : f ? 1 : k ? J(k, a) - J(k, b) : 0;
                if (e === f) return la(a, b);
                c = a;
                while (c = c.parentNode) h.unshift(c);
                c = b;
                while (c = c.parentNode) i.unshift(c);
                while (h[d] === i[d]) d++;
                return d ? la(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0
            }, g) : n
        }, ga.matches = function(a, b) {
            return ga(a, null, null, b)
        }, ga.matchesSelector = function(a, b) {
            if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try {
                var d = s.call(a, b);
                if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return ga(b, n, null, [a]).length > 0
        }, ga.contains = function(a, b) {
            return (a.ownerDocument || a) !== n && m(a), t(a, b)
        }, ga.attr = function(a, b) {
            (a.ownerDocument || a) !== n && m(a);
            var e = d.attrHandle[b.toLowerCase()],
                f = e && D.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;
            return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null
        }, ga.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, ga.uniqueSort = function(a) {
            var b, d = [],
                e = 0,
                f = 0;
            if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
                while (b = a[f++]) b === a[f] && (e = d.push(f));
                while (e--) a.splice(d[e], 1)
            }
            return k = null, a
        }, e = ga.getText = function(a) {
            var b, c = "",
                d = 0,
                f = a.nodeType;
            if (f) {
                if (1 === f || 9 === f || 11 === f) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += e(a)
                } else if (3 === f || 4 === f) return a.nodeValue
            } else
                while (b = a[d++]) c += e(b);
            return c
        }, d = ga.selectors = {
            cacheLength: 50,
            createPseudo: ia,
            match: X,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ca, da), a[3] = (a[3] || a[4] || a[5] || "").replace(ca, da), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ca, da).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = y[a + " "];
                    return b || (b = new RegExp("(^|" + L + ")" + a + "(" + L + "|$)")) && y(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, b, c) {
                    return function(d) {
                        var e = ga.attr(d, a);
                        return null == e ? "!=" === b : b ? (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(Q, " ") + " ").indexOf(c) > -1 : "|=" === b ? e === c || e.slice(0, c.length + 1) === c + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h;
                        if (q) {
                            if (f) {
                                while (p) {
                                    l = b;
                                    while (l = l[p])
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n];
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [w, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w) m = j[1];
                            else
                                while (l = ++n && l && l[p] || (m = n = 0) || o.pop())
                                    if ((h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [w, m]), l === b)) break;
                            return m -= e, m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, b) {
                    var c, e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);
                    return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function(a, c) {
                        var d, f = e(a, b),
                            g = f.length;
                        while (g--) d = J(a, f[g]), a[d] = !(c[d] = f[g])
                    }) : function(a) {
                        return e(a, 0, c)
                    }) : e
                }
            },
            pseudos: {
                not: ia(function(a) {
                    var b = [],
                        c = [],
                        d = h(a.replace(R, "$1"));
                    return d[u] ? ia(function(a, b, c, e) {
                        var f, g = d(a, null, e, []),
                            h = a.length;
                        while (h--)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, e, f) {
                        return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: ia(function(a) {
                    return function(b) {
                        return ga(a, b).length > 0
                    }
                }),
                contains: ia(function(a) {
                    return a = a.replace(ca, da),
                        function(b) {
                            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1
                        }
                }),
                lang: ia(function(a) {
                    return W.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(ca, da).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-"); while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === o
                },
                focus: function(a) {
                    return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !d.pseudos.empty(a)
                },
                header: function(a) {
                    return Z.test(a.nodeName)
                },
                input: function(a) {
                    return Y.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: oa(function() {
                    return [0]
                }),
                last: oa(function(a, b) {
                    return [b - 1]
                }),
                eq: oa(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: oa(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: oa(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: oa(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: oa(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, d.pseudos.nth = d.pseudos.eq;
        for (b in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) d.pseudos[b] = ma(b);
        for (b in {
                submit: !0,
                reset: !0
            }) d.pseudos[b] = na(b);

        function qa() {}
        qa.prototype = d.filters = d.pseudos, d.setFilters = new qa, g = ga.tokenize = function(a, b) {
            var c, e, f, g, h, i, j, k = z[a + " "];
            if (k) return b ? 0 : k.slice(0);
            h = a, i = [], j = d.preFilter;
            while (h) {
                (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({
                    value: c,
                    type: e[0].replace(R, " ")
                }), h = h.slice(c.length));
                for (g in d.filter) !(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({
                    value: c,
                    type: g,
                    matches: e
                }), h = h.slice(c.length));
                if (!c) break
            }
            return b ? h.length : h ? ga.error(a) : z(a, i).slice(0)
        };

        function ra(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function sa(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first ? function(b, c, f) {
                while (b = b[d])
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j = [w, f];
                if (g) {
                    while (b = b[d])
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    while (b = b[d])
                        if (1 === b.nodeType || e) {
                            if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2];
                            if (i[d] = j, j[2] = a(b, c, g)) return !0
                        }
            }
        }

        function ta(a) {
            return a.length > 1 ? function(b, c, d) {
                var e = a.length;
                while (e--)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function ua(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) ga(a, b[d], c);
            return c
        }

        function va(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h));
            return g
        }

        function wa(a, b, c, d, e, f) {
            return d && !d[u] && (d = wa(d)), e && !e[u] && (e = wa(e, f)), ia(function(f, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    p = f || ua(b || "*", h.nodeType ? [h] : h, []),
                    q = !a || !f && b ? p : va(p, m, a, h, i),
                    r = c ? e || (f ? a : o || d) ? [] : g : q;
                if (c && c(q, r, h, i), d) {
                    j = va(r, n), d(j, [], h, i), k = j.length;
                    while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l))
                }
                if (f) {
                    if (e || a) {
                        if (e) {
                            j = [], k = r.length;
                            while (k--)(l = r[k]) && j.push(q[k] = l);
                            e(null, r = [], j, i)
                        }
                        k = r.length;
                        while (k--)(l = r[k]) && (j = e ? J(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l))
                    }
                } else r = va(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : H.apply(g, r)
            })
        }

        function xa(a) {
            for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = sa(function(a) {
                    return a === b
                }, h, !0), l = sa(function(a) {
                    return J(b, a) > -1
                }, h, !0), m = [function(a, c, d) {
                    var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                    return b = null, e
                }]; f > i; i++)
                if (c = d.relative[a[i].type]) m = [sa(ta(m), c)];
                else {
                    if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type]) break;
                        return wa(i > 1 && ta(m), i > 1 && ra(a.slice(0, i - 1).concat({
                            value: " " === a[i - 2].type ? "*" : ""
                        })).replace(R, "$1"), c, e > i && xa(a.slice(i, e)), f > e && xa(a = a.slice(e)), f > e && ra(a))
                    }
                    m.push(c)
                } return ta(m)
        }

        function ya(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function(f, g, h, i, k) {
                    var l, m, o, p = 0,
                        q = "0",
                        r = f && [],
                        s = [],
                        t = j,
                        u = f || e && d.find.TAG("*", k),
                        v = w += null == t ? 1 : Math.random() || .1,
                        x = u.length;
                    for (k && (j = g !== n && g); q !== x && null != (l = u[q]); q++) {
                        if (e && l) {
                            m = 0;
                            while (o = a[m++])
                                if (o(l, g, h)) {
                                    i.push(l);
                                    break
                                } k && (w = v)
                        }
                        c && ((l = !o && l) && p--, f && r.push(l))
                    }
                    if (p += q, c && q !== p) {
                        m = 0;
                        while (o = b[m++]) o(r, s, g, h);
                        if (f) {
                            if (p > 0)
                                while (q--) r[q] || s[q] || (s[q] = F.call(i));
                            s = va(s)
                        }
                        H.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && ga.uniqueSort(i)
                    }
                    return k && (w = v, j = t), r
                };
            return c ? ia(f) : f
        }
        return h = ga.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = A[a + " "];
            if (!f) {
                b || (b = g(a)), c = b.length;
                while (c--) f = xa(b[c]), f[u] ? d.push(f) : e.push(f);
                f = A(a, ya(e, d)), f.selector = a
            }
            return f
        }, i = ga.select = function(a, b, e, f) {
            var i, j, k, l, m, n = "function" == typeof a && a,
                o = !f && g(a = n.selector || a);
            if (e = e || [], 1 === o.length) {
                if (j = o[0] = o[0].slice(0), j.length > 2 && "ID" === (k = j[0]).type && c.getById && 9 === b.nodeType && p && d.relative[j[1].type]) {
                    if (b = (d.find.ID(k.matches[0].replace(ca, da), b) || [])[0], !b) return e;
                    n && (b = b.parentNode), a = a.slice(j.shift().value.length)
                }
                i = X.needsContext.test(a) ? 0 : j.length;
                while (i--) {
                    if (k = j[i], d.relative[l = k.type]) break;
                    if ((m = d.find[l]) && (f = m(k.matches[0].replace(ca, da), aa.test(j[0].type) && pa(b.parentNode) || b))) {
                        if (j.splice(i, 1), a = f.length && ra(j), !a) return H.apply(e, f), e;
                        break
                    }
                }
            }
            return (n || h(a, o))(f, b, !p, e, aa.test(a) && pa(b.parentNode) || b), e
        }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function(a) {
            return 1 & a.compareDocumentPosition(n.createElement("div"))
        }), ja(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || ka("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), c.attributes && ja(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || ka("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), ja(function(a) {
            return null == a.getAttribute("disabled")
        }) || ka(K, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), ga
    }(a);
    n.find = t, n.expr = t.selectors, n.expr[":"] = n.expr.pseudos, n.unique = t.uniqueSort, n.text = t.getText, n.isXMLDoc = t.isXML, n.contains = t.contains;
    var u = n.expr.match.needsContext,
        v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        w = /^.[^:#\[\.,]*$/;

    function x(a, b, c) {
        if (n.isFunction(b)) return n.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return n.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (w.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a)
        }
        return n.grep(a, function(a) {
            return g.call(b, a) >= 0 !== c
        })
    }
    n.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? n.find.matchesSelector(d, a) ? [d] : [] : n.find.matches(a, n.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, n.fn.extend({
        find: function(a) {
            var b, c = this.length,
                d = [],
                e = this;
            if ("string" != typeof a) return this.pushStack(n(a).filter(function() {
                for (b = 0; c > b; b++)
                    if (n.contains(e[b], this)) return !0
            }));
            for (b = 0; c > b; b++) n.find(a, e[b], d);
            return d = this.pushStack(c > 1 ? n.unique(d) : d), d.selector = this.selector ? this.selector + " " + a : a, d
        },
        filter: function(a) {
            return this.pushStack(x(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(x(this, a || [], !0))
        },
        is: function(a) {
            return !!x(this, "string" == typeof a && u.test(a) ? n(a) : a || [], !1).length
        }
    });
    var y, z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        A = n.fn.init = function(a, b) {
            var c, d;
            if (!a) return this;
            if ("string" == typeof a) {
                if (c = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || y).find(a) : this.constructor(b).find(a);
                if (c[1]) {
                    if (b = b instanceof n ? b[0] : b, n.merge(this, n.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : l, !0)), v.test(c[1]) && n.isPlainObject(b))
                        for (c in b) n.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                    return this
                }
                return d = l.getElementById(c[2]), d && d.parentNode && (this.length = 1, this[0] = d), this.context = l, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : n.isFunction(a) ? "undefined" != typeof y.ready ? y.ready(a) : a(n) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), n.makeArray(a, this))
        };
    A.prototype = n.fn, y = n(l);
    var B = /^(?:parents|prev(?:Until|All))/,
        C = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    n.extend({
        dir: function(a, b, c) {
            var d = [],
                e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType)
                if (1 === a.nodeType) {
                    if (e && n(a).is(c)) break;
                    d.push(a)
                } return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }), n.fn.extend({
        has: function(a) {
            var b = n(a, this),
                c = b.length;
            return this.filter(function() {
                for (var a = 0; c > a; a++)
                    if (n.contains(this, b[a])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = u.test(a) || "string" != typeof a ? n(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && n.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    } return this.pushStack(f.length > 1 ? n.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? g.call(n(a), this[0]) : g.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(n.unique(n.merge(this.get(), n(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    });

    function D(a, b) {
        while ((a = a[b]) && 1 !== a.nodeType);
        return a
    }
    n.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return n.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return n.dir(a, "parentNode", c)
        },
        next: function(a) {
            return D(a, "nextSibling")
        },
        prev: function(a) {
            return D(a, "previousSibling")
        },
        nextAll: function(a) {
            return n.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return n.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return n.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return n.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return n.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return n.sibling(a.firstChild)
        },
        contents: function(a) {
            return a.contentDocument || n.merge([], a.childNodes)
        }
    }, function(a, b) {
        n.fn[a] = function(c, d) {
            var e = n.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = n.filter(d, e)), this.length > 1 && (C[a] || n.unique(e), B.test(a) && e.reverse()), this.pushStack(e)
        }
    });
    var E = /\S+/g,
        F = {};

    function G(a) {
        var b = F[a] = {};
        return n.each(a.match(E) || [], function(a, c) {
            b[c] = !0
        }), b
    }
    n.Callbacks = function(a) {
        a = "string" == typeof a ? F[a] || G(a) : n.extend({}, a);
        var b, c, d, e, f, g, h = [],
            i = !a.once && [],
            j = function(l) {
                for (b = a.memory && l, c = !0, g = e || 0, e = 0, f = h.length, d = !0; h && f > g; g++)
                    if (h[g].apply(l[0], l[1]) === !1 && a.stopOnFalse) {
                        b = !1;
                        break
                    } d = !1, h && (i ? i.length && j(i.shift()) : b ? h = [] : k.disable())
            },
            k = {
                add: function() {
                    if (h) {
                        var c = h.length;
                        ! function g(b) {
                            n.each(b, function(b, c) {
                                var d = n.type(c);
                                "function" === d ? a.unique && k.has(c) || h.push(c) : c && c.length && "string" !== d && g(c)
                            })
                        }(arguments), d ? f = h.length : b && (e = c, j(b))
                    }
                    return this
                },
                remove: function() {
                    return h && n.each(arguments, function(a, b) {
                        var c;
                        while ((c = n.inArray(b, h, c)) > -1) h.splice(c, 1), d && (f >= c && f--, g >= c && g--)
                    }), this
                },
                has: function(a) {
                    return a ? n.inArray(a, h) > -1 : !(!h || !h.length)
                },
                empty: function() {
                    return h = [], f = 0, this
                },
                disable: function() {
                    return h = i = b = void 0, this
                },
                disabled: function() {
                    return !h
                },
                lock: function() {
                    return i = void 0, b || k.disable(), this
                },
                locked: function() {
                    return !i
                },
                fireWith: function(a, b) {
                    return !h || c && !i || (b = b || [], b = [a, b.slice ? b.slice() : b], d ? i.push(b) : j(b)), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!c
                }
            };
        return k
    }, n.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", n.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", n.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", n.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return n.Deferred(function(c) {
                            n.each(b, function(b, f) {
                                var g = n.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && n.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? n.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, n.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b = 0,
                c = d.call(arguments),
                e = c.length,
                f = 1 !== e || a && n.isFunction(a.promise) ? e : 0,
                g = 1 === f ? a : n.Deferred(),
                h = function(a, b, c) {
                    return function(e) {
                        b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c)
                    }
                },
                i, j, k;
            if (e > 1)
                for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) c[b] && n.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject).progress(h(b, j, i)) : --f;
            return f || g.resolveWith(k, c), g.promise()
        }
    });
    var H;
    n.fn.ready = function(a) {
        return n.ready.promise().done(a), this
    }, n.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? n.readyWait++ : n.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --n.readyWait : n.isReady) || (n.isReady = !0, a !== !0 && --n.readyWait > 0 || (H.resolveWith(l, [n]), n.fn.triggerHandler && (n(l).triggerHandler("ready"), n(l).off("ready"))))
        }
    });

    function I() {
        l.removeEventListener("DOMContentLoaded", I, !1), a.removeEventListener("load", I, !1), n.ready()
    }
    n.ready.promise = function(b) {
        return H || (H = n.Deferred(), "complete" === l.readyState ? setTimeout(n.ready) : (l.addEventListener("DOMContentLoaded", I, !1), a.addEventListener("load", I, !1))), H.promise(b)
    }, n.ready.promise();
    var J = n.access = function(a, b, c, d, e, f, g) {
        var h = 0,
            i = a.length,
            j = null == c;
        if ("object" === n.type(c)) {
            e = !0;
            for (h in c) n.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0, n.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                return j.call(n(a), c)
            })), b))
            for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    };
    n.acceptData = function(a) {
        return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType
    };

    function K() {
        Object.defineProperty(this.cache = {}, 0, {
            get: function() {
                return {}
            }
        }), this.expando = n.expando + K.uid++
    }
    K.uid = 1, K.accepts = n.acceptData, K.prototype = {
        key: function(a) {
            if (!K.accepts(a)) return 0;
            var b = {},
                c = a[this.expando];
            if (!c) {
                c = K.uid++;
                try {
                    b[this.expando] = {
                        value: c
                    }, Object.defineProperties(a, b)
                } catch (d) {
                    b[this.expando] = c, n.extend(a, b)
                }
            }
            return this.cache[c] || (this.cache[c] = {}), c
        },
        set: function(a, b, c) {
            var d, e = this.key(a),
                f = this.cache[e];
            if ("string" == typeof b) f[b] = c;
            else if (n.isEmptyObject(f)) n.extend(this.cache[e], b);
            else
                for (d in b) f[d] = b[d];
            return f
        },
        get: function(a, b) {
            var c = this.cache[this.key(a)];
            return void 0 === b ? c : c[b]
        },
        access: function(a, b, c) {
            var d;
            return void 0 === b || b && "string" == typeof b && void 0 === c ? (d = this.get(a, b), void 0 !== d ? d : this.get(a, n.camelCase(b))) : (this.set(a, b, c), void 0 !== c ? c : b)
        },
        remove: function(a, b) {
            var c, d, e, f = this.key(a),
                g = this.cache[f];
            if (void 0 === b) this.cache[f] = {};
            else {
                n.isArray(b) ? d = b.concat(b.map(n.camelCase)) : (e = n.camelCase(b), b in g ? d = [b, e] : (d = e, d = d in g ? [d] : d.match(E) || [])), c = d.length;
                while (c--) delete g[d[c]]
            }
        },
        hasData: function(a) {
            return !n.isEmptyObject(this.cache[a[this.expando]] || {})
        },
        discard: function(a) {
            a[this.expando] && delete this.cache[a[this.expando]]
        }
    };
    var L = new K,
        M = new K,
        N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        O = /([A-Z])/g;

    function P(a, b, c) {
        var d;
        if (void 0 === c && 1 === a.nodeType)
            if (d = "data-" + b.replace(O, "-$1").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : N.test(c) ? n.parseJSON(c) : c
                } catch (e) {}
                M.set(a, b, c)
            } else c = void 0;
        return c
    }
    n.extend({
        hasData: function(a) {
            return M.hasData(a) || L.hasData(a)
        },
        data: function(a, b, c) {
            return M.access(a, b, c)
        },
        removeData: function(a, b) {
            M.remove(a, b)
        },
        _data: function(a, b, c) {
            return L.access(a, b, c)
        },
        _removeData: function(a, b) {
            L.remove(a, b)
        }
    }), n.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0],
                g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = M.get(f), 1 === f.nodeType && !L.get(f, "hasDataAttrs"))) {
                    c = g.length;
                    while (c--) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = n.camelCase(d.slice(5)), P(f, d, e[d])));
                    L.set(f, "hasDataAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                M.set(this, a)
            }) : J(this, function(b) {
                var c, d = n.camelCase(a);
                if (f && void 0 === b) {
                    if (c = M.get(f, a), void 0 !== c) return c;
                    if (c = M.get(f, d), void 0 !== c) return c;
                    if (c = P(f, d, void 0), void 0 !== c) return c
                } else this.each(function() {
                    var c = M.get(this, d);
                    M.set(this, d, b), -1 !== a.indexOf("-") && void 0 !== c && M.set(this, a, b)
                })
            }, null, b, arguments.length > 1, null, !0)
        },
        removeData: function(a) {
            return this.each(function() {
                M.remove(this, a)
            })
        }
    }), n.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue", d = L.get(a, b), c && (!d || n.isArray(c) ? d = L.access(a, b, n.makeArray(c)) : d.push(c)), d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = n.queue(a, b),
                d = c.length,
                e = c.shift(),
                f = n._queueHooks(a, b),
                g = function() {
                    n.dequeue(a, b)
                };
            "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return L.get(a, c) || L.access(a, c, {
                empty: n.Callbacks("once memory").add(function() {
                    L.remove(a, [b + "queue", c])
                })
            })
        }
    }), n.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? n.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = n.queue(this, a, b);
                n._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && n.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                n.dequeue(this, a)
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1,
                e = n.Deferred(),
                f = this,
                g = this.length,
                h = function() {
                    --d || e.resolveWith(f, [f])
                };
            "string" != typeof a && (b = a, a = void 0), a = a || "fx";
            while (g--) c = L.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
            return h(), e.promise(b)
        }
    });
    var Q = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        R = ["Top", "Right", "Bottom", "Left"],
        S = function(a, b) {
            return a = b || a, "none" === n.css(a, "display") || !n.contains(a.ownerDocument, a)
        },
        T = /^(?:checkbox|radio)$/i;
    ! function() {
        var a = l.createDocumentFragment(),
            b = a.appendChild(l.createElement("div")),
            c = l.createElement("input");
        c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue
    }();
    var U = "undefined";
    k.focusinBubbles = "onfocusin" in a;
    var V = /^key/,
        W = /^(?:mouse|pointer|contextmenu)|click/,
        X = /^(?:focusinfocus|focusoutblur)$/,
        Y = /^([^.]*)(?:\.(.+)|)$/;

    function Z() {
        return !0
    }

    function $() {
        return !1
    }

    function _() {
        try {
            return l.activeElement
        } catch (a) {}
    }
    n.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.get(a);
            if (r) {
                c.handler && (f = c, c = f.handler, e = f.selector), c.guid || (c.guid = n.guid++), (i = r.events) || (i = r.events = {}), (g = r.handle) || (g = r.handle = function(b) {
                    return typeof n !== U && n.event.triggered !== b.type ? n.event.dispatch.apply(a, arguments) : void 0
                }), b = (b || "").match(E) || [""], j = b.length;
                while (j--) h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o && (l = n.event.special[o] || {}, o = (e ? l.delegateType : l.bindType) || o, l = n.event.special[o] || {}, k = n.extend({
                    type: o,
                    origType: q,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && n.expr.match.needsContext.test(e),
                    namespace: p.join(".")
                }, f), (m = i[o]) || (m = i[o] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, p, g) !== !1 || a.addEventListener && a.addEventListener(o, g, !1)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), n.event.global[o] = !0)
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, o, p, q, r = L.hasData(a) && L.get(a);
            if (r && (i = r.events)) {
                b = (b || "").match(E) || [""], j = b.length;
                while (j--)
                    if (h = Y.exec(b[j]) || [], o = q = h[1], p = (h[2] || "").split(".").sort(), o) {
                        l = n.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, m = i[o] || [], h = h[2] && new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;
                        while (f--) k = m[f], !e && q !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
                        g && !m.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || n.removeEvent(a, o, r.handle), delete i[o])
                    } else
                        for (o in i) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(i) && (delete r.handle, L.remove(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, k, m, o, p = [d || l],
                q = j.call(b, "type") ? b.type : b,
                r = j.call(b, "namespace") ? b.namespace.split(".") : [];
            if (g = h = d = d || l, 3 !== d.nodeType && 8 !== d.nodeType && !X.test(q + n.event.triggered) && (q.indexOf(".") >= 0 && (r = q.split("."), q = r.shift(), r.sort()), k = q.indexOf(":") < 0 && "on" + q, b = b[n.expando] ? b : new n.Event(q, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = r.join("."), b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : n.makeArray(c, [b]), o = n.event.special[q] || {}, e || !o.trigger || o.trigger.apply(d, c) !== !1)) {
                if (!e && !o.noBubble && !n.isWindow(d)) {
                    for (i = o.delegateType || q, X.test(i + q) || (g = g.parentNode); g; g = g.parentNode) p.push(g), h = g;
                    h === (d.ownerDocument || l) && p.push(h.defaultView || h.parentWindow || a)
                }
                f = 0;
                while ((g = p[f++]) && !b.isPropagationStopped()) b.type = f > 1 ? i : o.bindType || q, m = (L.get(g, "events") || {})[b.type] && L.get(g, "handle"), m && m.apply(g, c), m = k && g[k], m && m.apply && n.acceptData(g) && (b.result = m.apply(g, c), b.result === !1 && b.preventDefault());
                return b.type = q, e || b.isDefaultPrevented() || o._default && o._default.apply(p.pop(), c) !== !1 || !n.acceptData(d) || k && n.isFunction(d[q]) && !n.isWindow(d) && (h = d[k], h && (d[k] = null), n.event.triggered = q, d[q](), n.event.triggered = void 0, h && (d[k] = h)), b.result
            }
        },
        dispatch: function(a) {
            a = n.event.fix(a);
            var b, c, e, f, g, h = [],
                i = d.call(arguments),
                j = (L.get(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};
            if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) {
                h = n.event.handlers.call(this, a, j), b = 0;
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    a.currentTarget = f.elem, c = 0;
                    while ((g = f.handlers[c++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(g.namespace)) && (a.handleObj = g, a.data = g.data, e = ((n.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (a.result = e) === !1 && (a.preventDefault(), a.stopPropagation()))
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i !== this; i = i.parentNode || this)
                    if (i.disabled !== !0 || "click" !== a.type) {
                        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? n(e, this).index(i) >= 0 : n.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    } return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button;
                return null == a.pageX && null != b.clientX && (c = a.target.ownerDocument || l, d = c.documentElement, e = c.body, a.pageX = b.clientX + (d && d.scrollLeft || e && e.scrollLeft || 0) - (d && d.clientLeft || e && e.clientLeft || 0), a.pageY = b.clientY + (d && d.scrollTop || e && e.scrollTop || 0) - (d && d.clientTop || e && e.clientTop || 0)), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        fix: function(a) {
            if (a[n.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            g || (this.fixHooks[e] = g = W.test(e) ? this.mouseHooks : V.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new n.Event(f), b = d.length;
            while (b--) c = d[b], a[c] = f[c];
            return a.target || (a.target = l), 3 === a.target.nodeType && (a.target = a.target.parentNode), g.filter ? g.filter(a, f) : a
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    return this !== _() && this.focus ? (this.focus(), !1) : void 0
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === _() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return "checkbox" === this.type && this.click && n.nodeName(this, "input") ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return n.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = n.extend(new n.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? n.event.trigger(e, null, b) : n.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, n.removeEvent = function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }, n.Event = function(a, b) {
        return this instanceof n.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? Z : $) : this.type = a, b && n.extend(this, b), this.timeStamp = a && a.timeStamp || n.now(), void(this[n.expando] = !0)) : new n.Event(a, b)
    }, n.Event.prototype = {
        isDefaultPrevented: $,
        isPropagationStopped: $,
        isImmediatePropagationStopped: $,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = Z, a && a.preventDefault && a.preventDefault()
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = Z, a && a.stopPropagation && a.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = Z, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, n.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        n.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return (!e || e !== d && !n.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), k.focusinBubbles || n.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            n.event.simulate(b, a.target, n.event.fix(a), !0)
        };
        n.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = L.access(d, b);
                e || d.addEventListener(a, c, !0), L.access(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = L.access(d, b) - 1;
                e ? L.access(d, b, e) : (d.removeEventListener(a, c, !0), L.remove(d, b))
            }
        }
    }), n.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b, b = void 0);
                for (g in a) this.on(g, b, c, a[g], e);
                return this
            }
            if (null == c && null == d ? (d = b, c = b = void 0) : null == d && ("string" == typeof b ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1) d = $;
            else if (!d) return this;
            return 1 === e && (f = d, d = function(a) {
                return n().off(a), f.apply(this, arguments)
            }, d.guid = f.guid || (f.guid = n.guid++)), this.each(function() {
                n.event.add(this, a, d, c, b)
            })
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, n(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b, b = void 0), c === !1 && (c = $), this.each(function() {
                n.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                n.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? n.event.trigger(a, b, c, !0) : void 0
        }
    });
    var aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        ba = /<([\w:]+)/,
        ca = /<|&#?\w+;/,
        da = /<(?:script|style|link)/i,
        ea = /checked\s*(?:[^=]|=\s*.checked.)/i,
        fa = /^$|\/(?:java|ecma)script/i,
        ga = /^true\/(.*)/,
        ha = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        ia = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    ia.optgroup = ia.option, ia.tbody = ia.tfoot = ia.colgroup = ia.caption = ia.thead, ia.th = ia.td;

    function ja(a, b) {
        return n.nodeName(a, "table") && n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function ka(a) {
        return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a
    }

    function la(a) {
        var b = ga.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function ma(a, b) {
        for (var c = 0, d = a.length; d > c; c++) L.set(a[c], "globalEval", !b || L.get(b[c], "globalEval"))
    }

    function na(a, b) {
        var c, d, e, f, g, h, i, j;
        if (1 === b.nodeType) {
            if (L.hasData(a) && (f = L.access(a), g = L.set(b, f), j = f.events)) {
                delete g.handle, g.events = {};
                for (e in j)
                    for (c = 0, d = j[e].length; d > c; c++) n.event.add(b, e, j[e][c])
            }
            M.hasData(a) && (h = M.access(a), i = n.extend({}, h), M.set(b, i))
        }
    }

    function oa(a, b) {
        var c = a.getElementsByTagName ? a.getElementsByTagName(b || "*") : a.querySelectorAll ? a.querySelectorAll(b || "*") : [];
        return void 0 === b || b && n.nodeName(a, b) ? n.merge([a], c) : c
    }

    function pa(a, b) {
        var c = b.nodeName.toLowerCase();
        "input" === c && T.test(a.type) ? b.checked = a.checked : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
    }
    n.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h = a.cloneNode(!0),
                i = n.contains(a.ownerDocument, a);
            if (!(k.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || n.isXMLDoc(a)))
                for (g = oa(h), f = oa(a), d = 0, e = f.length; e > d; d++) pa(f[d], g[d]);
            if (b)
                if (c)
                    for (f = f || oa(a), g = g || oa(h), d = 0, e = f.length; e > d; d++) na(f[d], g[d]);
                else na(a, h);
            return g = oa(h, "script"), g.length > 0 && ma(g, !i && oa(a, "script")), h
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k = b.createDocumentFragment(), l = [], m = 0, o = a.length; o > m; m++)
                if (e = a[m], e || 0 === e)
                    if ("object" === n.type(e)) n.merge(l, e.nodeType ? [e] : e);
                    else if (ca.test(e)) {
                f = f || k.appendChild(b.createElement("div")), g = (ba.exec(e) || ["", ""])[1].toLowerCase(), h = ia[g] || ia._default, f.innerHTML = h[1] + e.replace(aa, "<$1></$2>") + h[2], j = h[0];
                while (j--) f = f.lastChild;
                n.merge(l, f.childNodes), f = k.firstChild, f.textContent = ""
            } else l.push(b.createTextNode(e));
            k.textContent = "", m = 0;
            while (e = l[m++])
                if ((!d || -1 === n.inArray(e, d)) && (i = n.contains(e.ownerDocument, e), f = oa(k.appendChild(e), "script"), i && ma(f), c)) {
                    j = 0;
                    while (e = f[j++]) fa.test(e.type || "") && c.push(e)
                } return k
        },
        cleanData: function(a) {
            for (var b, c, d, e, f = n.event.special, g = 0; void 0 !== (c = a[g]); g++) {
                if (n.acceptData(c) && (e = c[L.expando], e && (b = L.cache[e]))) {
                    if (b.events)
                        for (d in b.events) f[d] ? n.event.remove(c, d) : n.removeEvent(c, d, b.handle);
                    L.cache[e] && delete L.cache[e]
                }
                delete M.cache[c[M.expando]]
            }
        }
    }), n.fn.extend({
        text: function(a) {
            return J(this, function(a) {
                return void 0 === a ? n.text(this) : this.empty().each(function() {
                    (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = a)
                })
            }, null, a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = ja(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = ja(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        remove: function(a, b) {
            for (var c, d = a ? n.filter(a, this) : this, e = 0; null != (c = d[e]); e++) b || 1 !== c.nodeType || n.cleanData(oa(c)), c.parentNode && (b && n.contains(c.ownerDocument, c) && ma(oa(c, "script")), c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) 1 === a.nodeType && (n.cleanData(oa(a, !1)), a.textContent = "");
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return n.clone(this, a, b)
            })
        },
        html: function(a) {
            return J(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a && 1 === b.nodeType) return b.innerHTML;
                if ("string" == typeof a && !da.test(a) && !ia[(ba.exec(a) || ["", ""])[1].toLowerCase()]) {
                    a = a.replace(aa, "<$1></$2>");
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (n.cleanData(oa(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode, n.cleanData(oa(this)), a && a.replaceChild(b, this)
            }), a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = e.apply([], a);
            var c, d, f, g, h, i, j = 0,
                l = this.length,
                m = this,
                o = l - 1,
                p = a[0],
                q = n.isFunction(p);
            if (q || l > 1 && "string" == typeof p && !k.checkClone && ea.test(p)) return this.each(function(c) {
                var d = m.eq(c);
                q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b)
            });
            if (l && (c = n.buildFragment(a, this[0].ownerDocument, !1, this), d = c.firstChild, 1 === c.childNodes.length && (c = d), d)) {
                for (f = n.map(oa(c, "script"), ka), g = f.length; l > j; j++) h = c, j !== o && (h = n.clone(h, !0, !0), g && n.merge(f, oa(h, "script"))), b.call(this[j], h, j);
                if (g)
                    for (i = f[f.length - 1].ownerDocument, n.map(f, la), j = 0; g > j; j++) h = f[j], fa.test(h.type || "") && !L.access(h, "globalEval") && n.contains(i, h) && (h.src ? n._evalUrl && n._evalUrl(h.src) : n.globalEval(h.textContent.replace(ha, "")))
            }
            return this
        }
    }), n.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        n.fn[a] = function(a) {
            for (var c, d = [], e = n(a), g = e.length - 1, h = 0; g >= h; h++) c = h === g ? this : this.clone(!0), n(e[h])[b](c), f.apply(d, c.get());
            return this.pushStack(d)
        }
    });
    var qa, ra = {};

    function sa(b, c) {
        var d, e = n(c.createElement(b)).appendTo(c.body),
            f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : n.css(e[0], "display");
        return e.detach(), f
    }

    function ta(a) {
        var b = l,
            c = ra[a];
        return c || (c = sa(a, b), "none" !== c && c || (qa = (qa || n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = qa[0].contentDocument, b.write(), b.close(), c = sa(a, b), qa.detach()), ra[a] = c), c
    }
    var ua = /^margin/,
        va = new RegExp("^(" + Q + ")(?!px)[a-z%]+$", "i"),
        wa = function(b) {
            return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null) : a.getComputedStyle(b, null)
        };

    function xa(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || wa(a), c && (g = c.getPropertyValue(b) || c[b]), c && ("" !== g || n.contains(a.ownerDocument, a) || (g = n.style(a, b)), va.test(g) && ua.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function ya(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }! function() {
        var b, c, d = l.documentElement,
            e = l.createElement("div"),
            f = l.createElement("div");
        if (f.style) {
            f.style.backgroundClip = "content-box", f.cloneNode(!0).style.backgroundClip = "", k.clearCloneStyle = "content-box" === f.style.backgroundClip, e.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute", e.appendChild(f);

            function g() {
                f.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute", f.innerHTML = "", d.appendChild(e);
                var g = a.getComputedStyle(f, null);
                b = "1%" !== g.top, c = "4px" === g.width, d.removeChild(e)
            }
            a.getComputedStyle && n.extend(k, {
                pixelPosition: function() {
                    return g(), b
                },
                boxSizingReliable: function() {
                    return null == c && g(), c
                },
                reliableMarginRight: function() {
                    var b, c = f.appendChild(l.createElement("div"));
                    return c.style.cssText = f.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", c.style.marginRight = c.style.width = "0", f.style.width = "1px", d.appendChild(e), b = !parseFloat(a.getComputedStyle(c, null).marginRight), d.removeChild(e), f.removeChild(c), b
                }
            })
        }
    }(), n.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b) g[f] = a.style[f], a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b) a.style[f] = g[f];
        return e
    };
    var za = /^(none|table(?!-c[ea]).+)/,
        Aa = new RegExp("^(" + Q + ")(.*)$", "i"),
        Ba = new RegExp("^([+-])=(" + Q + ")", "i"),
        Ca = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Da = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ea = ["Webkit", "O", "Moz", "ms"];

    function Fa(a, b) {
        if (b in a) return b;
        var c = b[0].toUpperCase() + b.slice(1),
            d = b,
            e = Ea.length;
        while (e--)
            if (b = Ea[e] + c, b in a) return b;
        return d
    }

    function Ga(a, b, c) {
        var d = Aa.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function Ha(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += n.css(a, c + R[f], !0, e)), d ? ("content" === c && (g -= n.css(a, "padding" + R[f], !0, e)), "margin" !== c && (g -= n.css(a, "border" + R[f] + "Width", !0, e))) : (g += n.css(a, "padding" + R[f], !0, e), "padding" !== c && (g += n.css(a, "border" + R[f] + "Width", !0, e)));
        return g
    }

    function Ia(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = wa(a),
            g = "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = xa(a, b, f), (0 > e || null == e) && (e = a.style[b]), va.test(e)) return e;
            d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + Ha(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function Ja(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = L.get(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && S(d) && (f[g] = L.access(d, "olddisplay", ta(d.nodeName)))) : (e = S(d), "none" === c && e || L.set(d, "olddisplay", e ? c : n.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = xa(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = n.camelCase(b),
                    i = a.style;
                return b = n.cssProps[h] || (n.cssProps[h] = Fa(i, h)), g = n.cssHooks[b] || n.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b] : (f = typeof c, "string" === f && (e = Ba.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(n.css(a, b)), f = "number"), null != c && c === c && ("number" !== f || n.cssNumber[h] || (c += "px"), k.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i[b] = c)), void 0)
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = n.camelCase(b);
            return b = n.cssProps[h] || (n.cssProps[h] = Fa(a.style, h)), g = n.cssHooks[b] || n.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = xa(a, b, d)), "normal" === e && b in Da && (e = Da[b]), "" === c || c ? (f = parseFloat(e), c === !0 || n.isNumeric(f) ? f || 0 : e) : e
        }
    }), n.each(["height", "width"], function(a, b) {
        n.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? za.test(n.css(a, "display")) && 0 === a.offsetWidth ? n.swap(a, Ca, function() {
                    return Ia(a, b, d)
                }) : Ia(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && wa(a);
                return Ga(a, c, d ? Ha(a, b, d, "border-box" === n.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), n.cssHooks.marginRight = ya(k.reliableMarginRight, function(a, b) {
        return b ? n.swap(a, {
            display: "inline-block"
        }, xa, [a, "marginRight"]) : void 0
    }), n.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        n.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + R[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, ua.test(a) || (n.cssHooks[a + b].set = Ga)
    }), n.fn.extend({
        css: function(a, b) {
            return J(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (n.isArray(b)) {
                    for (d = wa(a), e = b.length; e > g; g++) f[b[g]] = n.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? n.style(a, b, c) : n.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return Ja(this, !0)
        },
        hide: function() {
            return Ja(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                S(this) ? n(this).show() : n(this).hide()
            })
        }
    });

    function Ka(a, b, c, d, e) {
        return new Ka.prototype.init(a, b, c, d, e)
    }
    n.Tween = Ka, Ka.prototype = {
        constructor: Ka,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (n.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = Ka.propHooks[this.prop];
            return a && a.get ? a.get(this) : Ka.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = Ka.propHooks[this.prop];
            return this.options.duration ? this.pos = b = n.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Ka.propHooks._default.set(this), this
        }
    }, Ka.prototype.init.prototype = Ka.prototype, Ka.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null == a.elem[a.prop] || a.elem.style && null != a.elem.style[a.prop] ? (b = n.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                n.fx.step[a.prop] ? n.fx.step[a.prop](a) : a.elem.style && (null != a.elem.style[n.cssProps[a.prop]] || n.cssHooks[a.prop]) ? n.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    }, Ka.propHooks.scrollTop = Ka.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, n.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    }, n.fx = Ka.prototype.init, n.fx.step = {};
    var La, Ma, Na = /^(?:toggle|show|hide)$/,
        Oa = new RegExp("^(?:([+-])=|)(" + Q + ")([a-z%]*)$", "i"),
        Pa = /queueHooks$/,
        Qa = [Va],
        Ra = {
            "*": [function(a, b) {
                var c = this.createTween(a, b),
                    d = c.cur(),
                    e = Oa.exec(b),
                    f = e && e[3] || (n.cssNumber[a] ? "" : "px"),
                    g = (n.cssNumber[a] || "px" !== f && +d) && Oa.exec(n.css(c.elem, a)),
                    h = 1,
                    i = 20;
                if (g && g[3] !== f) {
                    f = f || g[3], e = e || [], g = +d || 1;
                    do h = h || ".5", g /= h, n.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && 1 !== h && --i)
                }
                return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c
            }]
        };

    function Sa() {
        return setTimeout(function() {
            La = void 0
        }), La = n.now()
    }

    function Ta(a, b) {
        var c, d = 0,
            e = {
                height: a
            };
        for (b = b ? 1 : 0; 4 > d; d += 2 - b) c = R[d], e["margin" + c] = e["padding" + c] = a;
        return b && (e.opacity = e.width = a), e
    }

    function Ua(a, b, c) {
        for (var d, e = (Ra[b] || []).concat(Ra["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function Va(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
            m = {},
            o = a.style,
            p = a.nodeType && S(a),
            q = L.get(a, "fxshow");
        c.queue || (h = n._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, n.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = n.css(a, "display"), k = "none" === j ? L.get(a, "olddisplay") || ta(a.nodeName) : j, "inline" === k && "none" === n.css(a, "float") && (o.display = "inline-block")), c.overflow && (o.overflow = "hidden", l.always(function() {
            o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], Na.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
                    if ("show" !== e || !q || void 0 === q[d]) continue;
                    p = !0
                }
                m[d] = q && q[d] || n.style(a, d)
            } else j = void 0;
        if (n.isEmptyObject(m)) "inline" === ("none" === j ? ta(a.nodeName) : j) && (o.display = j);
        else {
            q ? "hidden" in q && (p = q.hidden) : q = L.access(a, "fxshow", {}), f && (q.hidden = !p), p ? n(a).show() : l.done(function() {
                n(a).hide()
            }), l.done(function() {
                var b;
                L.remove(a, "fxshow");
                for (b in m) n.style(a, b, m[b])
            });
            for (d in m) g = Ua(p ? q[d] : 0, d, l), d in q || (q[d] = g.start, p && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function Wa(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = n.camelCase(c), e = b[d], f = a[c], n.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = n.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function Xa(a, b, c) {
        var d, e, f = 0,
            g = Qa.length,
            h = n.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = La || Sa(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: n.extend({}, b),
                opts: n.extend(!0, {
                    specialEasing: {}
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: La || Sa(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = n.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (Wa(k, j.opts.specialEasing); g > f; f++)
            if (d = Qa[f].call(j, a, k, j.opts)) return d;
        return n.map(k, Ua, j), n.isFunction(j.opts.start) && j.opts.start.call(a, j), n.fx.timer(n.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    n.Animation = n.extend(Xa, {
            tweener: function(a, b) {
                n.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" ");
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], Ra[c] = Ra[c] || [], Ra[c].unshift(b)
            },
            prefilter: function(a, b) {
                b ? Qa.unshift(a) : Qa.push(a)
            }
        }), n.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? n.extend({}, a) : {
                complete: c || !c && b || n.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !n.isFunction(b) && b
            };
            return d.duration = n.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in n.fx.speeds ? n.fx.speeds[d.duration] : n.fx.speeds._default, (null == d.queue || d.queue === !0) && (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                n.isFunction(d.old) && d.old.call(this), d.queue && n.dequeue(this, d.queue)
            }, d
        }, n.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(S).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = n.isEmptyObject(a),
                    f = n.speed(b, c, d),
                    g = function() {
                        var b = Xa(this, n.extend({}, a), f);
                        (e || L.get(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = n.timers,
                        g = L.get(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && Pa.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    (b || !c) && n.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = L.get(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = n.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, n.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), n.each(["toggle", "show", "hide"], function(a, b) {
            var c = n.fn[b];
            n.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(Ta(b, !0), a, d, e)
            }
        }), n.each({
            slideDown: Ta("show"),
            slideUp: Ta("hide"),
            slideToggle: Ta("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            n.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), n.timers = [], n.fx.tick = function() {
            var a, b = 0,
                c = n.timers;
            for (La = n.now(); b < c.length; b++) a = c[b], a() || c[b] !== a || c.splice(b--, 1);
            c.length || n.fx.stop(), La = void 0
        }, n.fx.timer = function(a) {
            n.timers.push(a), a() ? n.fx.start() : n.timers.pop()
        }, n.fx.interval = 13, n.fx.start = function() {
            Ma || (Ma = setInterval(n.fx.tick, n.fx.interval))
        }, n.fx.stop = function() {
            clearInterval(Ma), Ma = null
        }, n.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, n.fn.delay = function(a, b) {
            return a = n.fx ? n.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        function() {
            var a = l.createElement("input"),
                b = l.createElement("select"),
                c = b.appendChild(l.createElement("option"));
            a.type = "checkbox", k.checkOn = "" !== a.value, k.optSelected = c.selected, b.disabled = !0, k.optDisabled = !c.disabled, a = l.createElement("input"), a.value = "t", a.type = "radio", k.radioValue = "t" === a.value
        }();
    var Ya, Za, $a = n.expr.attrHandle;
    n.fn.extend({
        attr: function(a, b) {
            return J(this, n.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                n.removeAttr(this, a)
            })
        }
    }), n.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f) return typeof a.getAttribute === U ? n.prop(a, b, c) : (1 === f && n.isXMLDoc(a) || (b = b.toLowerCase(), d = n.attrHooks[b] || (n.expr.match.bool.test(b) ? Za : Ya)), void 0 === c ? d && "get" in d && null !== (e = d.get(a, b)) ? e : (e = n.find.attr(a, b), null == e ? void 0 : e) : null !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""), c) : void n.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(E);
            if (f && 1 === a.nodeType)
                while (c = f[e++]) d = n.propFix[c] || c, n.expr.match.bool.test(c) && (a[d] = !1), a.removeAttribute(c)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!k.radioValue && "radio" === b && n.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        }
    }), Za = {
        set: function(a, b, c) {
            return b === !1 ? n.removeAttr(a, c) : a.setAttribute(c, c), c
        }
    }, n.each(n.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = $a[b] || n.find.attr;
        $a[b] = function(a, b, d) {
            var e, f;
            return d || (f = $a[b], $a[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, $a[b] = f), e
        }
    });
    var _a = /^(?:input|select|textarea|button)$/i;
    n.fn.extend({
        prop: function(a, b) {
            return J(this, n.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return this.each(function() {
                delete this[n.propFix[a] || a]
            })
        }
    }), n.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g) return f = 1 !== g || !n.isXMLDoc(a), f && (b = n.propFix[b] || b, e = n.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    return a.hasAttribute("tabindex") || _a.test(a.nodeName) || a.href ? a.tabIndex : -1
                }
            }
        }
    }), k.optSelected || (n.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        }
    }), n.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        n.propFix[this.toLowerCase()] = this
    });
    var ab = /[\t\r\n\f]/g;
    n.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).addClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : " ")) {
                        f = 0;
                        while (e = b[f++]) d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = n.trim(d), c.className !== g && (c.className = g)
                    } return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0 === arguments.length || "string" == typeof a && a,
                i = 0,
                j = this.length;
            if (n.isFunction(a)) return this.each(function(b) {
                n(this).removeClass(a.call(this, b, this.className))
            });
            if (h)
                for (b = (a || "").match(E) || []; j > i; i++)
                    if (c = this[i], d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(ab, " ") : "")) {
                        f = 0;
                        while (e = b[f++])
                            while (d.indexOf(" " + e + " ") >= 0) d = d.replace(" " + e + " ", " ");
                        g = a ? n.trim(d) : "", c.className !== g && (c.className = g)
                    } return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(n.isFunction(a) ? function(c) {
                n(this).toggleClass(a.call(this, c, this.className, b), b)
            } : function() {
                if ("string" === c) {
                    var b, d = 0,
                        e = n(this),
                        f = a.match(E) || [];
                    while (b = f[d++]) e.hasClass(b) ? e.removeClass(b) : e.addClass(b)
                } else(c === U || "boolean" === c) && (this.className && L.set(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : L.get(this, "__className__") || "")
            })
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(ab, " ").indexOf(b) >= 0) return !0;
            return !1
        }
    });
    var bb = /\r/g;
    n.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0]; {
                if (arguments.length) return d = n.isFunction(a), this.each(function(c) {
                    var e;
                    1 === this.nodeType && (e = d ? a.call(this, c, n(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : n.isArray(e) && (e = n.map(e, function(a) {
                        return null == a ? "" : a + ""
                    })), b = n.valHooks[this.type] || n.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                });
                if (e) return b = n.valHooks[e.type] || n.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(bb, "") : null == c ? "" : c)
            }
        }
    }), n.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = n.find.attr(a, "value");
                    return null != b ? b : n.trim(n.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && n.nodeName(c.parentNode, "optgroup"))) {
                            if (b = n(c).val(), f) return b;
                            g.push(b)
                        } return g
                },
                set: function(a, b) {
                    var c, d, e = a.options,
                        f = n.makeArray(b),
                        g = e.length;
                    while (g--) d = e[g], (d.selected = n.inArray(d.value, f) >= 0) && (c = !0);
                    return c || (a.selectedIndex = -1), f
                }
            }
        }
    }), n.each(["radio", "checkbox"], function() {
        n.valHooks[this] = {
            set: function(a, b) {
                return n.isArray(b) ? a.checked = n.inArray(n(a).val(), b) >= 0 : void 0
            }
        }, k.checkOn || (n.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    }), n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        n.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), n.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var cb = n.now(),
        db = /\?/;
    n.parseJSON = function(a) {
        return JSON.parse(a + "")
    }, n.parseXML = function(a) {
        var b, c;
        if (!a || "string" != typeof a) return null;
        try {
            c = new DOMParser, b = c.parseFromString(a, "text/xml")
        } catch (d) {
            b = void 0
        }
        return (!b || b.getElementsByTagName("parsererror").length) && n.error("Invalid XML: " + a), b
    };
    var eb = /#.*$/,
        fb = /([?&])_=[^&]*/,
        gb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        hb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        ib = /^(?:GET|HEAD)$/,
        jb = /^\/\//,
        kb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        lb = {},
        mb = {},
        nb = "*/".concat("*"),
        ob = a.location.href,
        pb = kb.exec(ob.toLowerCase()) || [];

    function qb(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(E) || [];
            if (n.isFunction(c))
                while (d = f[e++]) "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function rb(a, b, c, d) {
        var e = {},
            f = a === mb;

        function g(h) {
            var i;
            return e[h] = !0, n.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1)
            }), i
        }
        return g(b.dataTypes[0]) || !e["*"] && g("*")
    }

    function sb(a, b) {
        var c, d, e = n.ajaxSettings.flatOptions || {};
        for (c in b) void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
        return d && n.extend(!0, a, d), a
    }

    function tb(a, b, c) {
        var d, e, f, g, h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0]) i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
        if (d)
            for (e in h)
                if (h[e] && h[e].test(d)) {
                    i.unshift(e);
                    break
                } if (i[0] in c) f = i[0];
        else {
            for (e in c) {
                if (!i[0] || a.converters[e + " " + i[0]]) {
                    f = e;
                    break
                }
                g || (g = e)
            }
            f = f || g
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function ub(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    } if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ob,
            type: "GET",
            isLocal: hb.test(pb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": nb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? sb(sb(a, n.ajaxSettings), b) : sb(n.ajaxSettings, a)
        },
        ajaxPrefilter: qb(lb),
        ajaxTransport: qb(mb),
        ajax: function(a, b) {
            "object" == typeof a && (b = a, a = void 0), b = b || {};
            var c, d, e, f, g, h, i, j, k = n.ajaxSetup({}, b),
                l = k.context || k,
                m = k.context && (l.nodeType || l.jquery) ? n(l) : n.event,
                o = n.Deferred(),
                p = n.Callbacks("once memory"),
                q = k.statusCode || {},
                r = {},
                s = {},
                t = 0,
                u = "canceled",
                v = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === t) {
                            if (!f) {
                                f = {};
                                while (b = gb.exec(e)) f[b[1].toLowerCase()] = b[2]
                            }
                            b = f[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === t ? e : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return t || (a = s[c] = s[c] || a, r[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return t || (k.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > t)
                                for (b in a) q[b] = [q[b], a[b]];
                            else v.always(a[v.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || u;
                        return c && c.abort(b), x(0, b), this
                    }
                };
            if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || ob) + "").replace(eb, "").replace(jb, pb[1] + "//"), k.type = b.method || b.type || k.method || k.type, k.dataTypes = n.trim(k.dataType || "*").toLowerCase().match(E) || [""], null == k.crossDomain && (h = kb.exec(k.url.toLowerCase()), k.crossDomain = !(!h || h[1] === pb[1] && h[2] === pb[2] && (h[3] || ("http:" === h[1] ? "80" : "443")) === (pb[3] || ("http:" === pb[1] ? "80" : "443")))), k.data && k.processData && "string" != typeof k.data && (k.data = n.param(k.data, k.traditional)), rb(lb, k, b, v), 2 === t) return v;
            i = n.event && k.global, i && 0 === n.active++ && n.event.trigger("ajaxStart"), k.type = k.type.toUpperCase(), k.hasContent = !ib.test(k.type), d = k.url, k.hasContent || (k.data && (d = k.url += (db.test(d) ? "&" : "?") + k.data, delete k.data), k.cache === !1 && (k.url = fb.test(d) ? d.replace(fb, "$1_=" + cb++) : d + (db.test(d) ? "&" : "?") + "_=" + cb++)), k.ifModified && (n.lastModified[d] && v.setRequestHeader("If-Modified-Since", n.lastModified[d]), n.etag[d] && v.setRequestHeader("If-None-Match", n.etag[d])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", k.contentType), v.setRequestHeader("Accept", k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + ("*" !== k.dataTypes[0] ? ", " + nb + "; q=0.01" : "") : k.accepts["*"]);
            for (j in k.headers) v.setRequestHeader(j, k.headers[j]);
            if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || 2 === t)) return v.abort();
            u = "abort";
            for (j in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[j](k[j]);
            if (c = rb(mb, k, b, v)) {
                v.readyState = 1, i && m.trigger("ajaxSend", [v, k]), k.async && k.timeout > 0 && (g = setTimeout(function() {
                    v.abort("timeout")
                }, k.timeout));
                try {
                    t = 1, c.send(r, x)
                } catch (w) {
                    if (!(2 > t)) throw w;
                    x(-1, w)
                }
            } else x(-1, "No Transport");

            function x(a, b, f, h) {
                var j, r, s, u, w, x = b;
                2 !== t && (t = 2, g && clearTimeout(g), c = void 0, e = h || "", v.readyState = a > 0 ? 4 : 0, j = a >= 200 && 300 > a || 304 === a, f && (u = tb(k, v, f)), u = ub(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader("Last-Modified"), w && (n.lastModified[d] = w), w = v.getResponseHeader("etag"), w && (n.etag[d] = w)), 204 === a || "HEAD" === k.type ? x = "nocontent" : 304 === a ? x = "notmodified" : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = "error", 0 > a && (a = 0))), v.status = a, v.statusText = (b || x) + "", j ? o.resolveWith(l, [r, x, v]) : o.rejectWith(l, [v, x, s]), v.statusCode(q), q = void 0, i && m.trigger(j ? "ajaxSuccess" : "ajaxError", [v, k, j ? r : s]), p.fireWith(l, [v, x]), i && (m.trigger("ajaxComplete", [v, k]), --n.active || n.event.trigger("ajaxStop")))
            }
            return v
        },
        getJSON: function(a, b, c) {
            return n.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return n.get(a, void 0, b, "script")
        }
    }), n.each(["get", "post"], function(a, b) {
        n[b] = function(a, c, d, e) {
            return n.isFunction(c) && (e = e || d, d = c, c = void 0), n.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }), n._evalUrl = function(a) {
        return n.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }, n.fn.extend({
        wrapAll: function(a) {
            var b;
            return n.isFunction(a) ? this.each(function(b) {
                n(this).wrapAll(a.call(this, b))
            }) : (this[0] && (b = n(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                var a = this;
                while (a.firstElementChild) a = a.firstElementChild;
                return a
            }).append(this)), this)
        },
        wrapInner: function(a) {
            return this.each(n.isFunction(a) ? function(b) {
                n(this).wrapInner(a.call(this, b))
            } : function() {
                var b = n(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = n.isFunction(a);
            return this.each(function(c) {
                n(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                n.nodeName(this, "body") || n(this).replaceWith(this.childNodes)
            }).end()
        }
    }), n.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0
    }, n.expr.filters.visible = function(a) {
        return !n.expr.filters.hidden(a)
    };
    var vb = /%20/g,
        wb = /\[\]$/,
        xb = /\r?\n/g,
        yb = /^(?:submit|button|image|reset|file)$/i,
        zb = /^(?:input|select|textarea|keygen)/i;

    function Ab(a, b, c, d) {
        var e;
        if (n.isArray(b)) n.each(b, function(b, e) {
            c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== n.type(b)) d(a, b);
        else
            for (e in b) Ab(a + "[" + e + "]", b[e], c, d)
    }
    n.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = n.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional), n.isArray(a) || a.jquery && !n.isPlainObject(a)) n.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) Ab(c, a[c], b, e);
        return d.join("&").replace(vb, "+")
    }, n.fn.extend({
        serialize: function() {
            return n.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = n.prop(this, "elements");
                return a ? n.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !n(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !T.test(a))
            }).map(function(a, b) {
                var c = n(this).val();
                return null == c ? null : n.isArray(c) ? n.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(xb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(xb, "\r\n")
                }
            }).get()
        }
    }), n.ajaxSettings.xhr = function() {
        try {
            return new XMLHttpRequest
        } catch (a) {}
    };
    var Bb = 0,
        Cb = {},
        Db = {
            0: 200,
            1223: 204
        },
        Eb = n.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in Cb) Cb[a]()
    }), k.cors = !!Eb && "withCredentials" in Eb, k.ajax = Eb = !!Eb, n.ajaxTransport(function(a) {
        var b;
        return k.cors || Eb && !a.crossDomain ? {
            send: function(c, d) {
                var e, f = a.xhr(),
                    g = ++Bb;
                if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields)
                    for (e in a.xhrFields) f[e] = a.xhrFields[e];
                a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                for (e in c) f.setRequestHeader(e, c[e]);
                b = function(a) {
                    return function() {
                        b && (delete Cb[g], b = f.onload = f.onerror = null, "abort" === a ? f.abort() : "error" === a ? d(f.status, f.statusText) : d(Db[f.status] || f.status, f.statusText, "string" == typeof f.responseText ? {
                            text: f.responseText
                        } : void 0, f.getAllResponseHeaders()))
                    }
                }, f.onload = b(), f.onerror = b("error"), b = Cb[g] = b("abort");
                try {
                    f.send(a.hasContent && a.data || null)
                } catch (h) {
                    if (b) throw h
                }
            },
            abort: function() {
                b && b()
            }
        } : void 0
    }), n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return n.globalEval(a), a
            }
        }
    }), n.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET")
    }), n.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c;
            return {
                send: function(d, e) {
                    b = n("<script>").prop({
                        async: !0,
                        charset: a.scriptCharset,
                        src: a.url
                    }).on("load error", c = function(a) {
                        b.remove(), c = null, a && e("error" === a.type ? 404 : 200, a.type)
                    }), l.head.appendChild(b[0])
                },
                abort: function() {
                    c && c()
                }
            }
        }
    });
    var Fb = [],
        Gb = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = Fb.pop() || n.expando + "_" + cb++;
            return this[a] = !0, a
        }
    }), n.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (Gb.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = n.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Gb, "$1" + e) : b.jsonp !== !1 && (b.url += (db.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || n.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Fb.push(e)), g && n.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), n.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || l;
        var d = v.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = n.buildFragment([a], b, e), e && e.length && n(e).remove(), n.merge([], d.childNodes))
    };
    var Hb = n.fn.load;
    n.fn.load = function(a, b, c) {
        if ("string" != typeof a && Hb) return Hb.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h >= 0 && (d = n.trim(a.slice(h)), a = a.slice(0, h)), n.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && n.ajax({
            url: a,
            type: e,
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? n("<div>").append(n.parseHTML(a)).find(d) : a)
        }).complete(c && function(a, b) {
            g.each(c, f || [a.responseText, b, a])
        }), this
    }, n.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        n.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), n.expr.filters.animated = function(a) {
        return n.grep(n.timers, function(b) {
            return a === b.elem
        }).length
    };
    var Ib = a.document.documentElement;

    function Jb(a) {
        return n.isWindow(a) ? a : 9 === a.nodeType && a.defaultView
    }
    n.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = n.css(a, "position"),
                l = n(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = n.css(a, "top"), i = n.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), n.isFunction(b) && (b = b.call(a, c, h)), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, n.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                n.offset.setOffset(this, a, b)
            });
            var b, c, d = this[0],
                e = {
                    top: 0,
                    left: 0
                },
                f = d && d.ownerDocument;
            if (f) return b = f.documentElement, n.contains(b, d) ? (typeof d.getBoundingClientRect !== U && (e = d.getBoundingClientRect()), c = Jb(f), {
                top: e.top + c.pageYOffset - b.clientTop,
                left: e.left + c.pageXOffset - b.clientLeft
            }) : e
        },
        position: function() {
            if (this[0]) {
                var a, b, c = this[0],
                    d = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === n.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), n.nodeName(a[0], "html") || (d = a.offset()), d.top += n.css(a[0], "borderTopWidth", !0), d.left += n.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - d.top - n.css(c, "marginTop", !0),
                    left: b.left - d.left - n.css(c, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || Ib;
                while (a && !n.nodeName(a, "html") && "static" === n.css(a, "position")) a = a.offsetParent;
                return a || Ib
            })
        }
    }), n.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        n.fn[b] = function(e) {
            return J(this, function(b, e, f) {
                var g = Jb(b);
                return void 0 === f ? g ? g[c] : b[e] : void(g ? g.scrollTo(d ? a.pageXOffset : f, d ? f : a.pageYOffset) : b[e] = f)
            }, b, e, arguments.length, null)
        }
    }), n.each(["top", "left"], function(a, b) {
        n.cssHooks[b] = ya(k.pixelPosition, function(a, c) {
            return c ? (c = xa(a, b), va.test(c) ? n(a).position()[b] + "px" : c) : void 0
        })
    }), n.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        n.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            n.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return J(this, function(b, c, d) {
                    var e;
                    return n.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? n.css(b, c, g) : n.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), n.fn.size = function() {
        return this.length
    }, n.fn.andSelf = n.fn.addBack, "function" == typeof define && define.amd && define("jquery", [], function() {
        return n
    });
    var Kb = a.jQuery,
        Lb = a.$;
    return n.noConflict = function(b) {
        return a.$ === n && (a.$ = Lb), b && a.jQuery === n && (a.jQuery = Kb), n
    }, typeof b === U && (a.jQuery = a.$ = n), n
});
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery"); + function(a) {
    "use strict";

    function b() {
        var a = document.createElement("bootstrap"),
            b = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var c in b)
            if (void 0 !== a.style[c]) return {
                end: b[c]
            };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1,
            d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        });
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        };
        return setTimeout(e, b), this
    }, a(function() {
        a.support.transition = b(), a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var c = a(this),
                e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)), "string" == typeof b && e[b].call(c)
        })
    }
    var c = '[data-dismiss="alert"]',
        d = function(b) {
            a(b).on("click", c, this.close)
        };
    d.VERSION = "3.2.0", d.prototype.close = function(b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove()
        }
        var d = a(this),
            e = d.attr("data-target");
        e || (e = d.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(), f.length || (f = d.hasClass("alert") ? d : d.parent()), f.trigger(b = a.Event("close.bs.alert")), b.isDefaultPrevented() || (f.removeClass("in"), a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c())
    };
    var e = a.fn.alert;
    a.fn.alert = b, a.fn.alert.Constructor = d, a.fn.alert.noConflict = function() {
        return a.fn.alert = e, this
    }, a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.button"),
                f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this, f)), "toggle" == b ? e.toggle() : b && e.setState(b)
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.isLoading = !1
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        loadingText: "loading..."
    }, c.prototype.setState = function(b) {
        var c = "disabled",
            d = this.$element,
            e = d.is("input") ? "val" : "html",
            f = d.data();
        b += "Text", null == f.resetText && d.data("resetText", d[e]()), d[e](null == f[b] ? this.options[b] : f[b]), setTimeout(a.proxy(function() {
            "loadingText" == b ? (this.isLoading = !0, d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1, d.removeClass(c).removeAttr(c))
        }, this), 0)
    }, c.prototype.toggle = function() {
        var a = !0,
            b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")), a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    };
    var d = a.fn.button;
    a.fn.button = b, a.fn.button.Constructor = c, a.fn.button.noConflict = function() {
        return a.fn.button = d, this
    }, a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")), b.call(d, "toggle"), c.preventDefault()
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.carousel"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b),
                g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this, f)), "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        })
    }
    var c = function(b, c) {
        this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)), this.$indicators = this.$element.find(".carousel-indicators"), this.options = c, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, c.prototype.keydown = function(a) {
        switch (a.which) {
            case 37:
                this.prev();
                break;
            case 39:
                this.next();
                break;
            default:
                return
        }
        a.preventDefault()
    }, c.prototype.cycle = function(b) {
        return b || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)), this
    }, c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"), this.$items.index(a || this.$active)
    }, c.prototype.to = function(b) {
        var c = this,
            d = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            c.to(b)
        }) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }, c.prototype.pause = function(b) {
        return b || (this.paused = !0), this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, c.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active"),
            e = c || d[b](),
            f = this.interval,
            g = "next" == b ? "left" : "right",
            h = "next" == b ? "first" : "last",
            i = this;
        if (!e.length) {
            if (!this.options.wrap) return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active")) return this.sliding = !1;
        var j = e[0],
            k = a.Event("slide.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
        if (this.$element.trigger(k), !k.isDefaultPrevented()) {
            if (this.sliding = !0, f && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(e)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
            return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), d.one("bsTransitionEnd", function() {
                e.removeClass([b, g].join(" ")).addClass("active"), d.removeClass(["active", g].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger(m)
                }, 0)
            }).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger(m)), f && this.cycle(), this
        }
    };
    var d = a.fn.carousel;
    a.fn.carousel = b, a.fn.carousel.Constructor = c, a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d, this
    }, a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(c) {
        var d, e = a(this),
            f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data()),
                h = e.attr("data-slide-to");
            h && (g.interval = !1), b.call(f, g), h && f.data("bs.carousel").to(h), c.preventDefault()
        }
    }), a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.collapse"),
                f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (b = !b), e || d.data("bs.collapse", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.$element = a(b), this.options = a.extend({}, c.DEFAULTS, d), this.transitioning = null, this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle()
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        toggle: !0
    }, c.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }, c.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c), !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning) return;
                    b.call(d, "hide"), e || d.data("bs.collapse", null)
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0), this.transitioning = 1;
                var g = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!a.support.transition) return g.call(this);
                var h = a.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
            }
        }
    }, c.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b), !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }, c.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var d = a.fn.collapse;
    a.fn.collapse = b, a.fn.collapse.Constructor = c, a.fn.collapse.noConflict = function() {
        return a.fn.collapse = d, this
    }, a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(c) {
        var d, e = a(this),
            f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""),
            g = a(f),
            h = g.data("bs.collapse"),
            i = h ? "toggle" : e.data(),
            j = e.attr("data-parent"),
            k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"), e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), b.call(g, i)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        b && 3 === b.which || (a(e).remove(), a(f).each(function() {
            var d = c(a(this)),
                e = {
                    relatedTarget: this
                };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)), b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        }))
    }

    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"), c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }

    function d(b) {
        return this.each(function() {
            var c = a(this),
                d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)), "string" == typeof b && d[b].call(c)
        })
    }
    var e = ".dropdown-backdrop",
        f = '[data-toggle="dropdown"]',
        g = function(b) {
            a(b).on("click.bs.dropdown", this.toggle)
        };
    g.VERSION = "3.2.0", g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e),
                g = f.hasClass("open");
            if (b(), !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)), d.isDefaultPrevented()) return;
                e.trigger("focus"), f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }, g.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(), b.stopPropagation(), !d.is(".disabled, :disabled")) {
                var e = c(d),
                    g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode) return 27 == b.which && e.find(f).trigger("focus"), d.trigger("click");
                var h = " li:not(.divider):visible a",
                    i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--, 40 == b.keyCode && j < i.length - 1 && j++, ~j || (j = 0), i.eq(j).trigger("focus")
                }
            }
        }
    };
    var h = a.fn.dropdown;
    a.fn.dropdown = d, a.fn.dropdown.Constructor = g, a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h, this
    }, a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown)
}(jQuery), + function(a) {
    "use strict";

    function b(b, d) {
        return this.each(function() {
            var e = a(this),
                f = e.data("bs.modal"),
                g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this, g)), "string" == typeof b ? f[b](d) : g.show && f.show(d)
        })
    }
    var c = function(b, c) {
        this.options = c, this.$body = a(document.body), this.$element = a(b), this.$backdrop = this.isShown = null, this.scrollbarWidth = 0, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }, this))
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }, c.prototype.show = function(b) {
        var c = this,
            d = a.Event("show.bs.modal", {
                relatedTarget: b
            });
        this.$element.trigger(d), this.isShown || d.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.$body.addClass("modal-open"), this.setScrollbar(), this.escape(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)), this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body), c.$element.show().scrollTop(0), d && c.$element[0].offsetWidth, c.$element.addClass("in").attr("aria-hidden", !1), c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                c.$element.trigger("focus").trigger(e)
            }).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e)
        }))
    }, c.prototype.hide = function(b) {
        b && b.preventDefault(), b = a.Event("hide.bs.modal"), this.$element.trigger(b), this.isShown && !b.isDefaultPrevented() && (this.isShown = !1, this.$body.removeClass("modal-open"), this.resetScrollbar(), this.escape(), a(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"), a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }, this))
    }, c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(), this.backdrop(function() {
            a.$element.trigger("hidden.bs.modal")
        })
    }, c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, c.prototype.backdrop = function(b) {
        var c = this,
            d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                    a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !b) return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function() {
                c.removeBackdrop(), b && b()
            };
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f()
        } else b && b()
    }, c.prototype.checkScrollbar = function() {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }, c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    }, c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }, c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure", this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a), b
    };
    var d = a.fn.modal;
    a.fn.modal = b, a.fn.modal.Constructor = c, a.fn.modal.noConflict = function() {
        return a.fn.modal = d, this
    }, a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this),
            e = d.attr("href"),
            f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, "")),
            g = f.data("bs.modal") ? "toggle" : a.extend({
                remote: !/#/.test(e) && e
            }, f.data(), d.data());
        d.is("a") && c.preventDefault(), f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            })
        }), b.call(f, g, this)
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tooltip"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
    };
    c.VERSION = "3.2.0", c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    }, c.prototype.init = function(b, c, d) {
        this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--;) {
            var g = e[f];
            if ("click" == g) this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin",
                    i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }), b
    }, c.prototype.getDelegateOptions = function() {
        var b = {},
            c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }), b
    }, c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "in", c.options.delay && c.options.delay.show ? void(c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }, c.options.delay.show)) : c.show()
    }, c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c)), clearTimeout(c.timeout), c.hoverState = "out", c.options.delay && c.options.delay.hide ? void(c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }, c.options.delay.hide)) : c.hide()
    }, c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c) return;
            var d = this,
                e = this.tip(),
                f = this.getUID(this.type);
            this.setContent(), e.attr("id", f), this.$element.attr("aria-describedby", f), this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement,
                h = /\s?auto?\s?/i,
                i = h.test(g);
            i && (g = g.replace(h, "") || "top"), e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this), this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition(),
                k = e[0].offsetWidth,
                l = e[0].offsetHeight;
            if (i) {
                var m = g,
                    n = this.$element.parent(),
                    o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g, e.removeClass(m).addClass(g)
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function() {
                d.$element.trigger("shown.bs." + d.type), d.hoverState = null
            };
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q()
        }
    }, c.prototype.applyPlacement = function(b, c) {
        var d = this.tip(),
            e = d[0].offsetWidth,
            f = d[0].offsetHeight,
            g = parseInt(d.css("margin-top"), 10),
            h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0), isNaN(h) && (h = 0), b.top = b.top + g, b.left = b.left + h, a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0), d.addClass("in");
        var i = d[0].offsetWidth,
            j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j,
            m = k.left ? "left" : "top",
            n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b), this.replaceArrow(l, d[0][n], m)
    }, c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
    }, c.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(), c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this,
            d = this.tip(),
            e = a.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"), this.$element.trigger(e), e.isDefaultPrevented() ? void 0 : (d.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(), this.hoverState = null, this)
    }, c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }, c.prototype.hasContent = function() {
        return this.getTitle()
    }, c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0],
            d = "BODY" == c.tagName;
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null, {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight()
        }, d ? {
            top: 0,
            left: 0
        } : b.offset())
    }, c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }, c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport) return e;
        var f = this.options.viewport && this.options.viewport.padding || 0,
            g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll,
                i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f,
                k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }, c.prototype.getTitle = function() {
        var a, b = this.$element,
            c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }, c.prototype.getUID = function(a) {
        do a += ~~(1e6 * Math.random()); while (document.getElementById(a));
        return a
    }, c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, c.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, c.prototype.enable = function() {
        this.enabled = !0
    }, c.prototype.disable = function() {
        this.enabled = !1
    }, c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type), c || (c = new this.constructor(b.currentTarget, this.getDelegateOptions()), a(b.currentTarget).data("bs." + this.type, c))), c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }, c.prototype.destroy = function() {
        clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var d = a.fn.tooltip;
    a.fn.tooltip = b, a.fn.tooltip.Constructor = c, a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.popover"),
                f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this, f)), "string" == typeof b && e[b]())
        })
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0", c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), c.prototype.constructor = c, c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }, c.prototype.setContent = function() {
        var a = this.tip(),
            b = this.getTitle(),
            c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
    }, c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, c.prototype.getContent = function() {
        var a = this.$element,
            b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }, c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, c.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)), this.$tip
    };
    var d = a.fn.popover;
    a.fn.popover = b, a.fn.popover.Constructor = c, a.fn.popover.noConflict = function() {
        return a.fn.popover = d, this
    }
}(jQuery), + function(a) {
    "use strict";

    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"), this.$scrollElement = a(a(c).is("body") ? window : c), this.options = a.extend({}, b.DEFAULTS, d), this.selector = (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", e), this.refresh(), this.process()
    }

    function c(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.scrollspy"),
                f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this, f)), "string" == typeof c && e[c]()
        })
    }
    b.VERSION = "3.2.0", b.DEFAULTS = {
        offset: 10
    }, b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }, b.prototype.refresh = function() {
        var b = "offset",
            c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position", c = this.$scrollElement.scrollTop()), this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this),
                e = d.data("target") || d.attr("href"),
                f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [
                [f[b]().top + c, e]
            ] || null
        }).sort(function(a, b) {
            return a[0] - b[0]
        }).each(function() {
            d.offsets.push(this[0]), d.targets.push(this[1])
        })
    }, b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset,
            c = this.getScrollHeight(),
            d = this.options.offset + c - this.$scrollElement.height(),
            e = this.offsets,
            f = this.targets,
            g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(), b >= d) return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0]) return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--;) g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }, b.prototype.activate = function(b) {
        this.activeTarget = b, a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]',
            d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")), d.trigger("activate.bs.scrollspy")
    };
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d, this
    }, a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        })
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b) {
        this.element = a(b)
    };
    c.VERSION = "3.2.0", c.prototype.show = function() {
        var b = this.element,
            c = b.closest("ul:not(.dropdown-menu)"),
            d = b.data("target");
        if (d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0],
                f = a.Event("show.bs.tab", {
                    relatedTarget: e
                });
            if (b.trigger(f), !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c), this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                })
            }
        }
    }, c.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), g ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d()
        }
        var f = c.find("> .active"),
            g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(), f.removeClass("in")
    };
    var d = a.fn.tab;
    a.fn.tab = b, a.fn.tab.Constructor = c, a.fn.tab.noConflict = function() {
        return a.fn.tab = d, this
    }, a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(c) {
        c.preventDefault(), b.call(a(this), "show")
    })
}(jQuery), + function(a) {
    "use strict";

    function b(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("bs.affix"),
                f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this, f)), "string" == typeof b && e[b]()
        })
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d), this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)), this.$element = a(b), this.affixed = this.unpin = this.pinnedOffset = null, this.checkPosition()
    };
    c.VERSION = "3.2.0", c.RESET = "affix affix-top affix-bottom", c.DEFAULTS = {
        offset: 0,
        target: window
    }, c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop(),
            b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }, c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }, c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = a(document).height(),
                d = this.$target.scrollTop(),
                e = this.$element.offset(),
                f = this.options.offset,
                g = f.top,
                h = f.bottom;
            "object" != typeof f && (h = g = f), "function" == typeof g && (g = f.top(this.$element)), "function" == typeof h && (h = f.bottom(this.$element));
            var i = null != this.unpin && d + this.unpin <= e.top ? !1 : null != h && e.top + this.$element.height() >= b - h ? "bottom" : null != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                null != this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : ""),
                    k = a.Event(j + ".bs.affix");
                this.$element.trigger(k), k.isDefaultPrevented() || (this.affixed = i, this.unpin = "bottom" == i ? this.getPinnedOffset() : null, this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))), "bottom" == i && this.$element.offset({
                    top: b - this.$element.height() - h
                }))
            }
        }
    };
    var d = a.fn.affix;
    a.fn.affix = b, a.fn.affix.Constructor = c, a.fn.affix.noConflict = function() {
        return a.fn.affix = d, this
    }, a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this),
                d = c.data();
            d.offset = d.offset || {}, d.offsetBottom && (d.offset.bottom = d.offsetBottom), d.offsetTop && (d.offset.top = d.offsetTop), b.call(c, d)
        })
    })
}(jQuery);
(function() {
    var root = this;
    var previousUnderscore = root._;
    var ArrayProto = Array.prototype,
        ObjProto = Object.prototype,
        FuncProto = Function.prototype;
    var
        push = ArrayProto.push,
        slice = ArrayProto.slice,
        toString = ObjProto.toString,
        hasOwnProperty = ObjProto.hasOwnProperty;
    var
        nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeBind = FuncProto.bind,
        nativeCreate = Object.create;
    var Ctor = function() {};
    var _ = function(obj) {
        if (obj instanceof _) return obj;
        if (!(this instanceof _)) return new _(obj);
        this._wrapped = obj;
    };
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = _;
        }
        exports._ = _;
    } else {
        root._ = _;
    }
    _.VERSION = '1.8.3';
    var optimizeCb = function(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1:
                return function(value) {
                    return func.call(context, value);
                };
            case 2:
                return function(value, other) {
                    return func.call(context, value, other);
                };
            case 3:
                return function(value, index, collection) {
                    return func.call(context, value, index, collection);
                };
            case 4:
                return function(accumulator, value, index, collection) {
                    return func.call(context, accumulator, value, index, collection);
                };
        }
        return function() {
            return func.apply(context, arguments);
        };
    };
    var cb = function(value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    };
    _.iteratee = function(value, context) {
        return cb(value, context, Infinity);
    };
    var createAssigner = function(keysFunc, undefinedOnly) {
        return function(obj) {
            var length = arguments.length;
            if (length < 2 || obj == null) return obj;
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
                }
            }
            return obj;
        };
    };
    var baseCreate = function(prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    };
    var property = function(key) {
        return function(obj) {
            return obj == null ? void 0 : obj[key];
        };
    };
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    var isArrayLike = function(collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };
    _.map = _.collect = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length,
            results = Array(length);
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            results[index] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };

    function createReduce(dir) {
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }
        return function(obj, iteratee, memo, context) {
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            if (arguments.length < 3) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            return iterator(obj, iteratee, memo, keys, index, length);
        };
    }
    _.reduce = _.foldl = _.inject = createReduce(1);
    _.reduceRight = _.foldr = createReduce(-1);
    _.find = _.detect = function(obj, predicate, context) {
        var key;
        if (isArrayLike(obj)) {
            key = _.findIndex(obj, predicate, context);
        } else {
            key = _.findKey(obj, predicate, context);
        }
        if (key !== void 0 && key !== -1) return obj[key];
    };
    _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function(value, index, list) {
            if (predicate(value, index, list)) results.push(value);
        });
        return results;
    };
    _.reject = function(obj, predicate, context) {
        return _.filter(obj, _.negate(cb(predicate)), context);
    };
    _.every = _.all = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (!predicate(obj[currentKey], currentKey, obj)) return false;
        }
        return true;
    };
    _.some = _.any = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    };
    _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
        if (!isArrayLike(obj)) obj = _.values(obj);
        if (typeof fromIndex != 'number' || guard) fromIndex = 0;
        return _.indexOf(obj, item, fromIndex) >= 0;
    };
    _.invoke = function(obj, method) {
        var args = slice.call(arguments, 2);
        var isFunc = _.isFunction(method);
        return _.map(obj, function(value) {
            var func = isFunc ? method : value[method];
            return func == null ? func : func.apply(value, args);
        });
    };
    _.pluck = function(obj, key) {
        return _.map(obj, _.property(key));
    };
    _.where = function(obj, attrs) {
        return _.filter(obj, _.matcher(attrs));
    };
    _.findWhere = function(obj, attrs) {
        return _.find(obj, _.matcher(attrs));
    };
    _.max = function(obj, iteratee, context) {
        var result = -Infinity,
            lastComputed = -Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };
    _.min = function(obj, iteratee, context) {
        var result = Infinity,
            lastComputed = Infinity,
            value, computed;
        if (iteratee == null && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index, list) {
                computed = iteratee(value, index, list);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };
    _.shuffle = function(obj) {
        var set = isArrayLike(obj) ? obj : _.values(obj);
        var length = set.length;
        var shuffled = Array(length);
        for (var index = 0, rand; index < length; index++) {
            rand = _.random(0, index);
            if (rand !== index) shuffled[index] = shuffled[rand];
            shuffled[rand] = set[index];
        }
        return shuffled;
    };
    _.sample = function(obj, n, guard) {
        if (n == null || guard) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            return obj[_.random(obj.length - 1)];
        }
        return _.shuffle(obj).slice(0, Math.max(0, n));
    };
    _.sortBy = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        return _.pluck(_.map(obj, function(value, index, list) {
            return {
                value: value,
                index: index,
                criteria: iteratee(value, index, list)
            };
        }).sort(function(left, right) {
            var a = left.criteria;
            var b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1;
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        }), 'value');
    };
    var group = function(behavior) {
        return function(obj, iteratee, context) {
            var result = {};
            iteratee = cb(iteratee, context);
            _.each(obj, function(value, index) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    };
    _.groupBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key].push(value);
        else result[key] = [value];
    });
    _.indexBy = group(function(result, value, key) {
        result[key] = value;
    });
    _.countBy = group(function(result, value, key) {
        if (_.has(result, key)) result[key]++;
        else result[key] = 1;
    });
    _.toArray = function(obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return slice.call(obj);
        if (isArrayLike(obj)) return _.map(obj, _.identity);
        return _.values(obj);
    };
    _.size = function(obj) {
        if (obj == null) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };
    _.partition = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var pass = [],
            fail = [];
        _.each(obj, function(value, key, obj) {
            (predicate(value, key, obj) ? pass : fail).push(value);
        });
        return [pass, fail];
    };
    _.first = _.head = _.take = function(array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        return _.initial(array, array.length - n);
    };
    _.initial = function(array, n, guard) {
        return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };
    _.last = function(array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };
    _.rest = _.tail = _.drop = function(array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };
    _.compact = function(array) {
        return _.filter(array, _.identity);
    };
    var flatten = function(input, shallow, strict, startIndex) {
        var output = [],
            idx = 0;
        for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
            var value = input[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                if (!shallow) value = flatten(value, shallow, strict);
                var j = 0,
                    len = value.length;
                output.length += len;
                while (j < len) {
                    output[idx++] = value[j++];
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    };
    _.flatten = function(array, shallow) {
        return flatten(array, shallow, false);
    };
    _.without = function(array) {
        return _.difference(array, slice.call(arguments, 1));
    };
    _.uniq = _.unique = function(array, isSorted, iteratee, context) {
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) iteratee = cb(iteratee, context);
        var result = [];
        var seen = [];
        for (var i = 0, length = getLength(array); i < length; i++) {
            var value = array[i],
                computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted) {
                if (!i || seen !== computed) result.push(value);
                seen = computed;
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                result.push(value);
            }
        }
        return result;
    };
    _.union = function() {
        return _.uniq(flatten(arguments, true, true));
    };
    _.intersection = function(array) {
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, length = getLength(array); i < length; i++) {
            var item = array[i];
            if (_.contains(result, item)) continue;
            for (var j = 1; j < argsLength; j++) {
                if (!_.contains(arguments[j], item)) break;
            }
            if (j === argsLength) result.push(item);
        }
        return result;
    };
    _.difference = function(array) {
        var rest = flatten(arguments, true, true, 1);
        return _.filter(array, function(value) {
            return !_.contains(rest, value);
        });
    };
    _.zip = function() {
        return _.unzip(arguments);
    };
    _.unzip = function(array) {
        var length = array && _.max(array, getLength).length || 0;
        var result = Array(length);
        for (var index = 0; index < length; index++) {
            result[index] = _.pluck(array, index);
        }
        return result;
    };
    _.object = function(list, values) {
        var result = {};
        for (var i = 0, length = getLength(list); i < length; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    function createPredicateIndexFinder(dir) {
        return function(array, predicate, context) {
            predicate = cb(predicate, context);
            var length = getLength(array);
            var index = dir > 0 ? 0 : length - 1;
            for (; index >= 0 && index < length; index += dir) {
                if (predicate(array[index], index, array)) return index;
            }
            return -1;
        };
    }
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);
    _.sortedIndex = function(array, obj, iteratee, context) {
        iteratee = cb(iteratee, context, 1);
        var value = iteratee(obj);
        var low = 0,
            high = getLength(array);
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (iteratee(array[mid]) < value) low = mid + 1;
            else high = mid;
        }
        return low;
    };

    function createIndexFinder(dir, predicateFind, sortedIndex) {
        return function(array, item, idx) {
            var i = 0,
                length = getLength(array);
            if (typeof idx == 'number') {
                if (dir > 0) {
                    i = idx >= 0 ? idx : Math.max(idx + length, i);
                } else {
                    length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
                }
            } else if (sortedIndex && idx && length) {
                idx = sortedIndex(array, item);
                return array[idx] === item ? idx : -1;
            }
            if (item !== item) {
                idx = predicateFind(slice.call(array, i, length), _.isNaN);
                return idx >= 0 ? idx + i : -1;
            }
            for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
                if (array[idx] === item) return idx;
            }
            return -1;
        };
    }
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
    _.range = function(start, stop, step) {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        step = step || 1;
        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);
        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }
        return range;
    };
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
        if (!(callingContext instanceof boundFunc)) return sourceFunc.apply(context, args);
        var self = baseCreate(sourceFunc.prototype);
        var result = sourceFunc.apply(self, args);
        if (_.isObject(result)) return result;
        return self;
    };
    _.bind = function(func, context) {
        if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
        if (!_.isFunction(func)) throw new TypeError('Bind must be called on a function');
        var args = slice.call(arguments, 2);
        var bound = function() {
            return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
        };
        return bound;
    };
    _.partial = function(func) {
        var boundArgs = slice.call(arguments, 1);
        var bound = function() {
            var position = 0,
                length = boundArgs.length;
            var args = Array(length);
            for (var i = 0; i < length; i++) {
                args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
            }
            while (position < arguments.length) args.push(arguments[position++]);
            return executeBound(func, bound, this, this, args);
        };
        return bound;
    };
    _.bindAll = function(obj) {
        var i, length = arguments.length,
            key;
        if (length <= 1) throw new Error('bindAll must be passed function names');
        for (i = 1; i < length; i++) {
            key = arguments[i];
            obj[key] = _.bind(obj[key], obj);
        }
        return obj;
    };
    _.memoize = function(func, hasher) {
        var memoize = function(key) {
            var cache = memoize.cache;
            var address = '' + (hasher ? hasher.apply(this, arguments) : key);
            if (!_.has(cache, address)) cache[address] = func.apply(this, arguments);
            return cache[address];
        };
        memoize.cache = {};
        return memoize;
    };
    _.delay = function(func, wait) {
        var args = slice.call(arguments, 2);
        return setTimeout(function() {
            return func.apply(null, args);
        }, wait);
    };
    _.defer = _.partial(_.delay, _, 1);
    _.throttle = function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : _.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = _.now();
            if (!previous && options.leading === false) previous = now;
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            if (remaining <= 0 || remaining > wait) {
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    };
    _.debounce = function(func, wait, immediate) {
        var timeout, args, context, timestamp, result;
        var later = function() {
            var last = _.now() - timestamp;
            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };
        return function() {
            context = this;
            args = arguments;
            timestamp = _.now();
            var callNow = immediate && !timeout;
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }
            return result;
        };
    };
    _.wrap = function(func, wrapper) {
        return _.partial(wrapper, func);
    };
    _.negate = function(predicate) {
        return function() {
            return !predicate.apply(this, arguments);
        };
    };
    _.compose = function() {
        var args = arguments;
        var start = args.length - 1;
        return function() {
            var i = start;
            var result = args[start].apply(this, arguments);
            while (i--) result = args[i].call(this, result);
            return result;
        };
    };
    _.after = function(times, func) {
        return function() {
            if (--times < 1) {
                return func.apply(this, arguments);
            }
        };
    };
    _.before = function(times, func) {
        var memo;
        return function() {
            if (--times > 0) {
                memo = func.apply(this, arguments);
            }
            if (times <= 1) func = null;
            return memo;
        };
    };
    _.once = _.partial(_.before, 2);
    var hasEnumBug = !{
        toString: null
    }.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString', 'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = (_.isFunction(constructor) && constructor.prototype) || ObjProto;
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) keys.push(prop);
        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop);
            }
        }
    }
    _.keys = function(obj) {
        if (!_.isObject(obj)) return [];
        if (nativeKeys) return nativeKeys(obj);
        var keys = [];
        for (var key in obj)
            if (_.has(obj, key)) keys.push(key);
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };
    _.allKeys = function(obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };
    _.values = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = obj[keys[i]];
        }
        return values;
    };
    _.mapObject = function(obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var keys = _.keys(obj),
            length = keys.length,
            results = {},
            currentKey;
        for (var index = 0; index < length; index++) {
            currentKey = keys[index];
            results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
        }
        return results;
    };
    _.pairs = function(obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var pairs = Array(length);
        for (var i = 0; i < length; i++) {
            pairs[i] = [keys[i], obj[keys[i]]];
        }
        return pairs;
    };
    _.invert = function(obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };
    _.functions = _.methods = function(obj) {
        var names = [];
        for (var key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    };
    _.extend = createAssigner(_.allKeys);
    _.extendOwn = _.assign = createAssigner(_.keys);
    _.findKey = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = _.keys(obj),
            key;
        for (var i = 0, length = keys.length; i < length; i++) {
            key = keys[i];
            if (predicate(obj[key], key, obj)) return key;
        }
    };
    _.pick = function(object, oiteratee, context) {
        var result = {},
            obj = object,
            iteratee, keys;
        if (obj == null) return result;
        if (_.isFunction(oiteratee)) {
            keys = _.allKeys(obj);
            iteratee = optimizeCb(oiteratee, context);
        } else {
            keys = flatten(arguments, false, false, 1);
            iteratee = function(value, key, obj) {
                return key in obj;
            };
            obj = Object(obj);
        }
        for (var i = 0, length = keys.length; i < length; i++) {
            var key = keys[i];
            var value = obj[key];
            if (iteratee(value, key, obj)) result[key] = value;
        }
        return result;
    };
    _.omit = function(obj, iteratee, context) {
        if (_.isFunction(iteratee)) {
            iteratee = _.negate(iteratee);
        } else {
            var keys = _.map(flatten(arguments, false, false, 1), String);
            iteratee = function(value, key) {
                return !_.contains(keys, key);
            };
        }
        return _.pick(obj, iteratee, context);
    };
    _.defaults = createAssigner(_.allKeys, true);
    _.create = function(prototype, props) {
        var result = baseCreate(prototype);
        if (props) _.extendOwn(result, props);
        return result;
    };
    _.clone = function(obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    _.tap = function(obj, interceptor) {
        interceptor(obj);
        return obj;
    };
    _.isMatch = function(object, attrs) {
        var keys = _.keys(attrs),
            length = keys.length;
        if (object == null) return !length;
        var obj = Object(object);
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== obj[key] || !(key in obj)) return false;
        }
        return true;
    };
    var eq = function(a, b, aStack, bStack) {
        if (a === b) return a !== 0 || 1 / a === 1 / b;
        if (a == null || b == null) return a === b;
        if (a instanceof _) a = a._wrapped;
        if (b instanceof _) b = b._wrapped;
        var className = toString.call(a);
        if (className !== toString.call(b)) return false;
        switch (className) {
            case '[object RegExp]':
            case '[object String]':
                return '' + a === '' + b;
            case '[object Number]':
                if (+a !== +a) return +b !== +b;
                return +a === 0 ? 1 / +a === 1 / b : +a === +b;
            case '[object Date]':
            case '[object Boolean]':
                return +a === +b;
        }
        var areArrays = className === '[object Array]';
        if (!areArrays) {
            if (typeof a != 'object' || typeof b != 'object') return false;
            var aCtor = a.constructor,
                bCtor = b.constructor;
            if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
                return false;
            }
        }
        aStack = aStack || [];
        bStack = bStack || [];
        var length = aStack.length;
        while (length--) {
            if (aStack[length] === a) return bStack[length] === b;
        }
        aStack.push(a);
        bStack.push(b);
        if (areArrays) {
            length = a.length;
            if (length !== b.length) return false;
            while (length--) {
                if (!eq(a[length], b[length], aStack, bStack)) return false;
            }
        } else {
            var keys = _.keys(a),
                key;
            length = keys.length;
            if (_.keys(b).length !== length) return false;
            while (length--) {
                key = keys[length];
                if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
            }
        }
        aStack.pop();
        bStack.pop();
        return true;
    };
    _.isEqual = function(a, b) {
        return eq(a, b);
    };
    _.isEmpty = function(obj) {
        if (obj == null) return true;
        if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj))) return obj.length === 0;
        return _.keys(obj).length === 0;
    };
    _.isElement = function(obj) {
        return !!(obj && obj.nodeType === 1);
    };
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });
    if (!_.isArguments(arguments)) {
        _.isArguments = function(obj) {
            return _.has(obj, 'callee');
        };
    }
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
        _.isFunction = function(obj) {
            return typeof obj == 'function' || false;
        };
    }
    _.isFinite = function(obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    _.isNaN = function(obj) {
        return _.isNumber(obj) && obj !== +obj;
    };
    _.isBoolean = function(obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };
    _.isNull = function(obj) {
        return obj === null;
    };
    _.isUndefined = function(obj) {
        return obj === void 0;
    };
    _.has = function(obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };
    _.noConflict = function() {
        root._ = previousUnderscore;
        return this;
    };
    _.identity = function(value) {
        return value;
    };
    _.constant = function(value) {
        return function() {
            return value;
        };
    };
    _.noop = function() {};
    _.property = property;
    _.propertyOf = function(obj) {
        return obj == null ? function() {} : function(key) {
            return obj[key];
        };
    };
    _.matcher = _.matches = function(attrs) {
        attrs = _.extendOwn({}, attrs);
        return function(obj) {
            return _.isMatch(obj, attrs);
        };
    };
    _.times = function(n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) accum[i] = iteratee(i);
        return accum;
    };
    _.random = function(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };
    _.now = Date.now || function() {
        return new Date().getTime();
    };
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);
    var createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        };
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function(string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);
    _.result = function(object, property, fallback) {
        var value = object == null ? void 0 : object[property];
        if (value === void 0) {
            value = fallback;
        }
        return _.isFunction(value) ? value.call(object) : value;
    };
    var idCounter = 0;
    _.uniqueId = function(prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };
    _.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var noMatch = /(.)^/;
    var escapes = {
        "'": "'",
        '\\': '\\',
        '\r': 'r',
        '\n': 'n',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function(match) {
        return '\\' + escapes[match];
    };
    _.template = function(text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = _.defaults({}, settings, _.templateSettings);
        var matcher = RegExp([(settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source].join('|') + '|$', 'g');
        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;
            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            return match;
        });
        source += "';\n";
        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
        source = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + 'return __p;\n';
        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }
        var template = function(data) {
            return render.call(this, data, _);
        };
        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';
        return template;
    };
    _.chain = function(obj) {
        var instance = _(obj);
        instance._chain = true;
        return instance;
    };
    var result = function(instance, obj) {
        return instance._chain ? _(obj).chain() : obj;
    };
    _.mixin = function(obj) {
        _.each(_.functions(obj), function(name) {
            var func = _[name] = obj[name];
            _.prototype[name] = function() {
                var args = [this._wrapped];
                push.apply(args, arguments);
                return result(this, func.apply(_, args));
            };
        });
    };
    _.mixin(_);
    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) delete obj[0];
            return result(this, obj);
        };
    });
    _.each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _.prototype[name] = function() {
            return result(this, method.apply(this._wrapped, arguments));
        };
    });
    _.prototype.value = function() {
        return this._wrapped;
    };
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
    _.prototype.toString = function() {
        return '' + this._wrapped;
    };
    if (typeof define === 'function' && define.amd) {
        define('underscore', [], function() {
            return _;
        });
    }
}.call(this));
! function() {
    function n(n, t) {
        return t > n ? -1 : n > t ? 1 : n >= t ? 0 : 0 / 0
    }

    function t(n) {
        return null != n && !isNaN(n)
    }

    function e(n) {
        return {
            left: function(t, e, r, u) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
                    var i = r + u >>> 1;
                    n(t[i], e) < 0 ? r = i + 1 : u = i
                }
                return r
            },
            right: function(t, e, r, u) {
                for (arguments.length < 3 && (r = 0), arguments.length < 4 && (u = t.length); u > r;) {
                    var i = r + u >>> 1;
                    n(t[i], e) > 0 ? u = i : r = i + 1
                }
                return r
            }
        }
    }

    function r(n) {
        return n.length
    }

    function u(n) {
        for (var t = 1; n * t % 1;) t *= 10;
        return t
    }

    function i(n, t) {
        try {
            for (var e in t) Object.defineProperty(n.prototype, e, {
                value: t[e],
                enumerable: !1
            })
        } catch (r) {
            n.prototype = t
        }
    }

    function o() {}

    function a(n) {
        return ia + n in this
    }

    function c(n) {
        return n = ia + n, n in this && delete this[n]
    }

    function s() {
        var n = [];
        return this.forEach(function(t) {
            n.push(t)
        }), n
    }

    function l() {
        var n = 0;
        for (var t in this) t.charCodeAt(0) === oa && ++n;
        return n
    }

    function f() {
        for (var n in this)
            if (n.charCodeAt(0) === oa) return !1;
        return !0
    }

    function h() {}

    function g(n, t, e) {
        return function() {
            var r = e.apply(t, arguments);
            return r === t ? n : r
        }
    }

    function p(n, t) {
        if (t in n) return t;
        t = t.charAt(0).toUpperCase() + t.substring(1);
        for (var e = 0, r = aa.length; r > e; ++e) {
            var u = aa[e] + t;
            if (u in n) return u
        }
    }

    function v() {}

    function d() {}

    function m(n) {
        function t() {
            for (var t, r = e, u = -1, i = r.length; ++u < i;)(t = r[u].on) && t.apply(this, arguments);
            return n
        }
        var e = [],
            r = new o;
        return t.on = function(t, u) {
            var i, o = r.get(t);
            return arguments.length < 2 ? o && o.on : (o && (o.on = null, e = e.slice(0, i = e.indexOf(o)).concat(e.slice(i + 1)), r.remove(t)), u && e.push(r.set(t, {
                on: u
            })), n)
        }, t
    }

    function y() {
        Zo.event.preventDefault()
    }

    function x() {
        for (var n, t = Zo.event; n = t.sourceEvent;) t = n;
        return t
    }

    function M(n) {
        for (var t = new d, e = 0, r = arguments.length; ++e < r;) t[arguments[e]] = m(t);
        return t.of = function(e, r) {
            return function(u) {
                try {
                    var i = u.sourceEvent = Zo.event;
                    u.target = n, Zo.event = u, t[u.type].apply(e, r)
                } finally {
                    Zo.event = i
                }
            }
        }, t
    }

    function _(n) {
        return sa(n, pa), n
    }

    function b(n) {
        return "function" == typeof n ? n : function() {
            return la(n, this)
        }
    }

    function w(n) {
        return "function" == typeof n ? n : function() {
            return fa(n, this)
        }
    }

    function S(n, t) {
        function e() {
            this.removeAttribute(n)
        }

        function r() {
            this.removeAttributeNS(n.space, n.local)
        }

        function u() {
            this.setAttribute(n, t)
        }

        function i() {
            this.setAttributeNS(n.space, n.local, t)
        }

        function o() {
            var e = t.apply(this, arguments);
            null == e ? this.removeAttribute(n) : this.setAttribute(n, e)
        }

        function a() {
            var e = t.apply(this, arguments);
            null == e ? this.removeAttributeNS(n.space, n.local) : this.setAttributeNS(n.space, n.local, e)
        }
        return n = Zo.ns.qualify(n), null == t ? n.local ? r : e : "function" == typeof t ? n.local ? a : o : n.local ? i : u
    }

    function k(n) {
        return n.trim().replace(/\s+/g, " ")
    }

    function E(n) {
        return new RegExp("(?:^|\\s+)" + Zo.requote(n) + "(?:\\s+|$)", "g")
    }

    function A(n) {
        return (n + "").trim().split(/^|\s+/)
    }

    function C(n, t) {
        function e() {
            for (var e = -1; ++e < u;) n[e](this, t)
        }

        function r() {
            for (var e = -1, r = t.apply(this, arguments); ++e < u;) n[e](this, r)
        }
        n = A(n).map(N);
        var u = n.length;
        return "function" == typeof t ? r : e
    }

    function N(n) {
        var t = E(n);
        return function(e, r) {
            if (u = e.classList) return r ? u.add(n) : u.remove(n);
            var u = e.getAttribute("class") || "";
            r ? (t.lastIndex = 0, t.test(u) || e.setAttribute("class", k(u + " " + n))) : e.setAttribute("class", k(u.replace(t, " ")))
        }
    }

    function z(n, t, e) {
        function r() {
            this.style.removeProperty(n)
        }

        function u() {
            this.style.setProperty(n, t, e)
        }

        function i() {
            var r = t.apply(this, arguments);
            null == r ? this.style.removeProperty(n) : this.style.setProperty(n, r, e)
        }
        return null == t ? r : "function" == typeof t ? i : u
    }

    function L(n, t) {
        function e() {
            delete this[n]
        }

        function r() {
            this[n] = t
        }

        function u() {
            var e = t.apply(this, arguments);
            null == e ? delete this[n] : this[n] = e
        }
        return null == t ? e : "function" == typeof t ? u : r
    }

    function T(n) {
        return "function" == typeof n ? n : (n = Zo.ns.qualify(n)).local ? function() {
            return this.ownerDocument.createElementNS(n.space, n.local)
        } : function() {
            return this.ownerDocument.createElementNS(this.namespaceURI, n)
        }
    }

    function q(n) {
        return {
            __data__: n
        }
    }

    function R(n) {
        return function() {
            return ga(this, n)
        }
    }

    function D(t) {
        return arguments.length || (t = n),
            function(n, e) {
                return n && e ? t(n.__data__, e.__data__) : !n - !e
            }
    }

    function P(n, t) {
        for (var e = 0, r = n.length; r > e; e++)
            for (var u, i = n[e], o = 0, a = i.length; a > o; o++)(u = i[o]) && t(u, o, e);
        return n
    }

    function U(n) {
        return sa(n, da), n
    }

    function j(n) {
        var t, e;
        return function(r, u, i) {
            var o, a = n[i].update,
                c = a.length;
            for (i != e && (e = i, t = 0), u >= t && (t = u + 1); !(o = a[t]) && ++t < c;);
            return o
        }
    }

    function H() {
        var n = this.__transition__;
        n && ++n.active
    }

    function F(n, t, e) {
        function r() {
            var t = this[o];
            t && (this.removeEventListener(n, t, t.$), delete this[o])
        }

        function u() {
            var u = c(t, Xo(arguments));
            r.call(this), this.addEventListener(n, this[o] = u, u.$ = e), u._ = t
        }

        function i() {
            var t, e = new RegExp("^__on([^.]+)" + Zo.requote(n) + "$");
            for (var r in this)
                if (t = r.match(e)) {
                    var u = this[r];
                    this.removeEventListener(t[1], u, u.$), delete this[r]
                }
        }
        var o = "__on" + n,
            a = n.indexOf("."),
            c = O;
        a > 0 && (n = n.substring(0, a));
        var s = ya.get(n);
        return s && (n = s, c = Y), a ? t ? u : r : t ? v : i
    }

    function O(n, t) {
        return function(e) {
            var r = Zo.event;
            Zo.event = e, t[0] = this.__data__;
            try {
                n.apply(this, t)
            } finally {
                Zo.event = r
            }
        }
    }

    function Y(n, t) {
        var e = O(n, t);
        return function(n) {
            var t = this,
                r = n.relatedTarget;
            r && (r === t || 8 & r.compareDocumentPosition(t)) || e.call(t, n)
        }
    }

    function I() {
        var n = ".dragsuppress-" + ++Ma,
            t = "click" + n,
            e = Zo.select(Wo).on("touchmove" + n, y).on("dragstart" + n, y).on("selectstart" + n, y);
        if (xa) {
            var r = Bo.style,
                u = r[xa];
            r[xa] = "none"
        }
        return function(i) {
            function o() {
                e.on(t, null)
            }
            e.on(n, null), xa && (r[xa] = u), i && (e.on(t, function() {
                y(), o()
            }, !0), setTimeout(o, 0))
        }
    }

    function Z(n, t) {
        t.changedTouches && (t = t.changedTouches[0]);
        var e = n.ownerSVGElement || n;
        if (e.createSVGPoint) {
            var r = e.createSVGPoint();
            if (0 > _a && (Wo.scrollX || Wo.scrollY)) {
                e = Zo.select("body").append("svg").style({
                    position: "absolute",
                    top: 0,
                    left: 0,
                    margin: 0,
                    padding: 0,
                    border: "none"
                }, "important");
                var u = e[0][0].getScreenCTM();
                _a = !(u.f || u.e), e.remove()
            }
            return _a ? (r.x = t.pageX, r.y = t.pageY) : (r.x = t.clientX, r.y = t.clientY), r = r.matrixTransform(n.getScreenCTM().inverse()), [r.x, r.y]
        }
        var i = n.getBoundingClientRect();
        return [t.clientX - i.left - n.clientLeft, t.clientY - i.top - n.clientTop]
    }

    function V() {
        return Zo.event.changedTouches[0].identifier
    }

    function X() {
        return Zo.event.target
    }

    function $() {
        return Wo
    }

    function B(n) {
        return n > 0 ? 1 : 0 > n ? -1 : 0
    }

    function W(n, t, e) {
        return (t[0] - n[0]) * (e[1] - n[1]) - (t[1] - n[1]) * (e[0] - n[0])
    }

    function J(n) {
        return n > 1 ? 0 : -1 > n ? ba : Math.acos(n)
    }

    function G(n) {
        return n > 1 ? Sa : -1 > n ? -Sa : Math.asin(n)
    }

    function K(n) {
        return ((n = Math.exp(n)) - 1 / n) / 2
    }

    function Q(n) {
        return ((n = Math.exp(n)) + 1 / n) / 2
    }

    function nt(n) {
        return ((n = Math.exp(2 * n)) - 1) / (n + 1)
    }

    function tt(n) {
        return (n = Math.sin(n / 2)) * n
    }

    function et() {}

    function rt(n, t, e) {
        return this instanceof rt ? (this.h = +n, this.s = +t, void(this.l = +e)) : arguments.length < 2 ? n instanceof rt ? new rt(n.h, n.s, n.l) : mt("" + n, yt, rt) : new rt(n, t, e)
    }

    function ut(n, t, e) {
        function r(n) {
            return n > 360 ? n -= 360 : 0 > n && (n += 360), 60 > n ? i + (o - i) * n / 60 : 180 > n ? o : 240 > n ? i + (o - i) * (240 - n) / 60 : i
        }

        function u(n) {
            return Math.round(255 * r(n))
        }
        var i, o;
        return n = isNaN(n) ? 0 : (n %= 360) < 0 ? n + 360 : n, t = isNaN(t) ? 0 : 0 > t ? 0 : t > 1 ? 1 : t, e = 0 > e ? 0 : e > 1 ? 1 : e, o = .5 >= e ? e * (1 + t) : e + t - e * t, i = 2 * e - o, new gt(u(n + 120), u(n), u(n - 120))
    }

    function it(n, t, e) {
        return this instanceof it ? (this.h = +n, this.c = +t, void(this.l = +e)) : arguments.length < 2 ? n instanceof it ? new it(n.h, n.c, n.l) : n instanceof at ? st(n.l, n.a, n.b) : st((n = xt((n = Zo.rgb(n)).r, n.g, n.b)).l, n.a, n.b) : new it(n, t, e)
    }

    function ot(n, t, e) {
        return isNaN(n) && (n = 0), isNaN(t) && (t = 0), new at(e, Math.cos(n *= Aa) * t, Math.sin(n) * t)
    }

    function at(n, t, e) {
        return this instanceof at ? (this.l = +n, this.a = +t, void(this.b = +e)) : arguments.length < 2 ? n instanceof at ? new at(n.l, n.a, n.b) : n instanceof it ? ot(n.l, n.c, n.h) : xt((n = gt(n)).r, n.g, n.b) : new at(n, t, e)
    }

    function ct(n, t, e) {
        var r = (n + 16) / 116,
            u = r + t / 500,
            i = r - e / 200;
        return u = lt(u) * ja, r = lt(r) * Ha, i = lt(i) * Fa, new gt(ht(3.2404542 * u - 1.5371385 * r - .4985314 * i), ht(-.969266 * u + 1.8760108 * r + .041556 * i), ht(.0556434 * u - .2040259 * r + 1.0572252 * i))
    }

    function st(n, t, e) {
        return n > 0 ? new it(Math.atan2(e, t) * Ca, Math.sqrt(t * t + e * e), n) : new it(0 / 0, 0 / 0, n)
    }

    function lt(n) {
        return n > .206893034 ? n * n * n : (n - 4 / 29) / 7.787037
    }

    function ft(n) {
        return n > .008856 ? Math.pow(n, 1 / 3) : 7.787037 * n + 4 / 29
    }

    function ht(n) {
        return Math.round(255 * (.00304 >= n ? 12.92 * n : 1.055 * Math.pow(n, 1 / 2.4) - .055))
    }

    function gt(n, t, e) {
        return this instanceof gt ? (this.r = ~~n, this.g = ~~t, void(this.b = ~~e)) : arguments.length < 2 ? n instanceof gt ? new gt(n.r, n.g, n.b) : mt("" + n, gt, ut) : new gt(n, t, e)
    }

    function pt(n) {
        return new gt(n >> 16, 255 & n >> 8, 255 & n)
    }

    function vt(n) {
        return pt(n) + ""
    }

    function dt(n) {
        return 16 > n ? "0" + Math.max(0, n).toString(16) : Math.min(255, n).toString(16)
    }

    function mt(n, t, e) {
        var r, u, i, o = 0,
            a = 0,
            c = 0;
        if (r = /([a-z]+)\((.*)\)/i.exec(n)) switch (u = r[2].split(","), r[1]) {
            case "hsl":
                return e(parseFloat(u[0]), parseFloat(u[1]) / 100, parseFloat(u[2]) / 100);
            case "rgb":
                return t(_t(u[0]), _t(u[1]), _t(u[2]))
        }
        return (i = Ia.get(n)) ? t(i.r, i.g, i.b) : (null == n || "#" !== n.charAt(0) || isNaN(i = parseInt(n.substring(1), 16)) || (4 === n.length ? (o = (3840 & i) >> 4, o = o >> 4 | o, a = 240 & i, a = a >> 4 | a, c = 15 & i, c = c << 4 | c) : 7 === n.length && (o = (16711680 & i) >> 16, a = (65280 & i) >> 8, c = 255 & i)), t(o, a, c))
    }

    function yt(n, t, e) {
        var r, u, i = Math.min(n /= 255, t /= 255, e /= 255),
            o = Math.max(n, t, e),
            a = o - i,
            c = (o + i) / 2;
        return a ? (u = .5 > c ? a / (o + i) : a / (2 - o - i), r = n == o ? (t - e) / a + (e > t ? 6 : 0) : t == o ? (e - n) / a + 2 : (n - t) / a + 4, r *= 60) : (r = 0 / 0, u = c > 0 && 1 > c ? 0 : r), new rt(r, u, c)
    }

    function xt(n, t, e) {
        n = Mt(n), t = Mt(t), e = Mt(e);
        var r = ft((.4124564 * n + .3575761 * t + .1804375 * e) / ja),
            u = ft((.2126729 * n + .7151522 * t + .072175 * e) / Ha),
            i = ft((.0193339 * n + .119192 * t + .9503041 * e) / Fa);
        return at(116 * u - 16, 500 * (r - u), 200 * (u - i))
    }

    function Mt(n) {
        return (n /= 255) <= .04045 ? n / 12.92 : Math.pow((n + .055) / 1.055, 2.4)
    }

    function _t(n) {
        var t = parseFloat(n);
        return "%" === n.charAt(n.length - 1) ? Math.round(2.55 * t) : t
    }

    function bt(n) {
        return "function" == typeof n ? n : function() {
            return n
        }
    }

    function wt(n) {
        return n
    }

    function St(n) {
        return function(t, e, r) {
            return 2 === arguments.length && "function" == typeof e && (r = e, e = null), kt(t, e, n, r)
        }
    }

    function kt(n, t, e, r) {
        function u() {
            var n, t = c.status;
            if (!t && c.responseText || t >= 200 && 300 > t || 304 === t) {
                try {
                    n = e.call(i, c)
                } catch (r) {
                    return o.error.call(i, r), void 0
                }
                o.load.call(i, n)
            } else o.error.call(i, c)
        }
        var i = {},
            o = Zo.dispatch("beforesend", "progress", "load", "error"),
            a = {},
            c = new XMLHttpRequest,
            s = null;
        return !Wo.XDomainRequest || "withCredentials" in c || !/^(http(s)?:)?\/\//.test(n) || (c = new XDomainRequest), "onload" in c ? c.onload = c.onerror = u : c.onreadystatechange = function() {
            c.readyState > 3 && u()
        }, c.onprogress = function(n) {
            var t = Zo.event;
            Zo.event = n;
            try {
                o.progress.call(i, c)
            } finally {
                Zo.event = t
            }
        }, i.header = function(n, t) {
            return n = (n + "").toLowerCase(), arguments.length < 2 ? a[n] : (null == t ? delete a[n] : a[n] = t + "", i)
        }, i.mimeType = function(n) {
            return arguments.length ? (t = null == n ? null : n + "", i) : t
        }, i.responseType = function(n) {
            return arguments.length ? (s = n, i) : s
        }, i.response = function(n) {
            return e = n, i
        }, ["get", "post"].forEach(function(n) {
            i[n] = function() {
                return i.send.apply(i, [n].concat(Xo(arguments)))
            }
        }), i.send = function(e, r, u) {
            if (2 === arguments.length && "function" == typeof r && (u = r, r = null), c.open(e, n, !0), null == t || "accept" in a || (a.accept = t + ",*/*"), c.setRequestHeader)
                for (var l in a) c.setRequestHeader(l, a[l]);
            return null != t && c.overrideMimeType && c.overrideMimeType(t), null != s && (c.responseType = s), null != u && i.on("error", u).on("load", function(n) {
                u(null, n)
            }), o.beforesend.call(i, c), c.send(null == r ? null : r), i
        }, i.abort = function() {
            return c.abort(), i
        }, Zo.rebind(i, o, "on"), null == r ? i : i.get(Et(r))
    }

    function Et(n) {
        return 1 === n.length ? function(t, e) {
            n(null == t ? e : null)
        } : n
    }

    function At() {
        var n = Ct(),
            t = Nt() - n;
        t > 24 ? (isFinite(t) && (clearTimeout($a), $a = setTimeout(At, t)), Xa = 0) : (Xa = 1, Wa(At))
    }

    function Ct() {
        var n = Date.now();
        for (Ba = Za; Ba;) n >= Ba.t && (Ba.f = Ba.c(n - Ba.t)), Ba = Ba.n;
        return n
    }

    function Nt() {
        for (var n, t = Za, e = 1 / 0; t;) t.f ? t = n ? n.n = t.n : Za = t.n : (t.t < e && (e = t.t), t = (n = t).n);
        return Va = n, e
    }

    function zt(n, t) {
        return t - (n ? Math.ceil(Math.log(n) / Math.LN10) : 1)
    }

    function Lt(n, t) {
        var e = Math.pow(10, 3 * ua(8 - t));
        return {
            scale: t > 8 ? function(n) {
                return n / e
            } : function(n) {
                return n * e
            },
            symbol: n
        }
    }

    function Tt(n) {
        var t = n.decimal,
            e = n.thousands,
            r = n.grouping,
            u = n.currency,
            i = r ? function(n) {
                for (var t = n.length, u = [], i = 0, o = r[0]; t > 0 && o > 0;) u.push(n.substring(t -= o, t + o)), o = r[i = (i + 1) % r.length];
                return u.reverse().join(e)
            } : wt;
        return function(n) {
            var e = Ga.exec(n),
                r = e[1] || " ",
                o = e[2] || ">",
                a = e[3] || "",
                c = e[4] || "",
                s = e[5],
                l = +e[6],
                f = e[7],
                h = e[8],
                g = e[9],
                p = 1,
                v = "",
                d = "",
                m = !1;
            switch (h && (h = +h.substring(1)), (s || "0" === r && "=" === o) && (s = r = "0", o = "=", f && (l -= Math.floor((l - 1) / 4))), g) {
                case "n":
                    f = !0, g = "g";
                    break;
                case "%":
                    p = 100, d = "%", g = "f";
                    break;
                case "p":
                    p = 100, d = "%", g = "r";
                    break;
                case "b":
                case "o":
                case "x":
                case "X":
                    "#" === c && (v = "0" + g.toLowerCase());
                case "c":
                case "d":
                    m = !0, h = 0;
                    break;
                case "s":
                    p = -1, g = "r"
            }
            "$" === c && (v = u[0], d = u[1]), "r" != g || h || (g = "g"), null != h && ("g" == g ? h = Math.max(1, Math.min(21, h)) : ("e" == g || "f" == g) && (h = Math.max(0, Math.min(20, h)))), g = Ka.get(g) || qt;
            var y = s && f;
            return function(n) {
                var e = d;
                if (m && n % 1) return "";
                var u = 0 > n || 0 === n && 0 > 1 / n ? (n = -n, "-") : a;
                if (0 > p) {
                    var c = Zo.formatPrefix(n, h);
                    n = c.scale(n), e = c.symbol + d
                } else n *= p;
                n = g(n, h);
                var x = n.lastIndexOf("."),
                    M = 0 > x ? n : n.substring(0, x),
                    _ = 0 > x ? "" : t + n.substring(x + 1);
                !s && f && (M = i(M));
                var b = v.length + M.length + _.length + (y ? 0 : u.length),
                    w = l > b ? new Array(b = l - b + 1).join(r) : "";
                return y && (M = i(w + M)), u += v, n = M + _, ("<" === o ? u + n + w : ">" === o ? w + u + n : "^" === o ? w.substring(0, b >>= 1) + u + n + w.substring(b) : u + (y ? n : w + n)) + e
            }
        }
    }

    function qt(n) {
        return n + ""
    }

    function Rt() {
        this._ = new Date(arguments.length > 1 ? Date.UTC.apply(this, arguments) : arguments[0])
    }

    function Dt(n, t, e) {
        function r(t) {
            var e = n(t),
                r = i(e, 1);
            return r - t > t - e ? e : r
        }

        function u(e) {
            return t(e = n(new nc(e - 1)), 1), e
        }

        function i(n, e) {
            return t(n = new nc(+n), e), n
        }

        function o(n, r, i) {
            var o = u(n),
                a = [];
            if (i > 1)
                for (; r > o;) e(o) % i || a.push(new Date(+o)), t(o, 1);
            else
                for (; r > o;) a.push(new Date(+o)), t(o, 1);
            return a
        }

        function a(n, t, e) {
            try {
                nc = Rt;
                var r = new Rt;
                return r._ = n, o(r, t, e)
            } finally {
                nc = Date
            }
        }
        n.floor = n, n.round = r, n.ceil = u, n.offset = i, n.range = o;
        var c = n.utc = Pt(n);
        return c.floor = c, c.round = Pt(r), c.ceil = Pt(u), c.offset = Pt(i), c.range = a, n
    }

    function Pt(n) {
        return function(t, e) {
            try {
                nc = Rt;
                var r = new Rt;
                return r._ = t, n(r, e)._
            } finally {
                nc = Date
            }
        }
    }

    function Ut(n) {
        function t(n) {
            function t(t) {
                for (var e, u, i, o = [], a = -1, c = 0; ++a < r;) 37 === n.charCodeAt(a) && (o.push(n.substring(c, a)), null != (u = ec[e = n.charAt(++a)]) && (e = n.charAt(++a)), (i = C[e]) && (e = i(t, null == u ? "e" === e ? " " : "0" : u)), o.push(e), c = a + 1);
                return o.push(n.substring(c, a)), o.join("")
            }
            var r = n.length;
            return t.parse = function(t) {
                var r = {
                        y: 1900,
                        m: 0,
                        d: 1,
                        H: 0,
                        M: 0,
                        S: 0,
                        L: 0,
                        Z: null
                    },
                    u = e(r, n, t, 0);
                if (u != t.length) return null;
                "p" in r && (r.H = r.H % 12 + 12 * r.p);
                var i = null != r.Z && nc !== Rt,
                    o = new(i ? Rt : nc);
                return "j" in r ? o.setFullYear(r.y, 0, r.j) : "w" in r && ("W" in r || "U" in r) ? (o.setFullYear(r.y, 0, 1), o.setFullYear(r.y, 0, "W" in r ? (r.w + 6) % 7 + 7 * r.W - (o.getDay() + 5) % 7 : r.w + 7 * r.U - (o.getDay() + 6) % 7)) : o.setFullYear(r.y, r.m, r.d), o.setHours(r.H + Math.floor(r.Z / 100), r.M + r.Z % 100, r.S, r.L), i ? o._ : o
            }, t.toString = function() {
                return n
            }, t
        }

        function e(n, t, e, r) {
            for (var u, i, o, a = 0, c = t.length, s = e.length; c > a;) {
                if (r >= s) return -1;
                if (u = t.charCodeAt(a++), 37 === u) {
                    if (o = t.charAt(a++), i = N[o in ec ? t.charAt(a++) : o], !i || (r = i(n, e, r)) < 0) return -1
                } else if (u != e.charCodeAt(r++)) return -1
            }
            return r
        }

        function r(n, t, e) {
            b.lastIndex = 0;
            var r = b.exec(t.substring(e));
            return r ? (n.w = w.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function u(n, t, e) {
            M.lastIndex = 0;
            var r = M.exec(t.substring(e));
            return r ? (n.w = _.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function i(n, t, e) {
            E.lastIndex = 0;
            var r = E.exec(t.substring(e));
            return r ? (n.m = A.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function o(n, t, e) {
            S.lastIndex = 0;
            var r = S.exec(t.substring(e));
            return r ? (n.m = k.get(r[0].toLowerCase()), e + r[0].length) : -1
        }

        function a(n, t, r) {
            return e(n, C.c.toString(), t, r)
        }

        function c(n, t, r) {
            return e(n, C.x.toString(), t, r)
        }

        function s(n, t, r) {
            return e(n, C.X.toString(), t, r)
        }

        function l(n, t, e) {
            var r = x.get(t.substring(e, e += 2).toLowerCase());
            return null == r ? -1 : (n.p = r, e)
        }
        var f = n.dateTime,
            h = n.date,
            g = n.time,
            p = n.periods,
            v = n.days,
            d = n.shortDays,
            m = n.months,
            y = n.shortMonths;
        t.utc = function(n) {
            function e(n) {
                try {
                    nc = Rt;
                    var t = new nc;
                    return t._ = n, r(t)
                } finally {
                    nc = Date
                }
            }
            var r = t(n);
            return e.parse = function(n) {
                try {
                    nc = Rt;
                    var t = r.parse(n);
                    return t && t._
                } finally {
                    nc = Date
                }
            }, e.toString = r.toString, e
        }, t.multi = t.utc.multi = re;
        var x = Zo.map(),
            M = Ht(v),
            _ = Ft(v),
            b = Ht(d),
            w = Ft(d),
            S = Ht(m),
            k = Ft(m),
            E = Ht(y),
            A = Ft(y);
        p.forEach(function(n, t) {
            x.set(n.toLowerCase(), t)
        });
        var C = {
                a: function(n) {
                    return d[n.getDay()]
                },
                A: function(n) {
                    return v[n.getDay()]
                },
                b: function(n) {
                    return y[n.getMonth()]
                },
                B: function(n) {
                    return m[n.getMonth()]
                },
                c: t(f),
                d: function(n, t) {
                    return jt(n.getDate(), t, 2)
                },
                e: function(n, t) {
                    return jt(n.getDate(), t, 2)
                },
                H: function(n, t) {
                    return jt(n.getHours(), t, 2)
                },
                I: function(n, t) {
                    return jt(n.getHours() % 12 || 12, t, 2)
                },
                j: function(n, t) {
                    return jt(1 + Qa.dayOfYear(n), t, 3)
                },
                L: function(n, t) {
                    return jt(n.getMilliseconds(), t, 3)
                },
                m: function(n, t) {
                    return jt(n.getMonth() + 1, t, 2)
                },
                M: function(n, t) {
                    return jt(n.getMinutes(), t, 2)
                },
                p: function(n) {
                    return p[+(n.getHours() >= 12)]
                },
                S: function(n, t) {
                    return jt(n.getSeconds(), t, 2)
                },
                U: function(n, t) {
                    return jt(Qa.sundayOfYear(n), t, 2)
                },
                w: function(n) {
                    return n.getDay()
                },
                W: function(n, t) {
                    return jt(Qa.mondayOfYear(n), t, 2)
                },
                x: t(h),
                X: t(g),
                y: function(n, t) {
                    return jt(n.getFullYear() % 100, t, 2)
                },
                Y: function(n, t) {
                    return jt(n.getFullYear() % 1e4, t, 4)
                },
                Z: te,
                "%": function() {
                    return "%"
                }
            },
            N = {
                a: r,
                A: u,
                b: i,
                B: o,
                c: a,
                d: Wt,
                e: Wt,
                H: Gt,
                I: Gt,
                j: Jt,
                L: ne,
                m: Bt,
                M: Kt,
                p: l,
                S: Qt,
                U: Yt,
                w: Ot,
                W: It,
                x: c,
                X: s,
                y: Vt,
                Y: Zt,
                Z: Xt,
                "%": ee
            };
        return t
    }

    function jt(n, t, e) {
        var r = 0 > n ? "-" : "",
            u = (r ? -n : n) + "",
            i = u.length;
        return r + (e > i ? new Array(e - i + 1).join(t) + u : u)
    }

    function Ht(n) {
        return new RegExp("^(?:" + n.map(Zo.requote).join("|") + ")", "i")
    }

    function Ft(n) {
        for (var t = new o, e = -1, r = n.length; ++e < r;) t.set(n[e].toLowerCase(), e);
        return t
    }

    function Ot(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 1));
        return r ? (n.w = +r[0], e + r[0].length) : -1
    }

    function Yt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e));
        return r ? (n.U = +r[0], e + r[0].length) : -1
    }

    function It(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e));
        return r ? (n.W = +r[0], e + r[0].length) : -1
    }

    function Zt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 4));
        return r ? (n.y = +r[0], e + r[0].length) : -1
    }

    function Vt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 2));
        return r ? (n.y = $t(+r[0]), e + r[0].length) : -1
    }

    function Xt(n, t, e) {
        return /^[+-]\d{4}$/.test(t = t.substring(e, e + 5)) ? (n.Z = -t, e + 5) : -1
    }

    function $t(n) {
        return n + (n > 68 ? 1900 : 2e3)
    }

    function Bt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 2));
        return r ? (n.m = r[0] - 1, e + r[0].length) : -1
    }

    function Wt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 2));
        return r ? (n.d = +r[0], e + r[0].length) : -1
    }

    function Jt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 3));
        return r ? (n.j = +r[0], e + r[0].length) : -1
    }

    function Gt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 2));
        return r ? (n.H = +r[0], e + r[0].length) : -1
    }

    function Kt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 2));
        return r ? (n.M = +r[0], e + r[0].length) : -1
    }

    function Qt(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 2));
        return r ? (n.S = +r[0], e + r[0].length) : -1
    }

    function ne(n, t, e) {
        rc.lastIndex = 0;
        var r = rc.exec(t.substring(e, e + 3));
        return r ? (n.L = +r[0], e + r[0].length) : -1
    }

    function te(n) {
        var t = n.getTimezoneOffset(),
            e = t > 0 ? "-" : "+",
            r = ~~(ua(t) / 60),
            u = ua(t) % 60;
        return e + jt(r, "0", 2) + jt(u, "0", 2)
    }

    function ee(n, t, e) {
        uc.lastIndex = 0;
        var r = uc.exec(t.substring(e, e + 1));
        return r ? e + r[0].length : -1
    }

    function re(n) {
        for (var t = n.length, e = -1; ++e < t;) n[e][0] = this(n[e][0]);
        return function(t) {
            for (var e = 0, r = n[e]; !r[1](t);) r = n[++e];
            return r[0](t)
        }
    }

    function ue() {}

    function ie(n, t, e) {
        var r = e.s = n + t,
            u = r - n,
            i = r - u;
        e.t = n - i + (t - u)
    }

    function oe(n, t) {
        n && cc.hasOwnProperty(n.type) && cc[n.type](n, t)
    }

    function ae(n, t, e) {
        var r, u = -1,
            i = n.length - e;
        for (t.lineStart(); ++u < i;) r = n[u], t.point(r[0], r[1], r[2]);
        t.lineEnd()
    }

    function ce(n, t) {
        var e = -1,
            r = n.length;
        for (t.polygonStart(); ++e < r;) ae(n[e], t, 1);
        t.polygonEnd()
    }

    function se() {
        function n(n, t) {
            n *= Aa, t = t * Aa / 2 + ba / 4;
            var e = n - r,
                o = e >= 0 ? 1 : -1,
                a = o * e,
                c = Math.cos(t),
                s = Math.sin(t),
                l = i * s,
                f = u * c + l * Math.cos(a),
                h = l * o * Math.sin(a);
            lc.add(Math.atan2(h, f)), r = n, u = c, i = s
        }
        var t, e, r, u, i;
        fc.point = function(o, a) {
            fc.point = n, r = (t = o) * Aa, u = Math.cos(a = (e = a) * Aa / 2 + ba / 4), i = Math.sin(a)
        }, fc.lineEnd = function() {
            n(t, e)
        }
    }

    function le(n) {
        var t = n[0],
            e = n[1],
            r = Math.cos(e);
        return [r * Math.cos(t), r * Math.sin(t), Math.sin(e)]
    }

    function fe(n, t) {
        return n[0] * t[0] + n[1] * t[1] + n[2] * t[2]
    }

    function he(n, t) {
        return [n[1] * t[2] - n[2] * t[1], n[2] * t[0] - n[0] * t[2], n[0] * t[1] - n[1] * t[0]]
    }

    function ge(n, t) {
        n[0] += t[0], n[1] += t[1], n[2] += t[2]
    }

    function pe(n, t) {
        return [n[0] * t, n[1] * t, n[2] * t]
    }

    function ve(n) {
        var t = Math.sqrt(n[0] * n[0] + n[1] * n[1] + n[2] * n[2]);
        n[0] /= t, n[1] /= t, n[2] /= t
    }

    function de(n) {
        return [Math.atan2(n[1], n[0]), G(n[2])]
    }

    function me(n, t) {
        return ua(n[0] - t[0]) < ka && ua(n[1] - t[1]) < ka
    }

    function ye(n, t) {
        n *= Aa;
        var e = Math.cos(t *= Aa);
        xe(e * Math.cos(n), e * Math.sin(n), Math.sin(t))
    }

    function xe(n, t, e) {
        ++hc, pc += (n - pc) / hc, vc += (t - vc) / hc, dc += (e - dc) / hc
    }

    function Me() {
        function n(n, u) {
            n *= Aa;
            var i = Math.cos(u *= Aa),
                o = i * Math.cos(n),
                a = i * Math.sin(n),
                c = Math.sin(u),
                s = Math.atan2(Math.sqrt((s = e * c - r * a) * s + (s = r * o - t * c) * s + (s = t * a - e * o) * s), t * o + e * a + r * c);
            gc += s, mc += s * (t + (t = o)), yc += s * (e + (e = a)), xc += s * (r + (r = c)), xe(t, e, r)
        }
        var t, e, r;
        wc.point = function(u, i) {
            u *= Aa;
            var o = Math.cos(i *= Aa);
            t = o * Math.cos(u), e = o * Math.sin(u), r = Math.sin(i), wc.point = n, xe(t, e, r)
        }
    }

    function _e() {
        wc.point = ye
    }

    function be() {
        function n(n, t) {
            n *= Aa;
            var e = Math.cos(t *= Aa),
                o = e * Math.cos(n),
                a = e * Math.sin(n),
                c = Math.sin(t),
                s = u * c - i * a,
                l = i * o - r * c,
                f = r * a - u * o,
                h = Math.sqrt(s * s + l * l + f * f),
                g = r * o + u * a + i * c,
                p = h && -J(g) / h,
                v = Math.atan2(h, g);
            Mc += p * s, _c += p * l, bc += p * f, gc += v, mc += v * (r + (r = o)), yc += v * (u + (u = a)), xc += v * (i + (i = c)), xe(r, u, i)
        }
        var t, e, r, u, i;
        wc.point = function(o, a) {
            t = o, e = a, wc.point = n, o *= Aa;
            var c = Math.cos(a *= Aa);
            r = c * Math.cos(o), u = c * Math.sin(o), i = Math.sin(a), xe(r, u, i)
        }, wc.lineEnd = function() {
            n(t, e), wc.lineEnd = _e, wc.point = ye
        }
    }

    function we() {
        return !0
    }

    function Se(n, t, e, r, u) {
        var i = [],
            o = [];
        if (n.forEach(function(n) {
                if (!((t = n.length - 1) <= 0)) {
                    var t, e = n[0],
                        r = n[t];
                    if (me(e, r)) {
                        u.lineStart();
                        for (var a = 0; t > a; ++a) u.point((e = n[a])[0], e[1]);
                        return u.lineEnd(), void 0
                    }
                    var c = new Ee(e, n, null, !0),
                        s = new Ee(e, null, c, !1);
                    c.o = s, i.push(c), o.push(s), c = new Ee(r, n, null, !1), s = new Ee(r, null, c, !0), c.o = s, i.push(c), o.push(s)
                }
            }), o.sort(t), ke(i), ke(o), i.length) {
            for (var a = 0, c = e, s = o.length; s > a; ++a) o[a].e = c = !c;
            for (var l, f, h = i[0];;) {
                for (var g = h, p = !0; g.v;)
                    if ((g = g.n) === h) return;
                l = g.z, u.lineStart();
                do {
                    if (g.v = g.o.v = !0, g.e) {
                        if (p)
                            for (var a = 0, s = l.length; s > a; ++a) u.point((f = l[a])[0], f[1]);
                        else r(g.x, g.n.x, 1, u);
                        g = g.n
                    } else {
                        if (p) {
                            l = g.p.z;
                            for (var a = l.length - 1; a >= 0; --a) u.point((f = l[a])[0], f[1])
                        } else r(g.x, g.p.x, -1, u);
                        g = g.p
                    }
                    g = g.o, l = g.z, p = !p
                } while (!g.v);
                u.lineEnd()
            }
        }
    }

    function ke(n) {
        if (t = n.length) {
            for (var t, e, r = 0, u = n[0]; ++r < t;) u.n = e = n[r], e.p = u, u = e;
            u.n = e = n[0], e.p = u
        }
    }

    function Ee(n, t, e, r) {
        this.x = n, this.z = t, this.o = e, this.e = r, this.v = !1, this.n = this.p = null
    }

    function Ae(n, t, e, r) {
        return function(u, i) {
            function o(t, e) {
                var r = u(t, e);
                n(t = r[0], e = r[1]) && i.point(t, e)
            }

            function a(n, t) {
                var e = u(n, t);
                d.point(e[0], e[1])
            }

            function c() {
                y.point = a, d.lineStart()
            }

            function s() {
                y.point = o, d.lineEnd()
            }

            function l(n, t) {
                v.push([n, t]);
                var e = u(n, t);
                M.point(e[0], e[1])
            }

            function f() {
                M.lineStart(), v = []
            }

            function h() {
                l(v[0][0], v[0][1]), M.lineEnd();
                var n, t = M.clean(),
                    e = x.buffer(),
                    r = e.length;
                if (v.pop(), p.push(v), v = null, r)
                    if (1 & t) {
                        n = e[0];
                        var u, r = n.length - 1,
                            o = -1;
                        if (r > 0) {
                            for (_ || (i.polygonStart(), _ = !0), i.lineStart(); ++o < r;) i.point((u = n[o])[0], u[1]);
                            i.lineEnd()
                        }
                    } else r > 1 && 2 & t && e.push(e.pop().concat(e.shift())), g.push(e.filter(Ce))
            }
            var g, p, v, d = t(i),
                m = u.invert(r[0], r[1]),
                y = {
                    point: o,
                    lineStart: c,
                    lineEnd: s,
                    polygonStart: function() {
                        y.point = l, y.lineStart = f, y.lineEnd = h, g = [], p = []
                    },
                    polygonEnd: function() {
                        y.point = o, y.lineStart = c, y.lineEnd = s, g = Zo.merge(g);
                        var n = Le(m, p);
                        g.length ? (_ || (i.polygonStart(), _ = !0), Se(g, ze, n, e, i)) : n && (_ || (i.polygonStart(), _ = !0), i.lineStart(), e(null, null, 1, i), i.lineEnd()), _ && (i.polygonEnd(), _ = !1), g = p = null
                    },
                    sphere: function() {
                        i.polygonStart(), i.lineStart(), e(null, null, 1, i), i.lineEnd(), i.polygonEnd()
                    }
                },
                x = Ne(),
                M = t(x),
                _ = !1;
            return y
        }
    }

    function Ce(n) {
        return n.length > 1
    }

    function Ne() {
        var n, t = [];
        return {
            lineStart: function() {
                t.push(n = [])
            },
            point: function(t, e) {
                n.push([t, e])
            },
            lineEnd: v,
            buffer: function() {
                var e = t;
                return t = [], n = null, e
            },
            rejoin: function() {
                t.length > 1 && t.push(t.pop().concat(t.shift()))
            }
        }
    }

    function ze(n, t) {
        return ((n = n.x)[0] < 0 ? n[1] - Sa - ka : Sa - n[1]) - ((t = t.x)[0] < 0 ? t[1] - Sa - ka : Sa - t[1])
    }

    function Le(n, t) {
        var e = n[0],
            r = n[1],
            u = [Math.sin(e), -Math.cos(e), 0],
            i = 0,
            o = 0;
        lc.reset();
        for (var a = 0, c = t.length; c > a; ++a) {
            var s = t[a],
                l = s.length;
            if (l)
                for (var f = s[0], h = f[0], g = f[1] / 2 + ba / 4, p = Math.sin(g), v = Math.cos(g), d = 1;;) {
                    d === l && (d = 0), n = s[d];
                    var m = n[0],
                        y = n[1] / 2 + ba / 4,
                        x = Math.sin(y),
                        M = Math.cos(y),
                        _ = m - h,
                        b = _ >= 0 ? 1 : -1,
                        w = b * _,
                        S = w > ba,
                        k = p * x;
                    if (lc.add(Math.atan2(k * b * Math.sin(w), v * M + k * Math.cos(w))), i += S ? _ + b * wa : _, S ^ h >= e ^ m >= e) {
                        var E = he(le(f), le(n));
                        ve(E);
                        var A = he(u, E);
                        ve(A);
                        var C = (S ^ _ >= 0 ? -1 : 1) * G(A[2]);
                        (r > C || r === C && (E[0] || E[1])) && (o += S ^ _ >= 0 ? 1 : -1)
                    }
                    if (!d++) break;
                    h = m, p = x, v = M, f = n
                }
        }
        return (-ka > i || ka > i && 0 > lc) ^ 1 & o
    }

    function Te(n) {
        var t, e = 0 / 0,
            r = 0 / 0,
            u = 0 / 0;
        return {
            lineStart: function() {
                n.lineStart(), t = 1
            },
            point: function(i, o) {
                var a = i > 0 ? ba : -ba,
                    c = ua(i - e);
                ua(c - ba) < ka ? (n.point(e, r = (r + o) / 2 > 0 ? Sa : -Sa), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), n.point(i, r), t = 0) : u !== a && c >= ba && (ua(e - u) < ka && (e -= u * ka), ua(i - a) < ka && (i -= a * ka), r = qe(e, r, i, o), n.point(u, r), n.lineEnd(), n.lineStart(), n.point(a, r), t = 0), n.point(e = i, r = o), u = a
            },
            lineEnd: function() {
                n.lineEnd(), e = r = 0 / 0
            },
            clean: function() {
                return 2 - t
            }
        }
    }

    function qe(n, t, e, r) {
        var u, i, o = Math.sin(n - e);
        return ua(o) > ka ? Math.atan((Math.sin(t) * (i = Math.cos(r)) * Math.sin(e) - Math.sin(r) * (u = Math.cos(t)) * Math.sin(n)) / (u * i * o)) : (t + r) / 2
    }

    function Re(n, t, e, r) {
        var u;
        if (null == n) u = e * Sa, r.point(-ba, u), r.point(0, u), r.point(ba, u), r.point(ba, 0), r.point(ba, -u), r.point(0, -u), r.point(-ba, -u), r.point(-ba, 0), r.point(-ba, u);
        else if (ua(n[0] - t[0]) > ka) {
            var i = n[0] < t[0] ? ba : -ba;
            u = e * i / 2, r.point(-i, u), r.point(0, u), r.point(i, u)
        } else r.point(t[0], t[1])
    }

    function De(n) {
        function t(n, t) {
            return Math.cos(n) * Math.cos(t) > i
        }

        function e(n) {
            var e, i, c, s, l;
            return {
                lineStart: function() {
                    s = c = !1, l = 1
                },
                point: function(f, h) {
                    var g, p = [f, h],
                        v = t(f, h),
                        d = o ? v ? 0 : u(f, h) : v ? u(f + (0 > f ? ba : -ba), h) : 0;
                    if (!e && (s = c = v) && n.lineStart(), v !== c && (g = r(e, p), (me(e, g) || me(p, g)) && (p[0] += ka, p[1] += ka, v = t(p[0], p[1]))), v !== c) l = 0, v ? (n.lineStart(), g = r(p, e), n.point(g[0], g[1])) : (g = r(e, p), n.point(g[0], g[1]), n.lineEnd()), e = g;
                    else if (a && e && o ^ v) {
                        var m;
                        d & i || !(m = r(p, e, !0)) || (l = 0, o ? (n.lineStart(), n.point(m[0][0], m[0][1]), n.point(m[1][0], m[1][1]), n.lineEnd()) : (n.point(m[1][0], m[1][1]), n.lineEnd(), n.lineStart(), n.point(m[0][0], m[0][1])))
                    }!v || e && me(e, p) || n.point(p[0], p[1]), e = p, c = v, i = d
                },
                lineEnd: function() {
                    c && n.lineEnd(), e = null
                },
                clean: function() {
                    return l | (s && c) << 1
                }
            }
        }

        function r(n, t, e) {
            var r = le(n),
                u = le(t),
                o = [1, 0, 0],
                a = he(r, u),
                c = fe(a, a),
                s = a[0],
                l = c - s * s;
            if (!l) return !e && n;
            var f = i * c / l,
                h = -i * s / l,
                g = he(o, a),
                p = pe(o, f),
                v = pe(a, h);
            ge(p, v);
            var d = g,
                m = fe(p, d),
                y = fe(d, d),
                x = m * m - y * (fe(p, p) - 1);
            if (!(0 > x)) {
                var M = Math.sqrt(x),
                    _ = pe(d, (-m - M) / y);
                if (ge(_, p), _ = de(_), !e) return _;
                var b, w = n[0],
                    S = t[0],
                    k = n[1],
                    E = t[1];
                w > S && (b = w, w = S, S = b);
                var A = S - w,
                    C = ua(A - ba) < ka,
                    N = C || ka > A;
                if (!C && k > E && (b = k, k = E, E = b), N ? C ? k + E > 0 ^ _[1] < (ua(_[0] - w) < ka ? k : E) : k <= _[1] && _[1] <= E : A > ba ^ (w <= _[0] && _[0] <= S)) {
                    var z = pe(d, (-m + M) / y);
                    return ge(z, p), [_, de(z)]
                }
            }
        }

        function u(t, e) {
            var r = o ? n : ba - n,
                u = 0;
            return -r > t ? u |= 1 : t > r && (u |= 2), -r > e ? u |= 4 : e > r && (u |= 8), u
        }
        var i = Math.cos(n),
            o = i > 0,
            a = ua(i) > ka,
            c = sr(n, 6 * Aa);
        return Ae(t, e, c, o ? [0, -n] : [-ba, n - ba])
    }

    function Pe(n, t, e, r) {
        return function(u) {
            var i, o = u.a,
                a = u.b,
                c = o.x,
                s = o.y,
                l = a.x,
                f = a.y,
                h = 0,
                g = 1,
                p = l - c,
                v = f - s;
            if (i = n - c, p || !(i > 0)) {
                if (i /= p, 0 > p) {
                    if (h > i) return;
                    g > i && (g = i)
                } else if (p > 0) {
                    if (i > g) return;
                    i > h && (h = i)
                }
                if (i = e - c, p || !(0 > i)) {
                    if (i /= p, 0 > p) {
                        if (i > g) return;
                        i > h && (h = i)
                    } else if (p > 0) {
                        if (h > i) return;
                        g > i && (g = i)
                    }
                    if (i = t - s, v || !(i > 0)) {
                        if (i /= v, 0 > v) {
                            if (h > i) return;
                            g > i && (g = i)
                        } else if (v > 0) {
                            if (i > g) return;
                            i > h && (h = i)
                        }
                        if (i = r - s, v || !(0 > i)) {
                            if (i /= v, 0 > v) {
                                if (i > g) return;
                                i > h && (h = i)
                            } else if (v > 0) {
                                if (h > i) return;
                                g > i && (g = i)
                            }
                            return h > 0 && (u.a = {
                                x: c + h * p,
                                y: s + h * v
                            }), 1 > g && (u.b = {
                                x: c + g * p,
                                y: s + g * v
                            }), u
                        }
                    }
                }
            }
        }
    }

    function Ue(n, t, e, r) {
        function u(r, u) {
            return ua(r[0] - n) < ka ? u > 0 ? 0 : 3 : ua(r[0] - e) < ka ? u > 0 ? 2 : 1 : ua(r[1] - t) < ka ? u > 0 ? 1 : 0 : u > 0 ? 3 : 2
        }

        function i(n, t) {
            return o(n.x, t.x)
        }

        function o(n, t) {
            var e = u(n, 1),
                r = u(t, 1);
            return e !== r ? e - r : 0 === e ? t[1] - n[1] : 1 === e ? n[0] - t[0] : 2 === e ? n[1] - t[1] : t[0] - n[0]
        }
        return function(a) {
            function c(n) {
                for (var t = 0, e = d.length, r = n[1], u = 0; e > u; ++u)
                    for (var i, o = 1, a = d[u], c = a.length, s = a[0]; c > o; ++o) i = a[o], s[1] <= r ? i[1] > r && W(s, i, n) > 0 && ++t : i[1] <= r && W(s, i, n) < 0 && --t, s = i;
                return 0 !== t
            }

            function s(i, a, c, s) {
                var l = 0,
                    f = 0;
                if (null == i || (l = u(i, c)) !== (f = u(a, c)) || o(i, a) < 0 ^ c > 0) {
                    do s.point(0 === l || 3 === l ? n : e, l > 1 ? r : t); while ((l = (l + c + 4) % 4) !== f)
                } else s.point(a[0], a[1])
            }

            function l(u, i) {
                return u >= n && e >= u && i >= t && r >= i
            }

            function f(n, t) {
                l(n, t) && a.point(n, t)
            }

            function h() {
                N.point = p, d && d.push(m = []), S = !0, w = !1, _ = b = 0 / 0
            }

            function g() {
                v && (p(y, x), M && w && A.rejoin(), v.push(A.buffer())), N.point = f, w && a.lineEnd()
            }

            function p(n, t) {
                n = Math.max(-kc, Math.min(kc, n)), t = Math.max(-kc, Math.min(kc, t));
                var e = l(n, t);
                if (d && m.push([n, t]), S) y = n, x = t, M = e, S = !1, e && (a.lineStart(), a.point(n, t));
                else if (e && w) a.point(n, t);
                else {
                    var r = {
                        a: {
                            x: _,
                            y: b
                        },
                        b: {
                            x: n,
                            y: t
                        }
                    };
                    C(r) ? (w || (a.lineStart(), a.point(r.a.x, r.a.y)), a.point(r.b.x, r.b.y), e || a.lineEnd(), k = !1) : e && (a.lineStart(), a.point(n, t), k = !1)
                }
                _ = n, b = t, w = e
            }
            var v, d, m, y, x, M, _, b, w, S, k, E = a,
                A = Ne(),
                C = Pe(n, t, e, r),
                N = {
                    point: f,
                    lineStart: h,
                    lineEnd: g,
                    polygonStart: function() {
                        a = A, v = [], d = [], k = !0
                    },
                    polygonEnd: function() {
                        a = E, v = Zo.merge(v);
                        var t = c([n, r]),
                            e = k && t,
                            u = v.length;
                        (e || u) && (a.polygonStart(), e && (a.lineStart(), s(null, null, 1, a), a.lineEnd()), u && Se(v, i, t, s, a), a.polygonEnd()), v = d = m = null
                    }
                };
            return N
        }
    }

    function je(n, t) {
        function e(e, r) {
            return e = n(e, r), t(e[0], e[1])
        }
        return n.invert && t.invert && (e.invert = function(e, r) {
            return e = t.invert(e, r), e && n.invert(e[0], e[1])
        }), e
    }

    function He(n) {
        var t = 0,
            e = ba / 3,
            r = tr(n),
            u = r(t, e);
        return u.parallels = function(n) {
            return arguments.length ? r(t = n[0] * ba / 180, e = n[1] * ba / 180) : [180 * (t / ba), 180 * (e / ba)]
        }, u
    }

    function Fe(n, t) {
        function e(n, t) {
            var e = Math.sqrt(i - 2 * u * Math.sin(t)) / u;
            return [e * Math.sin(n *= u), o - e * Math.cos(n)]
        }
        var r = Math.sin(n),
            u = (r + Math.sin(t)) / 2,
            i = 1 + r * (2 * u - r),
            o = Math.sqrt(i) / u;
        return e.invert = function(n, t) {
            var e = o - t;
            return [Math.atan2(n, e) / u, G((i - (n * n + e * e) * u * u) / (2 * u))]
        }, e
    }

    function Oe() {
        function n(n, t) {
            Ac += u * n - r * t, r = n, u = t
        }
        var t, e, r, u;
        Tc.point = function(i, o) {
            Tc.point = n, t = r = i, e = u = o
        }, Tc.lineEnd = function() {
            n(t, e)
        }
    }

    function Ye(n, t) {
        Cc > n && (Cc = n), n > zc && (zc = n), Nc > t && (Nc = t), t > Lc && (Lc = t)
    }

    function Ie() {
        function n(n, t) {
            o.push("M", n, ",", t, i)
        }

        function t(n, t) {
            o.push("M", n, ",", t), a.point = e
        }

        function e(n, t) {
            o.push("L", n, ",", t)
        }

        function r() {
            a.point = n
        }

        function u() {
            o.push("Z")
        }
        var i = Ze(4.5),
            o = [],
            a = {
                point: n,
                lineStart: function() {
                    a.point = t
                },
                lineEnd: r,
                polygonStart: function() {
                    a.lineEnd = u
                },
                polygonEnd: function() {
                    a.lineEnd = r, a.point = n
                },
                pointRadius: function(n) {
                    return i = Ze(n), a
                },
                result: function() {
                    if (o.length) {
                        var n = o.join("");
                        return o = [], n
                    }
                }
            };
        return a
    }

    function Ze(n) {
        return "m0," + n + "a" + n + "," + n + " 0 1,1 0," + -2 * n + "a" + n + "," + n + " 0 1,1 0," + 2 * n + "z"
    }

    function Ve(n, t) {
        pc += n, vc += t, ++dc
    }

    function Xe() {
        function n(n, r) {
            var u = n - t,
                i = r - e,
                o = Math.sqrt(u * u + i * i);
            mc += o * (t + n) / 2, yc += o * (e + r) / 2, xc += o, Ve(t = n, e = r)
        }
        var t, e;
        Rc.point = function(r, u) {
            Rc.point = n, Ve(t = r, e = u)
        }
    }

    function $e() {
        Rc.point = Ve
    }

    function Be() {
        function n(n, t) {
            var e = n - r,
                i = t - u,
                o = Math.sqrt(e * e + i * i);
            mc += o * (r + n) / 2, yc += o * (u + t) / 2, xc += o, o = u * n - r * t, Mc += o * (r + n), _c += o * (u + t), bc += 3 * o, Ve(r = n, u = t)
        }
        var t, e, r, u;
        Rc.point = function(i, o) {
            Rc.point = n, Ve(t = r = i, e = u = o)
        }, Rc.lineEnd = function() {
            n(t, e)
        }
    }

    function We(n) {
        function t(t, e) {
            n.moveTo(t, e), n.arc(t, e, o, 0, wa)
        }

        function e(t, e) {
            n.moveTo(t, e), a.point = r
        }

        function r(t, e) {
            n.lineTo(t, e)
        }

        function u() {
            a.point = t
        }

        function i() {
            n.closePath()
        }
        var o = 4.5,
            a = {
                point: t,
                lineStart: function() {
                    a.point = e
                },
                lineEnd: u,
                polygonStart: function() {
                    a.lineEnd = i
                },
                polygonEnd: function() {
                    a.lineEnd = u, a.point = t
                },
                pointRadius: function(n) {
                    return o = n, a
                },
                result: v
            };
        return a
    }

    function Je(n) {
        function t(n) {
            return (a ? r : e)(n)
        }

        function e(t) {
            return Qe(t, function(e, r) {
                e = n(e, r), t.point(e[0], e[1])
            })
        }

        function r(t) {
            function e(e, r) {
                e = n(e, r), t.point(e[0], e[1])
            }

            function r() {
                x = 0 / 0, S.point = i, t.lineStart()
            }

            function i(e, r) {
                var i = le([e, r]),
                    o = n(e, r);
                u(x, M, y, _, b, w, x = o[0], M = o[1], y = e, _ = i[0], b = i[1], w = i[2], a, t), t.point(x, M)
            }

            function o() {
                S.point = e, t.lineEnd()
            }

            function c() {
                r(), S.point = s, S.lineEnd = l
            }

            function s(n, t) {
                i(f = n, h = t), g = x, p = M, v = _, d = b, m = w, S.point = i
            }

            function l() {
                u(x, M, y, _, b, w, g, p, f, v, d, m, a, t), S.lineEnd = o, o()
            }
            var f, h, g, p, v, d, m, y, x, M, _, b, w, S = {
                point: e,
                lineStart: r,
                lineEnd: o,
                polygonStart: function() {
                    t.polygonStart(), S.lineStart = c
                },
                polygonEnd: function() {
                    t.polygonEnd(), S.lineStart = r
                }
            };
            return S
        }

        function u(t, e, r, a, c, s, l, f, h, g, p, v, d, m) {
            var y = l - t,
                x = f - e,
                M = y * y + x * x;
            if (M > 4 * i && d--) {
                var _ = a + g,
                    b = c + p,
                    w = s + v,
                    S = Math.sqrt(_ * _ + b * b + w * w),
                    k = Math.asin(w /= S),
                    E = ua(ua(w) - 1) < ka || ua(r - h) < ka ? (r + h) / 2 : Math.atan2(b, _),
                    A = n(E, k),
                    C = A[0],
                    N = A[1],
                    z = C - t,
                    L = N - e,
                    T = x * z - y * L;
                (T * T / M > i || ua((y * z + x * L) / M - .5) > .3 || o > a * g + c * p + s * v) && (u(t, e, r, a, c, s, C, N, E, _ /= S, b /= S, w, d, m), m.point(C, N), u(C, N, E, _, b, w, l, f, h, g, p, v, d, m))
            }
        }
        var i = .5,
            o = Math.cos(30 * Aa),
            a = 16;
        return t.precision = function(n) {
            return arguments.length ? (a = (i = n * n) > 0 && 16, t) : Math.sqrt(i)
        }, t
    }

    function Ge(n) {
        var t = Je(function(t, e) {
            return n([t * Ca, e * Ca])
        });
        return function(n) {
            return er(t(n))
        }
    }

    function Ke(n) {
        this.stream = n
    }

    function Qe(n, t) {
        return {
            point: t,
            sphere: function() {
                n.sphere()
            },
            lineStart: function() {
                n.lineStart()
            },
            lineEnd: function() {
                n.lineEnd()
            },
            polygonStart: function() {
                n.polygonStart()
            },
            polygonEnd: function() {
                n.polygonEnd()
            }
        }
    }

    function nr(n) {
        return tr(function() {
            return n
        })()
    }

    function tr(n) {
        function t(n) {
            return n = a(n[0] * Aa, n[1] * Aa), [n[0] * h + c, s - n[1] * h]
        }

        function e(n) {
            return n = a.invert((n[0] - c) / h, (s - n[1]) / h), n && [n[0] * Ca, n[1] * Ca]
        }

        function r() {
            a = je(o = ir(m, y, x), i);
            var n = i(v, d);
            return c = g - n[0] * h, s = p + n[1] * h, u()
        }

        function u() {
            return l && (l.valid = !1, l = null), t
        }
        var i, o, a, c, s, l, f = Je(function(n, t) {
                return n = i(n, t), [n[0] * h + c, s - n[1] * h]
            }),
            h = 150,
            g = 480,
            p = 250,
            v = 0,
            d = 0,
            m = 0,
            y = 0,
            x = 0,
            M = Sc,
            _ = wt,
            b = null,
            w = null;
        return t.stream = function(n) {
                return l && (l.valid = !1), l = er(M(o, f(_(n)))), l.valid = !0, l
            }, t.clipAngle = function(n) {
                return arguments.length ? (M = null == n ? (b = n, Sc) : De((b = +n) * Aa), u()) : b
            }, t.clipExtent = function(n) {
                return arguments.length ? (w = n, _ = n ? Ue(n[0][0], n[0][1], n[1][0], n[1][1]) : wt, u()) : w
            }, t.scale = function(n) {
                return arguments.length ? (h = +n, r()) : h
            }, t.translate = function(n) {
                return arguments.length ? (g = +n[0], p = +n[1], r()) : [g, p]
            }, t.center = function(n) {
                return arguments.length ? (v = n[0] % 360 * Aa, d = n[1] % 360 * Aa, r()) : [v * Ca, d * Ca]
            }, t.rotate = function(n) {
                return arguments.length ? (m = n[0] % 360 * Aa, y = n[1] % 360 * Aa, x = n.length > 2 ? n[2] % 360 * Aa : 0, r()) : [m * Ca, y * Ca, x * Ca]
            }, Zo.rebind(t, f, "precision"),
            function() {
                return i = n.apply(this, arguments), t.invert = i.invert && e, r()
            }
    }

    function er(n) {
        return Qe(n, function(t, e) {
            n.point(t * Aa, e * Aa)
        })
    }

    function rr(n, t) {
        return [n, t]
    }

    function ur(n, t) {
        return [n > ba ? n - wa : -ba > n ? n + wa : n, t]
    }

    function ir(n, t, e) {
        return n ? t || e ? je(ar(n), cr(t, e)) : ar(n) : t || e ? cr(t, e) : ur
    }

    function or(n) {
        return function(t, e) {
            return t += n, [t > ba ? t - wa : -ba > t ? t + wa : t, e]
        }
    }

    function ar(n) {
        var t = or(n);
        return t.invert = or(-n), t
    }

    function cr(n, t) {
        function e(n, t) {
            var e = Math.cos(t),
                a = Math.cos(n) * e,
                c = Math.sin(n) * e,
                s = Math.sin(t),
                l = s * r + a * u;
            return [Math.atan2(c * i - l * o, a * r - s * u), G(l * i + c * o)]
        }
        var r = Math.cos(n),
            u = Math.sin(n),
            i = Math.cos(t),
            o = Math.sin(t);
        return e.invert = function(n, t) {
            var e = Math.cos(t),
                a = Math.cos(n) * e,
                c = Math.sin(n) * e,
                s = Math.sin(t),
                l = s * i - c * o;
            return [Math.atan2(c * i + s * o, a * r + l * u), G(l * r - a * u)]
        }, e
    }

    function sr(n, t) {
        var e = Math.cos(n),
            r = Math.sin(n);
        return function(u, i, o, a) {
            var c = o * t;
            null != u ? (u = lr(e, u), i = lr(e, i), (o > 0 ? i > u : u > i) && (u += o * wa)) : (u = n + o * wa, i = n - .5 * c);
            for (var s, l = u; o > 0 ? l > i : i > l; l -= c) a.point((s = de([e, -r * Math.cos(l), -r * Math.sin(l)]))[0], s[1])
        }
    }

    function lr(n, t) {
        var e = le(t);
        e[0] -= n, ve(e);
        var r = J(-e[1]);
        return ((-e[2] < 0 ? -r : r) + 2 * Math.PI - ka) % (2 * Math.PI)
    }

    function fr(n, t, e) {
        var r = Zo.range(n, t - ka, e).concat(t);
        return function(n) {
            return r.map(function(t) {
                return [n, t]
            })
        }
    }

    function hr(n, t, e) {
        var r = Zo.range(n, t - ka, e).concat(t);
        return function(n) {
            return r.map(function(t) {
                return [t, n]
            })
        }
    }

    function gr(n) {
        return n.source
    }

    function pr(n) {
        return n.target
    }

    function vr(n, t, e, r) {
        var u = Math.cos(t),
            i = Math.sin(t),
            o = Math.cos(r),
            a = Math.sin(r),
            c = u * Math.cos(n),
            s = u * Math.sin(n),
            l = o * Math.cos(e),
            f = o * Math.sin(e),
            h = 2 * Math.asin(Math.sqrt(tt(r - t) + u * o * tt(e - n))),
            g = 1 / Math.sin(h),
            p = h ? function(n) {
                var t = Math.sin(n *= h) * g,
                    e = Math.sin(h - n) * g,
                    r = e * c + t * l,
                    u = e * s + t * f,
                    o = e * i + t * a;
                return [Math.atan2(u, r) * Ca, Math.atan2(o, Math.sqrt(r * r + u * u)) * Ca]
            } : function() {
                return [n * Ca, t * Ca]
            };
        return p.distance = h, p
    }

    function dr() {
        function n(n, u) {
            var i = Math.sin(u *= Aa),
                o = Math.cos(u),
                a = ua((n *= Aa) - t),
                c = Math.cos(a);
            Dc += Math.atan2(Math.sqrt((a = o * Math.sin(a)) * a + (a = r * i - e * o * c) * a), e * i + r * o * c), t = n, e = i, r = o
        }
        var t, e, r;
        Pc.point = function(u, i) {
            t = u * Aa, e = Math.sin(i *= Aa), r = Math.cos(i), Pc.point = n
        }, Pc.lineEnd = function() {
            Pc.point = Pc.lineEnd = v
        }
    }

    function mr(n, t) {
        function e(t, e) {
            var r = Math.cos(t),
                u = Math.cos(e),
                i = n(r * u);
            return [i * u * Math.sin(t), i * Math.sin(e)]
        }
        return e.invert = function(n, e) {
            var r = Math.sqrt(n * n + e * e),
                u = t(r),
                i = Math.sin(u),
                o = Math.cos(u);
            return [Math.atan2(n * i, r * o), Math.asin(r && e * i / r)]
        }, e
    }

    function yr(n, t) {
        function e(n, t) {
            o > 0 ? -Sa + ka > t && (t = -Sa + ka) : t > Sa - ka && (t = Sa - ka);
            var e = o / Math.pow(u(t), i);
            return [e * Math.sin(i * n), o - e * Math.cos(i * n)]
        }
        var r = Math.cos(n),
            u = function(n) {
                return Math.tan(ba / 4 + n / 2)
            },
            i = n === t ? Math.sin(n) : Math.log(r / Math.cos(t)) / Math.log(u(t) / u(n)),
            o = r * Math.pow(u(n), i) / i;
        return i ? (e.invert = function(n, t) {
            var e = o - t,
                r = B(i) * Math.sqrt(n * n + e * e);
            return [Math.atan2(n, e) / i, 2 * Math.atan(Math.pow(o / r, 1 / i)) - Sa]
        }, e) : Mr
    }

    function xr(n, t) {
        function e(n, t) {
            var e = i - t;
            return [e * Math.sin(u * n), i - e * Math.cos(u * n)]
        }
        var r = Math.cos(n),
            u = n === t ? Math.sin(n) : (r - Math.cos(t)) / (t - n),
            i = r / u + n;
        return ua(u) < ka ? rr : (e.invert = function(n, t) {
            var e = i - t;
            return [Math.atan2(n, e) / u, i - B(u) * Math.sqrt(n * n + e * e)]
        }, e)
    }

    function Mr(n, t) {
        return [n, Math.log(Math.tan(ba / 4 + t / 2))]
    }

    function _r(n) {
        var t, e = nr(n),
            r = e.scale,
            u = e.translate,
            i = e.clipExtent;
        return e.scale = function() {
            var n = r.apply(e, arguments);
            return n === e ? t ? e.clipExtent(null) : e : n
        }, e.translate = function() {
            var n = u.apply(e, arguments);
            return n === e ? t ? e.clipExtent(null) : e : n
        }, e.clipExtent = function(n) {
            var o = i.apply(e, arguments);
            if (o === e) {
                if (t = null == n) {
                    var a = ba * r(),
                        c = u();
                    i([
                        [c[0] - a, c[1] - a],
                        [c[0] + a, c[1] + a]
                    ])
                }
            } else t && (o = null);
            return o
        }, e.clipExtent(null)
    }

    function br(n, t) {
        return [Math.log(Math.tan(ba / 4 + t / 2)), -n]
    }

    function wr(n) {
        return n[0]
    }

    function Sr(n) {
        return n[1]
    }

    function kr(n) {
        for (var t = n.length, e = [0, 1], r = 2, u = 2; t > u; u++) {
            for (; r > 1 && W(n[e[r - 2]], n[e[r - 1]], n[u]) <= 0;) --r;
            e[r++] = u
        }
        return e.slice(0, r)
    }

    function Er(n, t) {
        return n[0] - t[0] || n[1] - t[1]
    }

    function Ar(n, t, e) {
        return (e[0] - t[0]) * (n[1] - t[1]) < (e[1] - t[1]) * (n[0] - t[0])
    }

    function Cr(n, t, e, r) {
        var u = n[0],
            i = e[0],
            o = t[0] - u,
            a = r[0] - i,
            c = n[1],
            s = e[1],
            l = t[1] - c,
            f = r[1] - s,
            h = (a * (c - s) - f * (u - i)) / (f * o - a * l);
        return [u + h * o, c + h * l]
    }

    function Nr(n) {
        var t = n[0],
            e = n[n.length - 1];
        return !(t[0] - e[0] || t[1] - e[1])
    }

    function zr() {
        Gr(this), this.edge = this.site = this.circle = null
    }

    function Lr(n) {
        var t = Bc.pop() || new zr;
        return t.site = n, t
    }

    function Tr(n) {
        Yr(n), Vc.remove(n), Bc.push(n), Gr(n)
    }

    function qr(n) {
        var t = n.circle,
            e = t.x,
            r = t.cy,
            u = {
                x: e,
                y: r
            },
            i = n.P,
            o = n.N,
            a = [n];
        Tr(n);
        for (var c = i; c.circle && ua(e - c.circle.x) < ka && ua(r - c.circle.cy) < ka;) i = c.P, a.unshift(c), Tr(c), c = i;
        a.unshift(c), Yr(c);
        for (var s = o; s.circle && ua(e - s.circle.x) < ka && ua(r - s.circle.cy) < ka;) o = s.N, a.push(s), Tr(s), s = o;
        a.push(s), Yr(s);
        var l, f = a.length;
        for (l = 1; f > l; ++l) s = a[l], c = a[l - 1], Br(s.edge, c.site, s.site, u);
        c = a[0], s = a[f - 1], s.edge = Xr(c.site, s.site, null, u), Or(c), Or(s)
    }

    function Rr(n) {
        for (var t, e, r, u, i = n.x, o = n.y, a = Vc._; a;)
            if (r = Dr(a, o) - i, r > ka) a = a.L;
            else {
                if (u = i - Pr(a, o), !(u > ka)) {
                    r > -ka ? (t = a.P, e = a) : u > -ka ? (t = a, e = a.N) : t = e = a;
                    break
                }
                if (!a.R) {
                    t = a;
                    break
                }
                a = a.R
            } var c = Lr(n);
        if (Vc.insert(t, c), t || e) {
            if (t === e) return Yr(t), e = Lr(t.site), Vc.insert(c, e), c.edge = e.edge = Xr(t.site, c.site), Or(t), Or(e), void 0;
            if (!e) return c.edge = Xr(t.site, c.site), void 0;
            Yr(t), Yr(e);
            var s = t.site,
                l = s.x,
                f = s.y,
                h = n.x - l,
                g = n.y - f,
                p = e.site,
                v = p.x - l,
                d = p.y - f,
                m = 2 * (h * d - g * v),
                y = h * h + g * g,
                x = v * v + d * d,
                M = {
                    x: (d * y - g * x) / m + l,
                    y: (h * x - v * y) / m + f
                };
            Br(e.edge, s, p, M), c.edge = Xr(s, n, null, M), e.edge = Xr(n, p, null, M), Or(t), Or(e)
        }
    }

    function Dr(n, t) {
        var e = n.site,
            r = e.x,
            u = e.y,
            i = u - t;
        if (!i) return r;
        var o = n.P;
        if (!o) return -1 / 0;
        e = o.site;
        var a = e.x,
            c = e.y,
            s = c - t;
        if (!s) return a;
        var l = a - r,
            f = 1 / i - 1 / s,
            h = l / s;
        return f ? (-h + Math.sqrt(h * h - 2 * f * (l * l / (-2 * s) - c + s / 2 + u - i / 2))) / f + r : (r + a) / 2
    }

    function Pr(n, t) {
        var e = n.N;
        if (e) return Dr(e, t);
        var r = n.site;
        return r.y === t ? r.x : 1 / 0
    }

    function Ur(n) {
        this.site = n, this.edges = []
    }

    function jr(n) {
        for (var t, e, r, u, i, o, a, c, s, l, f = n[0][0], h = n[1][0], g = n[0][1], p = n[1][1], v = Zc, d = v.length; d--;)
            if (i = v[d], i && i.prepare())
                for (a = i.edges, c = a.length, o = 0; c > o;) l = a[o].end(), r = l.x, u = l.y, s = a[++o % c].start(), t = s.x, e = s.y, (ua(r - t) > ka || ua(u - e) > ka) && (a.splice(o, 0, new Wr($r(i.site, l, ua(r - f) < ka && p - u > ka ? {
                    x: f,
                    y: ua(t - f) < ka ? e : p
                } : ua(u - p) < ka && h - r > ka ? {
                    x: ua(e - p) < ka ? t : h,
                    y: p
                } : ua(r - h) < ka && u - g > ka ? {
                    x: h,
                    y: ua(t - h) < ka ? e : g
                } : ua(u - g) < ka && r - f > ka ? {
                    x: ua(e - g) < ka ? t : f,
                    y: g
                } : null), i.site, null)), ++c)
    }

    function Hr(n, t) {
        return t.angle - n.angle
    }

    function Fr() {
        Gr(this), this.x = this.y = this.arc = this.site = this.cy = null
    }

    function Or(n) {
        var t = n.P,
            e = n.N;
        if (t && e) {
            var r = t.site,
                u = n.site,
                i = e.site;
            if (r !== i) {
                var o = u.x,
                    a = u.y,
                    c = r.x - o,
                    s = r.y - a,
                    l = i.x - o,
                    f = i.y - a,
                    h = 2 * (c * f - s * l);
                if (!(h >= -Ea)) {
                    var g = c * c + s * s,
                        p = l * l + f * f,
                        v = (f * g - s * p) / h,
                        d = (c * p - l * g) / h,
                        f = d + a,
                        m = Wc.pop() || new Fr;
                    m.arc = n, m.site = u, m.x = v + o, m.y = f + Math.sqrt(v * v + d * d), m.cy = f, n.circle = m;
                    for (var y = null, x = $c._; x;)
                        if (m.y < x.y || m.y === x.y && m.x <= x.x) {
                            if (!x.L) {
                                y = x.P;
                                break
                            }
                            x = x.L
                        } else {
                            if (!x.R) {
                                y = x;
                                break
                            }
                            x = x.R
                        } $c.insert(y, m), y || (Xc = m)
                }
            }
        }
    }

    function Yr(n) {
        var t = n.circle;
        t && (t.P || (Xc = t.N), $c.remove(t), Wc.push(t), Gr(t), n.circle = null)
    }

    function Ir(n) {
        for (var t, e = Ic, r = Pe(n[0][0], n[0][1], n[1][0], n[1][1]), u = e.length; u--;) t = e[u], (!Zr(t, n) || !r(t) || ua(t.a.x - t.b.x) < ka && ua(t.a.y - t.b.y) < ka) && (t.a = t.b = null, e.splice(u, 1))
    }

    function Zr(n, t) {
        var e = n.b;
        if (e) return !0;
        var r, u, i = n.a,
            o = t[0][0],
            a = t[1][0],
            c = t[0][1],
            s = t[1][1],
            l = n.l,
            f = n.r,
            h = l.x,
            g = l.y,
            p = f.x,
            v = f.y,
            d = (h + p) / 2,
            m = (g + v) / 2;
        if (v === g) {
            if (o > d || d >= a) return;
            if (h > p) {
                if (i) {
                    if (i.y >= s) return
                } else i = {
                    x: d,
                    y: c
                };
                e = {
                    x: d,
                    y: s
                }
            } else {
                if (i) {
                    if (i.y < c) return
                } else i = {
                    x: d,
                    y: s
                };
                e = {
                    x: d,
                    y: c
                }
            }
        } else if (r = (h - p) / (v - g), u = m - r * d, -1 > r || r > 1)
            if (h > p) {
                if (i) {
                    if (i.y >= s) return
                } else i = {
                    x: (c - u) / r,
                    y: c
                };
                e = {
                    x: (s - u) / r,
                    y: s
                }
            } else {
                if (i) {
                    if (i.y < c) return
                } else i = {
                    x: (s - u) / r,
                    y: s
                };
                e = {
                    x: (c - u) / r,
                    y: c
                }
            }
        else if (v > g) {
            if (i) {
                if (i.x >= a) return
            } else i = {
                x: o,
                y: r * o + u
            };
            e = {
                x: a,
                y: r * a + u
            }
        } else {
            if (i) {
                if (i.x < o) return
            } else i = {
                x: a,
                y: r * a + u
            };
            e = {
                x: o,
                y: r * o + u
            }
        }
        return n.a = i, n.b = e, !0
    }

    function Vr(n, t) {
        this.l = n, this.r = t, this.a = this.b = null
    }

    function Xr(n, t, e, r) {
        var u = new Vr(n, t);
        return Ic.push(u), e && Br(u, n, t, e), r && Br(u, t, n, r), Zc[n.i].edges.push(new Wr(u, n, t)), Zc[t.i].edges.push(new Wr(u, t, n)), u
    }

    function $r(n, t, e) {
        var r = new Vr(n, null);
        return r.a = t, r.b = e, Ic.push(r), r
    }

    function Br(n, t, e, r) {
        n.a || n.b ? n.l === e ? n.b = r : n.a = r : (n.a = r, n.l = t, n.r = e)
    }

    function Wr(n, t, e) {
        var r = n.a,
            u = n.b;
        this.edge = n, this.site = t, this.angle = e ? Math.atan2(e.y - t.y, e.x - t.x) : n.l === t ? Math.atan2(u.x - r.x, r.y - u.y) : Math.atan2(r.x - u.x, u.y - r.y)
    }

    function Jr() {
        this._ = null
    }

    function Gr(n) {
        n.U = n.C = n.L = n.R = n.P = n.N = null
    }

    function Kr(n, t) {
        var e = t,
            r = t.R,
            u = e.U;
        u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.R = r.L, e.R && (e.R.U = e), r.L = e
    }

    function Qr(n, t) {
        var e = t,
            r = t.L,
            u = e.U;
        u ? u.L === e ? u.L = r : u.R = r : n._ = r, r.U = u, e.U = r, e.L = r.R, e.L && (e.L.U = e), r.R = e
    }

    function nu(n) {
        for (; n.L;) n = n.L;
        return n
    }

    function tu(n, t) {
        var e, r, u, i = n.sort(eu).pop();
        for (Ic = [], Zc = new Array(n.length), Vc = new Jr, $c = new Jr;;)
            if (u = Xc, i && (!u || i.y < u.y || i.y === u.y && i.x < u.x))(i.x !== e || i.y !== r) && (Zc[i.i] = new Ur(i), Rr(i), e = i.x, r = i.y), i = n.pop();
            else {
                if (!u) break;
                qr(u.arc)
            } t && (Ir(t), jr(t));
        var o = {
            cells: Zc,
            edges: Ic
        };
        return Vc = $c = Ic = Zc = null, o
    }

    function eu(n, t) {
        return t.y - n.y || t.x - n.x
    }

    function ru(n, t, e) {
        return (n.x - e.x) * (t.y - n.y) - (n.x - t.x) * (e.y - n.y)
    }

    function uu(n) {
        return n.x
    }

    function iu(n) {
        return n.y
    }

    function ou() {
        return {
            leaf: !0,
            nodes: [],
            point: null,
            x: null,
            y: null
        }
    }

    function au(n, t, e, r, u, i) {
        if (!n(t, e, r, u, i)) {
            var o = .5 * (e + u),
                a = .5 * (r + i),
                c = t.nodes;
            c[0] && au(n, c[0], e, r, o, a), c[1] && au(n, c[1], o, r, u, a), c[2] && au(n, c[2], e, a, o, i), c[3] && au(n, c[3], o, a, u, i)
        }
    }

    function cu(n, t) {
        n = Zo.rgb(n), t = Zo.rgb(t);
        var e = n.r,
            r = n.g,
            u = n.b,
            i = t.r - e,
            o = t.g - r,
            a = t.b - u;
        return function(n) {
            return "#" + dt(Math.round(e + i * n)) + dt(Math.round(r + o * n)) + dt(Math.round(u + a * n))
        }
    }

    function su(n, t) {
        var e, r = {},
            u = {};
        for (e in n) e in t ? r[e] = hu(n[e], t[e]) : u[e] = n[e];
        for (e in t) e in n || (u[e] = t[e]);
        return function(n) {
            for (e in r) u[e] = r[e](n);
            return u
        }
    }

    function lu(n, t) {
        return t -= n = +n,
            function(e) {
                return n + t * e
            }
    }

    function fu(n, t) {
        var e, r, u, i = Gc.lastIndex = Kc.lastIndex = 0,
            o = -1,
            a = [],
            c = [];
        for (n += "", t += "";
            (e = Gc.exec(n)) && (r = Kc.exec(t));)(u = r.index) > i && (u = t.substring(i, u), a[o] ? a[o] += u : a[++o] = u), (e = e[0]) === (r = r[0]) ? a[o] ? a[o] += r : a[++o] = r : (a[++o] = null, c.push({
            i: o,
            x: lu(e, r)
        })), i = Kc.lastIndex;
        return i < t.length && (u = t.substring(i), a[o] ? a[o] += u : a[++o] = u), a.length < 2 ? c[0] ? (t = c[0].x, function(n) {
            return t(n) + ""
        }) : function() {
            return t
        } : (t = c.length, function(n) {
            for (var e, r = 0; t > r; ++r) a[(e = c[r]).i] = e.x(n);
            return a.join("")
        })
    }

    function hu(n, t) {
        for (var e, r = Zo.interpolators.length; --r >= 0 && !(e = Zo.interpolators[r](n, t)););
        return e
    }

    function gu(n, t) {
        var e, r = [],
            u = [],
            i = n.length,
            o = t.length,
            a = Math.min(n.length, t.length);
        for (e = 0; a > e; ++e) r.push(hu(n[e], t[e]));
        for (; i > e; ++e) u[e] = n[e];
        for (; o > e; ++e) u[e] = t[e];
        return function(n) {
            for (e = 0; a > e; ++e) u[e] = r[e](n);
            return u
        }
    }

    function pu(n) {
        return function(t) {
            return 0 >= t ? 0 : t >= 1 ? 1 : n(t)
        }
    }

    function vu(n) {
        return function(t) {
            return 1 - n(1 - t)
        }
    }

    function du(n) {
        return function(t) {
            return .5 * (.5 > t ? n(2 * t) : 2 - n(2 - 2 * t))
        }
    }

    function mu(n) {
        return n * n
    }

    function yu(n) {
        return n * n * n
    }

    function xu(n) {
        if (0 >= n) return 0;
        if (n >= 1) return 1;
        var t = n * n,
            e = t * n;
        return 4 * (.5 > n ? e : 3 * (n - t) + e - .75)
    }

    function Mu(n) {
        return function(t) {
            return Math.pow(t, n)
        }
    }

    function _u(n) {
        return 1 - Math.cos(n * Sa)
    }

    function bu(n) {
        return Math.pow(2, 10 * (n - 1))
    }

    function wu(n) {
        return 1 - Math.sqrt(1 - n * n)
    }

    function Su(n, t) {
        var e;
        return arguments.length < 2 && (t = .45), arguments.length ? e = t / wa * Math.asin(1 / n) : (n = 1, e = t / 4),
            function(r) {
                return 1 + n * Math.pow(2, -10 * r) * Math.sin((r - e) * wa / t)
            }
    }

    function ku(n) {
        return n || (n = 1.70158),
            function(t) {
                return t * t * ((n + 1) * t - n)
            }
    }

    function Eu(n) {
        return 1 / 2.75 > n ? 7.5625 * n * n : 2 / 2.75 > n ? 7.5625 * (n -= 1.5 / 2.75) * n + .75 : 2.5 / 2.75 > n ? 7.5625 * (n -= 2.25 / 2.75) * n + .9375 : 7.5625 * (n -= 2.625 / 2.75) * n + .984375
    }

    function Au(n, t) {
        n = Zo.hcl(n), t = Zo.hcl(t);
        var e = n.h,
            r = n.c,
            u = n.l,
            i = t.h - e,
            o = t.c - r,
            a = t.l - u;
        return isNaN(o) && (o = 0, r = isNaN(r) ? t.c : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360),
            function(n) {
                return ot(e + i * n, r + o * n, u + a * n) + ""
            }
    }

    function Cu(n, t) {
        n = Zo.hsl(n), t = Zo.hsl(t);
        var e = n.h,
            r = n.s,
            u = n.l,
            i = t.h - e,
            o = t.s - r,
            a = t.l - u;
        return isNaN(o) && (o = 0, r = isNaN(r) ? t.s : r), isNaN(i) ? (i = 0, e = isNaN(e) ? t.h : e) : i > 180 ? i -= 360 : -180 > i && (i += 360),
            function(n) {
                return ut(e + i * n, r + o * n, u + a * n) + ""
            }
    }

    function Nu(n, t) {
        n = Zo.lab(n), t = Zo.lab(t);
        var e = n.l,
            r = n.a,
            u = n.b,
            i = t.l - e,
            o = t.a - r,
            a = t.b - u;
        return function(n) {
            return ct(e + i * n, r + o * n, u + a * n) + ""
        }
    }

    function zu(n, t) {
        return t -= n,
            function(e) {
                return Math.round(n + t * e)
            }
    }

    function Lu(n) {
        var t = [n.a, n.b],
            e = [n.c, n.d],
            r = qu(t),
            u = Tu(t, e),
            i = qu(Ru(e, t, -u)) || 0;
        t[0] * e[1] < e[0] * t[1] && (t[0] *= -1, t[1] *= -1, r *= -1, u *= -1), this.rotate = (r ? Math.atan2(t[1], t[0]) : Math.atan2(-e[0], e[1])) * Ca, this.translate = [n.e, n.f], this.scale = [r, i], this.skew = i ? Math.atan2(u, i) * Ca : 0
    }

    function Tu(n, t) {
        return n[0] * t[0] + n[1] * t[1]
    }

    function qu(n) {
        var t = Math.sqrt(Tu(n, n));
        return t && (n[0] /= t, n[1] /= t), t
    }

    function Ru(n, t, e) {
        return n[0] += e * t[0], n[1] += e * t[1], n
    }

    function Du(n, t) {
        var e, r = [],
            u = [],
            i = Zo.transform(n),
            o = Zo.transform(t),
            a = i.translate,
            c = o.translate,
            s = i.rotate,
            l = o.rotate,
            f = i.skew,
            h = o.skew,
            g = i.scale,
            p = o.scale;
        return a[0] != c[0] || a[1] != c[1] ? (r.push("translate(", null, ",", null, ")"), u.push({
                i: 1,
                x: lu(a[0], c[0])
            }, {
                i: 3,
                x: lu(a[1], c[1])
            })) : c[0] || c[1] ? r.push("translate(" + c + ")") : r.push(""), s != l ? (s - l > 180 ? l += 360 : l - s > 180 && (s += 360), u.push({
                i: r.push(r.pop() + "rotate(", null, ")") - 2,
                x: lu(s, l)
            })) : l && r.push(r.pop() + "rotate(" + l + ")"), f != h ? u.push({
                i: r.push(r.pop() + "skewX(", null, ")") - 2,
                x: lu(f, h)
            }) : h && r.push(r.pop() + "skewX(" + h + ")"), g[0] != p[0] || g[1] != p[1] ? (e = r.push(r.pop() + "scale(", null, ",", null, ")"), u.push({
                i: e - 4,
                x: lu(g[0], p[0])
            }, {
                i: e - 2,
                x: lu(g[1], p[1])
            })) : (1 != p[0] || 1 != p[1]) && r.push(r.pop() + "scale(" + p + ")"), e = u.length,
            function(n) {
                for (var t, i = -1; ++i < e;) r[(t = u[i]).i] = t.x(n);
                return r.join("")
            }
    }

    function Pu(n, t) {
        return t = t - (n = +n) ? 1 / (t - n) : 0,
            function(e) {
                return (e - n) * t
            }
    }

    function Uu(n, t) {
        return t = t - (n = +n) ? 1 / (t - n) : 0,
            function(e) {
                return Math.max(0, Math.min(1, (e - n) * t))
            }
    }

    function ju(n) {
        for (var t = n.source, e = n.target, r = Fu(t, e), u = [t]; t !== r;) t = t.parent, u.push(t);
        for (var i = u.length; e !== r;) u.splice(i, 0, e), e = e.parent;
        return u
    }

    function Hu(n) {
        for (var t = [], e = n.parent; null != e;) t.push(n), n = e, e = e.parent;
        return t.push(n), t
    }

    function Fu(n, t) {
        if (n === t) return n;
        for (var e = Hu(n), r = Hu(t), u = e.pop(), i = r.pop(), o = null; u === i;) o = u, u = e.pop(), i = r.pop();
        return o
    }

    function Ou(n) {
        n.fixed |= 2
    }

    function Yu(n) {
        n.fixed &= -7
    }

    function Iu(n) {
        n.fixed |= 4, n.px = n.x, n.py = n.y
    }

    function Zu(n) {
        n.fixed &= -5
    }

    function Vu(n, t, e) {
        var r = 0,
            u = 0;
        if (n.charge = 0, !n.leaf)
            for (var i, o = n.nodes, a = o.length, c = -1; ++c < a;) i = o[c], null != i && (Vu(i, t, e), n.charge += i.charge, r += i.charge * i.cx, u += i.charge * i.cy);
        if (n.point) {
            n.leaf || (n.point.x += Math.random() - .5, n.point.y += Math.random() - .5);
            var s = t * e[n.point.index];
            n.charge += n.pointCharge = s, r += s * n.point.x, u += s * n.point.y
        }
        n.cx = r / n.charge, n.cy = u / n.charge
    }

    function Xu(n, t) {
        return Zo.rebind(n, t, "sort", "children", "value"), n.nodes = n, n.links = Ku, n
    }

    function $u(n, t) {
        for (var e = [n]; null != (n = e.pop());)
            if (t(n), (u = n.children) && (r = u.length))
                for (var r, u; --r >= 0;) e.push(u[r])
    }

    function Bu(n, t) {
        for (var e = [n], r = []; null != (n = e.pop());)
            if (r.push(n), (i = n.children) && (u = i.length))
                for (var u, i, o = -1; ++o < u;) e.push(i[o]);
        for (; null != (n = r.pop());) t(n)
    }

    function Wu(n) {
        return n.children
    }

    function Ju(n) {
        return n.value
    }

    function Gu(n, t) {
        return t.value - n.value
    }

    function Ku(n) {
        return Zo.merge(n.map(function(n) {
            return (n.children || []).map(function(t) {
                return {
                    source: n,
                    target: t
                }
            })
        }))
    }

    function Qu(n) {
        return n.x
    }

    function ni(n) {
        return n.y
    }

    function ti(n, t, e) {
        n.y0 = t, n.y = e
    }

    function ei(n) {
        return Zo.range(n.length)
    }

    function ri(n) {
        for (var t = -1, e = n[0].length, r = []; ++t < e;) r[t] = 0;
        return r
    }

    function ui(n) {
        for (var t, e = 1, r = 0, u = n[0][1], i = n.length; i > e; ++e)(t = n[e][1]) > u && (r = e, u = t);
        return r
    }

    function ii(n) {
        return n.reduce(oi, 0)
    }

    function oi(n, t) {
        return n + t[1]
    }

    function ai(n, t) {
        return ci(n, Math.ceil(Math.log(t.length) / Math.LN2 + 1))
    }

    function ci(n, t) {
        for (var e = -1, r = +n[0], u = (n[1] - r) / t, i = []; ++e <= t;) i[e] = u * e + r;
        return i
    }

    function si(n) {
        return [Zo.min(n), Zo.max(n)]
    }

    function li(n, t) {
        return n.value - t.value
    }

    function fi(n, t) {
        var e = n._pack_next;
        n._pack_next = t, t._pack_prev = n, t._pack_next = e, e._pack_prev = t
    }

    function hi(n, t) {
        n._pack_next = t, t._pack_prev = n
    }

    function gi(n, t) {
        var e = t.x - n.x,
            r = t.y - n.y,
            u = n.r + t.r;
        return .999 * u * u > e * e + r * r
    }

    function pi(n) {
        function t(n) {
            l = Math.min(n.x - n.r, l), f = Math.max(n.x + n.r, f), h = Math.min(n.y - n.r, h), g = Math.max(n.y + n.r, g)
        }
        if ((e = n.children) && (s = e.length)) {
            var e, r, u, i, o, a, c, s, l = 1 / 0,
                f = -1 / 0,
                h = 1 / 0,
                g = -1 / 0;
            if (e.forEach(vi), r = e[0], r.x = -r.r, r.y = 0, t(r), s > 1 && (u = e[1], u.x = u.r, u.y = 0, t(u), s > 2))
                for (i = e[2], yi(r, u, i), t(i), fi(r, i), r._pack_prev = i, fi(i, u), u = r._pack_next, o = 3; s > o; o++) {
                    yi(r, u, i = e[o]);
                    var p = 0,
                        v = 1,
                        d = 1;
                    for (a = u._pack_next; a !== u; a = a._pack_next, v++)
                        if (gi(a, i)) {
                            p = 1;
                            break
                        } if (1 == p)
                        for (c = r._pack_prev; c !== a._pack_prev && !gi(c, i); c = c._pack_prev, d++);
                    p ? (d > v || v == d && u.r < r.r ? hi(r, u = a) : hi(r = c, u), o--) : (fi(r, i), u = i, t(i))
                }
            var m = (l + f) / 2,
                y = (h + g) / 2,
                x = 0;
            for (o = 0; s > o; o++) i = e[o], i.x -= m, i.y -= y, x = Math.max(x, i.r + Math.sqrt(i.x * i.x + i.y * i.y));
            n.r = x, e.forEach(di)
        }
    }

    function vi(n) {
        n._pack_next = n._pack_prev = n
    }

    function di(n) {
        delete n._pack_next, delete n._pack_prev
    }

    function mi(n, t, e, r) {
        var u = n.children;
        if (n.x = t += r * n.x, n.y = e += r * n.y, n.r *= r, u)
            for (var i = -1, o = u.length; ++i < o;) mi(u[i], t, e, r)
    }

    function yi(n, t, e) {
        var r = n.r + e.r,
            u = t.x - n.x,
            i = t.y - n.y;
        if (r && (u || i)) {
            var o = t.r + e.r,
                a = u * u + i * i;
            o *= o, r *= r;
            var c = .5 + (r - o) / (2 * a),
                s = Math.sqrt(Math.max(0, 2 * o * (r + a) - (r -= a) * r - o * o)) / (2 * a);
            e.x = n.x + c * u + s * i, e.y = n.y + c * i - s * u
        } else e.x = n.x + r, e.y = n.y
    }

    function xi(n, t) {
        return n.parent == t.parent ? 1 : 2
    }

    function Mi(n) {
        var t = n.children;
        return t.length ? t[0] : n.t
    }

    function _i(n) {
        var t, e = n.children;
        return (t = e.length) ? e[t - 1] : n.t
    }

    function bi(n, t, e) {
        var r = e / (t.i - n.i);
        t.c -= r, t.s += e, n.c += r, t.z += e, t.m += e
    }

    function wi(n) {
        for (var t, e = 0, r = 0, u = n.children, i = u.length; --i >= 0;) t = u[i], t.z += e, t.m += e, e += t.s + (r += t.c)
    }

    function Si(n, t, e) {
        return n.a.parent === t.parent ? n.a : e
    }

    function ki(n) {
        return 1 + Zo.max(n, function(n) {
            return n.y
        })
    }

    function Ei(n) {
        return n.reduce(function(n, t) {
            return n + t.x
        }, 0) / n.length
    }

    function Ai(n) {
        var t = n.children;
        return t && t.length ? Ai(t[0]) : n
    }

    function Ci(n) {
        var t, e = n.children;
        return e && (t = e.length) ? Ci(e[t - 1]) : n
    }

    function Ni(n) {
        return {
            x: n.x,
            y: n.y,
            dx: n.dx,
            dy: n.dy
        }
    }

    function zi(n, t) {
        var e = n.x + t[3],
            r = n.y + t[0],
            u = n.dx - t[1] - t[3],
            i = n.dy - t[0] - t[2];
        return 0 > u && (e += u / 2, u = 0), 0 > i && (r += i / 2, i = 0), {
            x: e,
            y: r,
            dx: u,
            dy: i
        }
    }

    function Li(n) {
        var t = n[0],
            e = n[n.length - 1];
        return e > t ? [t, e] : [e, t]
    }

    function Ti(n) {
        return n.rangeExtent ? n.rangeExtent() : Li(n.range())
    }

    function qi(n, t, e, r) {
        var u = e(n[0], n[1]),
            i = r(t[0], t[1]);
        return function(n) {
            return i(u(n))
        }
    }

    function Ri(n, t) {
        var e, r = 0,
            u = n.length - 1,
            i = n[r],
            o = n[u];
        return i > o && (e = r, r = u, u = e, e = i, i = o, o = e), n[r] = t.floor(i), n[u] = t.ceil(o), n
    }

    function Di(n) {
        return n ? {
            floor: function(t) {
                return Math.floor(t / n) * n
            },
            ceil: function(t) {
                return Math.ceil(t / n) * n
            }
        } : ss
    }

    function Pi(n, t, e, r) {
        var u = [],
            i = [],
            o = 0,
            a = Math.min(n.length, t.length) - 1;
        for (n[a] < n[0] && (n = n.slice().reverse(), t = t.slice().reverse()); ++o <= a;) u.push(e(n[o - 1], n[o])), i.push(r(t[o - 1], t[o]));
        return function(t) {
            var e = Zo.bisect(n, t, 1, a) - 1;
            return i[e](u[e](t))
        }
    }

    function Ui(n, t, e, r) {
        function u() {
            var u = Math.min(n.length, t.length) > 2 ? Pi : qi,
                c = r ? Uu : Pu;
            return o = u(n, t, c, e), a = u(t, n, c, hu), i
        }

        function i(n) {
            return o(n)
        }
        var o, a;
        return i.invert = function(n) {
            return a(n)
        }, i.domain = function(t) {
            return arguments.length ? (n = t.map(Number), u()) : n
        }, i.range = function(n) {
            return arguments.length ? (t = n, u()) : t
        }, i.rangeRound = function(n) {
            return i.range(n).interpolate(zu)
        }, i.clamp = function(n) {
            return arguments.length ? (r = n, u()) : r
        }, i.interpolate = function(n) {
            return arguments.length ? (e = n, u()) : e
        }, i.ticks = function(t) {
            return Oi(n, t)
        }, i.tickFormat = function(t, e) {
            return Yi(n, t, e)
        }, i.nice = function(t) {
            return Hi(n, t), u()
        }, i.copy = function() {
            return Ui(n, t, e, r)
        }, u()
    }

    function ji(n, t) {
        return Zo.rebind(n, t, "range", "rangeRound", "interpolate", "clamp")
    }

    function Hi(n, t) {
        return Ri(n, Di(Fi(n, t)[2]))
    }

    function Fi(n, t) {
        null == t && (t = 10);
        var e = Li(n),
            r = e[1] - e[0],
            u = Math.pow(10, Math.floor(Math.log(r / t) / Math.LN10)),
            i = t / r * u;
        return .15 >= i ? u *= 10 : .35 >= i ? u *= 5 : .75 >= i && (u *= 2), e[0] = Math.ceil(e[0] / u) * u, e[1] = Math.floor(e[1] / u) * u + .5 * u, e[2] = u, e
    }

    function Oi(n, t) {
        return Zo.range.apply(Zo, Fi(n, t))
    }

    function Yi(n, t, e) {
        var r = Fi(n, t);
        if (e) {
            var u = Ga.exec(e);
            if (u.shift(), "s" === u[8]) {
                var i = Zo.formatPrefix(Math.max(ua(r[0]), ua(r[1])));
                return u[7] || (u[7] = "." + Ii(i.scale(r[2]))), u[8] = "f", e = Zo.format(u.join("")),
                    function(n) {
                        return e(i.scale(n)) + i.symbol
                    }
            }
            u[7] || (u[7] = "." + Zi(u[8], r)), e = u.join("")
        } else e = ",." + Ii(r[2]) + "f";
        return Zo.format(e)
    }

    function Ii(n) {
        return -Math.floor(Math.log(n) / Math.LN10 + .01)
    }

    function Zi(n, t) {
        var e = Ii(t[2]);
        return n in ls ? Math.abs(e - Ii(Math.max(ua(t[0]), ua(t[1])))) + +("e" !== n) : e - 2 * ("%" === n)
    }

    function Vi(n, t, e, r) {
        function u(n) {
            return (e ? Math.log(0 > n ? 0 : n) : -Math.log(n > 0 ? 0 : -n)) / Math.log(t)
        }

        function i(n) {
            return e ? Math.pow(t, n) : -Math.pow(t, -n)
        }

        function o(t) {
            return n(u(t))
        }
        return o.invert = function(t) {
            return i(n.invert(t))
        }, o.domain = function(t) {
            return arguments.length ? (e = t[0] >= 0, n.domain((r = t.map(Number)).map(u)), o) : r
        }, o.base = function(e) {
            return arguments.length ? (t = +e, n.domain(r.map(u)), o) : t
        }, o.nice = function() {
            var t = Ri(r.map(u), e ? Math : hs);
            return n.domain(t), r = t.map(i), o
        }, o.ticks = function() {
            var n = Li(r),
                o = [],
                a = n[0],
                c = n[1],
                s = Math.floor(u(a)),
                l = Math.ceil(u(c)),
                f = t % 1 ? 2 : t;
            if (isFinite(l - s)) {
                if (e) {
                    for (; l > s; s++)
                        for (var h = 1; f > h; h++) o.push(i(s) * h);
                    o.push(i(s))
                } else
                    for (o.push(i(s)); s++ < l;)
                        for (var h = f - 1; h > 0; h--) o.push(i(s) * h);
                for (s = 0; o[s] < a; s++);
                for (l = o.length; o[l - 1] > c; l--);
                o = o.slice(s, l)
            }
            return o
        }, o.tickFormat = function(n, t) {
            if (!arguments.length) return fs;
            arguments.length < 2 ? t = fs : "function" != typeof t && (t = Zo.format(t));
            var r, a = Math.max(.1, n / o.ticks().length),
                c = e ? (r = 1e-12, Math.ceil) : (r = -1e-12, Math.floor);
            return function(n) {
                return n / i(c(u(n) + r)) <= a ? t(n) : ""
            }
        }, o.copy = function() {
            return Vi(n.copy(), t, e, r)
        }, ji(o, n)
    }

    function Xi(n, t, e) {
        function r(t) {
            return n(u(t))
        }
        var u = $i(t),
            i = $i(1 / t);
        return r.invert = function(t) {
            return i(n.invert(t))
        }, r.domain = function(t) {
            return arguments.length ? (n.domain((e = t.map(Number)).map(u)), r) : e
        }, r.ticks = function(n) {
            return Oi(e, n)
        }, r.tickFormat = function(n, t) {
            return Yi(e, n, t)
        }, r.nice = function(n) {
            return r.domain(Hi(e, n))
        }, r.exponent = function(o) {
            return arguments.length ? (u = $i(t = o), i = $i(1 / t), n.domain(e.map(u)), r) : t
        }, r.copy = function() {
            return Xi(n.copy(), t, e)
        }, ji(r, n)
    }

    function $i(n) {
        return function(t) {
            return 0 > t ? -Math.pow(-t, n) : Math.pow(t, n)
        }
    }

    function Bi(n, t) {
        function e(e) {
            return i[((u.get(e) || ("range" === t.t ? u.set(e, n.push(e)) : 0 / 0)) - 1) % i.length]
        }

        function r(t, e) {
            return Zo.range(n.length).map(function(n) {
                return t + e * n
            })
        }
        var u, i, a;
        return e.domain = function(r) {
            if (!arguments.length) return n;
            n = [], u = new o;
            for (var i, a = -1, c = r.length; ++a < c;) u.has(i = r[a]) || u.set(i, n.push(i));
            return e[t.t].apply(e, t.a)
        }, e.range = function(n) {
            return arguments.length ? (i = n, a = 0, t = {
                t: "range",
                a: arguments
            }, e) : i
        }, e.rangePoints = function(u, o) {
            arguments.length < 2 && (o = 0);
            var c = u[0],
                s = u[1],
                l = (s - c) / (Math.max(1, n.length - 1) + o);
            return i = r(n.length < 2 ? (c + s) / 2 : c + l * o / 2, l), a = 0, t = {
                t: "rangePoints",
                a: arguments
            }, e
        }, e.rangeBands = function(u, o, c) {
            arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o);
            var s = u[1] < u[0],
                l = u[s - 0],
                f = u[1 - s],
                h = (f - l) / (n.length - o + 2 * c);
            return i = r(l + h * c, h), s && i.reverse(), a = h * (1 - o), t = {
                t: "rangeBands",
                a: arguments
            }, e
        }, e.rangeRoundBands = function(u, o, c) {
            arguments.length < 2 && (o = 0), arguments.length < 3 && (c = o);
            var s = u[1] < u[0],
                l = u[s - 0],
                f = u[1 - s],
                h = Math.floor((f - l) / (n.length - o + 2 * c)),
                g = f - l - (n.length - o) * h;
            return i = r(l + Math.round(g / 2), h), s && i.reverse(), a = Math.round(h * (1 - o)), t = {
                t: "rangeRoundBands",
                a: arguments
            }, e
        }, e.rangeBand = function() {
            return a
        }, e.rangeExtent = function() {
            return Li(t.a[0])
        }, e.copy = function() {
            return Bi(n, t)
        }, e.domain(n)
    }

    function Wi(e, r) {
        function u() {
            var n = 0,
                t = r.length;
            for (o = []; ++n < t;) o[n - 1] = Zo.quantile(e, n / t);
            return i
        }

        function i(n) {
            return isNaN(n = +n) ? void 0 : r[Zo.bisect(o, n)]
        }
        var o;
        return i.domain = function(r) {
            return arguments.length ? (e = r.filter(t).sort(n), u()) : e
        }, i.range = function(n) {
            return arguments.length ? (r = n, u()) : r
        }, i.quantiles = function() {
            return o
        }, i.invertExtent = function(n) {
            return n = r.indexOf(n), 0 > n ? [0 / 0, 0 / 0] : [n > 0 ? o[n - 1] : e[0], n < o.length ? o[n] : e[e.length - 1]]
        }, i.copy = function() {
            return Wi(e, r)
        }, u()
    }

    function Ji(n, t, e) {
        function r(t) {
            return e[Math.max(0, Math.min(o, Math.floor(i * (t - n))))]
        }

        function u() {
            return i = e.length / (t - n), o = e.length - 1, r
        }
        var i, o;
        return r.domain = function(e) {
            return arguments.length ? (n = +e[0], t = +e[e.length - 1], u()) : [n, t]
        }, r.range = function(n) {
            return arguments.length ? (e = n, u()) : e
        }, r.invertExtent = function(t) {
            return t = e.indexOf(t), t = 0 > t ? 0 / 0 : t / i + n, [t, t + 1 / i]
        }, r.copy = function() {
            return Ji(n, t, e)
        }, u()
    }

    function Gi(n, t) {
        function e(e) {
            return e >= e ? t[Zo.bisect(n, e)] : void 0
        }
        return e.domain = function(t) {
            return arguments.length ? (n = t, e) : n
        }, e.range = function(n) {
            return arguments.length ? (t = n, e) : t
        }, e.invertExtent = function(e) {
            return e = t.indexOf(e), [n[e - 1], n[e]]
        }, e.copy = function() {
            return Gi(n, t)
        }, e
    }

    function Ki(n) {
        function t(n) {
            return +n
        }
        return t.invert = t, t.domain = t.range = function(e) {
            return arguments.length ? (n = e.map(t), t) : n
        }, t.ticks = function(t) {
            return Oi(n, t)
        }, t.tickFormat = function(t, e) {
            return Yi(n, t, e)
        }, t.copy = function() {
            return Ki(n)
        }, t
    }

    function Qi(n) {
        return n.innerRadius
    }

    function no(n) {
        return n.outerRadius
    }

    function to(n) {
        return n.startAngle
    }

    function eo(n) {
        return n.endAngle
    }

    function ro(n) {
        function t(t) {
            function o() {
                s.push("M", i(n(l), a))
            }
            for (var c, s = [], l = [], f = -1, h = t.length, g = bt(e), p = bt(r); ++f < h;) u.call(this, c = t[f], f) ? l.push([+g.call(this, c, f), +p.call(this, c, f)]) : l.length && (o(), l = []);
            return l.length && o(), s.length ? s.join("") : null
        }
        var e = wr,
            r = Sr,
            u = we,
            i = uo,
            o = i.key,
            a = .7;
        return t.x = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.y = function(n) {
            return arguments.length ? (r = n, t) : r
        }, t.defined = function(n) {
            return arguments.length ? (u = n, t) : u
        }, t.interpolate = function(n) {
            return arguments.length ? (o = "function" == typeof n ? i = n : (i = xs.get(n) || uo).key, t) : o
        }, t.tension = function(n) {
            return arguments.length ? (a = n, t) : a
        }, t
    }

    function uo(n) {
        return n.join("L")
    }

    function io(n) {
        return uo(n) + "Z"
    }

    function oo(n) {
        for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) u.push("H", (r[0] + (r = n[t])[0]) / 2, "V", r[1]);
        return e > 1 && u.push("H", r[0]), u.join("")
    }

    function ao(n) {
        for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) u.push("V", (r = n[t])[1], "H", r[0]);
        return u.join("")
    }

    function co(n) {
        for (var t = 0, e = n.length, r = n[0], u = [r[0], ",", r[1]]; ++t < e;) u.push("H", (r = n[t])[0], "V", r[1]);
        return u.join("")
    }

    function so(n, t) {
        return n.length < 4 ? uo(n) : n[1] + ho(n.slice(1, n.length - 1), go(n, t))
    }

    function lo(n, t) {
        return n.length < 3 ? uo(n) : n[0] + ho((n.push(n[0]), n), go([n[n.length - 2]].concat(n, [n[1]]), t))
    }

    function fo(n, t) {
        return n.length < 3 ? uo(n) : n[0] + ho(n, go(n, t))
    }

    function ho(n, t) {
        if (t.length < 1 || n.length != t.length && n.length != t.length + 2) return uo(n);
        var e = n.length != t.length,
            r = "",
            u = n[0],
            i = n[1],
            o = t[0],
            a = o,
            c = 1;
        if (e && (r += "Q" + (i[0] - 2 * o[0] / 3) + "," + (i[1] - 2 * o[1] / 3) + "," + i[0] + "," + i[1], u = n[1], c = 2), t.length > 1) {
            a = t[1], i = n[c], c++, r += "C" + (u[0] + o[0]) + "," + (u[1] + o[1]) + "," + (i[0] - a[0]) + "," + (i[1] - a[1]) + "," + i[0] + "," + i[1];
            for (var s = 2; s < t.length; s++, c++) i = n[c], a = t[s], r += "S" + (i[0] - a[0]) + "," + (i[1] - a[1]) + "," + i[0] + "," + i[1]
        }
        if (e) {
            var l = n[c];
            r += "Q" + (i[0] + 2 * a[0] / 3) + "," + (i[1] + 2 * a[1] / 3) + "," + l[0] + "," + l[1]
        }
        return r
    }

    function go(n, t) {
        for (var e, r = [], u = (1 - t) / 2, i = n[0], o = n[1], a = 1, c = n.length; ++a < c;) e = i, i = o, o = n[a], r.push([u * (o[0] - e[0]), u * (o[1] - e[1])]);
        return r
    }

    function po(n) {
        if (n.length < 3) return uo(n);
        var t = 1,
            e = n.length,
            r = n[0],
            u = r[0],
            i = r[1],
            o = [u, u, u, (r = n[1])[0]],
            a = [i, i, i, r[1]],
            c = [u, ",", i, "L", xo(bs, o), ",", xo(bs, a)];
        for (n.push(n[e - 1]); ++t <= e;) r = n[t], o.shift(), o.push(r[0]), a.shift(), a.push(r[1]), Mo(c, o, a);
        return n.pop(), c.push("L", r), c.join("")
    }

    function vo(n) {
        if (n.length < 4) return uo(n);
        for (var t, e = [], r = -1, u = n.length, i = [0], o = [0]; ++r < 3;) t = n[r], i.push(t[0]), o.push(t[1]);
        for (e.push(xo(bs, i) + "," + xo(bs, o)), --r; ++r < u;) t = n[r], i.shift(), i.push(t[0]), o.shift(), o.push(t[1]), Mo(e, i, o);
        return e.join("")
    }

    function mo(n) {
        for (var t, e, r = -1, u = n.length, i = u + 4, o = [], a = []; ++r < 4;) e = n[r % u], o.push(e[0]), a.push(e[1]);
        for (t = [xo(bs, o), ",", xo(bs, a)], --r; ++r < i;) e = n[r % u], o.shift(), o.push(e[0]), a.shift(), a.push(e[1]), Mo(t, o, a);
        return t.join("")
    }

    function yo(n, t) {
        var e = n.length - 1;
        if (e)
            for (var r, u, i = n[0][0], o = n[0][1], a = n[e][0] - i, c = n[e][1] - o, s = -1; ++s <= e;) r = n[s], u = s / e, r[0] = t * r[0] + (1 - t) * (i + u * a), r[1] = t * r[1] + (1 - t) * (o + u * c);
        return po(n)
    }

    function xo(n, t) {
        return n[0] * t[0] + n[1] * t[1] + n[2] * t[2] + n[3] * t[3]
    }

    function Mo(n, t, e) {
        n.push("C", xo(Ms, t), ",", xo(Ms, e), ",", xo(_s, t), ",", xo(_s, e), ",", xo(bs, t), ",", xo(bs, e))
    }

    function _o(n, t) {
        return (t[1] - n[1]) / (t[0] - n[0])
    }

    function bo(n) {
        for (var t = 0, e = n.length - 1, r = [], u = n[0], i = n[1], o = r[0] = _o(u, i); ++t < e;) r[t] = (o + (o = _o(u = i, i = n[t + 1]))) / 2;
        return r[t] = o, r
    }

    function wo(n) {
        for (var t, e, r, u, i = [], o = bo(n), a = -1, c = n.length - 1; ++a < c;) t = _o(n[a], n[a + 1]), ua(t) < ka ? o[a] = o[a + 1] = 0 : (e = o[a] / t, r = o[a + 1] / t, u = e * e + r * r, u > 9 && (u = 3 * t / Math.sqrt(u), o[a] = u * e, o[a + 1] = u * r));
        for (a = -1; ++a <= c;) u = (n[Math.min(c, a + 1)][0] - n[Math.max(0, a - 1)][0]) / (6 * (1 + o[a] * o[a])), i.push([u || 0, o[a] * u || 0]);
        return i
    }

    function So(n) {
        return n.length < 3 ? uo(n) : n[0] + ho(n, wo(n))
    }

    function ko(n) {
        for (var t, e, r, u = -1, i = n.length; ++u < i;) t = n[u], e = t[0], r = t[1] + ms, t[0] = e * Math.cos(r), t[1] = e * Math.sin(r);
        return n
    }

    function Eo(n) {
        function t(t) {
            function c() {
                v.push("M", a(n(m), f), l, s(n(d.reverse()), f), "Z")
            }
            for (var h, g, p, v = [], d = [], m = [], y = -1, x = t.length, M = bt(e), _ = bt(u), b = e === r ? function() {
                    return g
                } : bt(r), w = u === i ? function() {
                    return p
                } : bt(i); ++y < x;) o.call(this, h = t[y], y) ? (d.push([g = +M.call(this, h, y), p = +_.call(this, h, y)]), m.push([+b.call(this, h, y), +w.call(this, h, y)])) : d.length && (c(), d = [], m = []);
            return d.length && c(), v.length ? v.join("") : null
        }
        var e = wr,
            r = wr,
            u = 0,
            i = Sr,
            o = we,
            a = uo,
            c = a.key,
            s = a,
            l = "L",
            f = .7;
        return t.x = function(n) {
            return arguments.length ? (e = r = n, t) : r
        }, t.x0 = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.x1 = function(n) {
            return arguments.length ? (r = n, t) : r
        }, t.y = function(n) {
            return arguments.length ? (u = i = n, t) : i
        }, t.y0 = function(n) {
            return arguments.length ? (u = n, t) : u
        }, t.y1 = function(n) {
            return arguments.length ? (i = n, t) : i
        }, t.defined = function(n) {
            return arguments.length ? (o = n, t) : o
        }, t.interpolate = function(n) {
            return arguments.length ? (c = "function" == typeof n ? a = n : (a = xs.get(n) || uo).key, s = a.reverse || a, l = a.closed ? "M" : "L", t) : c
        }, t.tension = function(n) {
            return arguments.length ? (f = n, t) : f
        }, t
    }

    function Ao(n) {
        return n.radius
    }

    function Co(n) {
        return [n.x, n.y]
    }

    function No(n) {
        return function() {
            var t = n.apply(this, arguments),
                e = t[0],
                r = t[1] + ms;
            return [e * Math.cos(r), e * Math.sin(r)]
        }
    }

    function zo() {
        return 64
    }

    function Lo() {
        return "circle"
    }

    function To(n) {
        var t = Math.sqrt(n / ba);
        return "M0," + t + "A" + t + "," + t + " 0 1,1 0," + -t + "A" + t + "," + t + " 0 1,1 0," + t + "Z"
    }

    function qo(n, t) {
        return sa(n, Cs), n.id = t, n
    }

    function Ro(n, t, e, r) {
        var u = n.id;
        return P(n, "function" == typeof e ? function(n, i, o) {
            n.__transition__[u].tween.set(t, r(e.call(n, n.__data__, i, o)))
        } : (e = r(e), function(n) {
            n.__transition__[u].tween.set(t, e)
        }))
    }

    function Do(n) {
        return null == n && (n = ""),
            function() {
                this.textContent = n
            }
    }

    function Po(n, t, e, r) {
        var u = n.__transition__ || (n.__transition__ = {
                active: 0,
                count: 0
            }),
            i = u[e];
        if (!i) {
            var a = r.time;
            i = u[e] = {
                tween: new o,
                time: a,
                ease: r.ease,
                delay: r.delay,
                duration: r.duration
            }, ++u.count, Zo.timer(function(r) {
                function o(r) {
                    return u.active > e ? s() : (u.active = e, i.event && i.event.start.call(n, l, t), i.tween.forEach(function(e, r) {
                        (r = r.call(n, l, t)) && v.push(r)
                    }), Zo.timer(function() {
                        return p.c = c(r || 1) ? we : c, 1
                    }, 0, a), void 0)
                }

                function c(r) {
                    if (u.active !== e) return s();
                    for (var o = r / g, a = f(o), c = v.length; c > 0;) v[--c].call(n, a);
                    return o >= 1 ? (i.event && i.event.end.call(n, l, t), s()) : void 0
                }

                function s() {
                    return --u.count ? delete u[e] : delete n.__transition__, 1
                }
                var l = n.__data__,
                    f = i.ease,
                    h = i.delay,
                    g = i.duration,
                    p = Ba,
                    v = [];
                return p.t = h + a, r >= h ? o(r - h) : (p.c = o, void 0)
            }, 0, a)
        }
    }

    function Uo(n, t) {
        n.attr("transform", function(n) {
            return "translate(" + t(n) + ",0)"
        })
    }

    function jo(n, t) {
        n.attr("transform", function(n) {
            return "translate(0," + t(n) + ")"
        })
    }

    function Ho(n) {
        return n.toISOString()
    }

    function Fo(n, t, e) {
        function r(t) {
            return n(t)
        }

        function u(n, e) {
            var r = n[1] - n[0],
                u = r / e,
                i = Zo.bisect(Us, u);
            return i == Us.length ? [t.year, Fi(n.map(function(n) {
                return n / 31536e6
            }), e)[2]] : i ? t[u / Us[i - 1] < Us[i] / u ? i - 1 : i] : [Fs, Fi(n, e)[2]]
        }
        return r.invert = function(t) {
            return Oo(n.invert(t))
        }, r.domain = function(t) {
            return arguments.length ? (n.domain(t), r) : n.domain().map(Oo)
        }, r.nice = function(n, t) {
            function e(e) {
                return !isNaN(e) && !n.range(e, Oo(+e + 1), t).length
            }
            var i = r.domain(),
                o = Li(i),
                a = null == n ? u(o, 10) : "number" == typeof n && u(o, n);
            return a && (n = a[0], t = a[1]), r.domain(Ri(i, t > 1 ? {
                floor: function(t) {
                    for (; e(t = n.floor(t));) t = Oo(t - 1);
                    return t
                },
                ceil: function(t) {
                    for (; e(t = n.ceil(t));) t = Oo(+t + 1);
                    return t
                }
            } : n))
        }, r.ticks = function(n, t) {
            var e = Li(r.domain()),
                i = null == n ? u(e, 10) : "number" == typeof n ? u(e, n) : !n.range && [{
                    range: n
                }, t];
            return i && (n = i[0], t = i[1]), n.range(e[0], Oo(+e[1] + 1), 1 > t ? 1 : t)
        }, r.tickFormat = function() {
            return e
        }, r.copy = function() {
            return Fo(n.copy(), t, e)
        }, ji(r, n)
    }

    function Oo(n) {
        return new Date(n)
    }

    function Yo(n) {
        return JSON.parse(n.responseText)
    }

    function Io(n) {
        var t = $o.createRange();
        return t.selectNode($o.body), t.createContextualFragment(n.responseText)
    }
    var Zo = {
        version: "3.4.11"
    };
    Date.now || (Date.now = function() {
        return +new Date
    });
    var Vo = [].slice,
        Xo = function(n) {
            return Vo.call(n)
        },
        $o = document,
        Bo = $o.documentElement,
        Wo = window;
    try {
        Xo(Bo.childNodes)[0].nodeType
    } catch (Jo) {
        Xo = function(n) {
            for (var t = n.length, e = new Array(t); t--;) e[t] = n[t];
            return e
        }
    }
    try {
        $o.createElement("div").style.setProperty("opacity", 0, "")
    } catch (Go) {
        var Ko = Wo.Element.prototype,
            Qo = Ko.setAttribute,
            na = Ko.setAttributeNS,
            ta = Wo.CSSStyleDeclaration.prototype,
            ea = ta.setProperty;
        Ko.setAttribute = function(n, t) {
            Qo.call(this, n, t + "")
        }, Ko.setAttributeNS = function(n, t, e) {
            na.call(this, n, t, e + "")
        }, ta.setProperty = function(n, t, e) {
            ea.call(this, n, t + "", e)
        }
    }
    Zo.ascending = n, Zo.descending = function(n, t) {
        return n > t ? -1 : t > n ? 1 : t >= n ? 0 : 0 / 0
    }, Zo.min = function(n, t) {
        var e, r, u = -1,
            i = n.length;
        if (1 === arguments.length) {
            for (; ++u < i && !(null != (e = n[u]) && e >= e);) e = void 0;
            for (; ++u < i;) null != (r = n[u]) && e > r && (e = r)
        } else {
            for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e);) e = void 0;
            for (; ++u < i;) null != (r = t.call(n, n[u], u)) && e > r && (e = r)
        }
        return e
    }, Zo.max = function(n, t) {
        var e, r, u = -1,
            i = n.length;
        if (1 === arguments.length) {
            for (; ++u < i && !(null != (e = n[u]) && e >= e);) e = void 0;
            for (; ++u < i;) null != (r = n[u]) && r > e && (e = r)
        } else {
            for (; ++u < i && !(null != (e = t.call(n, n[u], u)) && e >= e);) e = void 0;
            for (; ++u < i;) null != (r = t.call(n, n[u], u)) && r > e && (e = r)
        }
        return e
    }, Zo.extent = function(n, t) {
        var e, r, u, i = -1,
            o = n.length;
        if (1 === arguments.length) {
            for (; ++i < o && !(null != (e = u = n[i]) && e >= e);) e = u = void 0;
            for (; ++i < o;) null != (r = n[i]) && (e > r && (e = r), r > u && (u = r))
        } else {
            for (; ++i < o && !(null != (e = u = t.call(n, n[i], i)) && e >= e);) e = void 0;
            for (; ++i < o;) null != (r = t.call(n, n[i], i)) && (e > r && (e = r), r > u && (u = r))
        }
        return [e, u]
    }, Zo.sum = function(n, t) {
        var e, r = 0,
            u = n.length,
            i = -1;
        if (1 === arguments.length)
            for (; ++i < u;) isNaN(e = +n[i]) || (r += e);
        else
            for (; ++i < u;) isNaN(e = +t.call(n, n[i], i)) || (r += e);
        return r
    }, Zo.mean = function(n, e) {
        var r, u = 0,
            i = n.length,
            o = -1,
            a = i;
        if (1 === arguments.length)
            for (; ++o < i;) t(r = n[o]) ? u += r : --a;
        else
            for (; ++o < i;) t(r = e.call(n, n[o], o)) ? u += r : --a;
        return a ? u / a : void 0
    }, Zo.quantile = function(n, t) {
        var e = (n.length - 1) * t + 1,
            r = Math.floor(e),
            u = +n[r - 1],
            i = e - r;
        return i ? u + i * (n[r] - u) : u
    }, Zo.median = function(e, r) {
        return arguments.length > 1 && (e = e.map(r)), e = e.filter(t), e.length ? Zo.quantile(e.sort(n), .5) : void 0
    };
    var ra = e(n);
    Zo.bisectLeft = ra.left, Zo.bisect = Zo.bisectRight = ra.right, Zo.bisector = function(t) {
        return e(1 === t.length ? function(e, r) {
            return n(t(e), r)
        } : t)
    }, Zo.shuffle = function(n) {
        for (var t, e, r = n.length; r;) e = 0 | Math.random() * r--, t = n[r], n[r] = n[e], n[e] = t;
        return n
    }, Zo.permute = function(n, t) {
        for (var e = t.length, r = new Array(e); e--;) r[e] = n[t[e]];
        return r
    }, Zo.pairs = function(n) {
        for (var t, e = 0, r = n.length - 1, u = n[0], i = new Array(0 > r ? 0 : r); r > e;) i[e] = [t = u, u = n[++e]];
        return i
    }, Zo.zip = function() {
        if (!(u = arguments.length)) return [];
        for (var n = -1, t = Zo.min(arguments, r), e = new Array(t); ++n < t;)
            for (var u, i = -1, o = e[n] = new Array(u); ++i < u;) o[i] = arguments[i][n];
        return e
    }, Zo.transpose = function(n) {
        return Zo.zip.apply(Zo, n)
    }, Zo.keys = function(n) {
        var t = [];
        for (var e in n) t.push(e);
        return t
    }, Zo.values = function(n) {
        var t = [];
        for (var e in n) t.push(n[e]);
        return t
    }, Zo.entries = function(n) {
        var t = [];
        for (var e in n) t.push({
            key: e,
            value: n[e]
        });
        return t
    }, Zo.merge = function(n) {
        for (var t, e, r, u = n.length, i = -1, o = 0; ++i < u;) o += n[i].length;
        for (e = new Array(o); --u >= 0;)
            for (r = n[u], t = r.length; --t >= 0;) e[--o] = r[t];
        return e
    };
    var ua = Math.abs;
    Zo.range = function(n, t, e) {
        if (arguments.length < 3 && (e = 1, arguments.length < 2 && (t = n, n = 0)), 1 / 0 === (t - n) / e) throw new Error("infinite range");
        var r, i = [],
            o = u(ua(e)),
            a = -1;
        if (n *= o, t *= o, e *= o, 0 > e)
            for (;
                (r = n + e * ++a) > t;) i.push(r / o);
        else
            for (;
                (r = n + e * ++a) < t;) i.push(r / o);
        return i
    }, Zo.map = function(n) {
        var t = new o;
        if (n instanceof o) n.forEach(function(n, e) {
            t.set(n, e)
        });
        else
            for (var e in n) t.set(e, n[e]);
        return t
    }, i(o, {
        has: a,
        get: function(n) {
            return this[ia + n]
        },
        set: function(n, t) {
            return this[ia + n] = t
        },
        remove: c,
        keys: s,
        values: function() {
            var n = [];
            return this.forEach(function(t, e) {
                n.push(e)
            }), n
        },
        entries: function() {
            var n = [];
            return this.forEach(function(t, e) {
                n.push({
                    key: t,
                    value: e
                })
            }), n
        },
        size: l,
        empty: f,
        forEach: function(n) {
            for (var t in this) t.charCodeAt(0) === oa && n.call(this, t.substring(1), this[t])
        }
    });
    var ia = "\x00",
        oa = ia.charCodeAt(0);
    Zo.nest = function() {
        function n(t, a, c) {
            if (c >= i.length) return r ? r.call(u, a) : e ? a.sort(e) : a;
            for (var s, l, f, h, g = -1, p = a.length, v = i[c++], d = new o; ++g < p;)(h = d.get(s = v(l = a[g]))) ? h.push(l) : d.set(s, [l]);
            return t ? (l = t(), f = function(e, r) {
                l.set(e, n(t, r, c))
            }) : (l = {}, f = function(e, r) {
                l[e] = n(t, r, c)
            }), d.forEach(f), l
        }

        function t(n, e) {
            if (e >= i.length) return n;
            var r = [],
                u = a[e++];
            return n.forEach(function(n, u) {
                r.push({
                    key: n,
                    values: t(u, e)
                })
            }), u ? r.sort(function(n, t) {
                return u(n.key, t.key)
            }) : r
        }
        var e, r, u = {},
            i = [],
            a = [];
        return u.map = function(t, e) {
            return n(e, t, 0)
        }, u.entries = function(e) {
            return t(n(Zo.map, e, 0), 0)
        }, u.key = function(n) {
            return i.push(n), u
        }, u.sortKeys = function(n) {
            return a[i.length - 1] = n, u
        }, u.sortValues = function(n) {
            return e = n, u
        }, u.rollup = function(n) {
            return r = n, u
        }, u
    }, Zo.set = function(n) {
        var t = new h;
        if (n)
            for (var e = 0, r = n.length; r > e; ++e) t.add(n[e]);
        return t
    }, i(h, {
        has: a,
        add: function(n) {
            return this[ia + n] = !0, n
        },
        remove: function(n) {
            return n = ia + n, n in this && delete this[n]
        },
        values: s,
        size: l,
        empty: f,
        forEach: function(n) {
            for (var t in this) t.charCodeAt(0) === oa && n.call(this, t.substring(1))
        }
    }), Zo.behavior = {}, Zo.rebind = function(n, t) {
        for (var e, r = 1, u = arguments.length; ++r < u;) n[e = arguments[r]] = g(n, t, t[e]);
        return n
    };
    var aa = ["webkit", "ms", "moz", "Moz", "o", "O"];
    Zo.dispatch = function() {
        for (var n = new d, t = -1, e = arguments.length; ++t < e;) n[arguments[t]] = m(n);
        return n
    }, d.prototype.on = function(n, t) {
        var e = n.indexOf("."),
            r = "";
        if (e >= 0 && (r = n.substring(e + 1), n = n.substring(0, e)), n) return arguments.length < 2 ? this[n].on(r) : this[n].on(r, t);
        if (2 === arguments.length) {
            if (null == t)
                for (n in this) this.hasOwnProperty(n) && this[n].on(r, null);
            return this
        }
    }, Zo.event = null, Zo.requote = function(n) {
        return n.replace(ca, "\\$&")
    };
    var ca = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g,
        sa = {}.__proto__ ? function(n, t) {
            n.__proto__ = t
        } : function(n, t) {
            for (var e in t) n[e] = t[e]
        },
        la = function(n, t) {
            return t.querySelector(n)
        },
        fa = function(n, t) {
            return t.querySelectorAll(n)
        },
        ha = Bo.matches || Bo[p(Bo, "matchesSelector")],
        ga = function(n, t) {
            return ha.call(n, t)
        };
    "function" == typeof Sizzle && (la = function(n, t) {
        return Sizzle(n, t)[0] || null
    }, fa = Sizzle, ga = Sizzle.matchesSelector), Zo.selection = function() {
        return ma
    };
    var pa = Zo.selection.prototype = [];
    pa.select = function(n) {
        var t, e, r, u, i = [];
        n = b(n);
        for (var o = -1, a = this.length; ++o < a;) {
            i.push(t = []), t.parentNode = (r = this[o]).parentNode;
            for (var c = -1, s = r.length; ++c < s;)(u = r[c]) ? (t.push(e = n.call(u, u.__data__, c, o)), e && "__data__" in u && (e.__data__ = u.__data__)) : t.push(null)
        }
        return _(i)
    }, pa.selectAll = function(n) {
        var t, e, r = [];
        n = w(n);
        for (var u = -1, i = this.length; ++u < i;)
            for (var o = this[u], a = -1, c = o.length; ++a < c;)(e = o[a]) && (r.push(t = Xo(n.call(e, e.__data__, a, u))), t.parentNode = e);
        return _(r)
    };
    var va = {
        svg: "http://www.w3.org/2000/svg",
        xhtml: "http://www.w3.org/1999/xhtml",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    Zo.ns = {
        prefix: va,
        qualify: function(n) {
            var t = n.indexOf(":"),
                e = n;
            return t >= 0 && (e = n.substring(0, t), n = n.substring(t + 1)), va.hasOwnProperty(e) ? {
                space: va[e],
                local: n
            } : n
        }
    }, pa.attr = function(n, t) {
        if (arguments.length < 2) {
            if ("string" == typeof n) {
                var e = this.node();
                return n = Zo.ns.qualify(n), n.local ? e.getAttributeNS(n.space, n.local) : e.getAttribute(n)
            }
            for (t in n) this.each(S(t, n[t]));
            return this
        }
        return this.each(S(n, t))
    }, pa.classed = function(n, t) {
        if (arguments.length < 2) {
            if ("string" == typeof n) {
                var e = this.node(),
                    r = (n = A(n)).length,
                    u = -1;
                if (t = e.classList) {
                    for (; ++u < r;)
                        if (!t.contains(n[u])) return !1
                } else
                    for (t = e.getAttribute("class"); ++u < r;)
                        if (!E(n[u]).test(t)) return !1;
                return !0
            }
            for (t in n) this.each(C(t, n[t]));
            return this
        }
        return this.each(C(n, t))
    }, pa.style = function(n, t, e) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof n) {
                2 > r && (t = "");
                for (e in n) this.each(z(e, n[e], t));
                return this
            }
            if (2 > r) return Wo.getComputedStyle(this.node(), null).getPropertyValue(n);
            e = ""
        }
        return this.each(z(n, t, e))
    }, pa.property = function(n, t) {
        if (arguments.length < 2) {
            if ("string" == typeof n) return this.node()[n];
            for (t in n) this.each(L(t, n[t]));
            return this
        }
        return this.each(L(n, t))
    }, pa.text = function(n) {
        return arguments.length ? this.each("function" == typeof n ? function() {
            var t = n.apply(this, arguments);
            this.textContent = null == t ? "" : t
        } : null == n ? function() {
            this.textContent = ""
        } : function() {
            this.textContent = n
        }) : this.node().textContent
    }, pa.html = function(n) {
        return arguments.length ? this.each("function" == typeof n ? function() {
            var t = n.apply(this, arguments);
            this.innerHTML = null == t ? "" : t
        } : null == n ? function() {
            this.innerHTML = ""
        } : function() {
            this.innerHTML = n
        }) : this.node().innerHTML
    }, pa.append = function(n) {
        return n = T(n), this.select(function() {
            return this.appendChild(n.apply(this, arguments))
        })
    }, pa.insert = function(n, t) {
        return n = T(n), t = b(t), this.select(function() {
            return this.insertBefore(n.apply(this, arguments), t.apply(this, arguments) || null)
        })
    }, pa.remove = function() {
        return this.each(function() {
            var n = this.parentNode;
            n && n.removeChild(this)
        })
    }, pa.data = function(n, t) {
        function e(n, e) {
            var r, u, i, a = n.length,
                f = e.length,
                h = Math.min(a, f),
                g = new Array(f),
                p = new Array(f),
                v = new Array(a);
            if (t) {
                var d, m = new o,
                    y = new o,
                    x = [];
                for (r = -1; ++r < a;) d = t.call(u = n[r], u.__data__, r), m.has(d) ? v[r] = u : m.set(d, u), x.push(d);
                for (r = -1; ++r < f;) d = t.call(e, i = e[r], r), (u = m.get(d)) ? (g[r] = u, u.__data__ = i) : y.has(d) || (p[r] = q(i)), y.set(d, i), m.remove(d);
                for (r = -1; ++r < a;) m.has(x[r]) && (v[r] = n[r])
            } else {
                for (r = -1; ++r < h;) u = n[r], i = e[r], u ? (u.__data__ = i, g[r] = u) : p[r] = q(i);
                for (; f > r; ++r) p[r] = q(e[r]);
                for (; a > r; ++r) v[r] = n[r]
            }
            p.update = g, p.parentNode = g.parentNode = v.parentNode = n.parentNode, c.push(p), s.push(g), l.push(v)
        }
        var r, u, i = -1,
            a = this.length;
        if (!arguments.length) {
            for (n = new Array(a = (r = this[0]).length); ++i < a;)(u = r[i]) && (n[i] = u.__data__);
            return n
        }
        var c = U([]),
            s = _([]),
            l = _([]);
        if ("function" == typeof n)
            for (; ++i < a;) e(r = this[i], n.call(r, r.parentNode.__data__, i));
        else
            for (; ++i < a;) e(r = this[i], n);
        return s.enter = function() {
            return c
        }, s.exit = function() {
            return l
        }, s
    }, pa.datum = function(n) {
        return arguments.length ? this.property("__data__", n) : this.property("__data__")
    }, pa.filter = function(n) {
        var t, e, r, u = [];
        "function" != typeof n && (n = R(n));
        for (var i = 0, o = this.length; o > i; i++) {
            u.push(t = []), t.parentNode = (e = this[i]).parentNode;
            for (var a = 0, c = e.length; c > a; a++)(r = e[a]) && n.call(r, r.__data__, a, i) && t.push(r)
        }
        return _(u)
    }, pa.order = function() {
        for (var n = -1, t = this.length; ++n < t;)
            for (var e, r = this[n], u = r.length - 1, i = r[u]; --u >= 0;)(e = r[u]) && (i && i !== e.nextSibling && i.parentNode.insertBefore(e, i), i = e);
        return this
    }, pa.sort = function(n) {
        n = D.apply(this, arguments);
        for (var t = -1, e = this.length; ++t < e;) this[t].sort(n);
        return this.order()
    }, pa.each = function(n) {
        return P(this, function(t, e, r) {
            n.call(t, t.__data__, e, r)
        })
    }, pa.call = function(n) {
        var t = Xo(arguments);
        return n.apply(t[0] = this, t), this
    }, pa.empty = function() {
        return !this.node()
    }, pa.node = function() {
        for (var n = 0, t = this.length; t > n; n++)
            for (var e = this[n], r = 0, u = e.length; u > r; r++) {
                var i = e[r];
                if (i) return i
            }
        return null
    }, pa.size = function() {
        var n = 0;
        return this.each(function() {
            ++n
        }), n
    };
    var da = [];
    Zo.selection.enter = U, Zo.selection.enter.prototype = da, da.append = pa.append, da.empty = pa.empty, da.node = pa.node, da.call = pa.call, da.size = pa.size, da.select = function(n) {
        for (var t, e, r, u, i, o = [], a = -1, c = this.length; ++a < c;) {
            r = (u = this[a]).update, o.push(t = []), t.parentNode = u.parentNode;
            for (var s = -1, l = u.length; ++s < l;)(i = u[s]) ? (t.push(r[s] = e = n.call(u.parentNode, i.__data__, s, a)), e.__data__ = i.__data__) : t.push(null)
        }
        return _(o)
    }, da.insert = function(n, t) {
        return arguments.length < 2 && (t = j(this)), pa.insert.call(this, n, t)
    }, pa.transition = function() {
        for (var n, t, e = Ss || ++Ns, r = [], u = ks || {
                time: Date.now(),
                ease: xu,
                delay: 0,
                duration: 250
            }, i = -1, o = this.length; ++i < o;) {
            r.push(n = []);
            for (var a = this[i], c = -1, s = a.length; ++c < s;)(t = a[c]) && Po(t, c, e, u), n.push(t)
        }
        return qo(r, e)
    }, pa.interrupt = function() {
        return this.each(H)
    }, Zo.select = function(n) {
        var t = ["string" == typeof n ? la(n, $o) : n];
        return t.parentNode = Bo, _([t])
    }, Zo.selectAll = function(n) {
        var t = Xo("string" == typeof n ? fa(n, $o) : n);
        return t.parentNode = Bo, _([t])
    };
    var ma = Zo.select(Bo);
    pa.on = function(n, t, e) {
        var r = arguments.length;
        if (3 > r) {
            if ("string" != typeof n) {
                2 > r && (t = !1);
                for (e in n) this.each(F(e, n[e], t));
                return this
            }
            if (2 > r) return (r = this.node()["__on" + n]) && r._;
            e = !1
        }
        return this.each(F(n, t, e))
    };
    var ya = Zo.map({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    });
    ya.forEach(function(n) {
        "on" + n in $o && ya.remove(n)
    });
    var xa = "onselectstart" in $o ? null : p(Bo.style, "userSelect"),
        Ma = 0;
    Zo.mouse = function(n) {
        return Z(n, x())
    };
    var _a = /WebKit/.test(Wo.navigator.userAgent) ? -1 : 0;
    Zo.touches = function(n, t) {
        return arguments.length < 2 && (t = x().touches), t ? Xo(t).map(function(t) {
            var e = Z(n, t);
            return e.identifier = t.identifier, e
        }) : []
    }, Zo.behavior.drag = function() {
        function n() {
            this.on("mousedown.drag", u).on("touchstart.drag", i)
        }

        function t(n, t, u, i, o) {
            return function() {
                function a() {
                    var n, e, r = t(h, v);
                    r && (n = r[0] - x[0], e = r[1] - x[1], p |= n | e, x = r, g({
                        type: "drag",
                        x: r[0] + s[0],
                        y: r[1] + s[1],
                        dx: n,
                        dy: e
                    }))
                }

                function c() {
                    t(h, v) && (m.on(i + d, null).on(o + d, null), y(p && Zo.event.target === f), g({
                        type: "dragend"
                    }))
                }
                var s, l = this,
                    f = Zo.event.target,
                    h = l.parentNode,
                    g = e.of(l, arguments),
                    p = 0,
                    v = n(),
                    d = ".drag" + (null == v ? "" : "-" + v),
                    m = Zo.select(u()).on(i + d, a).on(o + d, c),
                    y = I(),
                    x = t(h, v);
                r ? (s = r.apply(l, arguments), s = [s.x - x[0], s.y - x[1]]) : s = [0, 0], g({
                    type: "dragstart"
                })
            }
        }
        var e = M(n, "drag", "dragstart", "dragend"),
            r = null,
            u = t(v, Zo.mouse, $, "mousemove", "mouseup"),
            i = t(V, Zo.touch, X, "touchmove", "touchend");
        return n.origin = function(t) {
            return arguments.length ? (r = t, n) : r
        }, Zo.rebind(n, e, "on")
    };
    var ba = Math.PI,
        wa = 2 * ba,
        Sa = ba / 2,
        ka = 1e-6,
        Ea = ka * ka,
        Aa = ba / 180,
        Ca = 180 / ba,
        Na = Math.SQRT2,
        za = 2,
        La = 4;
    Zo.interpolateZoom = function(n, t) {
        function e(n) {
            var t = n * y;
            if (m) {
                var e = Q(v),
                    o = i / (za * h) * (e * nt(Na * t + v) - K(v));
                return [r + o * s, u + o * l, i * e / Q(Na * t + v)]
            }
            return [r + n * s, u + n * l, i * Math.exp(Na * t)]
        }
        var r = n[0],
            u = n[1],
            i = n[2],
            o = t[0],
            a = t[1],
            c = t[2],
            s = o - r,
            l = a - u,
            f = s * s + l * l,
            h = Math.sqrt(f),
            g = (c * c - i * i + La * f) / (2 * i * za * h),
            p = (c * c - i * i - La * f) / (2 * c * za * h),
            v = Math.log(Math.sqrt(g * g + 1) - g),
            d = Math.log(Math.sqrt(p * p + 1) - p),
            m = d - v,
            y = (m || Math.log(c / i)) / Na;
        return e.duration = 1e3 * y, e
    }, Zo.behavior.zoom = function() {
        function n(n) {
            n.on(A, s).on(Ra + ".zoom", f).on("dblclick.zoom", h).on(z, l)
        }

        function t(n) {
            return [(n[0] - S.x) / S.k, (n[1] - S.y) / S.k]
        }

        function e(n) {
            return [n[0] * S.k + S.x, n[1] * S.k + S.y]
        }

        function r(n) {
            S.k = Math.max(E[0], Math.min(E[1], n))
        }

        function u(n, t) {
            t = e(t), S.x += n[0] - t[0], S.y += n[1] - t[1]
        }

        function i() {
            _ && _.domain(x.range().map(function(n) {
                return (n - S.x) / S.k
            }).map(x.invert)), w && w.domain(b.range().map(function(n) {
                return (n - S.y) / S.k
            }).map(b.invert))
        }

        function o(n) {
            n({
                type: "zoomstart"
            })
        }

        function a(n) {
            i(), n({
                type: "zoom",
                scale: S.k,
                translate: [S.x, S.y]
            })
        }

        function c(n) {
            n({
                type: "zoomend"
            })
        }

        function s() {
            function n() {
                l = 1, u(Zo.mouse(r), h), a(s)
            }

            function e() {
                f.on(C, null).on(N, null), g(l && Zo.event.target === i), c(s)
            }
            var r = this,
                i = Zo.event.target,
                s = L.of(r, arguments),
                l = 0,
                f = Zo.select(Wo).on(C, n).on(N, e),
                h = t(Zo.mouse(r)),
                g = I();
            H.call(r), o(s)
        }

        function l() {
            function n() {
                var n = Zo.touches(g);
                return h = S.k, n.forEach(function(n) {
                    n.identifier in v && (v[n.identifier] = t(n))
                }), n
            }

            function e() {
                var t = Zo.event.target;
                Zo.select(t).on(M, i).on(_, f), b.push(t);
                for (var e = Zo.event.changedTouches, o = 0, c = e.length; c > o; ++o) v[e[o].identifier] = null;
                var s = n(),
                    l = Date.now();
                if (1 === s.length) {
                    if (500 > l - m) {
                        var h = s[0],
                            g = v[h.identifier];
                        r(2 * S.k), u(h, g), y(), a(p)
                    }
                    m = l
                } else if (s.length > 1) {
                    var h = s[0],
                        x = s[1],
                        w = h[0] - x[0],
                        k = h[1] - x[1];
                    d = w * w + k * k
                }
            }

            function i() {
                for (var n, t, e, i, o = Zo.touches(g), c = 0, s = o.length; s > c; ++c, i = null)
                    if (e = o[c], i = v[e.identifier]) {
                        if (t) break;
                        n = e, t = i
                    } if (i) {
                    var l = (l = e[0] - n[0]) * l + (l = e[1] - n[1]) * l,
                        f = d && Math.sqrt(l / d);
                    n = [(n[0] + e[0]) / 2, (n[1] + e[1]) / 2], t = [(t[0] + i[0]) / 2, (t[1] + i[1]) / 2], r(f * h)
                }
                m = null, u(n, t), a(p)
            }

            function f() {
                if (Zo.event.touches.length) {
                    for (var t = Zo.event.changedTouches, e = 0, r = t.length; r > e; ++e) delete v[t[e].identifier];
                    for (var u in v) return void n()
                }
                Zo.selectAll(b).on(x, null), w.on(A, s).on(z, l), k(), c(p)
            }
            var h, g = this,
                p = L.of(g, arguments),
                v = {},
                d = 0,
                x = ".zoom-" + Zo.event.changedTouches[0].identifier,
                M = "touchmove" + x,
                _ = "touchend" + x,
                b = [],
                w = Zo.select(g).on(A, null).on(z, e),
                k = I();
            H.call(g), e(), o(p)
        }

        function f() {
            var n = L.of(this, arguments);
            d ? clearTimeout(d) : (g = t(p = v || Zo.mouse(this)), H.call(this), o(n)), d = setTimeout(function() {
                d = null, c(n)
            }, 50), y(), r(Math.pow(2, .002 * Ta()) * S.k), u(p, g), a(n)
        }

        function h() {
            var n = L.of(this, arguments),
                e = Zo.mouse(this),
                i = t(e),
                s = Math.log(S.k) / Math.LN2;
            o(n), r(Math.pow(2, Zo.event.shiftKey ? Math.ceil(s) - 1 : Math.floor(s) + 1)), u(e, i), a(n), c(n)
        }
        var g, p, v, d, m, x, _, b, w, S = {
                x: 0,
                y: 0,
                k: 1
            },
            k = [960, 500],
            E = qa,
            A = "mousedown.zoom",
            C = "mousemove.zoom",
            N = "mouseup.zoom",
            z = "touchstart.zoom",
            L = M(n, "zoomstart", "zoom", "zoomend");
        return n.event = function(n) {
            n.each(function() {
                var n = L.of(this, arguments),
                    t = S;
                Ss ? Zo.select(this).transition().each("start.zoom", function() {
                    S = this.__chart__ || {
                        x: 0,
                        y: 0,
                        k: 1
                    }, o(n)
                }).tween("zoom:zoom", function() {
                    var e = k[0],
                        r = k[1],
                        u = e / 2,
                        i = r / 2,
                        o = Zo.interpolateZoom([(u - S.x) / S.k, (i - S.y) / S.k, e / S.k], [(u - t.x) / t.k, (i - t.y) / t.k, e / t.k]);
                    return function(t) {
                        var r = o(t),
                            c = e / r[2];
                        this.__chart__ = S = {
                            x: u - r[0] * c,
                            y: i - r[1] * c,
                            k: c
                        }, a(n)
                    }
                }).each("end.zoom", function() {
                    c(n)
                }) : (this.__chart__ = S, o(n), a(n), c(n))
            })
        }, n.translate = function(t) {
            return arguments.length ? (S = {
                x: +t[0],
                y: +t[1],
                k: S.k
            }, i(), n) : [S.x, S.y]
        }, n.scale = function(t) {
            return arguments.length ? (S = {
                x: S.x,
                y: S.y,
                k: +t
            }, i(), n) : S.k
        }, n.scaleExtent = function(t) {
            return arguments.length ? (E = null == t ? qa : [+t[0], +t[1]], n) : E
        }, n.center = function(t) {
            return arguments.length ? (v = t && [+t[0], +t[1]], n) : v
        }, n.size = function(t) {
            return arguments.length ? (k = t && [+t[0], +t[1]], n) : k
        }, n.x = function(t) {
            return arguments.length ? (_ = t, x = t.copy(), S = {
                x: 0,
                y: 0,
                k: 1
            }, n) : _
        }, n.y = function(t) {
            return arguments.length ? (w = t, b = t.copy(), S = {
                x: 0,
                y: 0,
                k: 1
            }, n) : w
        }, Zo.rebind(n, L, "on")
    };
    var Ta, qa = [0, 1 / 0],
        Ra = "onwheel" in $o ? (Ta = function() {
            return -Zo.event.deltaY * (Zo.event.deltaMode ? 120 : 1)
        }, "wheel") : "onmousewheel" in $o ? (Ta = function() {
            return Zo.event.wheelDelta
        }, "mousewheel") : (Ta = function() {
            return -Zo.event.detail
        }, "MozMousePixelScroll");
    Zo.color = et, et.prototype.toString = function() {
        return this.rgb() + ""
    }, Zo.hsl = rt;
    var Da = rt.prototype = new et;
    Da.brighter = function(n) {
        return n = Math.pow(.7, arguments.length ? n : 1), new rt(this.h, this.s, this.l / n)
    }, Da.darker = function(n) {
        return n = Math.pow(.7, arguments.length ? n : 1), new rt(this.h, this.s, n * this.l)
    }, Da.rgb = function() {
        return ut(this.h, this.s, this.l)
    }, Zo.hcl = it;
    var Pa = it.prototype = new et;
    Pa.brighter = function(n) {
        return new it(this.h, this.c, Math.min(100, this.l + Ua * (arguments.length ? n : 1)))
    }, Pa.darker = function(n) {
        return new it(this.h, this.c, Math.max(0, this.l - Ua * (arguments.length ? n : 1)))
    }, Pa.rgb = function() {
        return ot(this.h, this.c, this.l).rgb()
    }, Zo.lab = at;
    var Ua = 18,
        ja = .95047,
        Ha = 1,
        Fa = 1.08883,
        Oa = at.prototype = new et;
    Oa.brighter = function(n) {
        return new at(Math.min(100, this.l + Ua * (arguments.length ? n : 1)), this.a, this.b)
    }, Oa.darker = function(n) {
        return new at(Math.max(0, this.l - Ua * (arguments.length ? n : 1)), this.a, this.b)
    }, Oa.rgb = function() {
        return ct(this.l, this.a, this.b)
    }, Zo.rgb = gt;
    var Ya = gt.prototype = new et;
    Ya.brighter = function(n) {
        n = Math.pow(.7, arguments.length ? n : 1);
        var t = this.r,
            e = this.g,
            r = this.b,
            u = 30;
        return t || e || r ? (t && u > t && (t = u), e && u > e && (e = u), r && u > r && (r = u), new gt(Math.min(255, t / n), Math.min(255, e / n), Math.min(255, r / n))) : new gt(u, u, u)
    }, Ya.darker = function(n) {
        return n = Math.pow(.7, arguments.length ? n : 1), new gt(n * this.r, n * this.g, n * this.b)
    }, Ya.hsl = function() {
        return yt(this.r, this.g, this.b)
    }, Ya.toString = function() {
        return "#" + dt(this.r) + dt(this.g) + dt(this.b)
    };
    var Ia = Zo.map({
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
    });
    Ia.forEach(function(n, t) {
        Ia.set(n, pt(t))
    }), Zo.functor = bt, Zo.xhr = St(wt), Zo.dsv = function(n, t) {
        function e(n, e, i) {
            arguments.length < 3 && (i = e, e = null);
            var o = kt(n, t, null == e ? r : u(e), i);
            return o.row = function(n) {
                return arguments.length ? o.response(null == (e = n) ? r : u(n)) : e
            }, o
        }

        function r(n) {
            return e.parse(n.responseText)
        }

        function u(n) {
            return function(t) {
                return e.parse(t.responseText, n)
            }
        }

        function i(t) {
            return t.map(o).join(n)
        }

        function o(n) {
            return a.test(n) ? '"' + n.replace(/\"/g, '""') + '"' : n
        }
        var a = new RegExp('["' + n + "\n]"),
            c = n.charCodeAt(0);
        return e.parse = function(n, t) {
            var r;
            return e.parseRows(n, function(n, e) {
                if (r) return r(n, e - 1);
                var u = new Function("d", "return {" + n.map(function(n, t) {
                    return JSON.stringify(n) + ": d[" + t + "]"
                }).join(",") + "}");
                r = t ? function(n, e) {
                    return t(u(n), e)
                } : u
            })
        }, e.parseRows = function(n, t) {
            function e() {
                if (l >= s) return o;
                if (u) return u = !1, i;
                var t = l;
                if (34 === n.charCodeAt(t)) {
                    for (var e = t; e++ < s;)
                        if (34 === n.charCodeAt(e)) {
                            if (34 !== n.charCodeAt(e + 1)) break;
                            ++e
                        } l = e + 2;
                    var r = n.charCodeAt(e + 1);
                    return 13 === r ? (u = !0, 10 === n.charCodeAt(e + 2) && ++l) : 10 === r && (u = !0), n.substring(t + 1, e).replace(/""/g, '"')
                }
                for (; s > l;) {
                    var r = n.charCodeAt(l++),
                        a = 1;
                    if (10 === r) u = !0;
                    else if (13 === r) u = !0, 10 === n.charCodeAt(l) && (++l, ++a);
                    else if (r !== c) continue;
                    return n.substring(t, l - a)
                }
                return n.substring(t)
            }
            for (var r, u, i = {}, o = {}, a = [], s = n.length, l = 0, f = 0;
                (r = e()) !== o;) {
                for (var h = []; r !== i && r !== o;) h.push(r), r = e();
                (!t || (h = t(h, f++))) && a.push(h)
            }
            return a
        }, e.format = function(t) {
            if (Array.isArray(t[0])) return e.formatRows(t);
            var r = new h,
                u = [];
            return t.forEach(function(n) {
                for (var t in n) r.has(t) || u.push(r.add(t))
            }), [u.map(o).join(n)].concat(t.map(function(t) {
                return u.map(function(n) {
                    return o(t[n])
                }).join(n)
            })).join("\n")
        }, e.formatRows = function(n) {
            return n.map(i).join("\n")
        }, e
    }, Zo.csv = Zo.dsv(",", "text/csv"), Zo.tsv = Zo.dsv("	", "text/tab-separated-values"), Zo.touch = function(n, t, e) {
        if (arguments.length < 3 && (e = t, t = x().changedTouches), t)
            for (var r, u = 0, i = t.length; i > u; ++u)
                if ((r = t[u]).identifier === e) return Z(n, r)
    };
    var Za, Va, Xa, $a, Ba, Wa = Wo[p(Wo, "requestAnimationFrame")] || function(n) {
        setTimeout(n, 17)
    };
    Zo.timer = function(n, t, e) {
        var r = arguments.length;
        2 > r && (t = 0), 3 > r && (e = Date.now());
        var u = e + t,
            i = {
                c: n,
                t: u,
                f: !1,
                n: null
            };
        Va ? Va.n = i : Za = i, Va = i, Xa || ($a = clearTimeout($a), Xa = 1, Wa(At))
    }, Zo.timer.flush = function() {
        Ct(), Nt()
    }, Zo.round = function(n, t) {
        return t ? Math.round(n * (t = Math.pow(10, t))) / t : Math.round(n)
    };
    var Ja = ["y", "z", "a", "f", "p", "n", "\xb5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"].map(Lt);
    Zo.formatPrefix = function(n, t) {
        var e = 0;
        return n && (0 > n && (n *= -1), t && (n = Zo.round(n, zt(n, t))), e = 1 + Math.floor(1e-12 + Math.log(n) / Math.LN10), e = Math.max(-24, Math.min(24, 3 * Math.floor((e - 1) / 3)))), Ja[8 + e / 3]
    };
    var Ga = /(?:([^{])?([<>=^]))?([+\- ])?([$#])?(0)?(\d+)?(,)?(\.-?\d+)?([a-z%])?/i,
        Ka = Zo.map({
            b: function(n) {
                return n.toString(2)
            },
            c: function(n) {
                return String.fromCharCode(n)
            },
            o: function(n) {
                return n.toString(8)
            },
            x: function(n) {
                return n.toString(16)
            },
            X: function(n) {
                return n.toString(16).toUpperCase()
            },
            g: function(n, t) {
                return n.toPrecision(t)
            },
            e: function(n, t) {
                return n.toExponential(t)
            },
            f: function(n, t) {
                return n.toFixed(t)
            },
            r: function(n, t) {
                return (n = Zo.round(n, zt(n, t))).toFixed(Math.max(0, Math.min(20, zt(n * (1 + 1e-15), t))))
            }
        }),
        Qa = Zo.time = {},
        nc = Date;
    Rt.prototype = {
        getDate: function() {
            return this._.getUTCDate()
        },
        getDay: function() {
            return this._.getUTCDay()
        },
        getFullYear: function() {
            return this._.getUTCFullYear()
        },
        getHours: function() {
            return this._.getUTCHours()
        },
        getMilliseconds: function() {
            return this._.getUTCMilliseconds()
        },
        getMinutes: function() {
            return this._.getUTCMinutes()
        },
        getMonth: function() {
            return this._.getUTCMonth()
        },
        getSeconds: function() {
            return this._.getUTCSeconds()
        },
        getTime: function() {
            return this._.getTime()
        },
        getTimezoneOffset: function() {
            return 0
        },
        valueOf: function() {
            return this._.valueOf()
        },
        setDate: function() {
            tc.setUTCDate.apply(this._, arguments)
        },
        setDay: function() {
            tc.setUTCDay.apply(this._, arguments)
        },
        setFullYear: function() {
            tc.setUTCFullYear.apply(this._, arguments)
        },
        setHours: function() {
            tc.setUTCHours.apply(this._, arguments)
        },
        setMilliseconds: function() {
            tc.setUTCMilliseconds.apply(this._, arguments)
        },
        setMinutes: function() {
            tc.setUTCMinutes.apply(this._, arguments)
        },
        setMonth: function() {
            tc.setUTCMonth.apply(this._, arguments)
        },
        setSeconds: function() {
            tc.setUTCSeconds.apply(this._, arguments)
        },
        setTime: function() {
            tc.setTime.apply(this._, arguments)
        }
    };
    var tc = Date.prototype;
    Qa.year = Dt(function(n) {
        return n = Qa.day(n), n.setMonth(0, 1), n
    }, function(n, t) {
        n.setFullYear(n.getFullYear() + t)
    }, function(n) {
        return n.getFullYear()
    }), Qa.years = Qa.year.range, Qa.years.utc = Qa.year.utc.range, Qa.day = Dt(function(n) {
        var t = new nc(2e3, 0);
        return t.setFullYear(n.getFullYear(), n.getMonth(), n.getDate()), t
    }, function(n, t) {
        n.setDate(n.getDate() + t)
    }, function(n) {
        return n.getDate() - 1
    }), Qa.days = Qa.day.range, Qa.days.utc = Qa.day.utc.range, Qa.dayOfYear = function(n) {
        var t = Qa.year(n);
        return Math.floor((n - t - 6e4 * (n.getTimezoneOffset() - t.getTimezoneOffset())) / 864e5)
    }, ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"].forEach(function(n, t) {
        t = 7 - t;
        var e = Qa[n] = Dt(function(n) {
            return (n = Qa.day(n)).setDate(n.getDate() - (n.getDay() + t) % 7), n
        }, function(n, t) {
            n.setDate(n.getDate() + 7 * Math.floor(t))
        }, function(n) {
            var e = Qa.year(n).getDay();
            return Math.floor((Qa.dayOfYear(n) + (e + t) % 7) / 7) - (e !== t)
        });
        Qa[n + "s"] = e.range, Qa[n + "s"].utc = e.utc.range, Qa[n + "OfYear"] = function(n) {
            var e = Qa.year(n).getDay();
            return Math.floor((Qa.dayOfYear(n) + (e + t) % 7) / 7)
        }
    }), Qa.week = Qa.sunday, Qa.weeks = Qa.sunday.range, Qa.weeks.utc = Qa.sunday.utc.range, Qa.weekOfYear = Qa.sundayOfYear;
    var ec = {
            "-": "",
            _: " ",
            0: "0"
        },
        rc = /^\s*\d+/,
        uc = /^%/;
    Zo.locale = function(n) {
        return {
            numberFormat: Tt(n),
            timeFormat: Ut(n)
        }
    };
    var ic = Zo.locale({
        decimal: ".",
        thousands: ",",
        grouping: [3],
        currency: ["$", ""],
        dateTime: "%a %b %e %X %Y",
        date: "%m/%d/%Y",
        time: "%H:%M:%S",
        periods: ["AM", "PM"],
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    });
    Zo.format = ic.numberFormat, Zo.geo = {}, ue.prototype = {
        s: 0,
        t: 0,
        add: function(n) {
            ie(n, this.t, oc), ie(oc.s, this.s, this), this.s ? this.t += oc.t : this.s = oc.t
        },
        reset: function() {
            this.s = this.t = 0
        },
        valueOf: function() {
            return this.s
        }
    };
    var oc = new ue;
    Zo.geo.stream = function(n, t) {
        n && ac.hasOwnProperty(n.type) ? ac[n.type](n, t) : oe(n, t)
    };
    var ac = {
            Feature: function(n, t) {
                oe(n.geometry, t)
            },
            FeatureCollection: function(n, t) {
                for (var e = n.features, r = -1, u = e.length; ++r < u;) oe(e[r].geometry, t)
            }
        },
        cc = {
            Sphere: function(n, t) {
                t.sphere()
            },
            Point: function(n, t) {
                n = n.coordinates, t.point(n[0], n[1], n[2])
            },
            MultiPoint: function(n, t) {
                for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) n = e[r], t.point(n[0], n[1], n[2])
            },
            LineString: function(n, t) {
                ae(n.coordinates, t, 0)
            },
            MultiLineString: function(n, t) {
                for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) ae(e[r], t, 0)
            },
            Polygon: function(n, t) {
                ce(n.coordinates, t)
            },
            MultiPolygon: function(n, t) {
                for (var e = n.coordinates, r = -1, u = e.length; ++r < u;) ce(e[r], t)
            },
            GeometryCollection: function(n, t) {
                for (var e = n.geometries, r = -1, u = e.length; ++r < u;) oe(e[r], t)
            }
        };
    Zo.geo.area = function(n) {
        return sc = 0, Zo.geo.stream(n, fc), sc
    };
    var sc, lc = new ue,
        fc = {
            sphere: function() {
                sc += 4 * ba
            },
            point: v,
            lineStart: v,
            lineEnd: v,
            polygonStart: function() {
                lc.reset(), fc.lineStart = se
            },
            polygonEnd: function() {
                var n = 2 * lc;
                sc += 0 > n ? 4 * ba + n : n, fc.lineStart = fc.lineEnd = fc.point = v
            }
        };
    Zo.geo.bounds = function() {
        function n(n, t) {
            x.push(M = [l = n, h = n]), f > t && (f = t), t > g && (g = t)
        }

        function t(t, e) {
            var r = le([t * Aa, e * Aa]);
            if (m) {
                var u = he(m, r),
                    i = [u[1], -u[0], 0],
                    o = he(i, u);
                ve(o), o = de(o);
                var c = t - p,
                    s = c > 0 ? 1 : -1,
                    v = o[0] * Ca * s,
                    d = ua(c) > 180;
                if (d ^ (v > s * p && s * t > v)) {
                    var y = o[1] * Ca;
                    y > g && (g = y)
                } else if (v = (v + 360) % 360 - 180, d ^ (v > s * p && s * t > v)) {
                    var y = -o[1] * Ca;
                    f > y && (f = y)
                } else f > e && (f = e), e > g && (g = e);
                d ? p > t ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t) : h >= l ? (l > t && (l = t), t > h && (h = t)) : t > p ? a(l, t) > a(l, h) && (h = t) : a(t, h) > a(l, h) && (l = t)
            } else n(t, e);
            m = r, p = t
        }

        function e() {
            _.point = t
        }

        function r() {
            M[0] = l, M[1] = h, _.point = n, m = null
        }

        function u(n, e) {
            if (m) {
                var r = n - p;
                y += ua(r) > 180 ? r + (r > 0 ? 360 : -360) : r
            } else v = n, d = e;
            fc.point(n, e), t(n, e)
        }

        function i() {
            fc.lineStart()
        }

        function o() {
            u(v, d), fc.lineEnd(), ua(y) > ka && (l = -(h = 180)), M[0] = l, M[1] = h, m = null
        }

        function a(n, t) {
            return (t -= n) < 0 ? t + 360 : t
        }

        function c(n, t) {
            return n[0] - t[0]
        }

        function s(n, t) {
            return t[0] <= t[1] ? t[0] <= n && n <= t[1] : n < t[0] || t[1] < n
        }
        var l, f, h, g, p, v, d, m, y, x, M, _ = {
            point: n,
            lineStart: e,
            lineEnd: r,
            polygonStart: function() {
                _.point = u, _.lineStart = i, _.lineEnd = o, y = 0, fc.polygonStart()
            },
            polygonEnd: function() {
                fc.polygonEnd(), _.point = n, _.lineStart = e, _.lineEnd = r, 0 > lc ? (l = -(h = 180), f = -(g = 90)) : y > ka ? g = 90 : -ka > y && (f = -90), M[0] = l, M[1] = h
            }
        };
        return function(n) {
            g = h = -(l = f = 1 / 0), x = [], Zo.geo.stream(n, _);
            var t = x.length;
            if (t) {
                x.sort(c);
                for (var e, r = 1, u = x[0], i = [u]; t > r; ++r) e = x[r], s(e[0], u) || s(e[1], u) ? (a(u[0], e[1]) > a(u[0], u[1]) && (u[1] = e[1]), a(e[0], u[1]) > a(u[0], u[1]) && (u[0] = e[0])) : i.push(u = e);
                for (var o, e, p = -1 / 0, t = i.length - 1, r = 0, u = i[t]; t >= r; u = e, ++r) e = i[r], (o = a(u[1], e[0])) > p && (p = o, l = e[0], h = u[1])
            }
            return x = M = null, 1 / 0 === l || 1 / 0 === f ? [
                [0 / 0, 0 / 0],
                [0 / 0, 0 / 0]
            ] : [
                [l, f],
                [h, g]
            ]
        }
    }(), Zo.geo.centroid = function(n) {
        hc = gc = pc = vc = dc = mc = yc = xc = Mc = _c = bc = 0, Zo.geo.stream(n, wc);
        var t = Mc,
            e = _c,
            r = bc,
            u = t * t + e * e + r * r;
        return Ea > u && (t = mc, e = yc, r = xc, ka > gc && (t = pc, e = vc, r = dc), u = t * t + e * e + r * r, Ea > u) ? [0 / 0, 0 / 0] : [Math.atan2(e, t) * Ca, G(r / Math.sqrt(u)) * Ca]
    };
    var hc, gc, pc, vc, dc, mc, yc, xc, Mc, _c, bc, wc = {
            sphere: v,
            point: ye,
            lineStart: Me,
            lineEnd: _e,
            polygonStart: function() {
                wc.lineStart = be
            },
            polygonEnd: function() {
                wc.lineStart = Me
            }
        },
        Sc = Ae(we, Te, Re, [-ba, -ba / 2]),
        kc = 1e9;
    Zo.geo.clipExtent = function() {
        var n, t, e, r, u, i, o = {
            stream: function(n) {
                return u && (u.valid = !1), u = i(n), u.valid = !0, u
            },
            extent: function(a) {
                return arguments.length ? (i = Ue(n = +a[0][0], t = +a[0][1], e = +a[1][0], r = +a[1][1]), u && (u.valid = !1, u = null), o) : [
                    [n, t],
                    [e, r]
                ]
            }
        };
        return o.extent([
            [0, 0],
            [960, 500]
        ])
    }, (Zo.geo.conicEqualArea = function() {
        return He(Fe)
    }).raw = Fe, Zo.geo.albers = function() {
        return Zo.geo.conicEqualArea().rotate([96, 0]).center([-.6, 38.7]).parallels([29.5, 45.5]).scale(1070)
    }, Zo.geo.albersUsa = function() {
        function n(n) {
            var i = n[0],
                o = n[1];
            return t = null, e(i, o), t || (r(i, o), t) || u(i, o), t
        }
        var t, e, r, u, i = Zo.geo.albers(),
            o = Zo.geo.conicEqualArea().rotate([154, 0]).center([-2, 58.5]).parallels([55, 65]),
            a = Zo.geo.conicEqualArea().rotate([157, 0]).center([-3, 19.9]).parallels([8, 18]),
            c = {
                point: function(n, e) {
                    t = [n, e]
                }
            };
        return n.invert = function(n) {
            var t = i.scale(),
                e = i.translate(),
                r = (n[0] - e[0]) / t,
                u = (n[1] - e[1]) / t;
            return (u >= .12 && .234 > u && r >= -.425 && -.214 > r ? o : u >= .166 && .234 > u && r >= -.214 && -.115 > r ? a : i).invert(n)
        }, n.stream = function(n) {
            var t = i.stream(n),
                e = o.stream(n),
                r = a.stream(n);
            return {
                point: function(n, u) {
                    t.point(n, u), e.point(n, u), r.point(n, u)
                },
                sphere: function() {
                    t.sphere(), e.sphere(), r.sphere()
                },
                lineStart: function() {
                    t.lineStart(), e.lineStart(), r.lineStart()
                },
                lineEnd: function() {
                    t.lineEnd(), e.lineEnd(), r.lineEnd()
                },
                polygonStart: function() {
                    t.polygonStart(), e.polygonStart(), r.polygonStart()
                },
                polygonEnd: function() {
                    t.polygonEnd(), e.polygonEnd(), r.polygonEnd()
                }
            }
        }, n.precision = function(t) {
            return arguments.length ? (i.precision(t), o.precision(t), a.precision(t), n) : i.precision()
        }, n.scale = function(t) {
            return arguments.length ? (i.scale(t), o.scale(.35 * t), a.scale(t), n.translate(i.translate())) : i.scale()
        }, n.translate = function(t) {
            if (!arguments.length) return i.translate();
            var s = i.scale(),
                l = +t[0],
                f = +t[1];
            return e = i.translate(t).clipExtent([
                [l - .455 * s, f - .238 * s],
                [l + .455 * s, f + .238 * s]
            ]).stream(c).point, r = o.translate([l - .307 * s, f + .201 * s]).clipExtent([
                [l - .425 * s + ka, f + .12 * s + ka],
                [l - .214 * s - ka, f + .234 * s - ka]
            ]).stream(c).point, u = a.translate([l - .205 * s, f + .212 * s]).clipExtent([
                [l - .214 * s + ka, f + .166 * s + ka],
                [l - .115 * s - ka, f + .234 * s - ka]
            ]).stream(c).point, n
        }, n.scale(1070)
    };
    var Ec, Ac, Cc, Nc, zc, Lc, Tc = {
            point: v,
            lineStart: v,
            lineEnd: v,
            polygonStart: function() {
                Ac = 0, Tc.lineStart = Oe
            },
            polygonEnd: function() {
                Tc.lineStart = Tc.lineEnd = Tc.point = v, Ec += ua(Ac / 2)
            }
        },
        qc = {
            point: Ye,
            lineStart: v,
            lineEnd: v,
            polygonStart: v,
            polygonEnd: v
        },
        Rc = {
            point: Ve,
            lineStart: Xe,
            lineEnd: $e,
            polygonStart: function() {
                Rc.lineStart = Be
            },
            polygonEnd: function() {
                Rc.point = Ve, Rc.lineStart = Xe, Rc.lineEnd = $e
            }
        };
    Zo.geo.path = function() {
        function n(n) {
            return n && ("function" == typeof a && i.pointRadius(+a.apply(this, arguments)), o && o.valid || (o = u(i)), Zo.geo.stream(n, o)), i.result()
        }

        function t() {
            return o = null, n
        }
        var e, r, u, i, o, a = 4.5;
        return n.area = function(n) {
            return Ec = 0, Zo.geo.stream(n, u(Tc)), Ec
        }, n.centroid = function(n) {
            return pc = vc = dc = mc = yc = xc = Mc = _c = bc = 0, Zo.geo.stream(n, u(Rc)), bc ? [Mc / bc, _c / bc] : xc ? [mc / xc, yc / xc] : dc ? [pc / dc, vc / dc] : [0 / 0, 0 / 0]
        }, n.bounds = function(n) {
            return zc = Lc = -(Cc = Nc = 1 / 0), Zo.geo.stream(n, u(qc)), [
                [Cc, Nc],
                [zc, Lc]
            ]
        }, n.projection = function(n) {
            return arguments.length ? (u = (e = n) ? n.stream || Ge(n) : wt, t()) : e
        }, n.context = function(n) {
            return arguments.length ? (i = null == (r = n) ? new Ie : new We(n), "function" != typeof a && i.pointRadius(a), t()) : r
        }, n.pointRadius = function(t) {
            return arguments.length ? (a = "function" == typeof t ? t : (i.pointRadius(+t), +t), n) : a
        }, n.projection(Zo.geo.albersUsa()).context(null)
    }, Zo.geo.transform = function(n) {
        return {
            stream: function(t) {
                var e = new Ke(t);
                for (var r in n) e[r] = n[r];
                return e
            }
        }
    }, Ke.prototype = {
        point: function(n, t) {
            this.stream.point(n, t)
        },
        sphere: function() {
            this.stream.sphere()
        },
        lineStart: function() {
            this.stream.lineStart()
        },
        lineEnd: function() {
            this.stream.lineEnd()
        },
        polygonStart: function() {
            this.stream.polygonStart()
        },
        polygonEnd: function() {
            this.stream.polygonEnd()
        }
    }, Zo.geo.projection = nr, Zo.geo.projectionMutator = tr, (Zo.geo.equirectangular = function() {
        return nr(rr)
    }).raw = rr.invert = rr, Zo.geo.rotation = function(n) {
        function t(t) {
            return t = n(t[0] * Aa, t[1] * Aa), t[0] *= Ca, t[1] *= Ca, t
        }
        return n = ir(n[0] % 360 * Aa, n[1] * Aa, n.length > 2 ? n[2] * Aa : 0), t.invert = function(t) {
            return t = n.invert(t[0] * Aa, t[1] * Aa), t[0] *= Ca, t[1] *= Ca, t
        }, t
    }, ur.invert = rr, Zo.geo.circle = function() {
        function n() {
            var n = "function" == typeof r ? r.apply(this, arguments) : r,
                t = ir(-n[0] * Aa, -n[1] * Aa, 0).invert,
                u = [];
            return e(null, null, 1, {
                point: function(n, e) {
                    u.push(n = t(n, e)), n[0] *= Ca, n[1] *= Ca
                }
            }), {
                type: "Polygon",
                coordinates: [u]
            }
        }
        var t, e, r = [0, 0],
            u = 6;
        return n.origin = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n.angle = function(r) {
            return arguments.length ? (e = sr((t = +r) * Aa, u * Aa), n) : t
        }, n.precision = function(r) {
            return arguments.length ? (e = sr(t * Aa, (u = +r) * Aa), n) : u
        }, n.angle(90)
    }, Zo.geo.distance = function(n, t) {
        var e, r = (t[0] - n[0]) * Aa,
            u = n[1] * Aa,
            i = t[1] * Aa,
            o = Math.sin(r),
            a = Math.cos(r),
            c = Math.sin(u),
            s = Math.cos(u),
            l = Math.sin(i),
            f = Math.cos(i);
        return Math.atan2(Math.sqrt((e = f * o) * e + (e = s * l - c * f * a) * e), c * l + s * f * a)
    }, Zo.geo.graticule = function() {
        function n() {
            return {
                type: "MultiLineString",
                coordinates: t()
            }
        }

        function t() {
            return Zo.range(Math.ceil(i / d) * d, u, d).map(h).concat(Zo.range(Math.ceil(s / m) * m, c, m).map(g)).concat(Zo.range(Math.ceil(r / p) * p, e, p).filter(function(n) {
                return ua(n % d) > ka
            }).map(l)).concat(Zo.range(Math.ceil(a / v) * v, o, v).filter(function(n) {
                return ua(n % m) > ka
            }).map(f))
        }
        var e, r, u, i, o, a, c, s, l, f, h, g, p = 10,
            v = p,
            d = 90,
            m = 360,
            y = 2.5;
        return n.lines = function() {
            return t().map(function(n) {
                return {
                    type: "LineString",
                    coordinates: n
                }
            })
        }, n.outline = function() {
            return {
                type: "Polygon",
                coordinates: [h(i).concat(g(c).slice(1), h(u).reverse().slice(1), g(s).reverse().slice(1))]
            }
        }, n.extent = function(t) {
            return arguments.length ? n.majorExtent(t).minorExtent(t) : n.minorExtent()
        }, n.majorExtent = function(t) {
            return arguments.length ? (i = +t[0][0], u = +t[1][0], s = +t[0][1], c = +t[1][1], i > u && (t = i, i = u, u = t), s > c && (t = s, s = c, c = t), n.precision(y)) : [
                [i, s],
                [u, c]
            ]
        }, n.minorExtent = function(t) {
            return arguments.length ? (r = +t[0][0], e = +t[1][0], a = +t[0][1], o = +t[1][1], r > e && (t = r, r = e, e = t), a > o && (t = a, a = o, o = t), n.precision(y)) : [
                [r, a],
                [e, o]
            ]
        }, n.step = function(t) {
            return arguments.length ? n.majorStep(t).minorStep(t) : n.minorStep()
        }, n.majorStep = function(t) {
            return arguments.length ? (d = +t[0], m = +t[1], n) : [d, m]
        }, n.minorStep = function(t) {
            return arguments.length ? (p = +t[0], v = +t[1], n) : [p, v]
        }, n.precision = function(t) {
            return arguments.length ? (y = +t, l = fr(a, o, 90), f = hr(r, e, y), h = fr(s, c, 90), g = hr(i, u, y), n) : y
        }, n.majorExtent([
            [-180, -90 + ka],
            [180, 90 - ka]
        ]).minorExtent([
            [-180, -80 - ka],
            [180, 80 + ka]
        ])
    }, Zo.geo.greatArc = function() {
        function n() {
            return {
                type: "LineString",
                coordinates: [t || r.apply(this, arguments), e || u.apply(this, arguments)]
            }
        }
        var t, e, r = gr,
            u = pr;
        return n.distance = function() {
            return Zo.geo.distance(t || r.apply(this, arguments), e || u.apply(this, arguments))
        }, n.source = function(e) {
            return arguments.length ? (r = e, t = "function" == typeof e ? null : e, n) : r
        }, n.target = function(t) {
            return arguments.length ? (u = t, e = "function" == typeof t ? null : t, n) : u
        }, n.precision = function() {
            return arguments.length ? n : 0
        }, n
    }, Zo.geo.interpolate = function(n, t) {
        return vr(n[0] * Aa, n[1] * Aa, t[0] * Aa, t[1] * Aa)
    }, Zo.geo.length = function(n) {
        return Dc = 0, Zo.geo.stream(n, Pc), Dc
    };
    var Dc, Pc = {
            sphere: v,
            point: v,
            lineStart: dr,
            lineEnd: v,
            polygonStart: v,
            polygonEnd: v
        },
        Uc = mr(function(n) {
            return Math.sqrt(2 / (1 + n))
        }, function(n) {
            return 2 * Math.asin(n / 2)
        });
    (Zo.geo.azimuthalEqualArea = function() {
        return nr(Uc)
    }).raw = Uc;
    var jc = mr(function(n) {
        var t = Math.acos(n);
        return t && t / Math.sin(t)
    }, wt);
    (Zo.geo.azimuthalEquidistant = function() {
        return nr(jc)
    }).raw = jc, (Zo.geo.conicConformal = function() {
        return He(yr)
    }).raw = yr, (Zo.geo.conicEquidistant = function() {
        return He(xr)
    }).raw = xr;
    var Hc = mr(function(n) {
        return 1 / n
    }, Math.atan);
    (Zo.geo.gnomonic = function() {
        return nr(Hc)
    }).raw = Hc, Mr.invert = function(n, t) {
        return [n, 2 * Math.atan(Math.exp(t)) - Sa]
    }, (Zo.geo.mercator = function() {
        return _r(Mr)
    }).raw = Mr;
    var Fc = mr(function() {
        return 1
    }, Math.asin);
    (Zo.geo.orthographic = function() {
        return nr(Fc)
    }).raw = Fc;
    var Oc = mr(function(n) {
        return 1 / (1 + n)
    }, function(n) {
        return 2 * Math.atan(n)
    });
    (Zo.geo.stereographic = function() {
        return nr(Oc)
    }).raw = Oc, br.invert = function(n, t) {
        return [-t, 2 * Math.atan(Math.exp(n)) - Sa]
    }, (Zo.geo.transverseMercator = function() {
        var n = _r(br),
            t = n.center,
            e = n.rotate;
        return n.center = function(n) {
            return n ? t([-n[1], n[0]]) : (n = t(), [n[1], -n[0]])
        }, n.rotate = function(n) {
            return n ? e([n[0], n[1], n.length > 2 ? n[2] + 90 : 90]) : (n = e(), [n[0], n[1], n[2] - 90])
        }, e([0, 0, 90])
    }).raw = br, Zo.geom = {}, Zo.geom.hull = function(n) {
        function t(n) {
            if (n.length < 3) return [];
            var t, u = bt(e),
                i = bt(r),
                o = n.length,
                a = [],
                c = [];
            for (t = 0; o > t; t++) a.push([+u.call(this, n[t], t), +i.call(this, n[t], t), t]);
            for (a.sort(Er), t = 0; o > t; t++) c.push([a[t][0], -a[t][1]]);
            var s = kr(a),
                l = kr(c),
                f = l[0] === s[0],
                h = l[l.length - 1] === s[s.length - 1],
                g = [];
            for (t = s.length - 1; t >= 0; --t) g.push(n[a[s[t]][2]]);
            for (t = +f; t < l.length - h; ++t) g.push(n[a[l[t]][2]]);
            return g
        }
        var e = wr,
            r = Sr;
        return arguments.length ? t(n) : (t.x = function(n) {
            return arguments.length ? (e = n, t) : e
        }, t.y = function(n) {
            return arguments.length ? (r = n, t) : r
        }, t)
    }, Zo.geom.polygon = function(n) {
        return sa(n, Yc), n
    };
    var Yc = Zo.geom.polygon.prototype = [];
    Yc.area = function() {
        for (var n, t = -1, e = this.length, r = this[e - 1], u = 0; ++t < e;) n = r, r = this[t], u += n[1] * r[0] - n[0] * r[1];
        return .5 * u
    }, Yc.centroid = function(n) {
        var t, e, r = -1,
            u = this.length,
            i = 0,
            o = 0,
            a = this[u - 1];
        for (arguments.length || (n = -1 / (6 * this.area())); ++r < u;) t = a, a = this[r], e = t[0] * a[1] - a[0] * t[1], i += (t[0] + a[0]) * e, o += (t[1] + a[1]) * e;
        return [i * n, o * n]
    }, Yc.clip = function(n) {
        for (var t, e, r, u, i, o, a = Nr(n), c = -1, s = this.length - Nr(this), l = this[s - 1]; ++c < s;) {
            for (t = n.slice(), n.length = 0, u = this[c], i = t[(r = t.length - a) - 1], e = -1; ++e < r;) o = t[e], Ar(o, l, u) ? (Ar(i, l, u) || n.push(Cr(i, o, l, u)), n.push(o)) : Ar(i, l, u) && n.push(Cr(i, o, l, u)), i = o;
            a && n.push(n[0]), l = u
        }
        return n
    };
    var Ic, Zc, Vc, Xc, $c, Bc = [],
        Wc = [];
    Ur.prototype.prepare = function() {
        for (var n, t = this.edges, e = t.length; e--;) n = t[e].edge, n.b && n.a || t.splice(e, 1);
        return t.sort(Hr), t.length
    }, Wr.prototype = {
        start: function() {
            return this.edge.l === this.site ? this.edge.a : this.edge.b
        },
        end: function() {
            return this.edge.l === this.site ? this.edge.b : this.edge.a
        }
    }, Jr.prototype = {
        insert: function(n, t) {
            var e, r, u;
            if (n) {
                if (t.P = n, t.N = n.N, n.N && (n.N.P = t), n.N = t, n.R) {
                    for (n = n.R; n.L;) n = n.L;
                    n.L = t
                } else n.R = t;
                e = n
            } else this._ ? (n = nu(this._), t.P = null, t.N = n, n.P = n.L = t, e = n) : (t.P = t.N = null, this._ = t, e = null);
            for (t.L = t.R = null, t.U = e, t.C = !0, n = t; e && e.C;) r = e.U, e === r.L ? (u = r.R, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.R && (Kr(this, e), n = e, e = n.U), e.C = !1, r.C = !0, Qr(this, r))) : (u = r.L, u && u.C ? (e.C = u.C = !1, r.C = !0, n = r) : (n === e.L && (Qr(this, e), n = e, e = n.U), e.C = !1, r.C = !0, Kr(this, r))), e = n.U;
            this._.C = !1
        },
        remove: function(n) {
            n.N && (n.N.P = n.P), n.P && (n.P.N = n.N), n.N = n.P = null;
            var t, e, r, u = n.U,
                i = n.L,
                o = n.R;
            if (e = i ? o ? nu(o) : i : o, u ? u.L === n ? u.L = e : u.R = e : this._ = e, i && o ? (r = e.C, e.C = n.C, e.L = i, i.U = e, e !== o ? (u = e.U, e.U = n.U, n = e.R, u.L = n, e.R = o, o.U = e) : (e.U = u, u = e, n = e.R)) : (r = n.C, n = e), n && (n.U = u), !r) {
                if (n && n.C) return n.C = !1, void 0;
                do {
                    if (n === this._) break;
                    if (n === u.L) {
                        if (t = u.R, t.C && (t.C = !1, u.C = !0, Kr(this, u), t = u.R), t.L && t.L.C || t.R && t.R.C) {
                            t.R && t.R.C || (t.L.C = !1, t.C = !0, Qr(this, t), t = u.R), t.C = u.C, u.C = t.R.C = !1, Kr(this, u), n = this._;
                            break
                        }
                    } else if (t = u.L, t.C && (t.C = !1, u.C = !0, Qr(this, u), t = u.L), t.L && t.L.C || t.R && t.R.C) {
                        t.L && t.L.C || (t.R.C = !1, t.C = !0, Kr(this, t), t = u.L), t.C = u.C, u.C = t.L.C = !1, Qr(this, u), n = this._;
                        break
                    }
                    t.C = !0, n = u, u = u.U
                } while (!n.C);
                n && (n.C = !1)
            }
        }
    }, Zo.geom.voronoi = function(n) {
        function t(n) {
            var t = new Array(n.length),
                r = a[0][0],
                u = a[0][1],
                i = a[1][0],
                o = a[1][1];
            return tu(e(n), a).cells.forEach(function(e, a) {
                var c = e.edges,
                    s = e.site,
                    l = t[a] = c.length ? c.map(function(n) {
                        var t = n.start();
                        return [t.x, t.y]
                    }) : s.x >= r && s.x <= i && s.y >= u && s.y <= o ? [
                        [r, o],
                        [i, o],
                        [i, u],
                        [r, u]
                    ] : [];
                l.point = n[a]
            }), t
        }

        function e(n) {
            return n.map(function(n, t) {
                return {
                    x: Math.round(i(n, t) / ka) * ka,
                    y: Math.round(o(n, t) / ka) * ka,
                    i: t
                }
            })
        }
        var r = wr,
            u = Sr,
            i = r,
            o = u,
            a = Jc;
        return n ? t(n) : (t.links = function(n) {
            return tu(e(n)).edges.filter(function(n) {
                return n.l && n.r
            }).map(function(t) {
                return {
                    source: n[t.l.i],
                    target: n[t.r.i]
                }
            })
        }, t.triangles = function(n) {
            var t = [];
            return tu(e(n)).cells.forEach(function(e, r) {
                for (var u, i, o = e.site, a = e.edges.sort(Hr), c = -1, s = a.length, l = a[s - 1].edge, f = l.l === o ? l.r : l.l; ++c < s;) u = l, i = f, l = a[c].edge, f = l.l === o ? l.r : l.l, r < i.i && r < f.i && ru(o, i, f) < 0 && t.push([n[r], n[i.i], n[f.i]])
            }), t
        }, t.x = function(n) {
            return arguments.length ? (i = bt(r = n), t) : r
        }, t.y = function(n) {
            return arguments.length ? (o = bt(u = n), t) : u
        }, t.clipExtent = function(n) {
            return arguments.length ? (a = null == n ? Jc : n, t) : a === Jc ? null : a
        }, t.size = function(n) {
            return arguments.length ? t.clipExtent(n && [
                [0, 0], n
            ]) : a === Jc ? null : a && a[1]
        }, t)
    };
    var Jc = [
        [-1e6, -1e6],
        [1e6, 1e6]
    ];
    Zo.geom.delaunay = function(n) {
        return Zo.geom.voronoi().triangles(n)
    }, Zo.geom.quadtree = function(n, t, e, r, u) {
        function i(n) {
            function i(n, t, e, r, u, i, o, a) {
                if (!isNaN(e) && !isNaN(r))
                    if (n.leaf) {
                        var c = n.x,
                            l = n.y;
                        if (null != c)
                            if (ua(c - e) + ua(l - r) < .01) s(n, t, e, r, u, i, o, a);
                            else {
                                var f = n.point;
                                n.x = n.y = n.point = null, s(n, f, c, l, u, i, o, a), s(n, t, e, r, u, i, o, a)
                            }
                        else n.x = e, n.y = r, n.point = t
                    } else s(n, t, e, r, u, i, o, a)
            }

            function s(n, t, e, r, u, o, a, c) {
                var s = .5 * (u + a),
                    l = .5 * (o + c),
                    f = e >= s,
                    h = r >= l,
                    g = (h << 1) + f;
                n.leaf = !1, n = n.nodes[g] || (n.nodes[g] = ou()), f ? u = s : a = s, h ? o = l : c = l, i(n, t, e, r, u, o, a, c)
            }
            var l, f, h, g, p, v, d, m, y, x = bt(a),
                M = bt(c);
            if (null != t) v = t, d = e, m = r, y = u;
            else if (m = y = -(v = d = 1 / 0), f = [], h = [], p = n.length, o)
                for (g = 0; p > g; ++g) l = n[g], l.x < v && (v = l.x), l.y < d && (d = l.y), l.x > m && (m = l.x), l.y > y && (y = l.y), f.push(l.x), h.push(l.y);
            else
                for (g = 0; p > g; ++g) {
                    var _ = +x(l = n[g], g),
                        b = +M(l, g);
                    v > _ && (v = _), d > b && (d = b), _ > m && (m = _), b > y && (y = b), f.push(_), h.push(b)
                }
            var w = m - v,
                S = y - d;
            w > S ? y = d + w : m = v + S;
            var k = ou();
            if (k.add = function(n) {
                    i(k, n, +x(n, ++g), +M(n, g), v, d, m, y)
                }, k.visit = function(n) {
                    au(n, k, v, d, m, y)
                }, g = -1, null == t) {
                for (; ++g < p;) i(k, n[g], f[g], h[g], v, d, m, y);
                --g
            } else n.forEach(k.add);
            return f = h = n = l = null, k
        }
        var o, a = wr,
            c = Sr;
        return (o = arguments.length) ? (a = uu, c = iu, 3 === o && (u = e, r = t, e = t = 0), i(n)) : (i.x = function(n) {
            return arguments.length ? (a = n, i) : a
        }, i.y = function(n) {
            return arguments.length ? (c = n, i) : c
        }, i.extent = function(n) {
            return arguments.length ? (null == n ? t = e = r = u = null : (t = +n[0][0], e = +n[0][1], r = +n[1][0], u = +n[1][1]), i) : null == t ? null : [
                [t, e],
                [r, u]
            ]
        }, i.size = function(n) {
            return arguments.length ? (null == n ? t = e = r = u = null : (t = e = 0, r = +n[0], u = +n[1]), i) : null == t ? null : [r - t, u - e]
        }, i)
    }, Zo.interpolateRgb = cu, Zo.interpolateObject = su, Zo.interpolateNumber = lu, Zo.interpolateString = fu;
    var Gc = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
        Kc = new RegExp(Gc.source, "g");
    Zo.interpolate = hu, Zo.interpolators = [function(n, t) {
        var e = typeof t;
        return ("string" === e ? Ia.has(t) || /^(#|rgb\(|hsl\()/.test(t) ? cu : fu : t instanceof et ? cu : Array.isArray(t) ? gu : "object" === e && isNaN(t) ? su : lu)(n, t)
    }], Zo.interpolateArray = gu;
    var Qc = function() {
            return wt
        },
        ns = Zo.map({
            linear: Qc,
            poly: Mu,
            quad: function() {
                return mu
            },
            cubic: function() {
                return yu
            },
            sin: function() {
                return _u
            },
            exp: function() {
                return bu
            },
            circle: function() {
                return wu
            },
            elastic: Su,
            back: ku,
            bounce: function() {
                return Eu
            }
        }),
        ts = Zo.map({
            "in": wt,
            out: vu,
            "in-out": du,
            "out-in": function(n) {
                return du(vu(n))
            }
        });
    Zo.ease = function(n) {
        var t = n.indexOf("-"),
            e = t >= 0 ? n.substring(0, t) : n,
            r = t >= 0 ? n.substring(t + 1) : "in";
        return e = ns.get(e) || Qc, r = ts.get(r) || wt, pu(r(e.apply(null, Vo.call(arguments, 1))))
    }, Zo.interpolateHcl = Au, Zo.interpolateHsl = Cu, Zo.interpolateLab = Nu, Zo.interpolateRound = zu, Zo.transform = function(n) {
        var t = $o.createElementNS(Zo.ns.prefix.svg, "g");
        return (Zo.transform = function(n) {
            if (null != n) {
                t.setAttribute("transform", n);
                var e = t.transform.baseVal.consolidate()
            }
            return new Lu(e ? e.matrix : es)
        })(n)
    }, Lu.prototype.toString = function() {
        return "translate(" + this.translate + ")rotate(" + this.rotate + ")skewX(" + this.skew + ")scale(" + this.scale + ")"
    };
    var es = {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: 0,
        f: 0
    };
    Zo.interpolateTransform = Du, Zo.layout = {}, Zo.layout.bundle = function() {
        return function(n) {
            for (var t = [], e = -1, r = n.length; ++e < r;) t.push(ju(n[e]));
            return t
        }
    }, Zo.layout.chord = function() {
        function n() {
            var n, s, f, h, g, p = {},
                v = [],
                d = Zo.range(i),
                m = [];
            for (e = [], r = [], n = 0, h = -1; ++h < i;) {
                for (s = 0, g = -1; ++g < i;) s += u[h][g];
                v.push(s), m.push(Zo.range(i)), n += s
            }
            for (o && d.sort(function(n, t) {
                    return o(v[n], v[t])
                }), a && m.forEach(function(n, t) {
                    n.sort(function(n, e) {
                        return a(u[t][n], u[t][e])
                    })
                }), n = (wa - l * i) / n, s = 0, h = -1; ++h < i;) {
                for (f = s, g = -1; ++g < i;) {
                    var y = d[h],
                        x = m[y][g],
                        M = u[y][x],
                        _ = s,
                        b = s += M * n;
                    p[y + "-" + x] = {
                        index: y,
                        subindex: x,
                        startAngle: _,
                        endAngle: b,
                        value: M
                    }
                }
                r[y] = {
                    index: y,
                    startAngle: f,
                    endAngle: s,
                    value: (s - f) / n
                }, s += l
            }
            for (h = -1; ++h < i;)
                for (g = h - 1; ++g < i;) {
                    var w = p[h + "-" + g],
                        S = p[g + "-" + h];
                    (w.value || S.value) && e.push(w.value < S.value ? {
                        source: S,
                        target: w
                    } : {
                        source: w,
                        target: S
                    })
                }
            c && t()
        }

        function t() {
            e.sort(function(n, t) {
                return c((n.source.value + n.target.value) / 2, (t.source.value + t.target.value) / 2)
            })
        }
        var e, r, u, i, o, a, c, s = {},
            l = 0;
        return s.matrix = function(n) {
            return arguments.length ? (i = (u = n) && u.length, e = r = null, s) : u
        }, s.padding = function(n) {
            return arguments.length ? (l = n, e = r = null, s) : l
        }, s.sortGroups = function(n) {
            return arguments.length ? (o = n, e = r = null, s) : o
        }, s.sortSubgroups = function(n) {
            return arguments.length ? (a = n, e = null, s) : a
        }, s.sortChords = function(n) {
            return arguments.length ? (c = n, e && t(), s) : c
        }, s.chords = function() {
            return e || n(), e
        }, s.groups = function() {
            return r || n(), r
        }, s
    }, Zo.layout.force = function() {
        function n(n) {
            return function(t, e, r, u) {
                if (t.point !== n) {
                    var i = t.cx - n.x,
                        o = t.cy - n.y,
                        a = u - e,
                        c = i * i + o * o;
                    if (c > a * a / d) {
                        if (p > c) {
                            var s = t.charge / c;
                            n.px -= i * s, n.py -= o * s
                        }
                        return !0
                    }
                    if (t.point && c && p > c) {
                        var s = t.pointCharge / c;
                        n.px -= i * s, n.py -= o * s
                    }
                }
                return !t.charge
            }
        }

        function t(n) {
            n.px = Zo.event.x, n.py = Zo.event.y, a.resume()
        }
        var e, r, u, i, o, a = {},
            c = Zo.dispatch("start", "tick", "end"),
            s = [1, 1],
            l = .9,
            f = rs,
            h = us,
            g = -30,
            p = is,
            v = .1,
            d = .64,
            m = [],
            y = [];
        return a.tick = function() {
            if ((r *= .99) < .005) return c.end({
                type: "end",
                alpha: r = 0
            }), !0;
            var t, e, a, f, h, p, d, x, M, _ = m.length,
                b = y.length;
            for (e = 0; b > e; ++e) a = y[e], f = a.source, h = a.target, x = h.x - f.x, M = h.y - f.y, (p = x * x + M * M) && (p = r * i[e] * ((p = Math.sqrt(p)) - u[e]) / p, x *= p, M *= p, h.x -= x * (d = f.weight / (h.weight + f.weight)), h.y -= M * d, f.x += x * (d = 1 - d), f.y += M * d);
            if ((d = r * v) && (x = s[0] / 2, M = s[1] / 2, e = -1, d))
                for (; ++e < _;) a = m[e], a.x += (x - a.x) * d, a.y += (M - a.y) * d;
            if (g)
                for (Vu(t = Zo.geom.quadtree(m), r, o), e = -1; ++e < _;)(a = m[e]).fixed || t.visit(n(a));
            for (e = -1; ++e < _;) a = m[e], a.fixed ? (a.x = a.px, a.y = a.py) : (a.x -= (a.px - (a.px = a.x)) * l, a.y -= (a.py - (a.py = a.y)) * l);
            c.tick({
                type: "tick",
                alpha: r
            })
        }, a.nodes = function(n) {
            return arguments.length ? (m = n, a) : m
        }, a.links = function(n) {
            return arguments.length ? (y = n, a) : y
        }, a.size = function(n) {
            return arguments.length ? (s = n, a) : s
        }, a.linkDistance = function(n) {
            return arguments.length ? (f = "function" == typeof n ? n : +n, a) : f
        }, a.distance = a.linkDistance, a.linkStrength = function(n) {
            return arguments.length ? (h = "function" == typeof n ? n : +n, a) : h
        }, a.friction = function(n) {
            return arguments.length ? (l = +n, a) : l
        }, a.charge = function(n) {
            return arguments.length ? (g = "function" == typeof n ? n : +n, a) : g
        }, a.chargeDistance = function(n) {
            return arguments.length ? (p = n * n, a) : Math.sqrt(p)
        }, a.gravity = function(n) {
            return arguments.length ? (v = +n, a) : v
        }, a.theta = function(n) {
            return arguments.length ? (d = n * n, a) : Math.sqrt(d)
        }, a.alpha = function(n) {
            return arguments.length ? (n = +n, r ? r = n > 0 ? n : 0 : n > 0 && (c.start({
                type: "start",
                alpha: r = n
            }), Zo.timer(a.tick)), a) : r
        }, a.start = function() {
            function n(n, r) {
                if (!e) {
                    for (e = new Array(c), a = 0; c > a; ++a) e[a] = [];
                    for (a = 0; s > a; ++a) {
                        var u = y[a];
                        e[u.source.index].push(u.target), e[u.target.index].push(u.source)
                    }
                }
                for (var i, o = e[t], a = -1, s = o.length; ++a < s;)
                    if (!isNaN(i = o[a][n])) return i;
                return Math.random() * r
            }
            var t, e, r, c = m.length,
                l = y.length,
                p = s[0],
                v = s[1];
            for (t = 0; c > t; ++t)(r = m[t]).index = t, r.weight = 0;
            for (t = 0; l > t; ++t) r = y[t], "number" == typeof r.source && (r.source = m[r.source]), "number" == typeof r.target && (r.target = m[r.target]), ++r.source.weight, ++r.target.weight;
            for (t = 0; c > t; ++t) r = m[t], isNaN(r.x) && (r.x = n("x", p)), isNaN(r.y) && (r.y = n("y", v)), isNaN(r.px) && (r.px = r.x), isNaN(r.py) && (r.py = r.y);
            if (u = [], "function" == typeof f)
                for (t = 0; l > t; ++t) u[t] = +f.call(this, y[t], t);
            else
                for (t = 0; l > t; ++t) u[t] = f;
            if (i = [], "function" == typeof h)
                for (t = 0; l > t; ++t) i[t] = +h.call(this, y[t], t);
            else
                for (t = 0; l > t; ++t) i[t] = h;
            if (o = [], "function" == typeof g)
                for (t = 0; c > t; ++t) o[t] = +g.call(this, m[t], t);
            else
                for (t = 0; c > t; ++t) o[t] = g;
            return a.resume()
        }, a.resume = function() {
            return a.alpha(.1)
        }, a.stop = function() {
            return a.alpha(0)
        }, a.drag = function() {
            return e || (e = Zo.behavior.drag().origin(wt).on("dragstart.force", Ou).on("drag.force", t).on("dragend.force", Yu)), arguments.length ? (this.on("mouseover.force", Iu).on("mouseout.force", Zu).call(e), void 0) : e
        }, Zo.rebind(a, c, "on")
    };
    var rs = 20,
        us = 1,
        is = 1 / 0;
    Zo.layout.hierarchy = function() {
        function n(u) {
            var i, o = [u],
                a = [];
            for (u.depth = 0; null != (i = o.pop());)
                if (a.push(i), (s = e.call(n, i, i.depth)) && (c = s.length)) {
                    for (var c, s, l; --c >= 0;) o.push(l = s[c]), l.parent = i, l.depth = i.depth + 1;
                    r && (i.value = 0), i.children = s
                } else r && (i.value = +r.call(n, i, i.depth) || 0), delete i.children;
            return Bu(u, function(n) {
                var e, u;
                t && (e = n.children) && e.sort(t), r && (u = n.parent) && (u.value += n.value)
            }), a
        }
        var t = Gu,
            e = Wu,
            r = Ju;
        return n.sort = function(e) {
            return arguments.length ? (t = e, n) : t
        }, n.children = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.value = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n.revalue = function(t) {
            return r && ($u(t, function(n) {
                n.children && (n.value = 0)
            }), Bu(t, function(t) {
                var e;
                t.children || (t.value = +r.call(n, t, t.depth) || 0), (e = t.parent) && (e.value += t.value)
            })), t
        }, n
    }, Zo.layout.partition = function() {
        function n(t, e, r, u) {
            var i = t.children;
            if (t.x = e, t.y = t.depth * u, t.dx = r, t.dy = u, i && (o = i.length)) {
                var o, a, c, s = -1;
                for (r = t.value ? r / t.value : 0; ++s < o;) n(a = i[s], e, c = a.value * r, u), e += c
            }
        }

        function t(n) {
            var e = n.children,
                r = 0;
            if (e && (u = e.length))
                for (var u, i = -1; ++i < u;) r = Math.max(r, t(e[i]));
            return 1 + r
        }

        function e(e, i) {
            var o = r.call(this, e, i);
            return n(o[0], 0, u[0], u[1] / t(o[0])), o
        }
        var r = Zo.layout.hierarchy(),
            u = [1, 1];
        return e.size = function(n) {
            return arguments.length ? (u = n, e) : u
        }, Xu(e, r)
    }, Zo.layout.pie = function() {
        function n(i) {
            var o = i.map(function(e, r) {
                    return +t.call(n, e, r)
                }),
                a = +("function" == typeof r ? r.apply(this, arguments) : r),
                c = (("function" == typeof u ? u.apply(this, arguments) : u) - a) / Zo.sum(o),
                s = Zo.range(i.length);
            null != e && s.sort(e === os ? function(n, t) {
                return o[t] - o[n]
            } : function(n, t) {
                return e(i[n], i[t])
            });
            var l = [];
            return s.forEach(function(n) {
                var t;
                l[n] = {
                    data: i[n],
                    value: t = o[n],
                    startAngle: a,
                    endAngle: a += t * c
                }
            }), l
        }
        var t = Number,
            e = os,
            r = 0,
            u = wa;
        return n.value = function(e) {
            return arguments.length ? (t = e, n) : t
        }, n.sort = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.startAngle = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n.endAngle = function(t) {
            return arguments.length ? (u = t, n) : u
        }, n
    };
    var os = {};
    Zo.layout.stack = function() {
        function n(a, c) {
            var s = a.map(function(e, r) {
                    return t.call(n, e, r)
                }),
                l = s.map(function(t) {
                    return t.map(function(t, e) {
                        return [i.call(n, t, e), o.call(n, t, e)]
                    })
                }),
                f = e.call(n, l, c);
            s = Zo.permute(s, f), l = Zo.permute(l, f);
            var h, g, p, v = r.call(n, l, c),
                d = s.length,
                m = s[0].length;
            for (g = 0; m > g; ++g)
                for (u.call(n, s[0][g], p = v[g], l[0][g][1]), h = 1; d > h; ++h) u.call(n, s[h][g], p += l[h - 1][g][1], l[h][g][1]);
            return a
        }
        var t = wt,
            e = ei,
            r = ri,
            u = ti,
            i = Qu,
            o = ni;
        return n.values = function(e) {
            return arguments.length ? (t = e, n) : t
        }, n.order = function(t) {
            return arguments.length ? (e = "function" == typeof t ? t : as.get(t) || ei, n) : e
        }, n.offset = function(t) {
            return arguments.length ? (r = "function" == typeof t ? t : cs.get(t) || ri, n) : r
        }, n.x = function(t) {
            return arguments.length ? (i = t, n) : i
        }, n.y = function(t) {
            return arguments.length ? (o = t, n) : o
        }, n.out = function(t) {
            return arguments.length ? (u = t, n) : u
        }, n
    };
    var as = Zo.map({
            "inside-out": function(n) {
                var t, e, r = n.length,
                    u = n.map(ui),
                    i = n.map(ii),
                    o = Zo.range(r).sort(function(n, t) {
                        return u[n] - u[t]
                    }),
                    a = 0,
                    c = 0,
                    s = [],
                    l = [];
                for (t = 0; r > t; ++t) e = o[t], c > a ? (a += i[e], s.push(e)) : (c += i[e], l.push(e));
                return l.reverse().concat(s)
            },
            reverse: function(n) {
                return Zo.range(n.length).reverse()
            },
            "default": ei
        }),
        cs = Zo.map({
            silhouette: function(n) {
                var t, e, r, u = n.length,
                    i = n[0].length,
                    o = [],
                    a = 0,
                    c = [];
                for (e = 0; i > e; ++e) {
                    for (t = 0, r = 0; u > t; t++) r += n[t][e][1];
                    r > a && (a = r), o.push(r)
                }
                for (e = 0; i > e; ++e) c[e] = (a - o[e]) / 2;
                return c
            },
            wiggle: function(n) {
                var t, e, r, u, i, o, a, c, s, l = n.length,
                    f = n[0],
                    h = f.length,
                    g = [];
                for (g[0] = c = s = 0, e = 1; h > e; ++e) {
                    for (t = 0, u = 0; l > t; ++t) u += n[t][e][1];
                    for (t = 0, i = 0, a = f[e][0] - f[e - 1][0]; l > t; ++t) {
                        for (r = 0, o = (n[t][e][1] - n[t][e - 1][1]) / (2 * a); t > r; ++r) o += (n[r][e][1] - n[r][e - 1][1]) / a;
                        i += o * n[t][e][1]
                    }
                    g[e] = c -= u ? i / u * a : 0, s > c && (s = c)
                }
                for (e = 0; h > e; ++e) g[e] -= s;
                return g
            },
            expand: function(n) {
                var t, e, r, u = n.length,
                    i = n[0].length,
                    o = 1 / u,
                    a = [];
                for (e = 0; i > e; ++e) {
                    for (t = 0, r = 0; u > t; t++) r += n[t][e][1];
                    if (r)
                        for (t = 0; u > t; t++) n[t][e][1] /= r;
                    else
                        for (t = 0; u > t; t++) n[t][e][1] = o
                }
                for (e = 0; i > e; ++e) a[e] = 0;
                return a
            },
            zero: ri
        });
    Zo.layout.histogram = function() {
        function n(n, i) {
            for (var o, a, c = [], s = n.map(e, this), l = r.call(this, s, i), f = u.call(this, l, s, i), i = -1, h = s.length, g = f.length - 1, p = t ? 1 : 1 / h; ++i < g;) o = c[i] = [], o.dx = f[i + 1] - (o.x = f[i]), o.y = 0;
            if (g > 0)
                for (i = -1; ++i < h;) a = s[i], a >= l[0] && a <= l[1] && (o = c[Zo.bisect(f, a, 1, g) - 1], o.y += p, o.push(n[i]));
            return c
        }
        var t = !0,
            e = Number,
            r = si,
            u = ai;
        return n.value = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.range = function(t) {
            return arguments.length ? (r = bt(t), n) : r
        }, n.bins = function(t) {
            return arguments.length ? (u = "number" == typeof t ? function(n) {
                return ci(n, t)
            } : bt(t), n) : u
        }, n.frequency = function(e) {
            return arguments.length ? (t = !!e, n) : t
        }, n
    }, Zo.layout.pack = function() {
        function n(n, i) {
            var o = e.call(this, n, i),
                a = o[0],
                c = u[0],
                s = u[1],
                l = null == t ? Math.sqrt : "function" == typeof t ? t : function() {
                    return t
                };
            if (a.x = a.y = 0, Bu(a, function(n) {
                    n.r = +l(n.value)
                }), Bu(a, pi), r) {
                var f = r * (t ? 1 : Math.max(2 * a.r / c, 2 * a.r / s)) / 2;
                Bu(a, function(n) {
                    n.r += f
                }), Bu(a, pi), Bu(a, function(n) {
                    n.r -= f
                })
            }
            return mi(a, c / 2, s / 2, t ? 1 : 1 / Math.max(2 * a.r / c, 2 * a.r / s)), o
        }
        var t, e = Zo.layout.hierarchy().sort(li),
            r = 0,
            u = [1, 1];
        return n.size = function(t) {
            return arguments.length ? (u = t, n) : u
        }, n.radius = function(e) {
            return arguments.length ? (t = null == e || "function" == typeof e ? e : +e, n) : t
        }, n.padding = function(t) {
            return arguments.length ? (r = +t, n) : r
        }, Xu(n, e)
    }, Zo.layout.tree = function() {
        function n(n, u) {
            var l = o.call(this, n, u),
                f = l[0],
                h = t(f);
            if (Bu(h, e), h.parent.m = -h.z, $u(h, r), s) $u(f, i);
            else {
                var g = f,
                    p = f,
                    v = f;
                $u(f, function(n) {
                    n.x < g.x && (g = n), n.x > p.x && (p = n), n.depth > v.depth && (v = n)
                });
                var d = a(g, p) / 2 - g.x,
                    m = c[0] / (p.x + a(p, g) / 2 + d),
                    y = c[1] / (v.depth || 1);
                $u(f, function(n) {
                    n.x = (n.x + d) * m, n.y = n.depth * y
                })
            }
            return l
        }

        function t(n) {
            for (var t, e = {
                    A: null,
                    children: [n]
                }, r = [e]; null != (t = r.pop());)
                for (var u, i = t.children, o = 0, a = i.length; a > o; ++o) r.push((i[o] = u = {
                    _: i[o],
                    parent: t,
                    children: (u = i[o].children) && u.slice() || [],
                    A: null,
                    a: null,
                    z: 0,
                    m: 0,
                    c: 0,
                    s: 0,
                    t: null,
                    i: o
                }).a = u);
            return e.children[0]
        }

        function e(n) {
            var t = n.children,
                e = n.parent.children,
                r = n.i ? e[n.i - 1] : null;
            if (t.length) {
                wi(n);
                var i = (t[0].z + t[t.length - 1].z) / 2;
                r ? (n.z = r.z + a(n._, r._), n.m = n.z - i) : n.z = i
            } else r && (n.z = r.z + a(n._, r._));
            n.parent.A = u(n, r, n.parent.A || e[0])
        }

        function r(n) {
            n._.x = n.z + n.parent.m, n.m += n.parent.m
        }

        function u(n, t, e) {
            if (t) {
                for (var r, u = n, i = n, o = t, c = u.parent.children[0], s = u.m, l = i.m, f = o.m, h = c.m; o = _i(o), u = Mi(u), o && u;) c = Mi(c), i = _i(i), i.a = n, r = o.z + f - u.z - s + a(o._, u._), r > 0 && (bi(Si(o, n, e), n, r), s += r, l += r), f += o.m, s += u.m, h += c.m, l += i.m;
                o && !_i(i) && (i.t = o, i.m += f - l), u && !Mi(c) && (c.t = u, c.m += s - h, e = n)
            }
            return e
        }

        function i(n) {
            n.x *= c[0], n.y = n.depth * c[1]
        }
        var o = Zo.layout.hierarchy().sort(null).value(null),
            a = xi,
            c = [1, 1],
            s = null;
        return n.separation = function(t) {
            return arguments.length ? (a = t, n) : a
        }, n.size = function(t) {
            return arguments.length ? (s = null == (c = t) ? i : null, n) : s ? null : c
        }, n.nodeSize = function(t) {
            return arguments.length ? (s = null == (c = t) ? null : i, n) : s ? c : null
        }, Xu(n, o)
    }, Zo.layout.cluster = function() {
        function n(n, i) {
            var o, a = t.call(this, n, i),
                c = a[0],
                s = 0;
            Bu(c, function(n) {
                var t = n.children;
                t && t.length ? (n.x = Ei(t), n.y = ki(t)) : (n.x = o ? s += e(n, o) : 0, n.y = 0, o = n)
            });
            var l = Ai(c),
                f = Ci(c),
                h = l.x - e(l, f) / 2,
                g = f.x + e(f, l) / 2;
            return Bu(c, u ? function(n) {
                n.x = (n.x - c.x) * r[0], n.y = (c.y - n.y) * r[1]
            } : function(n) {
                n.x = (n.x - h) / (g - h) * r[0], n.y = (1 - (c.y ? n.y / c.y : 1)) * r[1]
            }), a
        }
        var t = Zo.layout.hierarchy().sort(null).value(null),
            e = xi,
            r = [1, 1],
            u = !1;
        return n.separation = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.size = function(t) {
            return arguments.length ? (u = null == (r = t), n) : u ? null : r
        }, n.nodeSize = function(t) {
            return arguments.length ? (u = null != (r = t), n) : u ? r : null
        }, Xu(n, t)
    }, Zo.layout.treemap = function() {
        function n(n, t) {
            for (var e, r, u = -1, i = n.length; ++u < i;) r = (e = n[u]).value * (0 > t ? 0 : t), e.area = isNaN(r) || 0 >= r ? 0 : r
        }

        function t(e) {
            var i = e.children;
            if (i && i.length) {
                var o, a, c, s = f(e),
                    l = [],
                    h = i.slice(),
                    p = 1 / 0,
                    v = "slice" === g ? s.dx : "dice" === g ? s.dy : "slice-dice" === g ? 1 & e.depth ? s.dy : s.dx : Math.min(s.dx, s.dy);
                for (n(h, s.dx * s.dy / e.value), l.area = 0;
                    (c = h.length) > 0;) l.push(o = h[c - 1]), l.area += o.area, "squarify" !== g || (a = r(l, v)) <= p ? (h.pop(), p = a) : (l.area -= l.pop().area, u(l, v, s, !1), v = Math.min(s.dx, s.dy), l.length = l.area = 0, p = 1 / 0);
                l.length && (u(l, v, s, !0), l.length = l.area = 0), i.forEach(t)
            }
        }

        function e(t) {
            var r = t.children;
            if (r && r.length) {
                var i, o = f(t),
                    a = r.slice(),
                    c = [];
                for (n(a, o.dx * o.dy / t.value), c.area = 0; i = a.pop();) c.push(i), c.area += i.area, null != i.z && (u(c, i.z ? o.dx : o.dy, o, !a.length), c.length = c.area = 0);
                r.forEach(e)
            }
        }

        function r(n, t) {
            for (var e, r = n.area, u = 0, i = 1 / 0, o = -1, a = n.length; ++o < a;)(e = n[o].area) && (i > e && (i = e), e > u && (u = e));
            return r *= r, t *= t, r ? Math.max(t * u * p / r, r / (t * i * p)) : 1 / 0
        }

        function u(n, t, e, r) {
            var u, i = -1,
                o = n.length,
                a = e.x,
                s = e.y,
                l = t ? c(n.area / t) : 0;
            if (t == e.dx) {
                for ((r || l > e.dy) && (l = e.dy); ++i < o;) u = n[i], u.x = a, u.y = s, u.dy = l, a += u.dx = Math.min(e.x + e.dx - a, l ? c(u.area / l) : 0);
                u.z = !0, u.dx += e.x + e.dx - a, e.y += l, e.dy -= l
            } else {
                for ((r || l > e.dx) && (l = e.dx); ++i < o;) u = n[i], u.x = a, u.y = s, u.dx = l, s += u.dy = Math.min(e.y + e.dy - s, l ? c(u.area / l) : 0);
                u.z = !1, u.dy += e.y + e.dy - s, e.x += l, e.dx -= l
            }
        }

        function i(r) {
            var u = o || a(r),
                i = u[0];
            return i.x = 0, i.y = 0, i.dx = s[0], i.dy = s[1], o && a.revalue(i), n([i], i.dx * i.dy / i.value), (o ? e : t)(i), h && (o = u), u
        }
        var o, a = Zo.layout.hierarchy(),
            c = Math.round,
            s = [1, 1],
            l = null,
            f = Ni,
            h = !1,
            g = "squarify",
            p = .5 * (1 + Math.sqrt(5));
        return i.size = function(n) {
            return arguments.length ? (s = n, i) : s
        }, i.padding = function(n) {
            function t(t) {
                var e = n.call(i, t, t.depth);
                return null == e ? Ni(t) : zi(t, "number" == typeof e ? [e, e, e, e] : e)
            }

            function e(t) {
                return zi(t, n)
            }
            if (!arguments.length) return l;
            var r;
            return f = null == (l = n) ? Ni : "function" == (r = typeof n) ? t : "number" === r ? (n = [n, n, n, n], e) : e, i
        }, i.round = function(n) {
            return arguments.length ? (c = n ? Math.round : Number, i) : c != Number
        }, i.sticky = function(n) {
            return arguments.length ? (h = n, o = null, i) : h
        }, i.ratio = function(n) {
            return arguments.length ? (p = n, i) : p
        }, i.mode = function(n) {
            return arguments.length ? (g = n + "", i) : g
        }, Xu(i, a)
    }, Zo.random = {
        normal: function(n, t) {
            var e = arguments.length;
            return 2 > e && (t = 1), 1 > e && (n = 0),
                function() {
                    var e, r, u;
                    do e = 2 * Math.random() - 1, r = 2 * Math.random() - 1, u = e * e + r * r; while (!u || u > 1);
                    return n + t * e * Math.sqrt(-2 * Math.log(u) / u)
                }
        },
        logNormal: function() {
            var n = Zo.random.normal.apply(Zo, arguments);
            return function() {
                return Math.exp(n())
            }
        },
        bates: function(n) {
            var t = Zo.random.irwinHall(n);
            return function() {
                return t() / n
            }
        },
        irwinHall: function(n) {
            return function() {
                for (var t = 0, e = 0; n > e; e++) t += Math.random();
                return t
            }
        }
    }, Zo.scale = {};
    var ss = {
        floor: wt,
        ceil: wt
    };
    Zo.scale.linear = function() {
        return Ui([0, 1], [0, 1], hu, !1)
    };
    var ls = {
        s: 1,
        g: 1,
        p: 1,
        r: 1,
        e: 1
    };
    Zo.scale.log = function() {
        return Vi(Zo.scale.linear().domain([0, 1]), 10, !0, [1, 10])
    };
    var fs = Zo.format(".0e"),
        hs = {
            floor: function(n) {
                return -Math.ceil(-n)
            },
            ceil: function(n) {
                return -Math.floor(-n)
            }
        };
    Zo.scale.pow = function() {
        return Xi(Zo.scale.linear(), 1, [0, 1])
    }, Zo.scale.sqrt = function() {
        return Zo.scale.pow().exponent(.5)
    }, Zo.scale.ordinal = function() {
        return Bi([], {
            t: "range",
            a: [
                []
            ]
        })
    }, Zo.scale.category10 = function() {
        return Zo.scale.ordinal().range(gs)
    }, Zo.scale.category20 = function() {
        return Zo.scale.ordinal().range(ps)
    }, Zo.scale.category20b = function() {
        return Zo.scale.ordinal().range(vs)
    }, Zo.scale.category20c = function() {
        return Zo.scale.ordinal().range(ds)
    };
    var gs = [2062260, 16744206, 2924588, 14034728, 9725885, 9197131, 14907330, 8355711, 12369186, 1556175].map(vt),
        ps = [2062260, 11454440, 16744206, 16759672, 2924588, 10018698, 14034728, 16750742, 9725885, 12955861, 9197131, 12885140, 14907330, 16234194, 8355711, 13092807, 12369186, 14408589, 1556175, 10410725].map(vt),
        vs = [3750777, 5395619, 7040719, 10264286, 6519097, 9216594, 11915115, 13556636, 9202993, 12426809, 15186514, 15190932, 8666169, 11356490, 14049643, 15177372, 8077683, 10834324, 13528509, 14589654].map(vt),
        ds = [3244733, 7057110, 10406625, 13032431, 15095053, 16616764, 16625259, 16634018, 3253076, 7652470, 10607003, 13101504, 7695281, 10394312, 12369372, 14342891, 6513507, 9868950, 12434877, 14277081].map(vt);
    Zo.scale.quantile = function() {
        return Wi([], [])
    }, Zo.scale.quantize = function() {
        return Ji(0, 1, [0, 1])
    }, Zo.scale.threshold = function() {
        return Gi([.5], [0, 1])
    }, Zo.scale.identity = function() {
        return Ki([0, 1])
    }, Zo.svg = {}, Zo.svg.arc = function() {
        function n() {
            var n = t.apply(this, arguments),
                i = e.apply(this, arguments),
                o = r.apply(this, arguments) + ms,
                a = u.apply(this, arguments) + ms,
                c = (o > a && (c = o, o = a, a = c), a - o),
                s = ba > c ? "0" : "1",
                l = Math.cos(o),
                f = Math.sin(o),
                h = Math.cos(a),
                g = Math.sin(a);
            return c >= ys ? n ? "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "M0," + n + "A" + n + "," + n + " 0 1,0 0," + -n + "A" + n + "," + n + " 0 1,0 0," + n + "Z" : "M0," + i + "A" + i + "," + i + " 0 1,1 0," + -i + "A" + i + "," + i + " 0 1,1 0," + i + "Z" : n ? "M" + i * l + "," + i * f + "A" + i + "," + i + " 0 " + s + ",1 " + i * h + "," + i * g + "L" + n * h + "," + n * g + "A" + n + "," + n + " 0 " + s + ",0 " + n * l + "," + n * f + "Z" : "M" + i * l + "," + i * f + "A" + i + "," + i + " 0 " + s + ",1 " + i * h + "," + i * g + "L0,0" + "Z"
        }
        var t = Qi,
            e = no,
            r = to,
            u = eo;
        return n.innerRadius = function(e) {
            return arguments.length ? (t = bt(e), n) : t
        }, n.outerRadius = function(t) {
            return arguments.length ? (e = bt(t), n) : e
        }, n.startAngle = function(t) {
            return arguments.length ? (r = bt(t), n) : r
        }, n.endAngle = function(t) {
            return arguments.length ? (u = bt(t), n) : u
        }, n.centroid = function() {
            var n = (t.apply(this, arguments) + e.apply(this, arguments)) / 2,
                i = (r.apply(this, arguments) + u.apply(this, arguments)) / 2 + ms;
            return [Math.cos(i) * n, Math.sin(i) * n]
        }, n
    };
    var ms = -Sa,
        ys = wa - ka;
    Zo.svg.line = function() {
        return ro(wt)
    };
    var xs = Zo.map({
        linear: uo,
        "linear-closed": io,
        step: oo,
        "step-before": ao,
        "step-after": co,
        basis: po,
        "basis-open": vo,
        "basis-closed": mo,
        bundle: yo,
        cardinal: fo,
        "cardinal-open": so,
        "cardinal-closed": lo,
        monotone: So
    });
    xs.forEach(function(n, t) {
        t.key = n, t.closed = /-closed$/.test(n)
    });
    var Ms = [0, 2 / 3, 1 / 3, 0],
        _s = [0, 1 / 3, 2 / 3, 0],
        bs = [0, 1 / 6, 2 / 3, 1 / 6];
    Zo.svg.line.radial = function() {
        var n = ro(ko);
        return n.radius = n.x, delete n.x, n.angle = n.y, delete n.y, n
    }, ao.reverse = co, co.reverse = ao, Zo.svg.area = function() {
        return Eo(wt)
    }, Zo.svg.area.radial = function() {
        var n = Eo(ko);
        return n.radius = n.x, delete n.x, n.innerRadius = n.x0, delete n.x0, n.outerRadius = n.x1, delete n.x1, n.angle = n.y, delete n.y, n.startAngle = n.y0, delete n.y0, n.endAngle = n.y1, delete n.y1, n
    }, Zo.svg.chord = function() {
        function n(n, a) {
            var c = t(this, i, n, a),
                s = t(this, o, n, a);
            return "M" + c.p0 + r(c.r, c.p1, c.a1 - c.a0) + (e(c, s) ? u(c.r, c.p1, c.r, c.p0) : u(c.r, c.p1, s.r, s.p0) + r(s.r, s.p1, s.a1 - s.a0) + u(s.r, s.p1, c.r, c.p0)) + "Z"
        }

        function t(n, t, e, r) {
            var u = t.call(n, e, r),
                i = a.call(n, u, r),
                o = c.call(n, u, r) + ms,
                l = s.call(n, u, r) + ms;
            return {
                r: i,
                a0: o,
                a1: l,
                p0: [i * Math.cos(o), i * Math.sin(o)],
                p1: [i * Math.cos(l), i * Math.sin(l)]
            }
        }

        function e(n, t) {
            return n.a0 == t.a0 && n.a1 == t.a1
        }

        function r(n, t, e) {
            return "A" + n + "," + n + " 0 " + +(e > ba) + ",1 " + t
        }

        function u(n, t, e, r) {
            return "Q 0,0 " + r
        }
        var i = gr,
            o = pr,
            a = Ao,
            c = to,
            s = eo;
        return n.radius = function(t) {
            return arguments.length ? (a = bt(t), n) : a
        }, n.source = function(t) {
            return arguments.length ? (i = bt(t), n) : i
        }, n.target = function(t) {
            return arguments.length ? (o = bt(t), n) : o
        }, n.startAngle = function(t) {
            return arguments.length ? (c = bt(t), n) : c
        }, n.endAngle = function(t) {
            return arguments.length ? (s = bt(t), n) : s
        }, n
    }, Zo.svg.diagonal = function() {
        function n(n, u) {
            var i = t.call(this, n, u),
                o = e.call(this, n, u),
                a = (i.y + o.y) / 2,
                c = [i, {
                    x: i.x,
                    y: a
                }, {
                    x: o.x,
                    y: a
                }, o];
            return c = c.map(r), "M" + c[0] + "C" + c[1] + " " + c[2] + " " + c[3]
        }
        var t = gr,
            e = pr,
            r = Co;
        return n.source = function(e) {
            return arguments.length ? (t = bt(e), n) : t
        }, n.target = function(t) {
            return arguments.length ? (e = bt(t), n) : e
        }, n.projection = function(t) {
            return arguments.length ? (r = t, n) : r
        }, n
    }, Zo.svg.diagonal.radial = function() {
        var n = Zo.svg.diagonal(),
            t = Co,
            e = n.projection;
        return n.projection = function(n) {
            return arguments.length ? e(No(t = n)) : t
        }, n
    }, Zo.svg.symbol = function() {
        function n(n, r) {
            return (ws.get(t.call(this, n, r)) || To)(e.call(this, n, r))
        }
        var t = Lo,
            e = zo;
        return n.type = function(e) {
            return arguments.length ? (t = bt(e), n) : t
        }, n.size = function(t) {
            return arguments.length ? (e = bt(t), n) : e
        }, n
    };
    var ws = Zo.map({
        circle: To,
        cross: function(n) {
            var t = Math.sqrt(n / 5) / 2;
            return "M" + -3 * t + "," + -t + "H" + -t + "V" + -3 * t + "H" + t + "V" + -t + "H" + 3 * t + "V" + t + "H" + t + "V" + 3 * t + "H" + -t + "V" + t + "H" + -3 * t + "Z"
        },
        diamond: function(n) {
            var t = Math.sqrt(n / (2 * As)),
                e = t * As;
            return "M0," + -t + "L" + e + ",0" + " 0," + t + " " + -e + ",0" + "Z"
        },
        square: function(n) {
            var t = Math.sqrt(n) / 2;
            return "M" + -t + "," + -t + "L" + t + "," + -t + " " + t + "," + t + " " + -t + "," + t + "Z"
        },
        "triangle-down": function(n) {
            var t = Math.sqrt(n / Es),
                e = t * Es / 2;
            return "M0," + e + "L" + t + "," + -e + " " + -t + "," + -e + "Z"
        },
        "triangle-up": function(n) {
            var t = Math.sqrt(n / Es),
                e = t * Es / 2;
            return "M0," + -e + "L" + t + "," + e + " " + -t + "," + e + "Z"
        }
    });
    Zo.svg.symbolTypes = ws.keys();
    var Ss, ks, Es = Math.sqrt(3),
        As = Math.tan(30 * Aa),
        Cs = [],
        Ns = 0;
    Cs.call = pa.call, Cs.empty = pa.empty, Cs.node = pa.node, Cs.size = pa.size, Zo.transition = function(n) {
        return arguments.length ? Ss ? n.transition() : n : ma.transition()
    }, Zo.transition.prototype = Cs, Cs.select = function(n) {
        var t, e, r, u = this.id,
            i = [];
        n = b(n);
        for (var o = -1, a = this.length; ++o < a;) {
            i.push(t = []);
            for (var c = this[o], s = -1, l = c.length; ++s < l;)(r = c[s]) && (e = n.call(r, r.__data__, s, o)) ? ("__data__" in r && (e.__data__ = r.__data__), Po(e, s, u, r.__transition__[u]), t.push(e)) : t.push(null)
        }
        return qo(i, u)
    }, Cs.selectAll = function(n) {
        var t, e, r, u, i, o = this.id,
            a = [];
        n = w(n);
        for (var c = -1, s = this.length; ++c < s;)
            for (var l = this[c], f = -1, h = l.length; ++f < h;)
                if (r = l[f]) {
                    i = r.__transition__[o], e = n.call(r, r.__data__, f, c), a.push(t = []);
                    for (var g = -1, p = e.length; ++g < p;)(u = e[g]) && Po(u, g, o, i), t.push(u)
                } return qo(a, o)
    }, Cs.filter = function(n) {
        var t, e, r, u = [];
        "function" != typeof n && (n = R(n));
        for (var i = 0, o = this.length; o > i; i++) {
            u.push(t = []);
            for (var e = this[i], a = 0, c = e.length; c > a; a++)(r = e[a]) && n.call(r, r.__data__, a, i) && t.push(r)
        }
        return qo(u, this.id)
    }, Cs.tween = function(n, t) {
        var e = this.id;
        return arguments.length < 2 ? this.node().__transition__[e].tween.get(n) : P(this, null == t ? function(t) {
            t.__transition__[e].tween.remove(n)
        } : function(r) {
            r.__transition__[e].tween.set(n, t)
        })
    }, Cs.attr = function(n, t) {
        function e() {
            this.removeAttribute(a)
        }

        function r() {
            this.removeAttributeNS(a.space, a.local)
        }

        function u(n) {
            return null == n ? e : (n += "", function() {
                var t, e = this.getAttribute(a);
                return e !== n && (t = o(e, n), function(n) {
                    this.setAttribute(a, t(n))
                })
            })
        }

        function i(n) {
            return null == n ? r : (n += "", function() {
                var t, e = this.getAttributeNS(a.space, a.local);
                return e !== n && (t = o(e, n), function(n) {
                    this.setAttributeNS(a.space, a.local, t(n))
                })
            })
        }
        if (arguments.length < 2) {
            for (t in n) this.attr(t, n[t]);
            return this
        }
        var o = "transform" == n ? Du : hu,
            a = Zo.ns.qualify(n);
        return Ro(this, "attr." + n, t, a.local ? i : u)
    }, Cs.attrTween = function(n, t) {
        function e(n, e) {
            var r = t.call(this, n, e, this.getAttribute(u));
            return r && function(n) {
                this.setAttribute(u, r(n))
            }
        }

        function r(n, e) {
            var r = t.call(this, n, e, this.getAttributeNS(u.space, u.local));
            return r && function(n) {
                this.setAttributeNS(u.space, u.local, r(n))
            }
        }
        var u = Zo.ns.qualify(n);
        return this.tween("attr." + n, u.local ? r : e)
    }, Cs.style = function(n, t, e) {
        function r() {
            this.style.removeProperty(n)
        }

        function u(t) {
            return null == t ? r : (t += "", function() {
                var r, u = Wo.getComputedStyle(this, null).getPropertyValue(n);
                return u !== t && (r = hu(u, t), function(t) {
                    this.style.setProperty(n, r(t), e)
                })
            })
        }
        var i = arguments.length;
        if (3 > i) {
            if ("string" != typeof n) {
                2 > i && (t = "");
                for (e in n) this.style(e, n[e], t);
                return this
            }
            e = ""
        }
        return Ro(this, "style." + n, t, u)
    }, Cs.styleTween = function(n, t, e) {
        function r(r, u) {
            var i = t.call(this, r, u, Wo.getComputedStyle(this, null).getPropertyValue(n));
            return i && function(t) {
                this.style.setProperty(n, i(t), e)
            }
        }
        return arguments.length < 3 && (e = ""), this.tween("style." + n, r)
    }, Cs.text = function(n) {
        return Ro(this, "text", n, Do)
    }, Cs.remove = function() {
        return this.each("end.transition", function() {
            var n;
            this.__transition__.count < 2 && (n = this.parentNode) && n.removeChild(this)
        })
    }, Cs.ease = function(n) {
        var t = this.id;
        return arguments.length < 1 ? this.node().__transition__[t].ease : ("function" != typeof n && (n = Zo.ease.apply(Zo, arguments)), P(this, function(e) {
            e.__transition__[t].ease = n
        }))
    }, Cs.delay = function(n) {
        var t = this.id;
        return arguments.length < 1 ? this.node().__transition__[t].delay : P(this, "function" == typeof n ? function(e, r, u) {
            e.__transition__[t].delay = +n.call(e, e.__data__, r, u)
        } : (n = +n, function(e) {
            e.__transition__[t].delay = n
        }))
    }, Cs.duration = function(n) {
        var t = this.id;
        return arguments.length < 1 ? this.node().__transition__[t].duration : P(this, "function" == typeof n ? function(e, r, u) {
            e.__transition__[t].duration = Math.max(1, n.call(e, e.__data__, r, u))
        } : (n = Math.max(1, n), function(e) {
            e.__transition__[t].duration = n
        }))
    }, Cs.each = function(n, t) {
        var e = this.id;
        if (arguments.length < 2) {
            var r = ks,
                u = Ss;
            Ss = e, P(this, function(t, r, u) {
                ks = t.__transition__[e], n.call(t, t.__data__, r, u)
            }), ks = r, Ss = u
        } else P(this, function(r) {
            var u = r.__transition__[e];
            (u.event || (u.event = Zo.dispatch("start", "end"))).on(n, t)
        });
        return this
    }, Cs.transition = function() {
        for (var n, t, e, r, u = this.id, i = ++Ns, o = [], a = 0, c = this.length; c > a; a++) {
            o.push(n = []);
            for (var t = this[a], s = 0, l = t.length; l > s; s++)(e = t[s]) && (r = Object.create(e.__transition__[u]), r.delay += r.duration, Po(e, s, i, r)), n.push(e)
        }
        return qo(o, i)
    }, Zo.svg.axis = function() {
        function n(n) {
            n.each(function() {
                var n, s = Zo.select(this),
                    l = this.__chart__ || e,
                    f = this.__chart__ = e.copy(),
                    h = null == c ? f.ticks ? f.ticks.apply(f, a) : f.domain() : c,
                    g = null == t ? f.tickFormat ? f.tickFormat.apply(f, a) : wt : t,
                    p = s.selectAll(".tick").data(h, f),
                    v = p.enter().insert("g", ".domain").attr("class", "tick").style("opacity", ka),
                    d = Zo.transition(p.exit()).style("opacity", ka).remove(),
                    m = Zo.transition(p.order()).style("opacity", 1),
                    y = Ti(f),
                    x = s.selectAll(".domain").data([0]),
                    M = (x.enter().append("path").attr("class", "domain"), Zo.transition(x));
                v.append("line"), v.append("text");
                var _ = v.select("line"),
                    b = m.select("line"),
                    w = p.select("text").text(g),
                    S = v.select("text"),
                    k = m.select("text");
                switch (r) {
                    case "bottom":
                        n = Uo, _.attr("y2", u), S.attr("y", Math.max(u, 0) + o), b.attr("x2", 0).attr("y2", u), k.attr("x", 0).attr("y", Math.max(u, 0) + o), w.attr("dy", ".71em").style("text-anchor", "middle"), M.attr("d", "M" + y[0] + "," + i + "V0H" + y[1] + "V" + i);
                        break;
                    case "top":
                        n = Uo, _.attr("y2", -u), S.attr("y", -(Math.max(u, 0) + o)), b.attr("x2", 0).attr("y2", -u), k.attr("x", 0).attr("y", -(Math.max(u, 0) + o)), w.attr("dy", "0em").style("text-anchor", "middle"), M.attr("d", "M" + y[0] + "," + -i + "V0H" + y[1] + "V" + -i);
                        break;
                    case "left":
                        n = jo, _.attr("x2", -u), S.attr("x", -(Math.max(u, 0) + o)), b.attr("x2", -u).attr("y2", 0), k.attr("x", -(Math.max(u, 0) + o)).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "end"), M.attr("d", "M" + -i + "," + y[0] + "H0V" + y[1] + "H" + -i);
                        break;
                    case "right":
                        n = jo, _.attr("x2", u), S.attr("x", Math.max(u, 0) + o), b.attr("x2", u).attr("y2", 0), k.attr("x", Math.max(u, 0) + o).attr("y", 0), w.attr("dy", ".32em").style("text-anchor", "start"), M.attr("d", "M" + i + "," + y[0] + "H0V" + y[1] + "H" + i)
                }
                if (f.rangeBand) {
                    var E = f,
                        A = E.rangeBand() / 2;
                    l = f = function(n) {
                        return E(n) + A
                    }
                } else l.rangeBand ? l = f : d.call(n, f);
                v.call(n, l), m.call(n, f)
            })
        }
        var t, e = Zo.scale.linear(),
            r = zs,
            u = 6,
            i = 6,
            o = 3,
            a = [10],
            c = null;
        return n.scale = function(t) {
            return arguments.length ? (e = t, n) : e
        }, n.orient = function(t) {
            return arguments.length ? (r = t in Ls ? t + "" : zs, n) : r
        }, n.ticks = function() {
            return arguments.length ? (a = arguments, n) : a
        }, n.tickValues = function(t) {
            return arguments.length ? (c = t, n) : c
        }, n.tickFormat = function(e) {
            return arguments.length ? (t = e, n) : t
        }, n.tickSize = function(t) {
            var e = arguments.length;
            return e ? (u = +t, i = +arguments[e - 1], n) : u
        }, n.innerTickSize = function(t) {
            return arguments.length ? (u = +t, n) : u
        }, n.outerTickSize = function(t) {
            return arguments.length ? (i = +t, n) : i
        }, n.tickPadding = function(t) {
            return arguments.length ? (o = +t, n) : o
        }, n.tickSubdivide = function() {
            return arguments.length && n
        }, n
    };
    var zs = "bottom",
        Ls = {
            top: 1,
            right: 1,
            bottom: 1,
            left: 1
        };
    Zo.svg.brush = function() {
        function n(i) {
            i.each(function() {
                var i = Zo.select(this).style("pointer-events", "all").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)").on("mousedown.brush", u).on("touchstart.brush", u),
                    o = i.selectAll(".background").data([0]);
                o.enter().append("rect").attr("class", "background").style("visibility", "hidden").style("cursor", "crosshair"), i.selectAll(".extent").data([0]).enter().append("rect").attr("class", "extent").style("cursor", "move");
                var a = i.selectAll(".resize").data(p, wt);
                a.exit().remove(), a.enter().append("g").attr("class", function(n) {
                    return "resize " + n
                }).style("cursor", function(n) {
                    return Ts[n]
                }).append("rect").attr("x", function(n) {
                    return /[ew]$/.test(n) ? -3 : null
                }).attr("y", function(n) {
                    return /^[ns]/.test(n) ? -3 : null
                }).attr("width", 6).attr("height", 6).style("visibility", "hidden"), a.style("display", n.empty() ? "none" : null);
                var l, f = Zo.transition(i),
                    h = Zo.transition(o);
                c && (l = Ti(c), h.attr("x", l[0]).attr("width", l[1] - l[0]), e(f)), s && (l = Ti(s), h.attr("y", l[0]).attr("height", l[1] - l[0]), r(f)), t(f)
            })
        }

        function t(n) {
            n.selectAll(".resize").attr("transform", function(n) {
                return "translate(" + l[+/e$/.test(n)] + "," + f[+/^s/.test(n)] + ")"
            })
        }

        function e(n) {
            n.select(".extent").attr("x", l[0]), n.selectAll(".extent,.n>rect,.s>rect").attr("width", l[1] - l[0])
        }

        function r(n) {
            n.select(".extent").attr("y", f[0]), n.selectAll(".extent,.e>rect,.w>rect").attr("height", f[1] - f[0])
        }

        function u() {
            function u() {
                32 == Zo.event.keyCode && (C || (x = null, z[0] -= l[1], z[1] -= f[1], C = 2), y())
            }

            function p() {
                32 == Zo.event.keyCode && 2 == C && (z[0] += l[1], z[1] += f[1], C = 0, y())
            }

            function v() {
                var n = Zo.mouse(_),
                    u = !1;
                M && (n[0] += M[0], n[1] += M[1]), C || (Zo.event.altKey ? (x || (x = [(l[0] + l[1]) / 2, (f[0] + f[1]) / 2]), z[0] = l[+(n[0] < x[0])], z[1] = f[+(n[1] < x[1])]) : x = null), E && d(n, c, 0) && (e(S), u = !0), A && d(n, s, 1) && (r(S), u = !0), u && (t(S), w({
                    type: "brush",
                    mode: C ? "move" : "resize"
                }))
            }

            function d(n, t, e) {
                var r, u, a = Ti(t),
                    c = a[0],
                    s = a[1],
                    p = z[e],
                    v = e ? f : l,
                    d = v[1] - v[0];
                return C && (c -= p, s -= d + p), r = (e ? g : h) ? Math.max(c, Math.min(s, n[e])) : n[e], C ? u = (r += p) + d : (x && (p = Math.max(c, Math.min(s, 2 * x[e] - r))), r > p ? (u = r, r = p) : u = p), v[0] != r || v[1] != u ? (e ? o = null : i = null, v[0] = r, v[1] = u, !0) : void 0
            }

            function m() {
                v(), S.style("pointer-events", "all").selectAll(".resize").style("display", n.empty() ? "none" : null), Zo.select("body").style("cursor", null), L.on("mousemove.brush", null).on("mouseup.brush", null).on("touchmove.brush", null).on("touchend.brush", null).on("keydown.brush", null).on("keyup.brush", null), N(), w({
                    type: "brushend"
                })
            }
            var x, M, _ = this,
                b = Zo.select(Zo.event.target),
                w = a.of(_, arguments),
                S = Zo.select(_),
                k = b.datum(),
                E = !/^(n|s)$/.test(k) && c,
                A = !/^(e|w)$/.test(k) && s,
                C = b.classed("extent"),
                N = I(),
                z = Zo.mouse(_),
                L = Zo.select(Wo).on("keydown.brush", u).on("keyup.brush", p);
            if (Zo.event.changedTouches ? L.on("touchmove.brush", v).on("touchend.brush", m) : L.on("mousemove.brush", v).on("mouseup.brush", m), S.interrupt().selectAll("*").interrupt(), C) z[0] = l[0] - z[0], z[1] = f[0] - z[1];
            else if (k) {
                var T = +/w$/.test(k),
                    q = +/^n/.test(k);
                M = [l[1 - T] - z[0], f[1 - q] - z[1]], z[0] = l[T], z[1] = f[q]
            } else Zo.event.altKey && (x = z.slice());
            S.style("pointer-events", "none").selectAll(".resize").style("display", null), Zo.select("body").style("cursor", b.style("cursor")), w({
                type: "brushstart"
            }), v()
        }
        var i, o, a = M(n, "brushstart", "brush", "brushend"),
            c = null,
            s = null,
            l = [0, 0],
            f = [0, 0],
            h = !0,
            g = !0,
            p = qs[0];
        return n.event = function(n) {
            n.each(function() {
                var n = a.of(this, arguments),
                    t = {
                        x: l,
                        y: f,
                        i: i,
                        j: o
                    },
                    e = this.__chart__ || t;
                this.__chart__ = t, Ss ? Zo.select(this).transition().each("start.brush", function() {
                    i = e.i, o = e.j, l = e.x, f = e.y, n({
                        type: "brushstart"
                    })
                }).tween("brush:brush", function() {
                    var e = gu(l, t.x),
                        r = gu(f, t.y);
                    return i = o = null,
                        function(u) {
                            l = t.x = e(u), f = t.y = r(u), n({
                                type: "brush",
                                mode: "resize"
                            })
                        }
                }).each("end.brush", function() {
                    i = t.i, o = t.j, n({
                        type: "brush",
                        mode: "resize"
                    }), n({
                        type: "brushend"
                    })
                }) : (n({
                    type: "brushstart"
                }), n({
                    type: "brush",
                    mode: "resize"
                }), n({
                    type: "brushend"
                }))
            })
        }, n.x = function(t) {
            return arguments.length ? (c = t, p = qs[!c << 1 | !s], n) : c
        }, n.y = function(t) {
            return arguments.length ? (s = t, p = qs[!c << 1 | !s], n) : s
        }, n.clamp = function(t) {
            return arguments.length ? (c && s ? (h = !!t[0], g = !!t[1]) : c ? h = !!t : s && (g = !!t), n) : c && s ? [h, g] : c ? h : s ? g : null
        }, n.extent = function(t) {
            var e, r, u, a, h;
            return arguments.length ? (c && (e = t[0], r = t[1], s && (e = e[0], r = r[0]), i = [e, r], c.invert && (e = c(e), r = c(r)), e > r && (h = e, e = r, r = h), (e != l[0] || r != l[1]) && (l = [e, r])), s && (u = t[0], a = t[1], c && (u = u[1], a = a[1]), o = [u, a], s.invert && (u = s(u), a = s(a)), u > a && (h = u, u = a, a = h), (u != f[0] || a != f[1]) && (f = [u, a])), n) : (c && (i ? (e = i[0], r = i[1]) : (e = l[0], r = l[1], c.invert && (e = c.invert(e), r = c.invert(r)), e > r && (h = e, e = r, r = h))), s && (o ? (u = o[0], a = o[1]) : (u = f[0], a = f[1], s.invert && (u = s.invert(u), a = s.invert(a)), u > a && (h = u, u = a, a = h))), c && s ? [
                [e, u],
                [r, a]
            ] : c ? [e, r] : s && [u, a])
        }, n.clear = function() {
            return n.empty() || (l = [0, 0], f = [0, 0], i = o = null), n
        }, n.empty = function() {
            return !!c && l[0] == l[1] || !!s && f[0] == f[1]
        }, Zo.rebind(n, a, "on")
    };
    var Ts = {
            n: "ns-resize",
            e: "ew-resize",
            s: "ns-resize",
            w: "ew-resize",
            nw: "nwse-resize",
            ne: "nesw-resize",
            se: "nwse-resize",
            sw: "nesw-resize"
        },
        qs = [
            ["n", "e", "s", "w", "nw", "ne", "se", "sw"],
            ["e", "w"],
            ["n", "s"],
            []
        ],
        Rs = Qa.format = ic.timeFormat,
        Ds = Rs.utc,
        Ps = Ds("%Y-%m-%dT%H:%M:%S.%LZ");
    Rs.iso = Date.prototype.toISOString && +new Date("2000-01-01T00:00:00.000Z") ? Ho : Ps, Ho.parse = function(n) {
        var t = new Date(n);
        return isNaN(t) ? null : t
    }, Ho.toString = Ps.toString, Qa.second = Dt(function(n) {
        return new nc(1e3 * Math.floor(n / 1e3))
    }, function(n, t) {
        n.setTime(n.getTime() + 1e3 * Math.floor(t))
    }, function(n) {
        return n.getSeconds()
    }), Qa.seconds = Qa.second.range, Qa.seconds.utc = Qa.second.utc.range, Qa.minute = Dt(function(n) {
        return new nc(6e4 * Math.floor(n / 6e4))
    }, function(n, t) {
        n.setTime(n.getTime() + 6e4 * Math.floor(t))
    }, function(n) {
        return n.getMinutes()
    }), Qa.minutes = Qa.minute.range, Qa.minutes.utc = Qa.minute.utc.range, Qa.hour = Dt(function(n) {
        var t = n.getTimezoneOffset() / 60;
        return new nc(36e5 * (Math.floor(n / 36e5 - t) + t))
    }, function(n, t) {
        n.setTime(n.getTime() + 36e5 * Math.floor(t))
    }, function(n) {
        return n.getHours()
    }), Qa.hours = Qa.hour.range, Qa.hours.utc = Qa.hour.utc.range, Qa.month = Dt(function(n) {
        return n = Qa.day(n), n.setDate(1), n
    }, function(n, t) {
        n.setMonth(n.getMonth() + t)
    }, function(n) {
        return n.getMonth()
    }), Qa.months = Qa.month.range, Qa.months.utc = Qa.month.utc.range;
    var Us = [1e3, 5e3, 15e3, 3e4, 6e4, 3e5, 9e5, 18e5, 36e5, 108e5, 216e5, 432e5, 864e5, 1728e5, 6048e5, 2592e6, 7776e6, 31536e6],
        js = [
            [Qa.second, 1],
            [Qa.second, 5],
            [Qa.second, 15],
            [Qa.second, 30],
            [Qa.minute, 1],
            [Qa.minute, 5],
            [Qa.minute, 15],
            [Qa.minute, 30],
            [Qa.hour, 1],
            [Qa.hour, 3],
            [Qa.hour, 6],
            [Qa.hour, 12],
            [Qa.day, 1],
            [Qa.day, 2],
            [Qa.week, 1],
            [Qa.month, 1],
            [Qa.month, 3],
            [Qa.year, 1]
        ],
        Hs = Rs.multi([
            [".%L", function(n) {
                return n.getMilliseconds()
            }],
            [":%S", function(n) {
                return n.getSeconds()
            }],
            ["%I:%M", function(n) {
                return n.getMinutes()
            }],
            ["%I %p", function(n) {
                return n.getHours()
            }],
            ["%a %d", function(n) {
                return n.getDay() && 1 != n.getDate()
            }],
            ["%b %d", function(n) {
                return 1 != n.getDate()
            }],
            ["%B", function(n) {
                return n.getMonth()
            }],
            ["%Y", we]
        ]),
        Fs = {
            range: function(n, t, e) {
                return Zo.range(Math.ceil(n / e) * e, +t, e).map(Oo)
            },
            floor: wt,
            ceil: wt
        };
    js.year = Qa.year, Qa.scale = function() {
        return Fo(Zo.scale.linear(), js, Hs)
    };
    var Os = js.map(function(n) {
            return [n[0].utc, n[1]]
        }),
        Ys = Ds.multi([
            [".%L", function(n) {
                return n.getUTCMilliseconds()
            }],
            [":%S", function(n) {
                return n.getUTCSeconds()
            }],
            ["%I:%M", function(n) {
                return n.getUTCMinutes()
            }],
            ["%I %p", function(n) {
                return n.getUTCHours()
            }],
            ["%a %d", function(n) {
                return n.getUTCDay() && 1 != n.getUTCDate()
            }],
            ["%b %d", function(n) {
                return 1 != n.getUTCDate()
            }],
            ["%B", function(n) {
                return n.getUTCMonth()
            }],
            ["%Y", we]
        ]);
    Os.year = Qa.year.utc, Qa.scale.utc = function() {
        return Fo(Zo.scale.linear(), Os, Ys)
    }, Zo.text = St(function(n) {
        return n.responseText
    }), Zo.json = function(n, t) {
        return kt(n, "application/json", Yo, t)
    }, Zo.html = function(n, t) {
        return kt(n, "text/html", Io, t)
    }, Zo.xml = St(function(n) {
        return n.responseXML
    }), "function" == typeof define && define.amd ? define(Zo) : "object" == typeof module && module.exports && (module.exports = Zo), this.d3 = Zo
}();
var riveted = function() {
    function e(e) {
        e = e || {}, g = parseInt(e.reportInterval, 10) || 5, p = parseInt(e.idleTimeout, 10) || 30, k = e.gaGlobal || "ga", "function" == typeof window[k] && (y = !0), "undefined" != typeof _gaq && "function" == typeof _gaq.push && (w = !0), "undefined" != typeof dataLayer && "function" == typeof dataLayer.push && (h = !0), I = "gaTracker" in e && "string" == typeof e.gaTracker ? e.gaTracker + ".send" : "send", "function" == typeof e.eventHandler && (s = e.eventHandler), "function" == typeof e.userTimingHandler && (m = e.userTimingHandler), T = "nonInteraction" in e && (e.nonInteraction === !1 || "false" === e.nonInteraction) ? !1 : !0, t(document, "keydown", f), t(document, "click", f), t(window, "mousemove", n(f, 500)), t(window, "scroll", n(f, 500)), t(document, "visibilitychange", a), t(document, "webkitvisibilitychange", a)
    }

    function n(e, n) {
        var t, i, a, o = null,
            r = 0,
            u = function() {
                r = new Date, o = null, a = e.apply(t, i)
            };
        return function() {
            var c = new Date;
            r || (r = c);
            var d = n - (c - r);
            return t = this, i = arguments, 0 >= d ? (clearTimeout(o), o = null, r = c, a = e.apply(t, i)) : o || (o = setTimeout(u, d)), a
        }
    }

    function t(e, n, t) {
        e.addEventListener ? e.addEventListener(n, t, !1) : e.attachEvent ? e.attachEvent("on" + n, t) : e["on" + n] = t
    }

    function i() {
        clearTimeout(H), r()
    }

    function a() {
        (document.hidden || document.webkitHidden) && i()
    }

    function o() {
        _ += 1, _ > 0 && _ % g === 0 && s(_)
    }

    function r() {
        L = !0, clearTimeout(E)
    }

    function u() {
        i(), b = !0
    }

    function c() {
        b = !1
    }

    function d() {
        L = !1, clearTimeout(E), E = setInterval(o, 1e3)
    }

    function l() {
        var e = new Date,
            n = e - D;
        R = !0, m(n), E = setInterval(o, 1e3)
    }

    function v() {
        D = new Date, _ = 0, R = !1, L = !1, clearTimeout(E), clearTimeout(H)
    }

    function f() {
        b || (R || l(), L && d(), clearTimeout(H), H = setTimeout(i, 1e3 * p + 100))
    }
    var s, m, g, p, T, y, w, I, h, k, R = !1,
        L = !1,
        b = !1,
        _ = 0,
        D = new Date,
        E = null,
        H = null;
    return m = function(e) {
        h ? dataLayer.push({
            event: "RivetedTiming",
            eventCategory: "Riveted",
            timingVar: "First Interaction",
            timingValue: e
        }) : (y && window[k](I, "timing", "Riveted", "First Interaction", e), w && _gaq.push(["_trackTiming", "Riveted", "First Interaction", e, null, 100]))
    }, s = function(e) {
        h ? dataLayer.push({
            event: "Riveted",
            eventCategory: "Riveted",
            eventAction: "Time Spent",
            eventLabel: e,
            eventValue: g,
            eventNonInteraction: T
        }) : (y && window[k](I, "event", "Riveted", "Time Spent", e.toString(), g, {
            nonInteraction: T
        }), w && _gaq.push(["_trackEvent", "Riveted", "Time Spent", e.toString(), g, T]))
    }, {
        init: e,
        trigger: f,
        setIdle: i,
        on: c,
        off: u,
        reset: v
    }
}();