
$(function(){
  $("#header").load("header.html");
  $("#slider").load("slider.html"); 
  $("#footer").load("footer.html");
});


document.addEventListener('readystatechange', () =>{
    if (document.readyState !== "loading") {

      
        var load = document.getElementById("load");
        if(!load.classList.contains('loader-removed')){
            var removeLoading = setTimeout(function() {
                load.className += " loader-removed";
            }, 300);
        }
        


            var load = document.getElementById("load");
            if(!load.classList.contains('loader-removed')){
                var removeLoading = setTimeout(function() {
                    load.className += " loader-removed";
                }, 300);
            }
       


            


// to highlight the text highlight in menu
        if(window.location.pathname.indexOf('sign-in') >=0){
            ($('#3').addClass('act') && $('#1').addClass('act'));                                           
                }
else if(window.location.pathname.indexOf('sign-up') >=0){
            ($('#4').addClass('act') && $('#2').addClass('act')); 
                }
    }      
    
    // for menu in mobile view 

    


});




                 

var _extends = Object.assign || function(t) {
    for (var e = 1; e <
        arguments.length; e++) {
        var n = arguments[e];
        for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o])
    }
    return t
},
_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
};
! function(t, e) {
"object" === ("undefined" == typeof exports ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.LazyLoad = e()
}(this, function() {
"use strict";
var n = {
        elements_selector: "img",
        container: document,
        threshold: 300,
        thresholds: null,
        data_src: "src",
        data_srcset: "srcset",
        data_sizes: "sizes",
        data_bg: "bg",
        class_loading: "litespeed-loading",
        class_loaded: "litespeed-loaded",
        class_error: "error",
        load_delay: 0,
        callback_load: null,
        callback_error: null,
        callback_set: null,
        callback_enter: null,
        callback_finish: null,
        to_webp: !1
    },
    s = "data-",
    r = "was-processed",
    o = "ll-timeout",
    a = "true",
    c = function(t, e) {
        return t.getAttribute(s + e)
    },
    i = function(t, e, n) {
        var o = s + e;
        null !== n ? t.setAttribute(o, n) : t.removeAttribute(o)
    },
    l = function(t) {
        return c(t, r) === a
    },
    u = function(t, e) {
        return i(t, o, e)
    },
    d = function(t) {
        return c(t, o)
    },
    f = function(t, e) {
        var n, o = "LazyLoad::Initialized",
            s = new t(e);
        try {
            n = new CustomEvent(o, {
                detail: {
                    instance: s
                }
            })
        } catch (t) {
            (n = document.createEvent("CustomEvent")).initCustomEvent(o, !1, !1, {
                instance: s
            })
        }
        window.dispatchEvent(n)
    };
var _ = function(t, e) {
        return e ? t.replace(/\.(jpe?g|png)/gi, ".webp") : t
    },
    t = "undefined" != typeof window,
    v = t && !("onscroll" in window) || /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),
    e = t && "IntersectionObserver" in window,
    h = t && "classList" in document.createElement("p"),
    b = t && !1,
    g = function(t, e, n, o) {
        for (var s, r = 0; s = t.children[r]; r += 1)
            if ("SOURCE" === s.tagName) {
                var a = c(s, n);
                m(s, e, a, o)
            }
    },
    m = function(t, e, n, o) {
        n && t.setAttribute(e, _(n, o))
    },
    p = {
        IMG: function(t, e) {
            var n = b && e.to_webp,
                o = e.data_srcset,
                s = t.parentNode;
            s && "PICTURE" === s.tagName && g(s, "srcset", o, n);
            var r = c(t, e.data_sizes);
            m(t, "sizes", r);
            var a = c(t, o);
            m(t, "srcset", a, n);
            var i = c(t, e.data_src);
            m(t, "src", i, n)
        },
        IFRAME: function(t, e) {
            var n = c(t, e.data_src);
            m(t, "src", n)
        },
        VIDEO: function(t, e) {
            var n = e.data_src,
                o = c(t, n);
            g(t, "src", n), m(t, "src", o), t.load()
        }
    },
    y = function(t, e) {
        var n, o, s = e._settings,
            r = t.tagName,
            a = p[r];
        if (a) return a(t, s), e._updateLoadingCount(1), void(e._elements = (n = e._elements, o = t, n.filter(function(t) {
            return t !== o
        })));
        ! function(t, e) {
            var n = b && e.to_webp,
                o = c(t, e.data_src),
                s = c(t, e.data_bg);
            if (o) {
                var r = _(o, n);
                t.style.backgroundImage = 'url("' + r + '")'
            }
            if (s) {
                var a = _(s, n);
                t.style.backgroundImage = a
            }
        }(t, s)
    },
    w = function(t, e) {
        h ? t.classList.add(e) : t.className += (t.className ? " " : "") + e
    },
    E = function(t, e) {
        t && t(e)
    },
    L = "load",
    I = "loadeddata",
    O = "error",
    k = function(t, e, n) {
        t.addEventListener(e, n)
    },
    A = function(t, e, n) {
        t.removeEventListener(e, n)
    },
    C = function(t, e, n) {
        A(t, L, e), A(t, I, e), A(t, O, n)
    },
    z = function(t, e, n) {
        var o, s, r = n._settings,
            a = e ? r.class_loaded : r.class_error,
            i = e ? r.callback_load : r.callback_error,
            c = t.target;
        o = c, s = r.class_loading, h ? o.classList.remove(s) : o.className = o.className.replace(new RegExp("(^|\\s+)" + s + "(\\s+|$)"), " ").replace(/^\s+/, "").replace(/\s+$/, ""), w(c, a), E(i, c), n._updateLoadingCount(-1)
    },
    N = function(n, o) {
        var t, e, s, r = function t(e) {
                z(e, !0, o), C(n, t, a)
            },
            a = function t(e) {
                z(e, !1, o), C(n, r, t)
            };
        s = a, k(t = n, L, e = r), k(t, I, e), k(t, O, s)
    },
    x = ["IMG", "IFRAME", "VIDEO"],
    M = function(t, e, n) {
        R(t, n), e.unobserve(t)
    },
    S = function(t) {
        var e = d(t);
        e && (clearTimeout(e), u(t, null))
    };

function R(t, e, n) {
    var o = e._settings;
    !n && l(t) || (E(o.callback_enter, t), -1 <
        x.indexOf(t.tagName) && (N(t, e), w(t, o.class_loading)), y(t, e), i(t, r, a), E(o.callback_set, t))
}
var j = function(t) {
        return t.isIntersecting || 0 <
            t.intersectionRatio
    },
    T = function(t, e) {
        this._settings = _extends({}, n, t), this._setObserver(), this._loadingCount = 0, this.update(e)
    };
return T.prototype = {
    _manageIntersection: function(t) {
        var e, n, o, s, r, a = this._observer,
            i = this._settings.load_delay,
            c = t.target;
        i ? j(t) ? (e = c, n = a, s = (o = this)._settings.load_delay, (r = d(e)) || (r = setTimeout(function() {
            M(e, n, o), S(e)
        }, s), u(e, r))) : S(c) : j(t) && M(c, a, this)
    },
    _onIntersection: function(t) {
        t.forEach(this._manageIntersection.bind(this))
    },
    _setObserver: function() {
        var t;
        e && (this._observer = new IntersectionObserver(this._onIntersection.bind(this), {
            root: (t = this._settings).container === document ? null : t.container,
            rootMargin: t.thresholds || t.threshold + "px"
        }))
    },
    _updateLoadingCount: function(t) {
        this._loadingCount += t, 0 === this._elements.length && 0 === this._loadingCount && E(this._settings.callback_finish)
    },
    update: function(t) {
        var e = this,
            n = this._settings,
            o = t || n.container.querySelectorAll(n.elements_selector);
        this._elements = Array.prototype.slice.call(o).filter(function(t) {
            return !l(t)
        }), !v && this._observer ? this._elements.forEach(function(t) {
            e._observer.observe(t)
        }) : this.loadAll()
    },
    destroy: function() {
        var e = this;
        this._observer && (this._elements.forEach(function(t) {
            e._observer.unobserve(t)
        }), this._observer = null), this._elements = null, this._settings = null
    },
    load: function(t, e) {
        R(t, this, e)
    },
    loadAll: function() {
        var e = this;
        this._elements.forEach(function(t) {
            e.load(t)
        })
    }
}, t && function(t, e) {
    if (e)
        if (e.length)
            for (var n, o = 0; n = e[o]; o += 1) f(t, n);
        else f(t, e)
}(T, window.lazyLoadOptions), T
}),
function(e, t) {
"use strict";

function n() {
    t.body.classList.add("litespeed_lazyloaded")
}

function a() {
    d = new LazyLoad({
        elements_selector: "[data-lazyloaded]",
        callback_finish: n
    }), o = function() {
        d.update()
    }, e.MutationObserver && new MutationObserver(o).observe(t.documentElement, {
        childList: !0,
        subtree: !0,
        attributes: !0
    })
}
var d, o;
e.addEventListener ? e.addEventListener("load", a, !1) : e.attachEvent("onload", a)
}(window, document);

