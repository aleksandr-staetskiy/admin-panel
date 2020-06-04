<template>
  <div class="facade-editor">
    <a-layout style="padding: 32px 24px 20px; overflow: hidden; height: 100%;">
      <a-layout-content
        class="content-area"
        :style="{ background: '#fff',
                  padding: '30px 24px 24px 24px',
                  margin: '17px 0 0 0',
                  overflowY: 'auto',
                  position: 'relative',
        }"
      >
        <div class="content-header fixed-width">
          <h1 class="content-title">
            План 1 этажа
          </h1>
          <div class="btn-group">
            <a-button class="create-btn">
              Создать
            </a-button>
            <a-button
              style="margin-left: 16px"
            >
              Изменить
            </a-button>
            <a-button
              style="margin-left: 16px"
              class="delete-btn"
            >
              Удалить
            </a-button>
          </div>
        </div>
        <div
          class="facade-editor-container"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="container-svg"
            viewBox="0 0 800 500"
          >

            <image
              width="100%"
              height="100%"
              xlink:href="../assets/facade.png"
              :style="{ opacity }"
            />
          </svg>
        </div>
        <div class="editor-bottom">
          <div class="editor-color">
            <span class="editor-color-descriptor">Цвет разметки</span>
            <div class="color-palette">
              <div
                v-for="color in colors"
                :key="color"
                class="color-picker"
                :class="{ active: color === activeColor }"
                :style="{ background: color} "
                @click="changeActiveColor(color)"
              />
            </div>
          </div>
          <div class="editor-status">
            Размечено  1 область / Помещений назначено 1
          </div>
          <a-input-number
            :min="0"
            :max="1"
            :step="0.1"
            v-model="opacity"
          />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>

// import PlanEditor from '../PointsDrawer.js';
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
export default {
  name: 'PlanEditor',
  data() {
    return {
      opacity: 0.6,
      activeColor: '#FF5C5C',
      colors: [
        '#FF5C5C',
        '#FFDD63',
        '#51D5FF',
        '#B4DC73',
        '#F291DD',
      ],
    };
  },
  mounted() {
    let ableToDrawing = false;
    let dragging = false;
    let drawing = false;
    let startPoint;

    const createBtn = document.querySelector('.create-btn');
    const deleteBtn = document.querySelector('.delete-btn');
    const editorArea = document.querySelector('.facade-editor-container');
    const svg = d3.select('.container-svg');
    const points = [];

    let g;

    createBtn.addEventListener('click', () => {
      ableToDrawing = true;
    });

    deleteBtn.addEventListener('click', () => {
      ableToDrawing = false;

      editorArea.addEventListener('click', (e) => {
        if (ableToDrawing) {
          return;
        }

        if (e.target.tagName === 'polygon') {
          e.target.parentNode.remove();
        }
      });
    });

    // behaviors
    const dragger = d3.behavior.drag()
      .on('drag', handleDrag)
      .on('dragend', (d) => {
        dragging = false;
      });

    svg.on('mouseup', function () {
      if (!ableToDrawing) {
        return;
      }

      if (dragging) {
        return;
      }

      drawing = true;
      startPoint = [d3.mouse(this)[0], d3.mouse(this)[1]];

      if (svg.select('g.drawPoly').empty()) {
        g = svg.append('g').attr('class', 'drawPoly');
      }

      if (d3.event.target.hasAttribute('is-handle')) {
        closePolygon();

        return;
      }

      points.push(d3.mouse(this));
      g.select('polyline').remove();

      const polyline = g.append('polyline').attr('points', points)
        .style('fill', 'none')
        .attr('stroke', '#000');

      for (let i = 0; i < points.length; i++) {
        g.append('circle')
          .attr('cx', points[i][0])
          .attr('cy', points[i][1])
          .attr('r', 4)
          .attr('fill', 'yellow')
          .attr('stroke', '#000')
          .attr('is-handle', 'true')
          .style({ cursor: 'pointer' });
      }
    });

    function closePolygon() {
      svg.select('g.drawPoly').remove();

      const g = svg.append('g');

      g.append('polygon')
        .attr('points', points)
        .attr('class', 'svg-polygon')
        .style('fill', getRandomColor());

      for (let i = 0; i < points.length; i++) {
        const circle = g.selectAll('circles')
          .data([points[i]])
          .enter()
          .append('circle')
          .attr('cx', points[i][0])
          .attr('cy', points[i][1])
          .attr('r', 4)
          .attr('fill', '#FDBC07')
          .attr('stroke', '#000')
          .attr('is-handle', 'true')
          .style({ cursor: 'move' })
          .call(dragger);
      }

      points.splice(0);
      drawing = false;
    }

    svg.on('mousemove', function () {
      if (!drawing) {
        return;
      }

      const g = d3.select('g.drawPoly');

      g.select('line').remove();

      const line = g.append('line')
        .attr('x1', startPoint[0])
        .attr('y1', startPoint[1])
        .attr('x2', d3.mouse(this)[0] + 2)
        .attr('y2', d3.mouse(this)[1])
        .attr('stroke', '#53DBF3')
        .attr('stroke-width', 1);
    });

    function handleDrag() {
      if (drawing) {
        return;
      }

      const dragCircle = d3.select(this);
      const newPoints = [];

      let circle;

      dragging = true;

      const poly = d3.select(this.parentNode).select('polygon');
      const circles = d3.select(this.parentNode).selectAll('circle');

      dragCircle
        .attr('cx', d3.event.x)
        .attr('cy', d3.event.y);

      for (let i = 0; i < circles[0].length; i++) {
        circle = d3.select(circles[0][i]);
        newPoints.push([circle.attr('cx'), circle.attr('cy')]);
      }

      poly.attr('points', newPoints);
    }

    const getRandomColor = () => this.activeColor;
  },

  methods: {
    changeActiveColor(color) {
      this.activeColor = color;
    },
  },
};
</script>

<style lang="scss" scoped>
  .content-area {
    display: flex;
    flex-direction: column;
  }

  .facade-editor {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    &-container {
      width: 800px;
      height: 500px;
      margin: 0 auto;
    }
  }

  .container-svg {
    width: 100%;
    height: 100%;
  }

  .color {
    &-palette {
      display: flex;
    }

    &-picker {
      cursor: pointer;
      position: relative;
      width: 32px;
      height: 32px;
      margin-left: 8px;
      border-radius: 50%;
      &.active {
        border: 2px solid rgba(0, 0, 0, 0.65);
      }
      &:after {
        content: '';
        position: absolute;
        left: -1px;
        right: -1px;
        top: -1px;
        bottom: -1px;
        background: transparent;
        border: 6px solid #fff;
        border-radius: 50%;
      }
    }
  }

  .editor {
    &-bottom {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: baseline;
      padding-top: 30px;
      padding-bottom: 15px;
      margin-top: auto;
    }
    &-color {
      display: flex;
      align-items: center;
    }
  }

</style>
