const baseProps = {
  width: 300,
  height: 250,
};

const theme = {
  area: Object.assign({
    style: {
      data: {
        stroke: "#94f267",
        fill: "rgba(148, 242, 103, 0.3)",
        strokeWidth: 2
      },
    }
  }, baseProps),
  axis: Object.assign({
    style: {
      axis: {
        stroke: "#979ba9",
      },
      tickLabels: {
        fill: "#979ba9",
        padding: 10
      },
      grid: {
        fill: "none",
        stroke: "none",
        pointerEvents: "painted"
      },
    }
  }, baseProps),
  chart: baseProps,
  voronoi: Object.assign({
    style: {
      data: {
        fill: "transparent",
        stroke: "transparent",
        strokeWidth: 0
      },
    }
  }, baseProps)
};


export default theme;