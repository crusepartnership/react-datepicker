!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(
        exports,
        require("react"),
        require("prop-types"),
        require("classnames"),
        require("react-onclickoutside"),
        require("react-popper")
      )
    : "function" == typeof define && define.amd
      ? define(
          [
            "exports",
            "react",
            "prop-types",
            "classnames",
            "react-onclickoutside",
            "react-popper"
          ],
          t
        )
      : t(
          (e.DatePicker = {}),
          e.React,
          e.PropTypes,
          e.classNames,
          e.onClickOutside,
          e.ReactPopper
        );
})(this, function(e, t, n, r, a, o) {
  "use strict";
  function i(e) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return (
      e instanceof Date ||
      ("object" == typeof e &&
        "[object Date]" === Object.prototype.toString.call(e))
    );
  }
  function s(e) {
    if (null === e || !0 === e || !1 === e) return NaN;
    var t = +e;
    return isNaN(t) ? t : 0 > t ? Math.ceil(t) : Math.floor(t);
  }
  function u(e) {
    var t = new Date(e.getTime()),
      n = t.getTimezoneOffset();
    t.setSeconds(0, 0);
    var r = t.getTime() % je;
    return n * je + r;
  }
  function c(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    if (null === e) return new Date(NaN);
    var n = t || {},
      r = null == n.additionalDigits ? Ae : s(n.additionalDigits);
    if (2 !== r && 1 !== r && 0 !== r)
      throw new RangeError("additionalDigits must be 0, 1 or 2");
    if (
      e instanceof Date ||
      ("object" == typeof e &&
        "[object Date]" === Object.prototype.toString.call(e))
    )
      return new Date(e.getTime());
    if (
      "number" == typeof e ||
      "[object Number]" === Object.prototype.toString.call(e)
    )
      return new Date(e);
    if (
      "string" != typeof e &&
      "[object String]" !== Object.prototype.toString.call(e)
    )
      return new Date(NaN);
    var a = (function(e) {
        var t,
          n = {},
          r = e.split(ze.dateTimeDelimeter);
        ze.plainTime.test(r[0])
          ? ((n.date = null), (t = r[0]))
          : ((n.date = r[0]),
            (t = r[1]),
            ze.timeZoneDelimeter.test(n.date) &&
              ((n.date = e.split(ze.timeZoneDelimeter)[0]),
              (t = e.substr(n.date.length, e.length))));
        if (t) {
          var a = ze.timezone.exec(t);
          a
            ? ((n.time = t.replace(a[1], "")), (n.timezone = a[1]))
            : (n.time = t);
        }
        return n;
      })(e),
      o = (function(e, t) {
        var n,
          r = ze.YYY[t],
          a = ze.YYYYY[t];
        if ((n = ze.YYYY.exec(e) || a.exec(e))) {
          var o = n[1];
          return { year: parseInt(o, 10), restDateString: e.slice(o.length) };
        }
        if ((n = ze.YY.exec(e) || r.exec(e))) {
          var i = n[1];
          return {
            year: 100 * parseInt(i, 10),
            restDateString: e.slice(i.length)
          };
        }
        return { year: null };
      })(a.date, r),
      i = (function(e, t) {
        if (null === t) return null;
        var n, r, a, o;
        if (0 === e.length) return (r = new Date(0)).setUTCFullYear(t), r;
        if ((n = ze.MM.exec(e)))
          return (
            (r = new Date(0)),
            (a = parseInt(n[1], 10) - 1),
            d(t, a) ? (r.setUTCFullYear(t, a), r) : new Date(NaN)
          );
        if ((n = ze.DDD.exec(e))) {
          r = new Date(0);
          var i = parseInt(n[1], 10);
          return (function(e, t) {
            if (1 > t) return !1;
            var n = p(e);
            if (n && t > 366) return !1;
            if (!n && t > 365) return !1;
            return !0;
          })(t, i)
            ? (r.setUTCFullYear(t, 0, i), r)
            : new Date(NaN);
        }
        if ((n = ze.MMDD.exec(e))) {
          (r = new Date(0)), (a = parseInt(n[1], 10) - 1);
          var s = parseInt(n[2], 10);
          return d(t, a, s) ? (r.setUTCFullYear(t, a, s), r) : new Date(NaN);
        }
        if ((n = ze.Www.exec(e)))
          return (
            (o = parseInt(n[1], 10) - 1), h(t, o) ? l(t, o) : new Date(NaN)
          );
        if ((n = ze.WwwD.exec(e))) {
          o = parseInt(n[1], 10) - 1;
          var u = parseInt(n[2], 10) - 1;
          return h(t, o, u) ? l(t, o, u) : new Date(NaN);
        }
        return null;
      })(o.restDateString, o.year);
    if (isNaN(i)) return new Date(NaN);
    if (i) {
      var c,
        g = i.getTime(),
        w = 0;
      if (
        a.time &&
        ((w = (function(e) {
          var t, n, r;
          if ((t = ze.HH.exec(e)))
            return (
              (n = parseFloat(t[1].replace(",", "."))),
              f(n) ? (n % 24) * Qe : NaN
            );
          if ((t = ze.HHMM.exec(e)))
            return (
              (n = parseInt(t[1], 10)),
              (r = parseFloat(t[2].replace(",", "."))),
              f(n, r) ? (n % 24) * Qe + r * Xe : NaN
            );
          if ((t = ze.HHMMSS.exec(e))) {
            (n = parseInt(t[1], 10)), (r = parseInt(t[2], 10));
            var a = parseFloat(t[3].replace(",", "."));
            return f(n, r, a) ? (n % 24) * Qe + r * Xe + 1e3 * a : NaN;
          }
          return null;
        })(a.time)),
        isNaN(w))
      )
        return new Date(NaN);
      if (a.timezone) {
        if (
          ((c = (function(e) {
            var t, n;
            if ((t = ze.timezoneZ.exec(e))) return 0;
            var r;
            if ((t = ze.timezoneHH.exec(e)))
              return (
                (r = parseInt(t[2], 10)),
                m(r) ? ((n = r * Qe), "+" === t[1] ? -n : n) : NaN
              );
            if ((t = ze.timezoneHHMM.exec(e))) {
              r = parseInt(t[2], 10);
              var a = parseInt(t[3], 10);
              return m(r, a)
                ? ((n = r * Qe + a * Xe), "+" === t[1] ? -n : n)
                : NaN;
            }
            return 0;
          })(a.timezone)),
          isNaN(c))
        )
          return new Date(NaN);
      } else (c = u(new Date(g + w))), (c = u(new Date(g + w + c)));
      return new Date(g + w + c);
    }
    return new Date(NaN);
  }
  function l(e, t, n) {
    (t = t || 0), (n = n || 0);
    var r = new Date(0);
    r.setUTCFullYear(e, 0, 4);
    var a = 7 * t + n + 1 - (r.getUTCDay() || 7);
    return r.setUTCDate(r.getUTCDate() + a), r;
  }
  function p(e) {
    return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
  }
  function d(e, t, n) {
    if (0 > t || t > 11) return !1;
    if (null != n) {
      if (1 > n) return !1;
      var r = p(e);
      if (r && n > Ve[t]) return !1;
      if (!r && n > Ge[t]) return !1;
    }
    return !0;
  }
  function h(e, t, n) {
    return t >= 0 && 52 >= t && (null == n || (n >= 0 && 6 >= n));
  }
  function f(e, t, n) {
    return (
      (null == e || (e >= 0 && 25 > e)) &&
      ((null == t || (t >= 0 && 60 > t)) && (null == n || (n >= 0 && 60 > n)))
    );
  }
  function m(e, t) {
    return null == t || (t >= 0 && 59 >= t);
  }
  function g(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t);
    return !isNaN(n);
  }
  function w(e) {
    return function(t) {
      var n = t || {};
      return (
        e.formats[n.width ? n.width + "" : e.defaultWidth] ||
        e.formats[e.defaultWidth]
      );
    };
  }
  function y(e) {
    return function(t, n) {
      var r = n || {},
        a = r.width ? r.width + "" : e.defaultWidth;
      return ("formatting" === (r.context ? r.context + "" : "standalone") &&
      e.formattingValues
        ? e.formattingValues[a] || e.formattingValues[e.defaultFormattingWidth]
        : e.values[a] ||
          e.values[
            e.defaultWidth
          ])[e.argumentCallback ? e.argumentCallback(t) : t];
    };
  }
  function D(e) {
    return function(t, n) {
      var r = t + "",
        a = n || {},
        o = a.width,
        i = r.match(
          (o && e.matchPatterns[o]) || e.matchPatterns[e.defaultMatchWidth]
        );
      if (!i) return null;
      var s,
        u = i[0],
        c = (o && e.parsePatterns[o]) || e.parsePatterns[e.defaultParseWidth];
      return (
        (s =
          "[object Array]" === Object.prototype.toString.call(c)
            ? c.findIndex(function(e) {
                return e.test(r);
              })
            : (function(e, t) {
                for (var n in e) if (e.hasOwnProperty(n) && t(e[n])) return n;
              })(c, function(e) {
                return e.test(r);
              })),
        (s = e.valueCallback ? e.valueCallback(s) : s),
        (s = a.valueCallback ? a.valueCallback(s) : s),
        { value: s, rest: r.slice(u.length) }
      );
    };
  }
  function v(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t),
      r = n.getUTCDay(),
      a = (1 > r ? 7 : 0) + r - 1;
    return n.setUTCDate(n.getUTCDate() - a), n.setUTCHours(0, 0, 0, 0), n;
  }
  function b(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t),
      r = n.getUTCFullYear(),
      a = new Date(0);
    a.setUTCFullYear(r + 1, 0, 4), a.setUTCHours(0, 0, 0, 0);
    var o = v(a, t),
      i = new Date(0);
    i.setUTCFullYear(r, 0, 4), i.setUTCHours(0, 0, 0, 0);
    var s = v(i, t);
    return n.getTime() < o.getTime()
      ? n.getTime() < s.getTime() ? r - 1 : r
      : r + 1;
  }
  function C(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t),
      r =
        v(n, t).getTime() -
        (function(e, t) {
          if (1 > arguments.length)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var n = b(e, t),
            r = new Date(0);
          return r.setUTCFullYear(n, 0, 4), r.setUTCHours(0, 0, 0, 0), v(r, t);
        })(n, t).getTime();
    return Math.round(r / et) + 1;
  }
  function k(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = t || {},
      r = n.locale,
      a = r && r.options && r.options.weekStartsOn,
      o = null == a ? 0 : s(a),
      i = null == n.weekStartsOn ? o : s(n.weekStartsOn);
    if (0 > i || i > 6)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var u = c(e, n),
      l = u.getUTCDay(),
      p = (i > l ? 7 : 0) + l - i;
    return u.setUTCDate(u.getUTCDate() - p), u.setUTCHours(0, 0, 0, 0), u;
  }
  function T(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t),
      r = n.getUTCFullYear(),
      a = t || {},
      o = a.locale,
      i = o && o.options && o.options.firstWeekContainsDate,
      u = null == i ? 1 : s(i),
      l = null == a.firstWeekContainsDate ? u : s(a.firstWeekContainsDate);
    if (1 > l || l > 7)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var p = new Date(0);
    p.setUTCFullYear(r + 1, 0, l), p.setUTCHours(0, 0, 0, 0);
    var d = k(p, t),
      h = new Date(0);
    h.setUTCFullYear(r, 0, l), h.setUTCHours(0, 0, 0, 0);
    var f = k(h, t);
    return n.getTime() < d.getTime()
      ? n.getTime() < f.getTime() ? r - 1 : r
      : r + 1;
  }
  function M(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t),
      r =
        k(n, t).getTime() -
        (function(e, t) {
          if (1 > arguments.length)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var n = t || {},
            r = n.locale,
            a = r && r.options && r.options.firstWeekContainsDate,
            o = null == a ? 1 : s(a),
            i =
              null == n.firstWeekContainsDate ? o : s(n.firstWeekContainsDate),
            u = T(e, t),
            c = new Date(0);
          return c.setUTCFullYear(u, 0, i), c.setUTCHours(0, 0, 0, 0), k(c, t);
        })(n, t).getTime();
    return Math.round(r / tt) + 1;
  }
  function S(e, t) {
    for (var n = 0 > e ? "-" : "", r = "" + Math.abs(e); t > r.length; )
      r = "0" + r;
    return n + r;
  }
  function x(e, t) {
    var n = t || "",
      r = e > 0 ? "-" : "+",
      a = Math.abs(e);
    return r + S(Math.floor(a / 60), 2) + n + S(a % 60, 2);
  }
  function N(e, t) {
    if (e % 60 == 0) {
      return (e > 0 ? "-" : "+") + S(Math.abs(e) / 60, 2);
    }
    return x(e, t);
  }
  function E(e, t) {
    var n = e > 0 ? "-" : "+",
      r = Math.abs(e),
      a = Math.floor(r / 60),
      o = r % 60;
    if (0 === o) return n + (a + "");
    return n + (a + "") + (t || "") + S(o, 2);
  }
  function O(e, t, n) {
    switch (e) {
      case "P":
        return t.date({ width: "short" });
      case "PP":
        return t.date({ width: "medium" });
      case "PPP":
        return t.date({ width: "long" });
      case "PPPP":
      default:
        return t.date({ width: "full" });
    }
  }
  function _(e, t, n) {
    switch (e) {
      case "p":
        return t.time({ width: "short" });
      case "pp":
        return t.time({ width: "medium" });
      case "ppp":
        return t.time({ width: "long" });
      case "pppp":
      default:
        return t.time({ width: "full" });
    }
  }
  function Y(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n).getTime(),
      a = s(t);
    return new Date(r + a);
  }
  function q(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return Y(e, -s(t), n);
  }
  function P(e) {
    return -1 !== at.indexOf(e);
  }
  function U(e) {
    throw new RangeError(
      "`options.awareOfUnicodeTokens` must be set to `true` to use `" +
        e +
        "` token; see: https://git.io/fxCyr"
    );
  }
  function F(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = t + "",
      a = n || {},
      o = a.locale || $e,
      i = o.options && o.options.firstWeekContainsDate,
      l = null == i ? 1 : s(i),
      p = null == a.firstWeekContainsDate ? l : s(a.firstWeekContainsDate);
    if (1 > p || p > 7)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var d = o.options && o.options.weekStartsOn,
      h = null == d ? 0 : s(d),
      f = null == a.weekStartsOn ? h : s(a.weekStartsOn);
    if (0 > f || f > 6)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if (!o.localize)
      throw new RangeError("locale must contain localize property");
    if (!o.formatLong)
      throw new RangeError("locale must contain formatLong property");
    var m = c(e, a);
    if (!g(m, a)) return "Invalid Date";
    var w = q(m, u(m), a),
      y = {
        firstWeekContainsDate: p,
        weekStartsOn: f,
        locale: o,
        _originalDate: m
      };
    return r
      .match(it)
      .map(function(e) {
        var t = e[0];
        if ("p" === t || "P" === t) {
          return (0, rt[t])(e, o.formatLong, y);
        }
        return e;
      })
      .join("")
      .match(ot)
      .map(function(e) {
        if ("''" === e) return "'";
        var t = e[0];
        if ("'" === t)
          return (function(e) {
            return e.match(st)[1].replace(ut, "'");
          })(e);
        var n = nt[t];
        return n
          ? (!a.awareOfUnicodeTokens && P(e) && U(e), n(w, e, o.localize, y))
          : e;
      })
      .join("");
  }
  function W(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return Y(e, s(t) * ct, n);
  }
  function H(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = s(t);
    return r.setDate(r.getDate() + a), r;
  }
  function I(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return H(e, 7 * s(t), n);
  }
  function L(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t),
      r = n.getFullYear(),
      a = n.getMonth(),
      o = new Date(0);
    return o.setFullYear(r, a + 1, 0), o.setHours(0, 0, 0, 0), o.getDate();
  }
  function R(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = s(t),
      o = r.getMonth() + a,
      i = new Date(0);
    i.setFullYear(r.getFullYear(), o, 1), i.setHours(0, 0, 0, 0);
    var u = L(i, n);
    return r.setMonth(o, Math.min(u, r.getDate())), r;
  }
  function B(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return R(e, 12 * s(t), n);
  }
  function j(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    return R(e, -s(t), n);
  }
  function Q(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return c(e, t).getMinutes();
  }
  function X(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return c(e, t).getHours();
  }
  function A(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return c(e, t).getDate();
  }
  function z(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return c(e, t).getMonth();
  }
  function G(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return c(e, t).getFullYear();
  }
  function V(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    return c(e, t).getTime();
  }
  function K(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = s(t);
    return r.setMinutes(a), r;
  }
  function Z(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = s(t);
    return r.setHours(a), r;
  }
  function $(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = s(t),
      o = r.getFullYear(),
      i = r.getDate(),
      u = new Date(0);
    u.setFullYear(o, a, 15), u.setHours(0, 0, 0, 0);
    var l = L(u, n);
    return r.setMonth(a, Math.min(i, l)), r;
  }
  function J(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = s(t);
    return isNaN(r) ? new Date(NaN) : (r.setFullYear(a), r);
  }
  function ee(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n;
    return (
      (null == e
        ? []
        : "function" == typeof e.forEach ? e : Array.prototype.slice.call(e)
      ).forEach(function(e) {
        var r = c(e, t);
        (void 0 === n || n > r || isNaN(r)) && (n = r);
      }),
      n
    );
  }
  function te(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n;
    return (
      (null == e
        ? []
        : "function" == typeof e.forEach ? e : Array.prototype.slice.call(e)
      ).forEach(function(e) {
        var r = c(e, t);
        (void 0 === n || r > n || isNaN(r)) && (n = r);
      }),
      n
    );
  }
  function ne(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = c(e, t);
    return n.setHours(0, 0, 0, 0), n;
  }
  function re(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = ne(e, n),
      a = ne(t, n),
      o = r.getTime() - u(r),
      i = a.getTime() - u(a);
    return Math.round((o - i) / pt);
  }
  function ae(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = c(t, n);
    return (
      12 * (r.getFullYear() - a.getFullYear()) + (r.getMonth() - a.getMonth())
    );
  }
  function oe(e, t) {
    if (1 > arguments.length)
      throw new TypeError(
        "1 argument required, but only " + arguments.length + " present"
      );
    var n = t || {},
      r = n.locale,
      a = r && r.options && r.options.weekStartsOn,
      o = null == a ? 0 : s(a),
      i = null == n.weekStartsOn ? o : s(n.weekStartsOn);
    if (0 > i || i > 6)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var u = c(e, n),
      l = u.getDay(),
      p = (i > l ? 7 : 0) + l - i;
    return u.setDate(u.getDate() - p), u.setHours(0, 0, 0, 0), u;
  }
  function ie(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = c(t, n);
    return r.getTime() === a.getTime();
  }
  function se(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = c(t, n);
    return r.getTime() > a.getTime();
  }
  function ue(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = c(e, n),
      a = c(t, n);
    return r.getTime() < a.getTime();
  }
  function ce(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = t || {},
      a = c(e, n).getTime(),
      o = c(r.start, n).getTime(),
      i = c(r.end, n).getTime();
    if (i < o) throw new RangeError("Invalid interval");
    return a >= o && i >= a;
  }
  function le(e, t, n) {
    if (2 > arguments.length)
      throw new TypeError(
        "2 arguments required, but only " + arguments.length + " present"
      );
    var r = n || {},
      a = r.locale,
      o = a && a.options && a.options.weekStartsOn,
      i = null == o ? 0 : s(o),
      u = null == r.weekStartsOn ? i : s(r.weekStartsOn);
    if (0 > u || u > 6)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    var l = c(e, n),
      p = s(t),
      d = l.getUTCDay(),
      h = (u > (p % 7 + 7) % 7 ? 7 : 0) + p - d;
    return l.setUTCDate(l.getUTCDate() + h), l;
  }
  function pe(e, t, n) {
    var r = t.match(e);
    if (!r) return null;
    var a = parseInt(r[0], 10);
    return { value: n ? n(a) : a, rest: t.slice(r[0].length) };
  }
  function de(e, t) {
    var n = t.match(e);
    if (!n) return null;
    if ("Z" === n[0]) return { value: 0, rest: t.slice(1) };
    return {
      value:
        ("+" === n[1] ? 1 : -1) *
        ((n[2] ? parseInt(n[2], 10) : 0) * ht +
          (n[3] ? parseInt(n[3], 10) : 0) * ft +
          (n[5] ? parseInt(n[5], 10) : 0) * mt),
      rest: t.slice(n[0].length)
    };
  }
  function he(e, t) {
    return pe(gt.anyDigitsSigned, e, t);
  }
  function fe(e, t, n) {
    switch (e) {
      case 1:
        return pe(gt.singleDigit, t, n);
      case 2:
        return pe(gt.twoDigits, t, n);
      case 3:
        return pe(gt.threeDigits, t, n);
      case 4:
        return pe(gt.fourDigits, t, n);
      default:
        return pe(RegExp("^\\d{1," + e + "}"), t, n);
    }
  }
  function me(e, t, n) {
    switch (e) {
      case 1:
        return pe(gt.singleDigitSigned, t, n);
      case 2:
        return pe(gt.twoDigitsSigned, t, n);
      case 3:
        return pe(gt.threeDigitsSigned, t, n);
      case 4:
        return pe(gt.fourDigitsSigned, t, n);
      default:
        return pe(RegExp("^-?\\d{1," + e + "}"), t, n);
    }
  }
  function ge(e) {
    switch (e) {
      case "morning":
        return 4;
      case "evening":
        return 17;
      case "pm":
      case "noon":
      case "afternoon":
        return 12;
      case "am":
      case "midnight":
      case "night":
      default:
        return 0;
    }
  }
  function we(e, t) {
    var n,
      r = t > 0,
      a = r ? t : 1 - t;
    if (50 < a) {
      var o = a + 50;
      n = e + 100 * Math.floor(o / 100) - (e >= o % 100 ? 100 : 0);
    } else n = e || 100;
    return r ? n : 1 - n;
  }
  function ye(e) {
    return e % 400 == 0 || (e % 4 == 0 && e % 100 != 0);
  }
  function De(e, t, n, r) {
    if (3 > arguments.length)
      throw new TypeError(
        "3 arguments required, but only " + arguments.length + " present"
      );
    var a = e + "",
      o = t + "",
      i = r || {},
      l = i.locale || $e;
    if (!l.match) throw new RangeError("locale must contain match property");
    var p = l.options && l.options.firstWeekContainsDate,
      d = null == p ? 1 : s(p),
      h = null == i.firstWeekContainsDate ? d : s(i.firstWeekContainsDate);
    if (1 > h || h > 7)
      throw new RangeError(
        "firstWeekContainsDate must be between 1 and 7 inclusively"
      );
    var f = l.options && l.options.weekStartsOn,
      m = null == f ? 0 : s(f),
      g = null == i.weekStartsOn ? m : s(i.weekStartsOn);
    if (0 > g || g > 6)
      throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
    if ("" === o) return "" === a ? c(n, i) : new Date(NaN);
    var w,
      y = { firstWeekContainsDate: h, weekStartsOn: g, locale: l },
      D = [
        {
          priority: bt,
          set: function(e) {
            var t = new Date(0);
            return (
              t.setFullYear(
                e.getUTCFullYear(),
                e.getUTCMonth(),
                e.getUTCDate()
              ),
              t.setHours(
                e.getUTCHours(),
                e.getUTCMinutes(),
                e.getUTCSeconds(),
                e.getUTCMilliseconds()
              ),
              t
            );
          },
          index: 0
        }
      ],
      v = o.match(Ct);
    for (w = 0; v.length > w; w++) {
      var b = v[w];
      !i.awareOfUnicodeTokens && P(b) && U(b);
      var C = b[0],
        k = vt[C];
      if (k) {
        var T = k.parse(a, b, l.match, y);
        if (!T) return new Date(NaN);
        D.push({
          priority: k.priority,
          set: k.set,
          validate: k.validate,
          value: T.value,
          index: D.length
        }),
          (a = T.rest);
      } else {
        if (
          ("''" === b
            ? (b = "'")
            : "'" === C &&
              (b = (function(e) {
                return e.match(kt)[1].replace(Tt, "'");
              })(b)),
          0 !== a.indexOf(b))
        )
          return new Date(NaN);
        a = a.slice(b.length);
      }
    }
    if (a.length > 0 && Mt.test(a)) return new Date(NaN);
    var M = D.map(function(e) {
        return e.priority;
      })
        .sort(function(e, t) {
          return t - e;
        })
        .filter(function(e, t, n) {
          return n.indexOf(e) === t;
        })
        .map(function(e) {
          return D.filter(function(t) {
            return t.priority === e;
          }).reverse();
        })
        .map(function(e) {
          return e[0];
        }),
      S = c(n, i);
    if (isNaN(S)) return new Date(NaN);
    var x = q(S, u(S));
    for (w = 0; M.length > w; w++) {
      var N = M[w];
      if (N.validate && !N.validate(x, N.value, y)) return new Date(NaN);
      x = N.set(x, N.value, y);
    }
    return x;
  }
  function ve(e) {
    var t = e ? c(e) : new Date();
    return Ce(t) ? t : null;
  }
  function be(e, t, n) {
    var r = null,
      a = Ye(n);
    return Array.isArray(t)
      ? (t.forEach(function(t) {
          var n = De(e, t, new Date(), a);
          Ce(n) && (r = n);
        }),
        r)
      : ((r = De(e, t, new Date(), a)),
        Ce(r) || (r = new Date(e)),
        Ce(r) ? r : null);
  }
  function Ce(e) {
    return g(e) && se(e, new Date("1/1/1000"));
  }
  function ke(e, t, n) {
    if ("en" === n) return F(e, t, { awareOfUnicodeTokens: !0 });
    var r = Ye(n);
    return (
      n &&
        !r &&
        console.warn(
          'A locale object was not found for the provided string ["' + n + '"].'
        ),
      !r && _e() && Ye(_e()) && (r = Ye(_e())),
      F(e, t, { locale: r || null, awareOfUnicodeTokens: !0 })
    );
  }
  function Te(e, t) {
    var n = t.hour,
      r = void 0 === n ? 0 : n,
      a = t.minute,
      o = void 0 === a ? 0 : a,
      i = t.second;
    return Z(
      K(
        (function(e, t, n) {
          if (2 > arguments.length)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = c(e, n),
            a = s(t);
          return r.setSeconds(a), r;
        })(e, void 0 === i ? 0 : i),
        o
      ),
      r
    );
  }
  function Me(e, t) {
    return oe(e, { locale: Ye(t ? t : _e()) });
  }
  function Se(e) {
    return (function(e, t) {
      if (1 > arguments.length)
        throw new TypeError(
          "1 argument required, but only " + arguments.length + " present"
        );
      var n = c(e, t);
      return n.setDate(1), n.setHours(0, 0, 0, 0), n;
    })(e);
  }
  function xe(e, t) {
    return e && t
      ? (function(e, t, n) {
          if (2 > arguments.length)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = c(e, n),
            a = c(t, n);
          return r.getFullYear() === a.getFullYear();
        })(e, t)
      : !e && !t;
  }
  function Ne(e, t) {
    return e && t
      ? (function(e, t, n) {
          if (2 > arguments.length)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = c(e, n),
            a = c(t, n);
          return (
            r.getFullYear() === a.getFullYear() && r.getMonth() === a.getMonth()
          );
        })(e, t)
      : !e && !t;
  }
  function Ee(e, t) {
    return e && t
      ? (function(e, t, n) {
          if (2 > arguments.length)
            throw new TypeError(
              "2 arguments required, but only " + arguments.length + " present"
            );
          var r = ne(e, n),
            a = ne(t, n);
          return r.getTime() === a.getTime();
        })(e, t)
      : !e && !t;
  }
  function Oe(e, t, n) {
    return ce(e, { start: t, end: n });
  }
  function _e() {
    return window.__localeId__;
  }
  function Ye(e) {
    return window.__localeData__ ? window.__localeData__[e] : null;
  }
  function qe(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.excludeDates,
      r = t.includeDates,
      a = t.filterDate;
    return (
      Pe(e, { minDate: t.minDate, maxDate: t.maxDate }) ||
      (n &&
        n.some(function(t) {
          return Ee(e, t);
        })) ||
      (r &&
        !r.some(function(t) {
          return Ee(e, t);
        })) ||
      (a && !a(ve(e))) ||
      !1
    );
  }
  function Pe(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.minDate,
      r = t.maxDate;
    return (n && 0 > re(e, n)) || (r && re(e, r) > 0);
  }
  function Ue(e, t) {
    for (var n = t.length, r = 0; n > r; r++)
      if (X(t[r]) === X(e) && Q(t[r]) === Q(e)) return !0;
    return !1;
  }
  function Fe(e, t) {
    var n = t.minTime,
      r = t.maxTime;
    if (!n || !r) throw Error("Both minTime and maxTime props required");
    var a = ve();
    return !ce(Z(K(a, Q(e)), X(e)), {
      start: Z(K(a, Q(n)), X(n)),
      end: Z(K(a, Q(r)), X(r))
    });
  }
  function We(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.minDate,
      r = t.includeDates,
      a = j(e, 1);
    return (
      (n && ae(n, a) > 0) ||
      (r &&
        r.every(function(e) {
          return ae(e, a) > 0;
        })) ||
      !1
    );
  }
  function He(e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
      n = t.maxDate,
      r = t.includeDates,
      a = R(e, 1);
    return (
      (n && ae(a, n) > 0) ||
      (r &&
        r.every(function(e) {
          return ae(a, e) > 0;
        })) ||
      !1
    );
  }
  function Ie(e) {
    var t = e.minDate,
      n = e.includeDates;
    if (n && t) {
      return ee(
        n.filter(function(e) {
          return re(e, t) >= 0;
        })
      );
    }
    return n ? ee(n) : t;
  }
  function Le(e) {
    var t = e.maxDate,
      n = e.includeDates;
    if (n && t) {
      return te(
        n.filter(function(e) {
          return 0 >= re(e, t);
        })
      );
    }
    return n ? te(n) : t;
  }
  function Re() {
    for (
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
        t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : "react-datepicker__day--highlighted",
        n = new Map(),
        r = 0,
        a = e.length;
      a > r;
      r++
    ) {
      var o = e[r];
      if (i(o)) {
        var s = ke(o, "MM.dd.yyyy"),
          u = n.get(s) || [];
        u.includes(t) || (u.push(t), n.set(s, u));
      } else if ("object" === (void 0 === o ? "undefined" : St(o))) {
        var c = Object.keys(o),
          l = c[0],
          p = o[c[0]];
        if ("string" == typeof l && p.constructor === Array)
          for (var d = 0, h = p.length; h > d; d++) {
            var f = ke(p[d], "MM.dd.yyyy"),
              m = n.get(f) || [];
            m.includes(l) || (m.push(l), n.set(f, m));
          }
      }
    }
    return n;
  }
  function Be(e) {
    var n = e.children,
      r = e.arrowProps;
    return t.createElement(
      "div",
      { className: e.className },
      t.createElement(
        "div",
        Et({ className: "react-datepicker__triangle" }, void 0 === r ? {} : r)
      ),
      n
    );
  }
  (t = t && t.hasOwnProperty("default") ? t.default : t),
    (n = n && n.hasOwnProperty("default") ? n.default : n),
    (r = r && r.hasOwnProperty("default") ? r.default : r),
    (a = a && a.hasOwnProperty("default") ? a.default : a);
  var je = 6e4,
    Qe = 36e5,
    Xe = 6e4,
    Ae = 2,
    ze = {
      dateTimeDelimeter: /[T ]/,
      plainTime: /:/,
      timeZoneDelimeter: /[Z ]/i,
      YY: /^(\d{2})$/,
      YYY: [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/],
      YYYY: /^(\d{4})/,
      YYYYY: [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/],
      MM: /^-(\d{2})$/,
      DDD: /^-?(\d{3})$/,
      MMDD: /^-?(\d{2})-?(\d{2})$/,
      Www: /^-?W(\d{2})$/,
      WwwD: /^-?W(\d{2})-?(\d{1})$/,
      HH: /^(\d{2}([.,]\d*)?)$/,
      HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
      HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
      timezone: /([Z+-].*)$/,
      timezoneZ: /^(Z)$/,
      timezoneHH: /^([+-])(\d{2})$/,
      timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
    },
    Ge = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Ve = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Ke = {
      lessThanXSeconds: {
        one: "less than a second",
        other: "less than {{count}} seconds"
      },
      xSeconds: { one: "1 second", other: "{{count}} seconds" },
      halfAMinute: "half a minute",
      lessThanXMinutes: {
        one: "less than a minute",
        other: "less than {{count}} minutes"
      },
      xMinutes: { one: "1 minute", other: "{{count}} minutes" },
      aboutXHours: { one: "about 1 hour", other: "about {{count}} hours" },
      xHours: { one: "1 hour", other: "{{count}} hours" },
      xDays: { one: "1 day", other: "{{count}} days" },
      aboutXMonths: { one: "about 1 month", other: "about {{count}} months" },
      xMonths: { one: "1 month", other: "{{count}} months" },
      aboutXYears: { one: "about 1 year", other: "about {{count}} years" },
      xYears: { one: "1 year", other: "{{count}} years" },
      overXYears: { one: "over 1 year", other: "over {{count}} years" },
      almostXYears: { one: "almost 1 year", other: "almost {{count}} years" }
    },
    Ze = {
      lastWeek: "'last' eeee 'at' p",
      yesterday: "'yesterday at' p",
      today: "'today at' p",
      tomorrow: "'tomorrow at' p",
      nextWeek: "eeee 'at' p",
      other: "P"
    },
    $e = {
      formatDistance: function(e, t, n) {
        n = n || {};
        var r;
        return (
          (r =
            "string" == typeof Ke[e]
              ? Ke[e]
              : 1 === t ? Ke[e].one : Ke[e].other.replace("{{count}}", t)),
          n.addSuffix ? (n.comparison > 0 ? "in " + r : r + " ago") : r
        );
      },
      formatLong: {
        date: w({
          formats: {
            full: "EEEE, MMMM do, y",
            long: "MMMM do, y",
            medium: "MMM d, y",
            short: "MM/dd/yyyy"
          },
          defaultWidth: "full"
        }),
        time: w({
          formats: {
            full: "h:mm:ss a zzzz",
            long: "h:mm:ss a z",
            medium: "h:mm:ss a",
            short: "h:mm a"
          },
          defaultWidth: "full"
        }),
        dateTime: w({
          formats: {
            full: "{{date}} 'at' {{time}}",
            long: "{{date}} 'at' {{time}}",
            medium: "{{date}}, {{time}}",
            short: "{{date}}, {{time}}"
          },
          defaultWidth: "full"
        })
      },
      formatRelative: function(e, t, n, r) {
        return Ze[e];
      },
      localize: {
        ordinalNumber: function(e, t) {
          var n = +e,
            r = n % 100;
          if (r > 20 || 10 > r)
            switch (r % 10) {
              case 1:
                return n + "st";
              case 2:
                return n + "nd";
              case 3:
                return n + "rd";
            }
          return n + "th";
        },
        era: y({
          values: {
            narrow: ["B", "A"],
            abbreviated: ["BC", "AD"],
            wide: ["Before Christ", "Anno Domini"]
          },
          defaultWidth: "wide"
        }),
        quarter: y({
          values: {
            narrow: ["1", "2", "3", "4"],
            abbreviated: ["Q1", "Q2", "Q3", "Q4"],
            wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
          },
          defaultWidth: "wide",
          argumentCallback: function(e) {
            return +e - 1;
          }
        }),
        month: y({
          values: {
            narrow: [
              "J",
              "F",
              "M",
              "A",
              "M",
              "J",
              "J",
              "A",
              "S",
              "O",
              "N",
              "D"
            ],
            abbreviated: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            wide: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December"
            ]
          },
          defaultWidth: "wide"
        }),
        day: y({
          values: {
            narrow: ["S", "M", "T", "W", "T", "F", "S"],
            short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            wide: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday"
            ]
          },
          defaultWidth: "wide"
        }),
        dayPeriod: y({
          values: {
            narrow: {
              am: "a",
              pm: "p",
              midnight: "mi",
              noon: "n",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            },
            abbreviated: {
              am: "AM",
              pm: "PM",
              midnight: "midnight",
              noon: "noon",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            },
            wide: {
              am: "a.m.",
              pm: "p.m.",
              midnight: "midnight",
              noon: "noon",
              morning: "morning",
              afternoon: "afternoon",
              evening: "evening",
              night: "night"
            }
          },
          defaultWidth: "wide",
          formattingValues: {
            narrow: {
              am: "a",
              pm: "p",
              midnight: "mi",
              noon: "n",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            },
            abbreviated: {
              am: "AM",
              pm: "PM",
              midnight: "midnight",
              noon: "noon",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            },
            wide: {
              am: "a.m.",
              pm: "p.m.",
              midnight: "midnight",
              noon: "noon",
              morning: "in the morning",
              afternoon: "in the afternoon",
              evening: "in the evening",
              night: "at night"
            }
          },
          defaulFormattingWidth: "wide"
        })
      },
      match: {
        ordinalNumber: (function(e) {
          return function(t, n) {
            var r = t + "",
              a = n || {},
              o = r.match(e.matchPattern);
            if (!o) return null;
            var i = o[0],
              s = r.match(e.parsePattern);
            if (!s) return null;
            var u = e.valueCallback ? e.valueCallback(s[0]) : s[0];
            return (
              (u = a.valueCallback ? a.valueCallback(u) : u),
              { value: u, rest: r.slice(i.length) }
            );
          };
        })({
          matchPattern: /^(\d+)(th|st|nd|rd)?/i,
          parsePattern: /\d+/i,
          valueCallback: function(e) {
            return parseInt(e, 10);
          }
        }),
        era: D({
          matchPatterns: {
            narrow: /^(b|a)/i,
            abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
            wide: /^(before christ|before common era|anno domini|common era)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/^b/i, /^(a|c)/i] },
          defaultParseWidth: "any"
        }),
        quarter: D({
          matchPatterns: {
            narrow: /^[1234]/i,
            abbreviated: /^q[1234]/i,
            wide: /^[1234](th|st|nd|rd)? quarter/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: { any: [/1/i, /2/i, /3/i, /4/i] },
          defaultParseWidth: "any",
          valueCallback: function(e) {
            return e + 1;
          }
        }),
        month: D({
          matchPatterns: {
            narrow: /^[jfmasond]/i,
            abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
            wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            narrow: [
              /^j/i,
              /^f/i,
              /^m/i,
              /^a/i,
              /^m/i,
              /^j/i,
              /^j/i,
              /^a/i,
              /^s/i,
              /^o/i,
              /^n/i,
              /^d/i
            ],
            any: [
              /^ja/i,
              /^f/i,
              /^mar/i,
              /^ap/i,
              /^may/i,
              /^jun/i,
              /^jul/i,
              /^au/i,
              /^s/i,
              /^o/i,
              /^n/i,
              /^d/i
            ]
          },
          defaultParseWidth: "any"
        }),
        day: D({
          matchPatterns: {
            narrow: /^[smtwf]/i,
            short: /^(su|mo|tu|we|th|fr|sa)/i,
            abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
            wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
          },
          defaultMatchWidth: "wide",
          parsePatterns: {
            narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
            any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
          },
          defaultParseWidth: "any"
        }),
        dayPeriod: D({
          matchPatterns: {
            narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
            any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
          },
          defaultMatchWidth: "any",
          parsePatterns: {
            any: {
              am: /^a/i,
              pm: /^p/i,
              midnight: /^mi/i,
              noon: /^no/i,
              morning: /morning/i,
              afternoon: /afternoon/i,
              evening: /evening/i,
              night: /night/i
            }
          },
          defaultParseWidth: "any"
        })
      },
      options: { weekStartsOn: 0, firstWeekContainsDate: 1 }
    },
    Je = 864e5,
    et = 6048e5,
    tt = 6048e5,
    nt = {
      G: function(e, t, n) {
        var r = e.getUTCFullYear() > 0 ? 1 : 0;
        switch (t) {
          case "G":
          case "GG":
          case "GGG":
            return n.era(r, { width: "abbreviated" });
          case "GGGGG":
            return n.era(r, { width: "narrow" });
          case "GGGG":
          default:
            return n.era(r, { width: "wide" });
        }
      },
      y: function(e, t, n, r) {
        var a = e.getUTCFullYear(),
          o = a > 0 ? a : 1 - a;
        if ("yy" === t) {
          return S(o % 100, 2);
        }
        return "yo" === t
          ? n.ordinalNumber(o, { unit: "year" })
          : S(o, t.length);
      },
      Y: function(e, t, n, r) {
        var a = T(e, r),
          o = a > 0 ? a : 1 - a;
        if ("YY" === t) {
          return S(o % 100, 2);
        }
        return "Yo" === t
          ? n.ordinalNumber(o, { unit: "year" })
          : S(o, t.length);
      },
      R: function(e, t, n, r) {
        return S(b(e, r), t.length);
      },
      u: function(e, t, n, r) {
        return S(e.getUTCFullYear(), t.length);
      },
      Q: function(e, t, n, r) {
        var a = Math.ceil((e.getUTCMonth() + 1) / 3);
        switch (t) {
          case "Q":
            return a + "";
          case "QQ":
            return S(a, 2);
          case "Qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "QQQ":
            return n.quarter(a, {
              width: "abbreviated",
              context: "formatting"
            });
          case "QQQQQ":
            return n.quarter(a, { width: "narrow", context: "formatting" });
          case "QQQQ":
          default:
            return n.quarter(a, { width: "wide", context: "formatting" });
        }
      },
      q: function(e, t, n, r) {
        var a = Math.ceil((e.getUTCMonth() + 1) / 3);
        switch (t) {
          case "q":
            return a + "";
          case "qq":
            return S(a, 2);
          case "qo":
            return n.ordinalNumber(a, { unit: "quarter" });
          case "qqq":
            return n.quarter(a, {
              width: "abbreviated",
              context: "standalone"
            });
          case "qqqqq":
            return n.quarter(a, { width: "narrow", context: "standalone" });
          case "qqqq":
          default:
            return n.quarter(a, { width: "wide", context: "standalone" });
        }
      },
      M: function(e, t, n, r) {
        var a = e.getUTCMonth();
        switch (t) {
          case "M":
            return a + 1 + "";
          case "MM":
            return S(a + 1, 2);
          case "Mo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "MMM":
            return n.month(a, { width: "abbreviated", context: "formatting" });
          case "MMMMM":
            return n.month(a, { width: "narrow", context: "formatting" });
          case "MMMM":
          default:
            return n.month(a, { width: "wide", context: "formatting" });
        }
      },
      L: function(e, t, n, r) {
        var a = e.getUTCMonth();
        switch (t) {
          case "L":
            return a + 1 + "";
          case "LL":
            return S(a + 1, 2);
          case "Lo":
            return n.ordinalNumber(a + 1, { unit: "month" });
          case "LLL":
            return n.month(a, { width: "abbreviated", context: "standalone" });
          case "LLLLL":
            return n.month(a, { width: "narrow", context: "standalone" });
          case "LLLL":
          default:
            return n.month(a, { width: "wide", context: "standalone" });
        }
      },
      w: function(e, t, n, r) {
        var a = M(e, r);
        return "wo" === t
          ? n.ordinalNumber(a, { unit: "week" })
          : S(a, t.length);
      },
      I: function(e, t, n, r) {
        var a = C(e, r);
        return "Io" === t
          ? n.ordinalNumber(a, { unit: "week" })
          : S(a, t.length);
      },
      d: function(e, t, n, r) {
        var a = e.getUTCDate();
        return "do" === t
          ? n.ordinalNumber(a, { unit: "date" })
          : S(a, t.length);
      },
      D: function(e, t, n, r) {
        var a = (function(e, t) {
          if (1 > arguments.length)
            throw new TypeError(
              "1 argument required, but only " + arguments.length + " present"
            );
          var n = c(e, t),
            r = n.getTime();
          n.setUTCMonth(0, 1), n.setUTCHours(0, 0, 0, 0);
          var a = n.getTime();
          return Math.floor((r - a) / Je) + 1;
        })(e, r);
        return "Do" === t
          ? n.ordinalNumber(a, { unit: "dayOfYear" })
          : S(a, t.length);
      },
      E: function(e, t, n, r) {
        var a = e.getUTCDay();
        switch (t) {
          case "E":
          case "EE":
          case "EEE":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "EEEEE":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "EEEEEE":
            return n.day(a, { width: "short", context: "formatting" });
          case "EEEE":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      e: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "e":
            return o + "";
          case "ee":
            return S(o, 2);
          case "eo":
            return n.ordinalNumber(o, { unit: "day" });
          case "eee":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "eeeee":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "eeeeee":
            return n.day(a, { width: "short", context: "formatting" });
          case "eeee":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      c: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = (a - r.weekStartsOn + 8) % 7 || 7;
        switch (t) {
          case "c":
            return o + "";
          case "cc":
            return S(o, t.length);
          case "co":
            return n.ordinalNumber(o, { unit: "day" });
          case "ccc":
            return n.day(a, { width: "abbreviated", context: "standalone" });
          case "ccccc":
            return n.day(a, { width: "narrow", context: "standalone" });
          case "cccccc":
            return n.day(a, { width: "short", context: "standalone" });
          case "cccc":
          default:
            return n.day(a, { width: "wide", context: "standalone" });
        }
      },
      i: function(e, t, n, r) {
        var a = e.getUTCDay(),
          o = 0 === a ? 7 : a;
        switch (t) {
          case "i":
            return o + "";
          case "ii":
            return S(o, t.length);
          case "io":
            return n.ordinalNumber(o, { unit: "day" });
          case "iii":
            return n.day(a, { width: "abbreviated", context: "formatting" });
          case "iiiii":
            return n.day(a, { width: "narrow", context: "formatting" });
          case "iiiiii":
            return n.day(a, { width: "short", context: "formatting" });
          case "iiii":
          default:
            return n.day(a, { width: "wide", context: "formatting" });
        }
      },
      a: function(e, t, n) {
        var r = 1 > e.getUTCHours() / 12 ? "am" : "pm";
        switch (t) {
          case "a":
          case "aa":
          case "aaa":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "aaaaa":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "aaaa":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      b: function(e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (((r =
          12 === a ? "noon" : 0 === a ? "midnight" : 1 > a / 12 ? "am" : "pm"),
        t)) {
          case "b":
          case "bb":
          case "bbb":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "bbbbb":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "bbbb":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      B: function(e, t, n) {
        var r,
          a = e.getUTCHours();
        switch (((r =
          17 > a
            ? 12 > a ? (4 > a ? "night" : "morning") : "afternoon"
            : "evening"),
        t)) {
          case "B":
          case "BB":
          case "BBB":
            return n.dayPeriod(r, {
              width: "abbreviated",
              context: "formatting"
            });
          case "BBBBB":
            return n.dayPeriod(r, { width: "narrow", context: "formatting" });
          case "BBBB":
          default:
            return n.dayPeriod(r, { width: "wide", context: "formatting" });
        }
      },
      h: function(e, t, n, r) {
        var a = e.getUTCHours() % 12;
        return (
          0 === a && (a = 12),
          "ho" === t ? n.ordinalNumber(a, { unit: "hour" }) : S(a, t.length)
        );
      },
      H: function(e, t, n, r) {
        var a = e.getUTCHours();
        return "Ho" === t
          ? n.ordinalNumber(a, { unit: "hour" })
          : S(a, t.length);
      },
      K: function(e, t, n, r) {
        var a = e.getUTCHours() % 12;
        return "Ko" === t
          ? n.ordinalNumber(a, { unit: "hour" })
          : S(a, t.length);
      },
      k: function(e, t, n, r) {
        var a = e.getUTCHours();
        return (
          0 === a && (a = 24),
          "ko" === t ? n.ordinalNumber(a, { unit: "hour" }) : S(a, t.length)
        );
      },
      m: function(e, t, n, r) {
        var a = e.getUTCMinutes();
        return "mo" === t
          ? n.ordinalNumber(a, { unit: "minute" })
          : S(a, t.length);
      },
      s: function(e, t, n, r) {
        var a = e.getUTCSeconds();
        return "so" === t
          ? n.ordinalNumber(a, { unit: "second" })
          : S(a, t.length);
      },
      S: function(e, t, n, r) {
        var a = t.length,
          o = e.getUTCMilliseconds();
        return S(Math.floor(o * Math.pow(10, a - 3)), a);
      },
      X: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        if (0 === a) return "Z";
        switch (t) {
          case "X":
            return N(a);
          case "XXXX":
          case "XX":
            return x(a);
          case "XXXXX":
          case "XXX":
          default:
            return x(a, ":");
        }
      },
      x: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "x":
            return N(a);
          case "xxxx":
          case "xx":
            return x(a);
          case "xxxxx":
          case "xxx":
          default:
            return x(a, ":");
        }
      },
      O: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "O":
          case "OO":
          case "OOO":
            return "GMT" + E(a, ":");
          case "OOOO":
          default:
            return "GMT" + x(a, ":");
        }
      },
      z: function(e, t, n, r) {
        var a = (r._originalDate || e).getTimezoneOffset();
        switch (t) {
          case "z":
          case "zz":
          case "zzz":
            return "GMT" + E(a, ":");
          case "zzzz":
          default:
            return "GMT" + x(a, ":");
        }
      },
      t: function(e, t, n, r) {
        return S(Math.floor((r._originalDate || e).getTime() / 1e3), t.length);
      },
      T: function(e, t, n, r) {
        return S((r._originalDate || e).getTime(), t.length);
      }
    },
    rt = {
      p: _,
      P: function(e, t, n) {
        var r = e.match(/(P+)(p+)?/),
          a = r[1],
          o = r[2];
        if (!o) return O(e, t);
        var i;
        switch (a) {
          case "P":
            i = t.dateTime({ width: "short" });
            break;
          case "PP":
            i = t.dateTime({ width: "medium" });
            break;
          case "PPP":
            i = t.dateTime({ width: "long" });
            break;
          case "PPPP":
          default:
            i = t.dateTime({ width: "full" });
        }
        return i.replace("{{date}}", O(a, t)).replace("{{time}}", _(o, t));
      }
    },
    at = ["D", "DD", "YY", "YYYY"],
    ot = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    it = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,
    st = /^'(.*?)'?$/,
    ut = /''/g,
    ct = 6e4,
    lt = 36e5,
    pt = 864e5,
    dt = 6048e5,
    ht = 36e5,
    ft = 6e4,
    mt = 1e3,
    gt = {
      month: /^(1[0-2]|0?\d)/,
      date: /^(3[0-1]|[0-2]?\d)/,
      dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
      week: /^(5[0-3]|[0-4]?\d)/,
      hour23h: /^(2[0-3]|[0-1]?\d)/,
      hour24h: /^(2[0-4]|[0-1]?\d)/,
      hour11h: /^(1[0-1]|0?\d)/,
      hour12h: /^(1[0-2]|0?\d)/,
      minute: /^[0-5]?\d/,
      second: /^[0-5]?\d/,
      singleDigit: /^\d/,
      twoDigits: /^\d{1,2}/,
      threeDigits: /^\d{1,3}/,
      fourDigits: /^\d{1,4}/,
      anyDigitsSigned: /^-?\d+/,
      singleDigitSigned: /^-?\d/,
      twoDigitsSigned: /^-?\d{1,2}/,
      threeDigitsSigned: /^-?\d{1,3}/,
      fourDigitsSigned: /^-?\d{1,4}/
    },
    wt = {
      basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
      basic: /^([+-])(\d{2})(\d{2})|Z/,
      basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
      extended: /^([+-])(\d{2}):(\d{2})|Z/,
      extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
    },
    yt = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    Dt = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    vt = {
      G: {
        priority: 140,
        parse: function(e, t, n, r) {
          switch (t) {
            case "G":
            case "GG":
            case "GGG":
              return (
                n.era(e, { width: "abbreviated" }) ||
                n.era(e, { width: "narrow" })
              );
            case "GGGGG":
              return n.era(e, { width: "narrow" });
            case "GGGG":
            default:
              return (
                n.era(e, { width: "wide" }) ||
                n.era(e, { width: "abbreviated" }) ||
                n.era(e, { width: "narrow" })
              );
          }
        },
        set: function(e, t, n) {
          return (
            e.setUTCFullYear(1 === t ? 10 : -9, 0, 1),
            e.setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      y: {
        priority: 130,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return { year: e, isTwoDigitYear: "yy" === t };
          };
          switch (t) {
            case "y":
              return fe(4, e, a);
            case "yo":
              return n.ordinalNumber(e, { unit: "year", valueCallback: a });
            default:
              return fe(t.length, e, a);
          }
        },
        validate: function(e, t, n) {
          return t.isTwoDigitYear || t.year > 0;
        },
        set: function(e, t, n) {
          var r = T(e, n);
          if (t.isTwoDigitYear) {
            var a = we(t.year, r);
            return e.setUTCFullYear(a, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
          }
          return (
            e.setUTCFullYear(r > 0 ? t.year : 1 - t.year, 0, 1),
            e.setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      Y: {
        priority: 130,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return { year: e, isTwoDigitYear: "YY" === t };
          };
          switch (t) {
            case "Y":
              return fe(4, e, a);
            case "Yo":
              return n.ordinalNumber(e, { unit: "year", valueCallback: a });
            default:
              return fe(t.length, e, a);
          }
        },
        validate: function(e, t, n) {
          return t.isTwoDigitYear || t.year > 0;
        },
        set: function(e, t, n) {
          var r = e.getUTCFullYear();
          if (t.isTwoDigitYear) {
            var a = we(t.year, r);
            return (
              e.setUTCFullYear(a, 0, n.firstWeekContainsDate),
              e.setUTCHours(0, 0, 0, 0),
              k(e, n)
            );
          }
          return (
            e.setUTCFullYear(
              r > 0 ? t.year : 1 - t.year,
              0,
              n.firstWeekContainsDate
            ),
            e.setUTCHours(0, 0, 0, 0),
            k(e, n)
          );
        }
      },
      R: {
        priority: 130,
        parse: function(e, t, n, r) {
          return "R" === t ? me(4, e) : me(t.length, e);
        },
        set: function(e, t, n) {
          var r = new Date(0);
          return r.setUTCFullYear(t, 0, 4), r.setUTCHours(0, 0, 0, 0), v(r);
        }
      },
      u: {
        priority: 130,
        parse: function(e, t, n, r) {
          return "u" === t ? me(4, e) : me(t.length, e);
        },
        set: function(e, t, n) {
          return e.setUTCFullYear(t, 0, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      Q: {
        priority: 120,
        parse: function(e, t, n, r) {
          switch (t) {
            case "Q":
            case "QQ":
              return fe(t.length, e);
            case "Qo":
              return n.ordinalNumber(e, { unit: "quarter" });
            case "QQQ":
              return (
                n.quarter(e, { width: "abbreviated", context: "formatting" }) ||
                n.quarter(e, { width: "narrow", context: "formatting" })
              );
            case "QQQQQ":
              return n.quarter(e, { width: "narrow", context: "formatting" });
            case "QQQQ":
            default:
              return (
                n.quarter(e, { width: "wide", context: "formatting" }) ||
                n.quarter(e, { width: "abbreviated", context: "formatting" }) ||
                n.quarter(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 1 && 4 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(3 * (t - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      q: {
        priority: 120,
        parse: function(e, t, n, r) {
          switch (t) {
            case "q":
            case "qq":
              return fe(t.length, e);
            case "qo":
              return n.ordinalNumber(e, { unit: "quarter" });
            case "qqq":
              return (
                n.quarter(e, { width: "abbreviated", context: "standalone" }) ||
                n.quarter(e, { width: "narrow", context: "standalone" })
              );
            case "qqqqq":
              return n.quarter(e, { width: "narrow", context: "standalone" });
            case "qqqq":
            default:
              return (
                n.quarter(e, { width: "wide", context: "standalone" }) ||
                n.quarter(e, { width: "abbreviated", context: "standalone" }) ||
                n.quarter(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 1 && 4 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(3 * (t - 1), 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      M: {
        priority: 110,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return e - 1;
          };
          switch (t) {
            case "M":
              return pe(gt.month, e, a);
            case "MM":
              return fe(2, e, a);
            case "Mo":
              return n.ordinalNumber(e, { unit: "month", valueCallback: a });
            case "MMM":
              return (
                n.month(e, { width: "abbreviated", context: "formatting" }) ||
                n.month(e, { width: "narrow", context: "formatting" })
              );
            case "MMMMM":
              return n.month(e, { width: "narrow", context: "formatting" });
            case "MMMM":
            default:
              return (
                n.month(e, { width: "wide", context: "formatting" }) ||
                n.month(e, { width: "abbreviated", context: "formatting" }) ||
                n.month(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 11 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(t, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      L: {
        priority: 110,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return e - 1;
          };
          switch (t) {
            case "L":
              return pe(gt.month, e, a);
            case "LL":
              return fe(2, e, a);
            case "Lo":
              return n.ordinalNumber(e, { unit: "month", valueCallback: a });
            case "LLL":
              return (
                n.month(e, { width: "abbreviated", context: "standalone" }) ||
                n.month(e, { width: "narrow", context: "standalone" })
              );
            case "LLLLL":
              return n.month(e, { width: "narrow", context: "standalone" });
            case "LLLL":
            default:
              return (
                n.month(e, { width: "wide", context: "standalone" }) ||
                n.month(e, { width: "abbreviated", context: "standalone" }) ||
                n.month(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 11 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(t, 1), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      w: {
        priority: 100,
        parse: function(e, t, n, r) {
          switch (t) {
            case "w":
              return pe(gt.week, e);
            case "wo":
              return n.ordinalNumber(e, { unit: "week" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 1 && 53 >= t;
        },
        set: function(e, t, n) {
          return k(
            (function(e, t, n) {
              if (2 > arguments.length)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var r = c(e, n),
                a = s(t),
                o = M(r, n) - a;
              return r.setUTCDate(r.getUTCDate() - 7 * o), r;
            })(e, t, n),
            n
          );
        }
      },
      I: {
        priority: 100,
        parse: function(e, t, n, r) {
          switch (t) {
            case "I":
              return pe(gt.week, e);
            case "Io":
              return n.ordinalNumber(e, { unit: "week" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 1 && 53 >= t;
        },
        set: function(e, t, n) {
          return v(
            (function(e, t, n) {
              if (2 > arguments.length)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var r = c(e, n),
                a = s(t),
                o = C(r, n) - a;
              return r.setUTCDate(r.getUTCDate() - 7 * o), r;
            })(e, t, n),
            n
          );
        }
      },
      d: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "d":
              return pe(gt.date, e);
            case "do":
              return n.ordinalNumber(e, { unit: "date" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          var r = ye(e.getUTCFullYear()),
            a = e.getUTCMonth();
          return r ? t >= 1 && Dt[a] >= t : t >= 1 && yt[a] >= t;
        },
        set: function(e, t, n) {
          return e.setUTCDate(t), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      D: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "D":
            case "DD":
              return pe(gt.dayOfYear, e);
            case "Do":
              return n.ordinalNumber(e, { unit: "date" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return ye(e.getUTCFullYear())
            ? t >= 1 && 366 >= t
            : t >= 1 && 365 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCMonth(0, t), e.setUTCHours(0, 0, 0, 0), e;
        }
      },
      E: {
        priority: 90,
        parse: function(e, t, n, r) {
          switch (t) {
            case "E":
            case "EE":
            case "EEE":
              return (
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "EEEEE":
              return n.day(e, { width: "narrow", context: "formatting" });
            case "EEEEEE":
              return (
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "EEEE":
            default:
              return (
                n.day(e, { width: "wide", context: "formatting" }) ||
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 6 >= t;
        },
        set: function(e, t, n) {
          return (e = le(e, t, n)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      e: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            var t = 7 * Math.floor((e - 1) / 7);
            return (e + r.weekStartsOn + 6) % 7 + t;
          };
          switch (t) {
            case "e":
            case "ee":
              return fe(t.length, e, a);
            case "eo":
              return n.ordinalNumber(e, { unit: "day", valueCallback: a });
            case "eee":
              return (
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "eeeee":
              return n.day(e, { width: "narrow", context: "formatting" });
            case "eeeeee":
              return (
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
            case "eeee":
            default:
              return (
                n.day(e, { width: "wide", context: "formatting" }) ||
                n.day(e, { width: "abbreviated", context: "formatting" }) ||
                n.day(e, { width: "short", context: "formatting" }) ||
                n.day(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 6 >= t;
        },
        set: function(e, t, n) {
          return (e = le(e, t, n)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      c: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            var t = 7 * Math.floor((e - 1) / 7);
            return (e + r.weekStartsOn + 6) % 7 + t;
          };
          switch (t) {
            case "c":
            case "cc":
              return fe(t.length, e, a);
            case "co":
              return n.ordinalNumber(e, { unit: "day", valueCallback: a });
            case "ccc":
              return (
                n.day(e, { width: "abbreviated", context: "standalone" }) ||
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
            case "ccccc":
              return n.day(e, { width: "narrow", context: "standalone" });
            case "cccccc":
              return (
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
            case "cccc":
            default:
              return (
                n.day(e, { width: "wide", context: "standalone" }) ||
                n.day(e, { width: "abbreviated", context: "standalone" }) ||
                n.day(e, { width: "short", context: "standalone" }) ||
                n.day(e, { width: "narrow", context: "standalone" })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 6 >= t;
        },
        set: function(e, t, n) {
          return (e = le(e, t, n)).setUTCHours(0, 0, 0, 0), e;
        }
      },
      i: {
        priority: 90,
        parse: function(e, t, n, r) {
          var a = function(e) {
            return 0 === e ? 7 : e;
          };
          switch (t) {
            case "i":
            case "ii":
              return fe(t.length, e);
            case "io":
              return n.ordinalNumber(e, { unit: "day" });
            case "iii":
              return (
                n.day(e, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
            case "iiiii":
              return n.day(e, {
                width: "narrow",
                context: "formatting",
                valueCallback: a
              });
            case "iiiiii":
              return (
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
            case "iiii":
            default:
              return (
                n.day(e, {
                  width: "wide",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "abbreviated",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "short",
                  context: "formatting",
                  valueCallback: a
                }) ||
                n.day(e, {
                  width: "narrow",
                  context: "formatting",
                  valueCallback: a
                })
              );
          }
        },
        validate: function(e, t, n) {
          return t >= 1 && 7 >= t;
        },
        set: function(e, t, n) {
          return (
            (e = (function(e, t, n) {
              if (2 > arguments.length)
                throw new TypeError(
                  "2 arguments required, but only " +
                    arguments.length +
                    " present"
                );
              var r = s(t);
              r % 7 == 0 && (r -= 7);
              var a = c(e, n),
                o = a.getUTCDay(),
                i = (1 > (r % 7 + 7) % 7 ? 7 : 0) + r - o;
              return a.setUTCDate(a.getUTCDate() + i), a;
            })(e, t, n)).setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      a: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "a":
            case "aa":
            case "aaa":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "aaaaa":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "aaaa":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n) {
          return e.setUTCHours(ge(t), 0, 0, 0), e;
        }
      },
      b: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "b":
            case "bb":
            case "bbb":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "bbbbb":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "bbbb":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n) {
          return e.setUTCHours(ge(t), 0, 0, 0), e;
        }
      },
      B: {
        priority: 80,
        parse: function(e, t, n, r) {
          switch (t) {
            case "B":
            case "BB":
            case "BBB":
              return (
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) || n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
            case "BBBBB":
              return n.dayPeriod(e, { width: "narrow", context: "formatting" });
            case "BBBB":
            default:
              return (
                n.dayPeriod(e, { width: "wide", context: "formatting" }) ||
                n.dayPeriod(e, {
                  width: "abbreviated",
                  context: "formatting"
                }) ||
                n.dayPeriod(e, { width: "narrow", context: "formatting" })
              );
          }
        },
        set: function(e, t, n) {
          return e.setUTCHours(ge(t), 0, 0, 0), e;
        }
      },
      h: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "h":
              return pe(gt.hour12h, e);
            case "ho":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 1 && 12 >= t;
        },
        set: function(e, t, n) {
          var r = e.getUTCHours() >= 12;
          return (
            r && 12 > t
              ? e.setUTCHours(t + 12, 0, 0, 0)
              : r || 12 !== t
                ? e.setUTCHours(t, 0, 0, 0)
                : e.setUTCHours(0, 0, 0, 0),
            e
          );
        }
      },
      H: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "H":
              return pe(gt.hour23h, e);
            case "Ho":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 23 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCHours(t, 0, 0, 0), e;
        }
      },
      K: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "K":
              return pe(gt.hour11h, e);
            case "Ko":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 11 >= t;
        },
        set: function(e, t, n) {
          return (
            e.getUTCHours() >= 12 && 12 > t
              ? e.setUTCHours(t + 12, 0, 0, 0)
              : e.setUTCHours(t, 0, 0, 0),
            e
          );
        }
      },
      k: {
        priority: 70,
        parse: function(e, t, n, r) {
          switch (t) {
            case "k":
              return pe(gt.hour24h, e);
            case "ko":
              return n.ordinalNumber(e, { unit: "hour" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 1 && 24 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCHours(t > 24 ? t : t % 24, 0, 0, 0), e;
        }
      },
      m: {
        priority: 60,
        parse: function(e, t, n, r) {
          switch (t) {
            case "m":
              return pe(gt.minute, e);
            case "mo":
              return n.ordinalNumber(e, { unit: "minute" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 59 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCMinutes(t, 0, 0), e;
        }
      },
      s: {
        priority: 50,
        parse: function(e, t, n, r) {
          switch (t) {
            case "s":
              return pe(gt.second, e);
            case "so":
              return n.ordinalNumber(e, { unit: "second" });
            default:
              return fe(t.length, e);
          }
        },
        validate: function(e, t, n) {
          return t >= 0 && 59 >= t;
        },
        set: function(e, t, n) {
          return e.setUTCSeconds(t, 0), e;
        }
      },
      S: {
        priority: 40,
        parse: function(e, t, n, r) {
          return fe(t.length, e, function(e) {
            return Math.floor(e * Math.pow(10, 3 - t.length));
          });
        },
        set: function(e, t, n) {
          return e.setUTCMilliseconds(t), e;
        }
      },
      X: {
        priority: 20,
        parse: function(e, t, n, r) {
          switch (t) {
            case "X":
              return de(/^([+-])(\d{2})(\d{2})?|Z/, e);
            case "XX":
              return de(wt.basic, e);
            case "XXXX":
              return de(/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/, e);
            case "XXXXX":
              return de(/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/, e);
            case "XXX":
            default:
              return de(wt.extended, e);
          }
        },
        set: function(e, t, n) {
          return new Date(e.getTime() - t);
        }
      },
      x: {
        priority: 20,
        parse: function(e, t, n, r) {
          switch (t) {
            case "x":
              return de(/^([+-])(\d{2})(\d{2})?|Z/, e);
            case "xx":
              return de(wt.basic, e);
            case "xxxx":
              return de(/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/, e);
            case "xxxxx":
              return de(/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/, e);
            case "xxx":
            default:
              return de(wt.extended, e);
          }
        },
        set: function(e, t, n) {
          return new Date(e.getTime() - t);
        }
      },
      t: {
        priority: 10,
        parse: function(e, t, n, r) {
          return he(e);
        },
        set: function(e, t, n) {
          return new Date(1e3 * t);
        }
      },
      T: {
        priority: 10,
        parse: function(e, t, n, r) {
          return he(e);
        },
        set: function(e, t, n) {
          return new Date(t);
        }
      }
    },
    bt = 20,
    Ct = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,
    kt = /^'(.*?)'?$/,
    Tt = /''/g,
    Mt = /\S/,
    St =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function(e) {
            return typeof e;
          }
        : function(e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          },
    xt = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    },
    Nt = (function() {
      function e(e, t) {
        for (var n = 0; t.length > n; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            "value" in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      return function(t, n, r) {
        return n && e(t.prototype, n), r && e(t, r), t;
      };
    })(),
    Et =
      Object.assign ||
      function(e) {
        for (var t = 1; arguments.length > t; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      },
    Ot = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    },
    _t = function(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    },
    Yt = (function(e) {
      function n(r) {
        xt(this, n);
        var a = _t(this, e.call(this, r));
        (a.renderOptions = function() {
          var e = a.props.year,
            n = a.state.yearsList.map(function(n) {
              return t.createElement(
                "div",
                {
                  className:
                    e === n
                      ? "react-datepicker__year-option react-datepicker__year-option--selected_year"
                      : "react-datepicker__year-option",
                  key: n,
                  ref: n,
                  onClick: a.onChange.bind(a, n)
                },
                e === n
                  ? t.createElement(
                      "span",
                      { className: "react-datepicker__year-option--selected" },
                      "✓"
                    )
                  : "",
                n
              );
            }),
            r = a.props.minDate ? G(a.props.minDate) : null,
            o = a.props.maxDate ? G(a.props.maxDate) : null;
          return (
            (o &&
              a.state.yearsList.find(function(e) {
                return e === o;
              })) ||
              n.unshift(
                t.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    ref: "upcoming",
                    key: "upcoming",
                    onClick: a.incrementYears
                  },
                  t.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming"
                  })
                )
              ),
            (r &&
              a.state.yearsList.find(function(e) {
                return e === r;
              })) ||
              n.push(
                t.createElement(
                  "div",
                  {
                    className: "react-datepicker__year-option",
                    ref: "previous",
                    key: "previous",
                    onClick: a.decrementYears
                  },
                  t.createElement("a", {
                    className:
                      "react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous"
                  })
                )
              ),
            n
          );
        }),
          (a.onChange = function(e) {
            a.props.onChange(e);
          }),
          (a.handleClickOutside = function() {
            a.props.onCancel();
          }),
          (a.shiftYears = function(e) {
            var t = a.state.yearsList.map(function(t) {
              return t + e;
            });
            a.setState({ yearsList: t });
          }),
          (a.incrementYears = function() {
            return a.shiftYears(1);
          }),
          (a.decrementYears = function() {
            return a.shiftYears(-1);
          });
        return (
          (a.state = {
            yearsList: (function(e, t, n, r) {
              for (var a = [], o = 0; 2 * t + 1 > o; o++) {
                var i = e + t - o,
                  s = !0;
                n && (s = G(n) <= i), r && s && (s = G(r) >= i), s && a.push(i);
              }
              return a;
            })(
              a.props.year,
              r.yearDropdownItemNumber || (r.scrollableYearDropdown ? 10 : 5),
              a.props.minDate,
              a.props.maxDate
            )
          }),
          a
        );
      }
      return (
        Ot(n, e),
        (n.prototype.render = function() {
          var e = r({
            "react-datepicker__year-dropdown": !0,
            "react-datepicker__year-dropdown--scrollable": this.props
              .scrollableYearDropdown
          });
          return t.createElement("div", { className: e }, this.renderOptions());
        }),
        n
      );
    })(t.Component);
  Yt.propTypes = {
    minDate: n.instanceOf(Date),
    maxDate: n.instanceOf(Date),
    onCancel: n.func.isRequired,
    onChange: n.func.isRequired,
    scrollableYearDropdown: n.bool,
    year: n.number.isRequired,
    yearDropdownItemNumber: n.number
  };
  var qt = a(Yt),
    Pt = (function(e) {
      function n() {
        var r, a, o;
        xt(this, n);
        for (var i = arguments.length, s = Array(i), u = 0; i > u; u++)
          s[u] = arguments[u];
        return (
          (r = a = _t(this, e.call.apply(e, [this].concat(s)))),
          (a.state = { dropdownVisible: !1 }),
          (a.renderSelectOptions = function() {
            for (
              var e = a.props.minDate ? G(a.props.minDate) : 1900,
                n = a.props.maxDate ? G(a.props.maxDate) : 2100,
                r = [],
                o = e;
              n >= o;
              o++
            )
              r.push(t.createElement("option", { key: o, value: o }, o));
            return r;
          }),
          (a.onSelectChange = function(e) {
            a.onChange(e.target.value);
          }),
          (a.renderSelectMode = function() {
            return t.createElement(
              "select",
              {
                value: a.props.year,
                className: "react-datepicker__year-select",
                onChange: a.onSelectChange
              },
              a.renderSelectOptions()
            );
          }),
          (a.renderReadView = function(e) {
            return t.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__year-read-view",
                onClick: function(e) {
                  return a.toggleDropdown(e);
                }
              },
              t.createElement("span", {
                className: "react-datepicker__year-read-view--down-arrow"
              }),
              t.createElement(
                "span",
                {
                  className: "react-datepicker__year-read-view--selected-year"
                },
                a.props.year
              )
            );
          }),
          (a.renderDropdown = function() {
            return t.createElement(qt, {
              key: "dropdown",
              ref: "options",
              year: a.props.year,
              onChange: a.onChange,
              onCancel: a.toggleDropdown,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              scrollableYearDropdown: a.props.scrollableYearDropdown,
              yearDropdownItemNumber: a.props.yearDropdownItemNumber
            });
          }),
          (a.renderScrollMode = function() {
            var e = a.state.dropdownVisible,
              t = [a.renderReadView(!e)];
            return e && t.unshift(a.renderDropdown()), t;
          }),
          (a.onChange = function(e) {
            a.toggleDropdown(), e !== a.props.year && a.props.onChange(e);
          }),
          (a.toggleDropdown = function(e) {
            a.setState(
              { dropdownVisible: !a.state.dropdownVisible },
              function() {
                a.props.adjustDateOnChange &&
                  a.handleYearChange(a.props.date, e);
              }
            );
          }),
          (a.handleYearChange = function(e, t) {
            a.onSelect(e, t), a.setOpen();
          }),
          (a.onSelect = function(e, t) {
            a.props.onSelect && a.props.onSelect(e, t);
          }),
          (a.setOpen = function() {
            a.props.setOpen && a.props.setOpen(!0);
          }),
          (o = r),
          _t(a, o)
        );
      }
      return (
        Ot(n, e),
        (n.prototype.render = function() {
          var e = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              e = this.renderScrollMode();
              break;
            case "select":
              e = this.renderSelectMode();
          }
          return t.createElement(
            "div",
            {
              className:
                "react-datepicker__year-dropdown-container react-datepicker__year-dropdown-container--" +
                this.props.dropdownMode
            },
            e
          );
        }),
        n
      );
    })(t.Component);
  Pt.propTypes = {
    adjustDateOnChange: n.bool,
    dropdownMode: n.oneOf(["scroll", "select"]).isRequired,
    maxDate: n.instanceOf(Date),
    minDate: n.instanceOf(Date),
    onChange: n.func.isRequired,
    scrollableYearDropdown: n.bool,
    year: n.number.isRequired,
    yearDropdownItemNumber: n.number,
    date: n.instanceOf(Date),
    onSelect: n.func,
    setOpen: n.func
  };
  var Ut = (function(e) {
    function n() {
      var r, a, o;
      xt(this, n);
      for (var i = arguments.length, s = Array(i), u = 0; i > u; u++)
        s[u] = arguments[u];
      return (
        (r = a = _t(this, e.call.apply(e, [this].concat(s)))),
        (a.renderOptions = function() {
          return a.props.monthNames.map(function(e, n) {
            return t.createElement(
              "div",
              {
                className:
                  a.props.month === n
                    ? "react-datepicker__month-option --selected_month"
                    : "react-datepicker__month-option",
                key: e,
                ref: e,
                onClick: a.onChange.bind(a, n)
              },
              a.props.month === n
                ? t.createElement(
                    "span",
                    { className: "react-datepicker__month-option--selected" },
                    "✓"
                  )
                : "",
              e
            );
          });
        }),
        (a.onChange = function(e) {
          return a.props.onChange(e);
        }),
        (a.handleClickOutside = function() {
          return a.props.onCancel();
        }),
        (o = r),
        _t(a, o)
      );
    }
    return (
      Ot(n, e),
      (n.prototype.render = function() {
        return t.createElement(
          "div",
          { className: "react-datepicker__month-dropdown" },
          this.renderOptions()
        );
      }),
      n
    );
  })(t.Component);
  Ut.propTypes = {
    onCancel: n.func.isRequired,
    onChange: n.func.isRequired,
    month: n.number.isRequired,
    monthNames: n.arrayOf(n.string.isRequired).isRequired
  };
  var Ft = a(Ut),
    Wt = (function(e) {
      function n() {
        var r, a, o;
        xt(this, n);
        for (var i = arguments.length, s = Array(i), u = 0; i > u; u++)
          s[u] = arguments[u];
        return (
          (r = a = _t(this, e.call.apply(e, [this].concat(s)))),
          (a.state = { dropdownVisible: !1 }),
          (a.renderSelectOptions = function(e) {
            return e.map(function(e, n) {
              return t.createElement("option", { key: n, value: n }, e);
            });
          }),
          (a.renderSelectMode = function(e) {
            return t.createElement(
              "select",
              {
                value: a.props.month,
                className: "react-datepicker__month-select",
                onChange: function(e) {
                  return a.onChange(e.target.value);
                }
              },
              a.renderSelectOptions(e)
            );
          }),
          (a.renderReadView = function(e, n) {
            return t.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__month-read-view",
                onClick: a.toggleDropdown
              },
              t.createElement("span", {
                className: "react-datepicker__month-read-view--down-arrow"
              }),
              t.createElement(
                "span",
                {
                  className: "react-datepicker__month-read-view--selected-month"
                },
                n[a.props.month]
              )
            );
          }),
          (a.renderDropdown = function(e) {
            return t.createElement(Ft, {
              key: "dropdown",
              ref: "options",
              month: a.props.month,
              monthNames: e,
              onChange: a.onChange,
              onCancel: a.toggleDropdown
            });
          }),
          (a.renderScrollMode = function(e) {
            var t = a.state.dropdownVisible,
              n = [a.renderReadView(!t, e)];
            return t && n.unshift(a.renderDropdown(e)), n;
          }),
          (a.onChange = function(e) {
            a.toggleDropdown(), e !== a.props.month && a.props.onChange(e);
          }),
          (a.toggleDropdown = function() {
            return a.setState({ dropdownVisible: !a.state.dropdownVisible });
          }),
          (o = r),
          _t(a, o)
        );
      }
      return (
        Ot(n, e),
        (n.prototype.render = function() {
          var e = this,
            n = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(
              this.props.useShortMonthInDropdown
                ? function(e) {
                    return (function(e, t, n) {
                      return ke($(ve(), e), "LLL", n);
                    })(e);
                  }
                : function(t) {
                    return (function(e, t) {
                      return ke($(ve(), e), "LLLL", t);
                    })(t, e.props.locale);
                  }
            ),
            r = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              r = this.renderScrollMode(n);
              break;
            case "select":
              r = this.renderSelectMode(n);
          }
          return t.createElement(
            "div",
            {
              className:
                "react-datepicker__month-dropdown-container react-datepicker__month-dropdown-container--" +
                this.props.dropdownMode
            },
            r
          );
        }),
        n
      );
    })(t.Component);
  Wt.propTypes = {
    dropdownMode: n.oneOf(["scroll", "select"]).isRequired,
    locale: n.string,
    month: n.number.isRequired,
    onChange: n.func.isRequired,
    useShortMonthInDropdown: n.bool
  };
  var Ht = (function(e) {
    function n(r) {
      xt(this, n);
      var a = _t(this, e.call(this, r));
      return (
        (a.renderOptions = function() {
          return a.state.monthYearsList.map(function(e) {
            var n = V(e),
              r = xe(a.props.date, e) && Ne(a.props.date, e);
            return t.createElement(
              "div",
              {
                className: r
                  ? "react-datepicker__month-year-option --selected_month-year"
                  : "react-datepicker__month-year-option",
                key: n,
                ref: n,
                onClick: a.onChange.bind(a, n)
              },
              r
                ? t.createElement(
                    "span",
                    {
                      className: "react-datepicker__month-year-option--selected"
                    },
                    "✓"
                  )
                : "",
              ke(e, a.props.dateFormat)
            );
          });
        }),
        (a.onChange = function(e) {
          return a.props.onChange(e);
        }),
        (a.handleClickOutside = function() {
          a.props.onCancel();
        }),
        (a.state = {
          monthYearsList: (function(e, t) {
            for (var n = [], r = Se(e), a = Se(t); !se(r, a); )
              n.push(ve(r)), (r = R(r, 1));
            return n;
          })(a.props.minDate, a.props.maxDate)
        }),
        a
      );
    }
    return (
      Ot(n, e),
      (n.prototype.render = function() {
        var e = r({
          "react-datepicker__month-year-dropdown": !0,
          "react-datepicker__month-year-dropdown--scrollable": this.props
            .scrollableMonthYearDropdown
        });
        return t.createElement("div", { className: e }, this.renderOptions());
      }),
      n
    );
  })(t.Component);
  Ht.propTypes = {
    minDate: n.instanceOf(Date).isRequired,
    maxDate: n.instanceOf(Date).isRequired,
    onCancel: n.func.isRequired,
    onChange: n.func.isRequired,
    scrollableMonthYearDropdown: n.bool,
    date: n.instanceOf(Date).isRequired,
    dateFormat: n.string.isRequired
  };
  var It = a(Ht),
    Lt = (function(e) {
      function n() {
        var r, a, o;
        xt(this, n);
        for (var i = arguments.length, s = Array(i), u = 0; i > u; u++)
          s[u] = arguments[u];
        return (
          (r = a = _t(this, e.call.apply(e, [this].concat(s)))),
          (a.state = { dropdownVisible: !1 }),
          (a.renderSelectOptions = function() {
            for (
              var e = Se(a.props.minDate), n = Se(a.props.maxDate), r = [];
              !se(e, n);

            ) {
              var o = V(e);
              r.push(
                t.createElement(
                  "option",
                  { key: o, value: o },
                  ke(e, a.props.dateFormat, a.props.locale)
                )
              ),
                (e = R(e, 1));
            }
            return r;
          }),
          (a.onSelectChange = function(e) {
            a.onChange(e.target.value);
          }),
          (a.renderSelectMode = function() {
            return t.createElement(
              "select",
              {
                value: V(Se(a.props.date)),
                className: "react-datepicker__month-year-select",
                onChange: a.onSelectChange
              },
              a.renderSelectOptions()
            );
          }),
          (a.renderReadView = function(e) {
            var n = ke(a.props.date, a.props.dateFormat, a.props.locale);
            return t.createElement(
              "div",
              {
                key: "read",
                style: { visibility: e ? "visible" : "hidden" },
                className: "react-datepicker__month-year-read-view",
                onClick: function(e) {
                  return a.toggleDropdown(e);
                }
              },
              t.createElement("span", {
                className: "react-datepicker__month-year-read-view--down-arrow"
              }),
              t.createElement(
                "span",
                {
                  className:
                    "react-datepicker__month-year-read-view--selected-month-year"
                },
                n
              )
            );
          }),
          (a.renderDropdown = function() {
            return t.createElement(It, {
              key: "dropdown",
              ref: "options",
              date: a.props.date,
              dateFormat: a.props.dateFormat,
              onChange: a.onChange,
              onCancel: a.toggleDropdown,
              minDate: a.props.minDate,
              maxDate: a.props.maxDate,
              scrollableMonthYearDropdown: a.props.scrollableMonthYearDropdown
            });
          }),
          (a.renderScrollMode = function() {
            var e = a.state.dropdownVisible,
              t = [a.renderReadView(!e)];
            return e && t.unshift(a.renderDropdown()), t;
          }),
          (a.onChange = function(e) {
            a.toggleDropdown();
            var t = ve(parseInt(e));
            (xe(a.props.date, t) && Ne(a.props.date, t)) || a.props.onChange(t);
          }),
          (a.toggleDropdown = function() {
            return a.setState({ dropdownVisible: !a.state.dropdownVisible });
          }),
          (o = r),
          _t(a, o)
        );
      }
      return (
        Ot(n, e),
        (n.prototype.render = function() {
          var e = void 0;
          switch (this.props.dropdownMode) {
            case "scroll":
              e = this.renderScrollMode();
              break;
            case "select":
              e = this.renderSelectMode();
          }
          return t.createElement(
            "div",
            {
              className:
                "react-datepicker__month-year-dropdown-container react-datepicker__month-year-dropdown-container--" +
                this.props.dropdownMode
            },
            e
          );
        }),
        n
      );
    })(t.Component);
  Lt.propTypes = {
    dropdownMode: n.oneOf(["scroll", "select"]).isRequired,
    dateFormat: n.string.isRequired,
    locale: n.string,
    maxDate: n.instanceOf(Date).isRequired,
    minDate: n.instanceOf(Date).isRequired,
    date: n.instanceOf(Date).isRequired,
    onChange: n.func.isRequired,
    scrollableMonthYearDropdown: n.bool
  };
  var Rt = (function(e) {
    function n() {
      var t, a, o;
      xt(this, n);
      for (var i = arguments.length, s = Array(i), u = 0; i > u; u++)
        s[u] = arguments[u];
      return (
        (t = a = _t(this, e.call.apply(e, [this].concat(s)))),
        (a.handleClick = function(e) {
          !a.isDisabled() && a.props.onClick && a.props.onClick(e);
        }),
        (a.handleMouseEnter = function(e) {
          !a.isDisabled() && a.props.onMouseEnter && a.props.onMouseEnter(e);
        }),
        (a.isSameDay = function(e) {
          return Ee(a.props.day, e);
        }),
        (a.isKeyboardSelected = function() {
          return (
            !a.props.disabledKeyboardNavigation &&
            !a.props.inline &&
            !a.isSameDay(a.props.selected) &&
            a.isSameDay(a.props.preSelection)
          );
        }),
        (a.isDisabled = function() {
          return qe(a.props.day, a.props);
        }),
        (a.getHighLightedClass = function(e) {
          var t = a.props,
            n = t.day,
            r = t.highlightDates;
          if (!r) return !1;
          var o = ke(n, "MM.dd.yyyy");
          return r.get(o);
        }),
        (a.isInRange = function() {
          var e = a.props,
            t = e.startDate,
            n = e.endDate;
          return !(!t || !n) && Oe(e.day, t, n);
        }),
        (a.isInSelectingRange = function() {
          var e = a.props,
            t = e.day,
            n = e.selectsStart,
            r = e.selectsEnd,
            o = e.selectingDate,
            i = e.startDate,
            s = e.endDate;
          return (
            !((!n && !r) || !o || a.isDisabled()) &&
            (n && s && (ue(o, s) || ie(o, s))
              ? Oe(t, o, s)
              : !(!r || !i || (!se(o, i) && !ie(o, i))) && Oe(t, i, o))
          );
        }),
        (a.isSelectingRangeStart = function() {
          if (!a.isInSelectingRange()) return !1;
          var e = a.props,
            t = e.day,
            n = e.startDate;
          return e.selectsStart ? Ee(t, e.selectingDate) : Ee(t, n);
        }),
        (a.isSelectingRangeEnd = function() {
          if (!a.isInSelectingRange()) return !1;
          var e = a.props,
            t = e.day,
            n = e.endDate;
          return e.selectsEnd ? Ee(t, e.selectingDate) : Ee(t, n);
        }),
        (a.isRangeStart = function() {
          var e = a.props,
            t = e.startDate;
          return !(!t || !e.endDate) && Ee(t, e.day);
        }),
        (a.isRangeEnd = function() {
          var e = a.props,
            t = e.endDate;
          return !(!e.startDate || !t) && Ee(t, e.day);
        }),
        (a.isWeekend = function() {
          var e = (function(e, t) {
            if (1 > arguments.length)
              throw new TypeError(
                "1 argument required, but only " + arguments.length + " present"
              );
            return c(e, t).getDay();
          })(a.props.day);
          return 0 === e || 6 === e;
        }),
        (a.isOutsideMonth = function() {
          return void 0 !== a.props.month && a.props.month !== z(a.props.day);
        }),
        (a.getClassNames = function(e) {
          var t = a.props.dayClassName ? a.props.dayClassName(e) : void 0;
          return r(
            "react-datepicker__day",
            t,
            "react-datepicker__day--" +
              (function(e, t) {
                return ke(e, "ddd", t);
              })(a.props.day),
            {
              "react-datepicker__day--disabled": a.isDisabled(),
              "react-datepicker__day--selected": a.isSameDay(a.props.selected),
              "react-datepicker__day--keyboard-selected": a.isKeyboardSelected(),
              "react-datepicker__day--range-start": a.isRangeStart(),
              "react-datepicker__day--range-end": a.isRangeEnd(),
              "react-datepicker__day--in-range": a.isInRange(),
              "react-datepicker__day--in-selecting-range": a.isInSelectingRange(),
              "react-datepicker__day--selecting-range-start": a.isSelectingRangeStart(),
              "react-datepicker__day--selecting-range-end": a.isSelectingRangeEnd(),
              "react-datepicker__day--today": a.isSameDay(ve()),
              "react-datepicker__day--weekend": a.isWeekend(),
              "react-datepicker__day--outside-month": a.isOutsideMonth()
            },
            a.getHighLightedClass("react-datepicker__day--highlighted")
          );
        }),
        (o = t),
        _t(a, o)
      );
    }
    return (
      Ot(n, e),
      (n.prototype.render = function() {
        return t.createElement(
          "div",
          {
            className: this.getClassNames(this.props.day),
            onClick: this.handleClick,
            onMouseEnter: this.handleMouseEnter,
            "aria-label": "day-" + A(this.props.day),
            role: "option"
          },
          this.props.renderDayContents
            ? this.props.renderDayContents(A(this.props.day))
            : A(this.props.day)
        );
      }),
      n
    );
  })(t.Component);
  Rt.propTypes = {
    disabledKeyboardNavigation: n.bool,
    day: n.instanceOf(Date).isRequired,
    dayClassName: n.func,
    endDate: n.instanceOf(Date),
    highlightDates: n.instanceOf(Map),
    inline: n.bool,
    month: n.number,
    onClick: n.func,
    onMouseEnter: n.func,
    preSelection: n.instanceOf(Date),
    selected: n.object,
    selectingDate: n.instanceOf(Date),
    selectsEnd: n.bool,
    selectsStart: n.bool,
    startDate: n.instanceOf(Date),
    renderDayContents: n.func
  };
  var Bt = (function(e) {
    function n() {
      var t, r, a;
      xt(this, n);
      for (var o = arguments.length, i = Array(o), s = 0; o > s; s++)
        i[s] = arguments[s];
      return (
        (t = r = _t(this, e.call.apply(e, [this].concat(i)))),
        (r.handleClick = function(e) {
          r.props.onClick && r.props.onClick(e);
        }),
        (a = t),
        _t(r, a)
      );
    }
    return (
      Ot(n, e),
      (n.prototype.render = function() {
        return t.createElement(
          "div",
          {
            className: r({
              "react-datepicker__week-number": !0,
              "react-datepicker__week-number--clickable": !!this.props.onClick
            }),
            "aria-label": "week-" + this.props.weekNumber,
            onClick: this.handleClick
          },
          this.props.weekNumber
        );
      }),
      n
    );
  })(t.Component);
  Bt.propTypes = { weekNumber: n.number.isRequired, onClick: n.func };
  var jt = (function(e) {
    function n() {
      var r, a, o;
      xt(this, n);
      for (var i = arguments.length, l = Array(i), p = 0; i > p; p++)
        l[p] = arguments[p];
      return (
        (r = a = _t(this, e.call.apply(e, [this].concat(l)))),
        (a.handleDayClick = function(e, t) {
          a.props.onDayClick && a.props.onDayClick(e, t);
        }),
        (a.handleDayMouseEnter = function(e) {
          a.props.onDayMouseEnter && a.props.onDayMouseEnter(e);
        }),
        (a.handleWeekClick = function(e, t, n) {
          "function" == typeof a.props.onWeekSelect &&
            a.props.onWeekSelect(e, t, n),
            a.props.shouldCloseOnSelect && a.props.setOpen(!1);
        }),
        (a.formatWeekNumber = function(e) {
          return a.props.formatWeekNumber
            ? a.props.formatWeekNumber(e)
            : (function(t) {
                return (
                  (function(e, t, n) {
                    if (2 > arguments.length)
                      throw new TypeError(
                        "2 arguments required, but only " +
                          arguments.length +
                          " present"
                      );
                    var r = c(e, n),
                      a = s(t);
                    r.setMonth(0), r.setDate(a);
                  })(t, 1),
                  xe(
                    (function(e, t) {
                      if (1 > arguments.length)
                        throw new TypeError(
                          "1 argument required, but only " +
                            arguments.length +
                            " present"
                        );
                      var n = t || {},
                        r = n.locale,
                        a = r && r.options && r.options.weekStartsOn,
                        o = null == a ? 0 : s(a),
                        i = null == n.weekStartsOn ? o : s(n.weekStartsOn);
                      if (0 > i || i > 6)
                        throw new RangeError(
                          "weekStartsOn must be between 0 and 6 inclusively"
                        );
                      var u = c(e, n),
                        l = u.getDay(),
                        p = 6 + (i > l ? -7 : 0) - (l - i);
                      return (
                        u.setDate(u.getDate() + p),
                        u.setHours(23, 59, 59, 999),
                        u
                      );
                    })(t),
                    t
                  )
                    ? (function(t, n, r) {
                        if (2 > arguments.length)
                          throw new TypeError(
                            "2 arguments required, but only " +
                              arguments.length +
                              " present"
                          );
                        var a = e(t, r),
                          o = e(n, r),
                          i = a.getTime() - u(a),
                          s = o.getTime() - u(o);
                        return Math.round((i - s) / dt);
                      })(
                        t,
                        (function(e, t) {
                          if (1 > arguments.length)
                            throw new TypeError(
                              "1 argument required, but only " +
                                arguments.length +
                                " present"
                            );
                          var n = c(e, t),
                            r = new Date(0);
                          return (
                            r.setFullYear(n.getFullYear(), 0, 1),
                            r.setHours(0, 0, 0, 0),
                            r
                          );
                        })(t)
                      ) + 1
                    : 1
                );
              })(e);
        }),
        (a.renderDays = function() {
          var e = Me(a.props.day, a.props.locale),
            n = [],
            r = a.formatWeekNumber(e);
          if (a.props.showWeekNumber) {
            var o = a.props.onWeekSelect
              ? a.handleWeekClick.bind(a, e, r)
              : void 0;
            n.push(
              t.createElement(Bt, { key: "W", weekNumber: r, onClick: o })
            );
          }
          return n.concat(
            [0, 1, 2, 3, 4, 5, 6].map(function(n) {
              var r = H(e, n);
              return t.createElement(Rt, {
                key: n,
                day: r,
                month: a.props.month,
                onClick: a.handleDayClick.bind(a, r),
                onMouseEnter: a.handleDayMouseEnter.bind(a, r),
                minDate: a.props.minDate,
                maxDate: a.props.maxDate,
                excludeDates: a.props.excludeDates,
                includeDates: a.props.includeDates,
                inline: a.props.inline,
                highlightDates: a.props.highlightDates,
                selectingDate: a.props.selectingDate,
                filterDate: a.props.filterDate,
                preSelection: a.props.preSelection,
                selected: a.props.selected,
                selectsStart: a.props.selectsStart,
                selectsEnd: a.props.selectsEnd,
                startDate: a.props.startDate,
                endDate: a.props.endDate,
                dayClassName: a.props.dayClassName,
                renderDayContents: a.props.renderDayContents,
                disabledKeyboardNavigation: a.props.disabledKeyboardNavigation
              });
            })
          );
        }),
        (o = r),
        _t(a, o)
      );
    }
    return (
      Ot(n, e),
      (n.prototype.render = function() {
        return t.createElement(
          "div",
          { className: "react-datepicker__week" },
          this.renderDays()
        );
      }),
      Nt(n, null, [
        {
          key: "defaultProps",
          get: function() {
            return { shouldCloseOnSelect: !0 };
          }
        }
      ]),
      n
    );
  })(t.Component);
  jt.propTypes = {
    disabledKeyboardNavigation: n.bool,
    day: n.instanceOf(Date).isRequired,
    dayClassName: n.func,
    endDate: n.instanceOf(Date),
    excludeDates: n.array,
    filterDate: n.func,
    formatWeekNumber: n.func,
    highlightDates: n.instanceOf(Map),
    includeDates: n.array,
    inline: n.bool,
    locale: n.string,
    maxDate: n.instanceOf(Date),
    minDate: n.instanceOf(Date),
    month: n.number,
    onDayClick: n.func,
    onDayMouseEnter: n.func,
    onWeekSelect: n.func,
    preSelection: n.instanceOf(Date),
    selected: n.instanceOf(Date),
    selectingDate: n.instanceOf(Date),
    selectsEnd: n.bool,
    selectsStart: n.bool,
    showWeekNumber: n.bool,
    startDate: n.instanceOf(Date),
    setOpen: n.func,
    shouldCloseOnSelect: n.bool,
    renderDayContents: n.func
  };
  var Qt = 6,
    Xt = (function(e) {
      function n() {
        var a, o, i;
        xt(this, n);
        for (var s = arguments.length, u = Array(s), c = 0; s > c; c++)
          u[c] = arguments[c];
        return (
          (a = o = _t(this, e.call.apply(e, [this].concat(u)))),
          (o.handleDayClick = function(e, t) {
            o.props.onDayClick && o.props.onDayClick(e, t);
          }),
          (o.handleDayMouseEnter = function(e) {
            o.props.onDayMouseEnter && o.props.onDayMouseEnter(e);
          }),
          (o.handleMouseLeave = function() {
            o.props.onMouseLeave && o.props.onMouseLeave();
          }),
          (o.isWeekInMonth = function(e) {
            var t = o.props.day,
              n = H(e, 6);
            return Ne(e, t) || Ne(n, t);
          }),
          (o.renderWeeks = function() {
            for (
              var e = [],
                n = o.props.fixedHeight,
                r = Me(Se(o.props.day), o.props.locale),
                a = 0,
                i = !1;
              ;

            ) {
              if (
                (e.push(
                  t.createElement(jt, {
                    key: a,
                    day: r,
                    month: z(o.props.day),
                    onDayClick: o.handleDayClick,
                    onDayMouseEnter: o.handleDayMouseEnter,
                    onWeekSelect: o.props.onWeekSelect,
                    formatWeekNumber: o.props.formatWeekNumber,
                    locale: o.props.locale,
                    minDate: o.props.minDate,
                    maxDate: o.props.maxDate,
                    excludeDates: o.props.excludeDates,
                    includeDates: o.props.includeDates,
                    inline: o.props.inline,
                    highlightDates: o.props.highlightDates,
                    selectingDate: o.props.selectingDate,
                    filterDate: o.props.filterDate,
                    preSelection: o.props.preSelection,
                    selected: o.props.selected,
                    selectsStart: o.props.selectsStart,
                    selectsEnd: o.props.selectsEnd,
                    showWeekNumber: o.props.showWeekNumbers,
                    startDate: o.props.startDate,
                    endDate: o.props.endDate,
                    dayClassName: o.props.dayClassName,
                    setOpen: o.props.setOpen,
                    shouldCloseOnSelect: o.props.shouldCloseOnSelect,
                    disabledKeyboardNavigation:
                      o.props.disabledKeyboardNavigation,
                    renderDayContents: o.props.renderDayContents
                  })
                ),
                i)
              )
                break;
              a++, (r = I(r, 1));
              var s = n && a >= Qt,
                u = !n && !o.isWeekInMonth(r);
              if (s || u) {
                if (!o.props.peekNextMonth) break;
                i = !0;
              }
            }
            return e;
          }),
          (o.getClassNames = function() {
            var e = o.props;
            return r("react-datepicker__month", {
              "react-datepicker__month--selecting-range":
                e.selectingDate && (e.selectsStart || e.selectsEnd)
            });
          }),
          (i = a),
          _t(o, i)
        );
      }
      return (
        Ot(n, e),
        (n.prototype.render = function() {
          return t.createElement(
            "div",
            {
              className: this.getClassNames(),
              onMouseLeave: this.handleMouseLeave,
              role: "listbox",
              "aria-label": "month-" + ke(this.props.day, "YYYY-MM")
            },
            this.renderWeeks()
          );
        }),
        n
      );
    })(t.Component);
  Xt.propTypes = {
    disabledKeyboardNavigation: n.bool,
    day: n.instanceOf(Date).isRequired,
    dayClassName: n.func,
    endDate: n.instanceOf(Date),
    excludeDates: n.array,
    filterDate: n.func,
    fixedHeight: n.bool,
    formatWeekNumber: n.func,
    highlightDates: n.instanceOf(Map),
    includeDates: n.array,
    inline: n.bool,
    locale: n.string,
    maxDate: n.instanceOf(Date),
    minDate: n.instanceOf(Date),
    onDayClick: n.func,
    onDayMouseEnter: n.func,
    onMouseLeave: n.func,
    onWeekSelect: n.func,
    peekNextMonth: n.bool,
    preSelection: n.instanceOf(Date),
    selected: n.instanceOf(Date),
    selectingDate: n.instanceOf(Date),
    selectsEnd: n.bool,
    selectsStart: n.bool,
    showWeekNumbers: n.bool,
    startDate: n.instanceOf(Date),
    setOpen: n.func,
    shouldCloseOnSelect: n.bool,
    renderDayContents: n.func
  };
  var At = (function(e) {
    function n() {
      var r, a, o;
      xt(this, n);
      for (var i = arguments.length, u = Array(i), c = 0; i > c; c++)
        u[c] = arguments[c];
      return (
        (r = a = _t(this, e.call.apply(e, [this].concat(u)))),
        (a.handleClick = function(e) {
          ((a.props.minTime || a.props.maxTime) && Fe(e, a.props)) ||
            (a.props.excludeTimes && Ue(e, a.props.excludeTimes)) ||
            (a.props.includeTimes && !Ue(e, a.props.includeTimes)) ||
            a.props.onChange(e);
        }),
        (a.liClasses = function(e, t, n) {
          var r = ["react-datepicker__time-list-item"];
          return (
            t === X(e) &&
              n === Q(e) &&
              r.push("react-datepicker__time-list-item--selected"),
            (((a.props.minTime || a.props.maxTime) && Fe(e, a.props)) ||
              (a.props.excludeTimes && Ue(e, a.props.excludeTimes)) ||
              (a.props.includeTimes && !Ue(e, a.props.includeTimes))) &&
              r.push("react-datepicker__time-list-item--disabled"),
            a.props.injectTimes &&
              (60 * X(e) + Q(e)) % a.props.intervals != 0 &&
              r.push("react-datepicker__time-list-item--injected"),
            r.join(" ")
          );
        }),
        (a.renderTimes = function() {
          for (
            var e = [],
              n = a.props.format ? a.props.format : "p",
              r = a.props.intervals,
              o = a.props.selected ? a.props.selected : ve(),
              i = X(o),
              u = Q(o),
              c = (function(e) {
                return ne(e);
              })(ve()),
              l = 1440 / r,
              p =
                a.props.injectTimes &&
                a.props.injectTimes.sort(function(e, t) {
                  return e - t;
                }),
              d = 0;
            l > d;
            d++
          ) {
            var h = W(c, d * r);
            if ((e.push(h), p)) {
              var f = (function(e, t, n, r, a) {
                for (var o = a.length, i = [], u = 0; o > u; u++) {
                  var c = W(
                      (function(e, t, n) {
                        if (2 > arguments.length)
                          throw new TypeError(
                            "2 arguments required, but only " +
                              arguments.length +
                              " present"
                          );
                        return Y(e, s(t) * lt, n);
                      })(e, X(a[u])),
                      Q(a[u])
                    ),
                    l = W(e, (n + 1) * r);
                  se(c, t) && ue(c, l) && i.push(a[u]);
                }
                return i;
              })(c, h, d, r, p);
              e = e.concat(f);
            }
          }
          return e.map(function(e, r) {
            return t.createElement(
              "li",
              {
                key: r,
                onClick: a.handleClick.bind(a, e),
                className: a.liClasses(e, i, u),
                ref: function(t) {
                  ((i === X(e) && u === Q(e)) || (i === X(e) && !a.centerLi)) &&
                    (a.centerLi = t);
                }
              },
              ke(e, n)
            );
          });
        }),
        (o = r),
        _t(a, o)
      );
    }
    return (
      Ot(n, e),
      (n.prototype.componentDidMount = function() {
        this.list.scrollTop = n.calcCenterPosition(
          this.props.monthRef
            ? this.props.monthRef.clientHeight - this.header.clientHeight
            : this.list.clientHeight,
          this.centerLi
        );
      }),
      (n.prototype.render = function() {
        var e = this,
          n = null;
        return (
          this.props.monthRef &&
            this.header &&
            (n = this.props.monthRef.clientHeight - this.header.clientHeight),
          t.createElement(
            "div",
            {
              className:
                "react-datepicker__time-container " +
                (this.props.todayButton
                  ? "react-datepicker__time-container--with-today-button"
                  : "")
            },
            t.createElement(
              "div",
              {
                className:
                  "react-datepicker__header react-datepicker__header--time",
                ref: function(t) {
                  e.header = t;
                }
              },
              t.createElement(
                "div",
                { className: "react-datepicker-time__header" },
                this.props.timeCaption
              )
            ),
            t.createElement(
              "div",
              { className: "react-datepicker__time" },
              t.createElement(
                "div",
                { className: "react-datepicker__time-box" },
                t.createElement(
                  "ul",
                  {
                    className: "react-datepicker__time-list",
                    ref: function(t) {
                      e.list = t;
                    },
                    style: n ? { height: n } : {}
                  },
                  this.renderTimes.bind(this)()
                )
              )
            )
          )
        );
      }),
      Nt(n, null, [
        {
          key: "defaultProps",
          get: function() {
            return {
              intervals: 30,
              onTimeChange: function() {},
              todayButton: null,
              timeCaption: "Time"
            };
          }
        }
      ]),
      n
    );
  })(t.Component);
  (At.propTypes = {
    format: n.string,
    includeTimes: n.array,
    intervals: n.number,
    selected: n.instanceOf(Date),
    onChange: n.func,
    todayButton: n.node,
    minTime: n.instanceOf(Date),
    maxTime: n.instanceOf(Date),
    excludeTimes: n.array,
    monthRef: n.object,
    timeCaption: n.string,
    injectTimes: n.array
  }),
    (At.calcCenterPosition = function(e, t) {
      return t.offsetTop - (e / 2 - t.clientHeight / 2);
    }),
    (Be.propTypes = {
      className: n.string,
      children: n.node,
      arrowProps: n.object
    });
  var zt = [
      "react-datepicker__year-select",
      "react-datepicker__month-select",
      "react-datepicker__month-year-select"
    ],
    Gt = function() {
      var e = (
        (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {})
          .className || ""
      ).split(/\s+/);
      return zt.some(function(t) {
        return e.indexOf(t) >= 0;
      });
    },
    Vt = (function(e) {
      function n(r) {
        xt(this, n);
        var a = _t(this, e.call(this, r));
        return (
          (a.handleClickOutside = function(e) {
            a.props.onClickOutside(e);
          }),
          (a.handleDropdownFocus = function(e) {
            Gt(e.target) && a.props.onDropdownFocus();
          }),
          (a.getDateInView = function() {
            var e = a.props,
              t = e.preSelection,
              n = e.selected,
              r = e.openToDate,
              o = Ie(a.props),
              i = Le(a.props),
              s = ve(),
              u = r || n || t;
            return u || (o && ue(s, o) ? o : i && se(s, i) ? i : s);
          }),
          (a.increaseMonth = function() {
            a.setState({ date: R(a.state.date, 1) }, function() {
              return a.handleMonthChange(a.state.date);
            });
          }),
          (a.decreaseMonth = function() {
            a.setState({ date: j(a.state.date, 1) }, function() {
              return a.handleMonthChange(a.state.date);
            });
          }),
          (a.handleDayClick = function(e, t) {
            return a.props.onSelect(e, t);
          }),
          (a.handleDayMouseEnter = function(e) {
            return a.setState({ selectingDate: e });
          }),
          (a.handleMonthMouseLeave = function() {
            return a.setState({ selectingDate: null });
          }),
          (a.handleYearChange = function(e) {
            a.props.onYearChange && a.props.onYearChange(e);
          }),
          (a.handleMonthChange = function(e) {
            a.props.onMonthChange && a.props.onMonthChange(e),
              a.props.adjustDateOnChange &&
                (a.props.onSelect && a.props.onSelect(e),
                a.props.setOpen && a.props.setOpen(!0));
          }),
          (a.handleMonthYearChange = function(e) {
            a.handleYearChange(e), a.handleMonthChange(e);
          }),
          (a.changeYear = function(e) {
            a.setState({ date: J(a.state.date, e) }, function() {
              return a.handleYearChange(a.state.date);
            });
          }),
          (a.changeMonth = function(e) {
            a.setState({ date: $(a.state.date, e) }, function() {
              return a.handleMonthChange(a.state.date);
            });
          }),
          (a.changeMonthYear = function(e) {
            a.setState({ date: J($(a.state.date, z(e)), G(e)) }, function() {
              return a.handleMonthYearChange(a.state.date);
            });
          }),
          (a.header = function() {
            var e = Me(
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : a.state.date,
                a.props.locale
              ),
              n = [];
            return (
              a.props.showWeekNumbers &&
                n.push(
                  t.createElement(
                    "div",
                    { key: "W", className: "react-datepicker__day-name" },
                    a.props.weekLabel || "#"
                  )
                ),
              n.concat(
                [0, 1, 2, 3, 4, 5, 6].map(function(n) {
                  var r = H(e, n),
                    o = a.formatWeekday(r, a.props.locale);
                  return t.createElement(
                    "div",
                    { key: n, className: "react-datepicker__day-name" },
                    o
                  );
                })
              )
            );
          }),
          (a.formatWeekday = function(e, t) {
            return a.props.formatWeekDay
              ? (function(e, t, n) {
                  return t(ke(e, "dddd", n));
                })(e, a.props.formatWeekDay, t)
              : a.props.useWeekdaysShort
                ? (function(e, t) {
                    return ke(e, "EEE", t);
                  })(e, t)
                : (function(e, t) {
                    return ke(e, "EEEEEE", t);
                  })(e, t);
          }),
          (a.renderPreviousMonthButton = function() {
            if (!a.props.renderCustomHeader) {
              var e = We(a.state.date, a.props);
              if (
                (a.props.forceShowMonthNavigation ||
                  a.props.showDisabledMonthNavigation ||
                  !e) &&
                !a.props.showTimeSelectOnly
              ) {
                var n = [
                    "react-datepicker__navigation",
                    "react-datepicker__navigation--previous"
                  ],
                  r = a.decreaseMonth;
                return (
                  e &&
                    a.props.showDisabledMonthNavigation &&
                    (n.push("react-datepicker__navigation--previous--disabled"),
                    (r = null)),
                  t.createElement(
                    "button",
                    { type: "button", className: n.join(" "), onClick: r },
                    a.props.previousMonthButtonLabel
                  )
                );
              }
            }
          }),
          (a.renderNextMonthButton = function() {
            if (!a.props.renderCustomHeader) {
              var e = He(a.state.date, a.props);
              if (
                (a.props.forceShowMonthNavigation ||
                  a.props.showDisabledMonthNavigation ||
                  !e) &&
                !a.props.showTimeSelectOnly
              ) {
                var n = [
                  "react-datepicker__navigation",
                  "react-datepicker__navigation--next"
                ];
                a.props.showTimeSelect &&
                  n.push("react-datepicker__navigation--next--with-time"),
                  a.props.todayButton &&
                    n.push(
                      "react-datepicker__navigation--next--with-today-button"
                    );
                var r = a.increaseMonth;
                return (
                  e &&
                    a.props.showDisabledMonthNavigation &&
                    (n.push("react-datepicker__navigation--next--disabled"),
                    (r = null)),
                  t.createElement(
                    "button",
                    { type: "button", className: n.join(" "), onClick: r },
                    a.props.nextMonthButtonLabel
                  )
                );
              }
            }
          }),
          (a.renderCurrentMonth = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : a.state.date,
              n = ["react-datepicker__current-month"];
            return (
              a.props.showYearDropdown &&
                n.push("react-datepicker__current-month--hasYearDropdown"),
              a.props.showMonthDropdown &&
                n.push("react-datepicker__current-month--hasMonthDropdown"),
              a.props.showMonthYearDropdown &&
                n.push("react-datepicker__current-month--hasMonthYearDropdown"),
              t.createElement(
                "div",
                { className: n.join(" ") },
                ke(e, a.props.dateFormat, a.props.locale)
              )
            );
          }),
          (a.renderYearDropdown = function() {
            if (
              a.props.showYearDropdown &&
              !(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])
            )
              return t.createElement(Pt, {
                adjustDateOnChange: a.props.adjustDateOnChange,
                date: a.state.date,
                onSelect: a.props.onSelect,
                setOpen: a.props.setOpen,
                dropdownMode: a.props.dropdownMode,
                onChange: a.changeYear,
                minDate: a.props.minDate,
                maxDate: a.props.maxDate,
                year: G(a.state.date),
                scrollableYearDropdown: a.props.scrollableYearDropdown,
                yearDropdownItemNumber: a.props.yearDropdownItemNumber
              });
          }),
          (a.renderMonthDropdown = function() {
            if (
              a.props.showMonthDropdown &&
              !(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])
            )
              return t.createElement(Wt, {
                dropdownMode: a.props.dropdownMode,
                locale: a.props.locale,
                onChange: a.changeMonth,
                month: z(a.state.date),
                useShortMonthInDropdown: a.props.useShortMonthInDropdown
              });
          }),
          (a.renderMonthYearDropdown = function() {
            if (
              a.props.showMonthYearDropdown &&
              !(arguments.length > 0 && void 0 !== arguments[0] && arguments[0])
            )
              return t.createElement(Lt, {
                dropdownMode: a.props.dropdownMode,
                locale: a.props.locale,
                dateFormat: a.props.dateFormat,
                onChange: a.changeMonthYear,
                minDate: a.props.minDate,
                maxDate: a.props.maxDate,
                date: a.state.date,
                scrollableMonthYearDropdown: a.props.scrollableMonthYearDropdown
              });
          }),
          (a.renderTodayButton = function() {
            if (a.props.todayButton && !a.props.showTimeSelectOnly)
              return t.createElement(
                "div",
                {
                  className: "react-datepicker__today-button",
                  onClick: function(e) {
                    return a.props.onSelect(ne(ve()), e);
                  }
                },
                a.props.todayButton
              );
          }),
          (a.renderDefaultHeader = function(e) {
            var n = e.monthDate,
              r = e.i;
            return t.createElement(
              "div",
              { className: "react-datepicker__header" },
              a.renderCurrentMonth(n),
              t.createElement(
                "div",
                {
                  className:
                    "react-datepicker__header__dropdown react-datepicker__header__dropdown--" +
                    a.props.dropdownMode,
                  onFocus: a.handleDropdownFocus
                },
                a.renderMonthDropdown(0 !== r),
                a.renderMonthYearDropdown(0 !== r),
                a.renderYearDropdown(0 !== r)
              ),
              t.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                a.header(n)
              )
            );
          }),
          (a.renderCustomHeader = function(e) {
            var n = e.monthDate;
            if (0 !== e.i) return null;
            var r = We(a.state.date, a.props),
              o = He(a.state.date, a.props);
            return t.createElement(
              "div",
              {
                className:
                  "react-datepicker__header react-datepicker__header--custom",
                onFocus: a.props.onDropdownFocus
              },
              a.props.renderCustomHeader(
                Et({}, a.state, {
                  changeMonth: a.changeMonth,
                  changeYear: a.changeYear,
                  decreaseMonth: a.decreaseMonth,
                  increaseMonth: a.increaseMonth,
                  prevMonthButtonDisabled: r,
                  nextMonthButtonDisabled: o
                })
              ),
              t.createElement(
                "div",
                { className: "react-datepicker__day-names" },
                a.header(n)
              )
            );
          }),
          (a.renderMonths = function() {
            if (!a.props.showTimeSelectOnly) {
              for (var e = [], n = 0; a.props.monthsShown > n; ++n) {
                var r = R(a.state.date, n);
                e.push(
                  t.createElement(
                    "div",
                    {
                      key: "month-" + n,
                      ref: function(e) {
                        a.monthContainer = e;
                      },
                      className: "react-datepicker__month-container"
                    },
                    a.props.renderCustomHeader
                      ? a.renderCustomHeader({ monthDate: r, i: n })
                      : a.renderDefaultHeader({ monthDate: r, i: n }),
                    t.createElement(Xt, {
                      day: r,
                      dayClassName: a.props.dayClassName,
                      onDayClick: a.handleDayClick,
                      onDayMouseEnter: a.handleDayMouseEnter,
                      onMouseLeave: a.handleMonthMouseLeave,
                      onWeekSelect: a.props.onWeekSelect,
                      formatWeekNumber: a.props.formatWeekNumber,
                      locale: a.props.locale,
                      minDate: a.props.minDate,
                      maxDate: a.props.maxDate,
                      excludeDates: a.props.excludeDates,
                      highlightDates: a.props.highlightDates,
                      selectingDate: a.state.selectingDate,
                      includeDates: a.props.includeDates,
                      inline: a.props.inline,
                      fixedHeight: a.props.fixedHeight,
                      filterDate: a.props.filterDate,
                      preSelection: a.props.preSelection,
                      selected: a.props.selected,
                      selectsStart: a.props.selectsStart,
                      selectsEnd: a.props.selectsEnd,
                      showWeekNumbers: a.props.showWeekNumbers,
                      startDate: a.props.startDate,
                      endDate: a.props.endDate,
                      peekNextMonth: a.props.peekNextMonth,
                      setOpen: a.props.setOpen,
                      shouldCloseOnSelect: a.props.shouldCloseOnSelect,
                      renderDayContents: a.props.renderDayContents,
                      disabledKeyboardNavigation:
                        a.props.disabledKeyboardNavigation
                    })
                  )
                );
              }
              return e;
            }
          }),
          (a.renderTimeSection = function() {
            if (
              a.props.showTimeSelect &&
              (a.state.monthContainer || a.props.showTimeSelectOnly)
            )
              return t.createElement(At, {
                selected: a.props.selected,
                onChange: a.props.onTimeChange,
                format: a.props.timeFormat,
                includeTimes: a.props.includeTimes,
                intervals: a.props.timeIntervals,
                minTime: a.props.minTime,
                maxTime: a.props.maxTime,
                excludeTimes: a.props.excludeTimes,
                timeCaption: a.props.timeCaption,
                todayButton: a.props.todayButton,
                showMonthDropdown: a.props.showMonthDropdown,
                showMonthYearDropdown: a.props.showMonthYearDropdown,
                showYearDropdown: a.props.showYearDropdown,
                withPortal: a.props.withPortal,
                monthRef: a.state.monthContainer,
                injectTimes: a.props.injectTimes
              });
          }),
          (a.state = {
            date: a.getDateInView(),
            selectingDate: null,
            monthContainer: null
          }),
          a
        );
      }
      return (
        Ot(n, e),
        Nt(n, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                onDropdownFocus: function() {},
                monthsShown: 1,
                forceShowMonthNavigation: !1,
                timeCaption: "Time",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next Month"
              };
            }
          }
        ]),
        (n.prototype.componentDidMount = function() {
          var e = this;
          this.props.showTimeSelect &&
            (this.assignMonthContainer = void e.setState({
              monthContainer: e.monthContainer
            }));
        }),
        (n.prototype.componentDidUpdate = function(e) {
          this.props.preSelection &&
          !Ee(this.props.preSelection, e.preSelection)
            ? this.setState({ date: this.props.preSelection })
            : this.props.openToDate &&
              !Ee(this.props.openToDate, e.openToDate) &&
              this.setState({ date: this.props.openToDate });
        }),
        (n.prototype.render = function() {
          return t.createElement(
            this.props.container || Be,
            {
              className: r("react-datepicker", this.props.className, {
                "react-datepicker--time-only": this.props.showTimeSelectOnly
              })
            },
            this.renderPreviousMonthButton(),
            this.renderNextMonthButton(),
            this.renderMonths(),
            this.renderTodayButton(),
            this.renderTimeSection(),
            this.props.children
          );
        }),
        n
      );
    })(t.Component);
  Vt.propTypes = {
    adjustDateOnChange: n.bool,
    className: n.string,
    children: n.node,
    container: n.func,
    dateFormat: n.oneOfType([n.string, n.array]).isRequired,
    dayClassName: n.func,
    disabledKeyboardNavigation: n.bool,
    dropdownMode: n.oneOf(["scroll", "select"]),
    endDate: n.instanceOf(Date),
    excludeDates: n.array,
    filterDate: n.func,
    fixedHeight: n.bool,
    formatWeekNumber: n.func,
    highlightDates: n.instanceOf(Map),
    includeDates: n.array,
    includeTimes: n.array,
    injectTimes: n.array,
    inline: n.bool,
    locale: n.string,
    maxDate: n.instanceOf(Date),
    minDate: n.instanceOf(Date),
    monthsShown: n.number,
    onClickOutside: n.func.isRequired,
    onMonthChange: n.func,
    onYearChange: n.func,
    forceShowMonthNavigation: n.bool,
    onDropdownFocus: n.func,
    onSelect: n.func.isRequired,
    onWeekSelect: n.func,
    showTimeSelect: n.bool,
    showTimeSelectOnly: n.bool,
    timeFormat: n.string,
    timeIntervals: n.number,
    onTimeChange: n.func,
    minTime: n.instanceOf(Date),
    maxTime: n.instanceOf(Date),
    excludeTimes: n.array,
    timeCaption: n.string,
    openToDate: n.instanceOf(Date),
    peekNextMonth: n.bool,
    scrollableYearDropdown: n.bool,
    scrollableMonthYearDropdown: n.bool,
    preSelection: n.instanceOf(Date),
    selected: n.instanceOf(Date),
    selectsEnd: n.bool,
    selectsStart: n.bool,
    showMonthDropdown: n.bool,
    showMonthYearDropdown: n.bool,
    showWeekNumbers: n.bool,
    showYearDropdown: n.bool,
    startDate: n.instanceOf(Date),
    todayButton: n.string,
    useWeekdaysShort: n.bool,
    formatWeekDay: n.func,
    withPortal: n.bool,
    weekLabel: n.string,
    yearDropdownItemNumber: n.number,
    setOpen: n.func,
    shouldCloseOnSelect: n.bool,
    useShortMonthInDropdown: n.bool,
    showDisabledMonthNavigation: n.bool,
    previousMonthButtonLabel: n.string,
    nextMonthButtonLabel: n.string,
    renderCustomHeader: n.func,
    renderDayContents: n.func
  };
  var Kt = o.placements,
    Zt = (function(e) {
      function n() {
        return xt(this, n), _t(this, e.apply(this, arguments));
      }
      return (
        Ot(n, e),
        (n.prototype.render = function() {
          var e = this.props,
            n = e.popperComponent,
            a = e.popperModifiers,
            i = e.popperPlacement,
            s = e.popperProps,
            u = e.targetComponent,
            c = void 0;
          if (!e.hidePopper) {
            var l = r("react-datepicker-popper", e.className);
            c = t.createElement(
              o.Popper,
              Et({ modifiers: a, placement: i }, s),
              function(e) {
                var r = e.arrowProps;
                return t.createElement(
                  "div",
                  Et(
                    { ref: e.ref, style: e.style },
                    { className: l, "data-placement": e.placement }
                  ),
                  t.cloneElement(n, { arrowProps: r })
                );
              }
            );
          }
          return (
            this.props.popperContainer &&
              (c = t.createElement(this.props.popperContainer, {}, c)),
            t.createElement(
              o.Manager,
              null,
              t.createElement(o.Reference, null, function(e) {
                return t.createElement(
                  "div",
                  { ref: e.ref, className: "react-datepicker-wrapper" },
                  u
                );
              }),
              c
            )
          );
        }),
        Nt(n, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                hidePopper: !0,
                popperModifiers: {
                  preventOverflow: {
                    enabled: !0,
                    escapeWithReference: !0,
                    boundariesElement: "viewport"
                  }
                },
                popperProps: {},
                popperPlacement: "bottom-start"
              };
            }
          }
        ]),
        n
      );
    })(t.Component);
  Zt.propTypes = {
    className: n.string,
    hidePopper: n.bool,
    popperComponent: n.element,
    popperModifiers: n.object,
    popperPlacement: n.oneOf(Kt),
    popperContainer: n.func,
    popperProps: n.object,
    targetComponent: n.element
  };
  var $t = "react-datepicker-ignore-onclickoutside",
    Jt = a(Vt),
    en = "Date input not valid.",
    tn = (function(e) {
      function n(a) {
        xt(this, n);
        var o = _t(this, e.call(this, a));
        return (
          (o.getPreSelection = function() {
            return o.props.openToDate
              ? o.props.openToDate
              : o.props.selectsEnd && o.props.startDate
                ? o.props.startDate
                : o.props.selectsStart && o.props.endDate
                  ? o.props.endDate
                  : ve();
          }),
          (o.calcInitialState = function() {
            var e = o.getPreSelection(),
              t = Ie(o.props),
              n = Le(o.props),
              r = t && ue(e, t) ? t : n && se(e, n) ? n : e;
            return {
              open: o.props.startOpen || !1,
              preventFocus: !1,
              preSelection: o.props.selected ? o.props.selected : r,
              highlightDates: Re(o.props.highlightDates),
              focused: !1
            };
          }),
          (o.clearPreventFocusTimeout = function() {
            o.preventFocusTimeout && clearTimeout(o.preventFocusTimeout);
          }),
          (o.setFocus = function() {
            o.input && o.input.focus && o.input.focus();
          }),
          (o.setBlur = function() {
            o.input && o.input.blur && o.input.blur(), o.cancelFocusInput();
          }),
          (o.setOpen = function(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            o.setState(
              {
                open: e,
                preSelection:
                  e && o.state.open
                    ? o.state.preSelection
                    : o.calcInitialState().preSelection,
                lastPreSelectChange: rn
              },
              function() {
                e ||
                  o.setState(
                    function(e) {
                      return { focused: !!t && e.focused };
                    },
                    function() {
                      !t && o.setBlur(), o.setState({ inputValue: null });
                    }
                  );
              }
            );
          }),
          (o.inputOk = function() {
            return i(o.state.preSelection);
          }),
          (o.isCalendarOpen = function() {
            return void 0 === o.props.open
              ? o.state.open && !o.props.disabled && !o.props.readOnly
              : o.props.open;
          }),
          (o.handleFocus = function(e) {
            o.state.preventFocus ||
              (o.props.onFocus(e),
              o.props.preventOpenOnFocus || o.props.readOnly || o.setOpen(!0)),
              o.setState({ focused: !0 });
          }),
          (o.cancelFocusInput = function() {
            clearTimeout(o.inputFocusTimeout), (o.inputFocusTimeout = null);
          }),
          (o.deferFocusInput = function() {
            o.cancelFocusInput(),
              (o.inputFocusTimeout = setTimeout(function() {
                return o.setFocus();
              }, 1));
          }),
          (o.handleDropdownFocus = function() {
            o.cancelFocusInput();
          }),
          (o.handleBlur = function(e) {
            o.state.open && !o.props.withPortal
              ? o.deferFocusInput()
              : o.props.onBlur(e),
              o.setState({ focused: !1 });
          }),
          (o.handleCalendarClickOutside = function(e) {
            o.props.inline || o.setOpen(!1),
              o.props.onClickOutside(e),
              o.props.withPortal && e.preventDefault();
          }),
          (o.handleChange = function() {
            for (var e = arguments.length, t = Array(e), n = 0; e > n; n++)
              t[n] = arguments[n];
            var r = t[0];
            if (
              !o.props.onChangeRaw ||
              (o.props.onChangeRaw.apply(o, t),
              "function" == typeof r.isDefaultPrevented &&
                !r.isDefaultPrevented())
            ) {
              o.setState({
                inputValue: r.target.value,
                lastPreSelectChange: nn
              });
              var a = new Date(),
                i = r.target.value.split("/");
              i[0] && "" !== i[0].trim() && !isNaN(i[0]) && a.setDate(i[0]),
                i[1] &&
                  "" !== i[1].trim() &&
                  !isNaN(i[1]) &&
                  a.setMonth(i[1] - 1),
                i[2] &&
                  "" !== i[2].trim() &&
                  !isNaN(i[2]) &&
                  (a =
                    i[2].length > 2
                      ? be(r.target.value, "dd/MM/yyyy", o.props.locale)
                      : be(r.target.value, "dd/MM/yy", o.props.locale)),
                (!a && r.target.value) || o.setSelected(a, r, !0);
            }
          }),
          (o.handleSelect = function(e, t) {
            o.setState({ preventFocus: !0 }, function() {
              return (
                (o.preventFocusTimeout = setTimeout(function() {
                  return o.setState({ preventFocus: !1 });
                }, 50)),
                o.preventFocusTimeout
              );
            }),
              o.setSelected(e, t),
              !o.props.shouldCloseOnSelect || o.props.showTimeSelect
                ? o.setPreSelection(e)
                : o.props.inline || o.setOpen(!1);
          }),
          (o.setSelected = function(e, t, n) {
            var r = e;
            if (null !== r && qe(r, o.props))
              Pe(r, o.props) &&
                (o.props.onChange(e, t), o.props.onSelect(r, t));
            else {
              if (!Ee(o.props.selected, r) || o.props.allowSameDay) {
                if (null !== r) {
                  if (o.props.selected) {
                    var a = o.props.selected;
                    n && (a = ve(r)),
                      (r = Te(r, {
                        hour: X(a),
                        minute: Q(a),
                        second: (function(e, t) {
                          if (1 > arguments.length)
                            throw new TypeError(
                              "1 argument required, but only " +
                                arguments.length +
                                " present"
                            );
                          return c(e, t).getSeconds();
                        })(a)
                      }));
                  }
                  o.props.inline || o.setState({ preSelection: r });
                }
                o.props.onChange(r, t);
              }
              o.props.onSelect(r, t), n || o.setState({ inputValue: null });
            }
          }),
          (o.setPreSelection = function(e) {
            (!(void 0 !== o.props.minDate && void 0 !== o.props.maxDate) ||
              !e ||
              Oe(e, o.props.minDate, o.props.maxDate)) &&
              o.setState({ preSelection: e });
          }),
          (o.handleTimeChange = function(e) {
            var t = Te(
              o.props.selected ? o.props.selected : o.getPreSelection(),
              { hour: X(e), minute: Q(e) }
            );
            o.setState({ preSelection: t }),
              o.props.onChange(t),
              o.props.shouldCloseOnSelect && o.setOpen(!1),
              o.setState({ inputValue: null });
          }),
          (o.onInputClick = function() {
            o.props.disabled || o.props.readOnly || o.setOpen(!0),
              o.props.onInputClick();
          }),
          (o.onInputKeyDown = function(e) {
            o.props.onKeyDown(e);
            var t = e.key;
            if (o.state.open || o.props.inline || o.props.preventOpenOnFocus) {
              var n = ve(o.state.preSelection);
              if ("Enter" === t)
                e.preventDefault(),
                  o.inputOk() && o.state.lastPreSelectChange === rn
                    ? (o.handleSelect(n, e),
                      !o.props.shouldCloseOnSelect && o.setPreSelection(n))
                    : o.setOpen(!1);
              else if ("Escape" === t)
                e.preventDefault(),
                  o.setOpen(!1),
                  o.inputOk() || o.props.onInputError({ code: 1, msg: en });
              else if ("Tab" === t) o.setOpen(!1, !0);
              else if (!o.props.disabledKeyboardNavigation) {
                var r = void 0;
                switch (t) {
                  case "ArrowLeft":
                    r = (function(e, t, n) {
                      if (2 > arguments.length)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return H(e, -s(t), n);
                    })(n, 1);
                    break;
                  case "ArrowRight":
                    r = H(n, 1);
                    break;
                  case "ArrowUp":
                    r = (function(e, t, n) {
                      if (2 > arguments.length)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return I(e, -s(t), n);
                    })(n, 1);
                    break;
                  case "ArrowDown":
                    r = I(n, 1);
                    break;
                  case "PageUp":
                    r = j(n, 1);
                    break;
                  case "PageDown":
                    r = R(n, 1);
                    break;
                  case "Home":
                    r = (function(e, t, n) {
                      if (2 > arguments.length)
                        throw new TypeError(
                          "2 arguments required, but only " +
                            arguments.length +
                            " present"
                        );
                      return B(e, -s(t), n);
                    })(n, 1);
                    break;
                  case "End":
                    r = B(n, 1);
                }
                if (!r)
                  return void (
                    o.props.onInputError &&
                    o.props.onInputError({ code: 1, msg: en })
                  );
                e.preventDefault(),
                  o.setState({ lastPreSelectChange: rn }),
                  o.props.adjustDateOnChange && o.setSelected(r),
                  o.setPreSelection(r);
              }
            } else ("ArrowDown" !== t && "ArrowUp" !== t) || o.onInputClick();
          }),
          (o.onClearClick = function(e) {
            e && e.preventDefault && e.preventDefault(),
              o.props.onChange(null, e),
              o.setState({ inputValue: null });
          }),
          (o.clear = function() {
            o.onClearClick();
          }),
          (o.renderCalendar = function() {
            return o.props.inline || o.isCalendarOpen()
              ? t.createElement(
                  Jt,
                  {
                    ref: function(e) {
                      o.calendar = e;
                    },
                    locale: o.props.locale,
                    adjustDateOnChange: o.props.adjustDateOnChange,
                    setOpen: o.setOpen,
                    shouldCloseOnSelect: o.props.shouldCloseOnSelect,
                    dateFormat: o.props.dateFormatCalendar,
                    useWeekdaysShort: o.props.useWeekdaysShort,
                    formatWeekDay: o.props.formatWeekDay,
                    dropdownMode: o.props.dropdownMode,
                    selected: o.props.selected,
                    preSelection: o.state.preSelection,
                    onSelect: o.handleSelect,
                    onWeekSelect: o.props.onWeekSelect,
                    openToDate: o.props.openToDate,
                    minDate: o.props.minDate,
                    maxDate: o.props.maxDate,
                    selectsStart: o.props.selectsStart,
                    selectsEnd: o.props.selectsEnd,
                    startDate: o.props.startDate,
                    endDate: o.props.endDate,
                    excludeDates: o.props.excludeDates,
                    filterDate: o.props.filterDate,
                    onClickOutside: o.handleCalendarClickOutside,
                    formatWeekNumber: o.props.formatWeekNumber,
                    highlightDates: o.state.highlightDates,
                    includeDates: o.props.includeDates,
                    includeTimes: o.props.includeTimes,
                    injectTimes: o.props.injectTimes,
                    inline: o.props.inline,
                    peekNextMonth: o.props.peekNextMonth,
                    showMonthDropdown: o.props.showMonthDropdown,
                    useShortMonthInDropdown: o.props.useShortMonthInDropdown,
                    showMonthYearDropdown: o.props.showMonthYearDropdown,
                    showWeekNumbers: o.props.showWeekNumbers,
                    showYearDropdown: o.props.showYearDropdown,
                    withPortal: o.props.withPortal,
                    forceShowMonthNavigation: o.props.forceShowMonthNavigation,
                    showDisabledMonthNavigation:
                      o.props.showDisabledMonthNavigation,
                    scrollableYearDropdown: o.props.scrollableYearDropdown,
                    scrollableMonthYearDropdown:
                      o.props.scrollableMonthYearDropdown,
                    todayButton: o.props.todayButton,
                    weekLabel: o.props.weekLabel,
                    outsideClickIgnoreClass: $t,
                    fixedHeight: o.props.fixedHeight,
                    monthsShown: o.props.monthsShown,
                    onDropdownFocus: o.handleDropdownFocus,
                    onMonthChange: o.props.onMonthChange,
                    onYearChange: o.props.onYearChange,
                    dayClassName: o.props.dayClassName,
                    showTimeSelect: o.props.showTimeSelect,
                    showTimeSelectOnly: o.props.showTimeSelectOnly,
                    onTimeChange: o.handleTimeChange,
                    timeFormat: o.props.timeFormat,
                    timeIntervals: o.props.timeIntervals,
                    minTime: o.props.minTime,
                    maxTime: o.props.maxTime,
                    excludeTimes: o.props.excludeTimes,
                    timeCaption: o.props.timeCaption,
                    className: o.props.calendarClassName,
                    container: o.props.calendarContainer,
                    yearDropdownItemNumber: o.props.yearDropdownItemNumber,
                    previousMonthButtonLabel: o.props.previousMonthButtonLabel,
                    nextMonthButtonLabel: o.props.nextMonthButtonLabel,
                    disabledKeyboardNavigation:
                      o.props.disabledKeyboardNavigation,
                    renderCustomHeader: o.props.renderCustomHeader,
                    popperProps: o.props.popperProps,
                    renderDayContents: o.props.renderDayContents
                  },
                  o.props.children
                )
              : null;
          }),
          (o.renderDateInput = function() {
            var e,
              n,
              a = r(o.props.className, ((e = {}), (e[$t] = o.state.open), e)),
              i =
                o.props.customInput ||
                t.createElement("input", { type: "text" }),
              s = o.props.customInputRef || "ref",
              u =
                "string" == typeof o.props.value
                  ? o.props.value
                  : "string" == typeof o.state.inputValue
                    ? o.state.inputValue
                    : (function(e, t) {
                        var n = t.dateFormat,
                          r = t.locale;
                        return (
                          (e && ke(e, Array.isArray(n) ? n[0] : n, r)) || ""
                        );
                      })(o.props.selected, o.props);
            return t.cloneElement(
              i,
              ((n = {}),
              (n[s] = function(e) {
                o.input = e;
              }),
              (n.value = u),
              (n.onBlur = o.handleBlur),
              (n.onChange = o.handleChange),
              (n.onClick = o.onInputClick),
              (n.onFocus = o.handleFocus),
              (n.onKeyDown = o.onInputKeyDown),
              (n.id = o.props.id),
              (n.name = o.props.name),
              (n.autoFocus = o.props.autoFocus),
              (n.placeholder = o.props.placeholderText),
              (n.disabled = o.props.disabled),
              (n.autoComplete = o.props.autoComplete),
              (n.className = a),
              (n.title = o.props.title),
              (n.readOnly = o.props.readOnly),
              (n.required = o.props.required),
              (n.tabIndex = o.props.tabIndex),
              n)
            );
          }),
          (o.renderClearButton = function() {
            return o.props.isClearable && null != o.props.selected
              ? t.createElement("button", {
                  type: "button",
                  className: "react-datepicker__close-icon",
                  onClick: o.onClearClick,
                  title: o.props.clearButtonTitle,
                  tabIndex: -1
                })
              : null;
          }),
          (o.state = o.calcInitialState()),
          o
        );
      }
      return (
        Ot(n, e),
        Nt(n, null, [
          {
            key: "defaultProps",
            get: function() {
              return {
                allowSameDay: !1,
                dateFormat: "MM/dd/yyyy",
                dateFormatCalendar: "LLLL yyyy",
                onChange: function() {},
                disabled: !1,
                disabledKeyboardNavigation: !1,
                dropdownMode: "scroll",
                onFocus: function() {},
                onBlur: function() {},
                onKeyDown: function() {},
                onInputClick: function() {},
                onSelect: function() {},
                onClickOutside: function() {},
                onMonthChange: function() {},
                preventOpenOnFocus: !1,
                onYearChange: function() {},
                onInputError: function() {},
                monthsShown: 1,
                readOnly: !1,
                withPortal: !1,
                shouldCloseOnSelect: !0,
                showTimeSelect: !1,
                timeIntervals: 30,
                timeCaption: "Time",
                previousMonthButtonLabel: "Previous Month",
                nextMonthButtonLabel: "Next month",
                renderDayContents: function(e) {
                  return e;
                }
              };
            }
          }
        ]),
        (n.prototype.componentDidUpdate = function(e, t) {
          e.inline &&
            (function(e, t) {
              return e && t ? z(e) !== z(t) || G(e) !== G(t) : e !== t;
            })(e.selected, this.props.selected) &&
            this.setPreSelection(this.props.selected),
            e.highlightDates !== this.props.highlightDates &&
              this.setState({ highlightDates: Re(this.props.highlightDates) }),
            !t.focused &&
              (function(e, t) {
                return !(!e || !t || ie(e, t));
              })(e.selected, this.props.selected) &&
              this.setState({ inputValue: null });
        }),
        (n.prototype.componentWillUnmount = function() {
          this.clearPreventFocusTimeout();
        }),
        (n.prototype.render = function() {
          var e = this.renderCalendar();
          return this.props.inline && !this.props.withPortal
            ? e
            : this.props.withPortal
              ? t.createElement(
                  "div",
                  null,
                  this.props.inline
                    ? null
                    : t.createElement(
                        "div",
                        { className: "react-datepicker__input-container" },
                        this.renderDateInput(),
                        this.renderClearButton()
                      ),
                  this.state.open || this.props.inline
                    ? t.createElement(
                        "div",
                        { className: "react-datepicker__portal" },
                        e
                      )
                    : null
                )
              : t.createElement(Zt, {
                  className: this.props.popperClassName,
                  hidePopper: !this.isCalendarOpen(),
                  popperModifiers: this.props.popperModifiers,
                  targetComponent: t.createElement(
                    "div",
                    { className: "react-datepicker__input-container" },
                    this.renderDateInput(),
                    this.renderClearButton()
                  ),
                  popperContainer: this.props.popperContainer,
                  popperComponent: e,
                  popperPlacement: this.props.popperPlacement,
                  popperProps: this.props.popperProps
                });
        }),
        n
      );
    })(t.Component);
  tn.propTypes = {
    adjustDateOnChange: n.bool,
    allowSameDay: n.bool,
    autoComplete: n.string,
    autoFocus: n.bool,
    calendarClassName: n.string,
    calendarContainer: n.func,
    children: n.node,
    className: n.string,
    customInput: n.element,
    customInputRef: n.string,
    dateFormat: n.oneOfType([n.string, n.array]),
    dateFormatCalendar: n.string,
    dayClassName: n.func,
    disabled: n.bool,
    disabledKeyboardNavigation: n.bool,
    dropdownMode: n.oneOf(["scroll", "select"]).isRequired,
    endDate: n.instanceOf(Date),
    excludeDates: n.array,
    filterDate: n.func,
    fixedHeight: n.bool,
    formatWeekNumber: n.func,
    highlightDates: n.array,
    id: n.string,
    includeDates: n.array,
    includeTimes: n.array,
    injectTimes: n.array,
    inline: n.bool,
    isClearable: n.bool,
    locale: n.string,
    maxDate: n.instanceOf(Date),
    minDate: n.instanceOf(Date),
    monthsShown: n.number,
    name: n.string,
    onBlur: n.func,
    onChange: n.func.isRequired,
    onSelect: n.func,
    onWeekSelect: n.func,
    onClickOutside: n.func,
    onChangeRaw: n.func,
    onFocus: n.func,
    onInputClick: n.func,
    onKeyDown: n.func,
    onMonthChange: n.func,
    onYearChange: n.func,
    onInputError: n.func,
    open: n.bool,
    openToDate: n.instanceOf(Date),
    peekNextMonth: n.bool,
    placeholderText: n.string,
    popperContainer: n.func,
    popperClassName: n.string,
    popperModifiers: n.object,
    popperPlacement: n.oneOf(Kt),
    popperProps: n.object,
    preventOpenOnFocus: n.bool,
    readOnly: n.bool,
    required: n.bool,
    scrollableYearDropdown: n.bool,
    scrollableMonthYearDropdown: n.bool,
    selected: n.instanceOf(Date),
    selectsEnd: n.bool,
    selectsStart: n.bool,
    showMonthDropdown: n.bool,
    showMonthYearDropdown: n.bool,
    showWeekNumbers: n.bool,
    showYearDropdown: n.bool,
    forceShowMonthNavigation: n.bool,
    showDisabledMonthNavigation: n.bool,
    startDate: n.instanceOf(Date),
    startOpen: n.bool,
    tabIndex: n.number,
    timeCaption: n.string,
    title: n.string,
    todayButton: n.node,
    useWeekdaysShort: n.bool,
    formatWeekDay: n.func,
    value: n.string,
    weekLabel: n.string,
    withPortal: n.bool,
    yearDropdownItemNumber: n.number,
    shouldCloseOnSelect: n.bool,
    showTimeSelect: n.bool,
    showTimeSelectOnly: n.bool,
    timeFormat: n.string,
    timeIntervals: n.number,
    minTime: n.instanceOf(Date),
    maxTime: n.instanceOf(Date),
    excludeTimes: n.array,
    useShortMonthInDropdown: n.bool,
    clearButtonTitle: n.string,
    previousMonthButtonLabel: n.string,
    nextMonthButtonLabel: n.string,
    renderCustomHeader: n.func,
    renderDayContents: n.func
  };
  var nn = "input",
    rn = "navigate";
  (e.registerLocale = function(e, t) {
    window.__localeData__ || (window.__localeData__ = {}),
      (window.__localeData__[e] = t);
  }),
    (e.setDefaultLocale = function(e) {
      window.__localeId__ = e;
    }),
    (e.getDefaultLocale = _e),
    (e.default = tn),
    (e.CalendarContainer = Be),
    Object.defineProperty(e, "__esModule", { value: !0 });
});
