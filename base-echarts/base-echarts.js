import { defineComponent as L, ref as R, onMounted as B, watchEffect as A, watch as T, onUnmounted as C, openBlock as M, createElementBlock as O, normalizeStyle as _ } from "vue";
import * as G from "echarts";
function H(s, a, e) {
  let r = {
    interval: 2e3,
    loopSeries: !1,
    seriesIndex: 0,
    updateData: null
  };
  if (!s || !a)
    return;
  let t = 0, n = 0, o = 0, i = a.series.length, d = 0, l, p = !0, h = 0, v = 0;
  if (i === 0)
    return;
  e ? (e.interval = e.interval || r.interval, e.loopSeries = e.loopSeries || r.loopSeries, e.seriesIndex = e.seriesIndex || r.seriesIndex, e.updateData = e.updateData || r.updateData) : e = r, e.seriesIndex < 0 || e.seriesIndex >= i ? n = 0 : n = e.seriesIndex;
  function x() {
    o && (clearInterval(o), o = 0), s.off("mousemove", g), S.off("mousemove", b), S.off("globalout", D);
  }
  function y() {
    let u = t === 0 && e.loopSeries ? n === 0 ? i - 1 : n - 1 : n, c = a.series[u].type;
    (c === "pie" || c === "radar" || c === "map") && s.dispatchAction({
      type: "downplay",
      seriesIndex: h,
      dataIndex: v
    });
  }
  function z() {
    let u = 0, c = 0;
    function m() {
      let k = s.getDom();
      if (document !== k && !document.documentElement.contains(k)) {
        x();
        return;
      }
      t === 0 && !p && typeof e.updateData == "function" && (e.updateData(), s.setOption(a));
      let w = a.series, f = w[n];
      if (!w || w.length === 0 || !f || !f.type || !f.data || !f.data.length)
        return;
      l = f.type, d = f.data.length;
      let I = {
        seriesIndex: n
      };
      switch (l) {
        case "pie":
          if (!f.data[t].name || f.data[t].name === "\u7A7A" || !f.data[t].value) {
            c += 1, t = (t + 1) % d, e.loopSeries && t === 0 ? (c === d && (u += 1), c = 0, n = (n + 1) % i, n === e.seriesIndex ? i !== u ? (u = 0, m()) : (u = 0, x()) : m()) : !e.loopSeries && t === 0 ? d !== c ? (c = 0, m()) : (c = 0, x()) : m();
            return;
          }
        case "map":
        case "chord":
          I.name = f.data[t].name;
          break;
        case "radar":
          I.seriesIndex = n;
          break;
        case "lines":
          t = 0, n = (n + 1) % i, u++, i !== u ? m() : x();
          return;
        default:
          I.dataIndex = t;
          break;
      }
      (l === "pie" || l === "radar" || l === "map") && (p || y(), s.dispatchAction({
        type: "highlight",
        seriesIndex: n,
        dataIndex: t
      })), I.type = "showTip", s.dispatchAction(I), h = n, v = t, t = (t + 1) % d, e.loopSeries && t === 0 && (c = 0, n = (n + 1) % i, n === e.seriesIndex && (u = 0)), p = !1;
    }
    m(), o = setInterval(m, e.interval);
  }
  function g() {
    o && (clearInterval(o), o = 0, (l === "pie" || l === "radar" || l === "map") && y());
  }
  let S = s.getZr();
  function b(u) {
    u.event, g();
  }
  function D() {
    o || z();
  }
  return s.on("mousemove", g), S.on("mousemove", b), S.on("globalout", D), z(), {
    clearLoop: x
  };
}
const P = {
  loopShowTooltip: H
};
function E(s) {
  const a = G.init(s), e = (i) => {
    a.setOption(i);
  }, r = () => {
    a.resize();
  };
  window.addEventListener("resize", () => {
    a.resize();
  });
  const t = (i, d, l, p, h, v = null) => {
    d && (v && v.clearLoop(), v = null, P.loopShowTooltip(a, i, {
      interval: l,
      loopSeries: p,
      seriesIndex: h
    }));
  }, n = function(i, d) {
    let l = null;
    return function() {
      const p = this, h = arguments;
      l || (l = setTimeout(function() {
        i.apply(p, h), l = null;
      }, d));
    };
  }, o = new ResizeObserver((i) => {
    for (const d of i)
      d.target && n(a.resize(), 200);
  });
  return {
    echartInstance: a,
    ob: o,
    setOptions: e,
    updateSize: r,
    setTooltip: t
  };
}
const U = /* @__PURE__ */ L({
  __name: "index",
  props: {
    options: null,
    istool: { type: Boolean, default: !1 },
    interval: { default: 2e3 },
    loopSeries: { type: Boolean, default: !0 },
    index: null,
    width: { default: "100%" },
    height: { default: "100%" }
  },
  emits: ["echartsClick", "updateSize"],
  setup(s, { emit: a }) {
    const e = s, r = R();
    return B(() => {
      const { setOptions: t, setTooltip: n, updateSize: o, echartInstance: i, ob: d } = E(
        r.value
      );
      d.observe(r.value), A(() => {
        n(e.options, e.istool, e.interval, e.loopSeries, e.seriesIndex);
      }), T(
        [() => e.width, () => e.height],
        () => {
          setTimeout(o, 0);
        },
        {
          deep: !0
        }
      ), T(
        [() => e.options],
        () => {
          t(e.options);
        },
        {
          deep: !0,
          immediate: !0
        }
      ), i.on("click", function(l) {
        a("echartsClick", l);
      }), a("updateSize", o);
    }), C(() => {
      const { ob: t } = E(r.value);
      t.unobserve(r.value);
    }), (t, n) => (M(), O("div", {
      ref_key: "echartDivRef",
      ref: r,
      style: _({ width: s.width, height: s.height })
    }, null, 4));
  }
}), Z = [U], q = function(s) {
  Z.forEach((a) => {
    s.component(a.name, a);
  });
};
export {
  U as BaseEcharts,
  q as install
};
