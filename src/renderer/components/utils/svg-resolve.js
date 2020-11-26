export default {
  name: 'svg-resolve',
  render (h) {
    return h('svg', {
      attrs: {
        viewBox: this.viewBox,
        width: this.svgWidth,
        height: this.svgHeight,
        fill: this.fillColor,
        stroke: this.strokeColor
      },
      on: {
        mouseover: () => this.mouseHandle('over'),
        mouseleave: () => this.mouseHandle('leave')
      }
    }, [h('path', { attrs: { d: this.dataPath } })])
  },

  props: {
    path: {
      type: String,
      default: ''
    },
    fill: {
      type: String,
      default: ''
    },
    fillHover: {
      type: String,
      default: ''
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    stroke: {
      type: String,
      default: 'none'
    },
    strokeHover: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      viewBox: '0 0 24 24',
      dataPath: '',
      fillColor: '',
      strokeColor: '',
      svgWidth: '',
      svgHeight: '',
      svg: '',
      oldFill: '',
      oldStroke: ''
    }
  },

  watch: {
    fill (val) {
      this.oldFill = val
      this.updateSvgFillColor(val)
    },
    stroke (val) {
      this.oldStroke = val
      this.updateSvgStrokeColor(val)
    },
    width (val) {
      console.log(val)
      this.updateWidth(val)
    },
    height (val) {
      this.updateHeight(val)
    },
    path () {
      this.createSvgEl()
    }
  },

  mounted () {
    this.createSvgEl()
  },

  methods: {
    async createSvgEl () {
      if (!this.path) return

      try {
        const { data } = await this.$http({ type: 'GET', url: this.path })

        const dom = new DOMParser()
        // 将 XML 解析成 dom 节点
        const svg = dom.parseFromString(data, 'text/xml')
        this.svg = svg
        const svgTag = svg.querySelector('svg')
        const pathTag = svg.querySelector('path')

        if (!pathTag) {
          console.error(`[ERROR] : svg-resolve, Can't load element from this path.\nPath : ${this.path}`)
          return
        }

        this.viewBox = svgTag.getAttribute('viewBox')
        this.oldFill = pathTag.getAttribute('fill')
        this.oldStroke = pathTag.getAttribute('stroke')
        this.updateSvg(pathTag.getAttribute('d'))
        this.updateSvgFillColor(this.fill || this.oldFill)
        this.updateSvgStrokeColor(this.stroke || this.oldStroke)
        this.updateWidth(this.width || svgTag.getAttribute('width'))
        this.updateHeight(this.height || svgTag.getAttribute('height'))
      } catch (error) {
        console.error(error)
      }
    },

    updateSvg (d) {
      d ? (this.dataPath = d) : console.error(`Can't get attribute 'd' from your SVG file.\nPath : ${this.path}`)
    },

    updateWidth (w) {
      this.svgWidth = w
    },

    updateHeight (h) {
      this.svgHeight = h
    },

    updateSvgFillColor (fill) {
      this.fillColor = fill
    },

    updateSvgStrokeColor (stroke) {
      this.strokeColor = stroke
    },

    mouseHandle (type) {
      switch (type) {
        case 'over':
          this.fillHover && this.updateSvgFillColor(this.fillHover)
          this.strokeHover && this.updateSvgFillColor(this.strokeHover)
          break
        case 'leave':
          this.fillHover && this.updateSvgFillColor(this.oldFill)
          this.strokeHover && this.updateSvgFillColor(this.oldStroke)
          break
      }
    }
  }
}
