import React, { useState } from 'react'
import './Results.styles.css'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import { MdMenu } from "react-icons/md";
 
const Results = () => {
  const [position, setPosition] = useState('President')
  const [plugins, setPlugins] = useState([{
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        const { ctx } = chart
        // Get options from the center object in options
        const centerConfig = chart.config.options.elements.center
        const fontStyle = centerConfig.fontStyle || 'Arial'
        const txt = centerConfig.text
        const color = centerConfig.color || '#000'
        const maxFontSize = centerConfig.maxFontSize || 75
        const sidePadding = centerConfig.sidePadding || 20
        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = '20px ' + fontStyle

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        const stringWidth = ctx.measureText(txt).width
        const elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated

        // Find out how much the font can grow in width.
        const widthRatio = elementWidth / stringWidth
        const newFontSize = Math.floor(30 * widthRatio)
        const elementHeight = (chart.innerRadius * 2)

        // Pick a new font size so it will not be larger than the height of label.
        let fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize)
        let minFontSize = centerConfig.minFontSize
        const lineHeight = centerConfig.lineHeight || 15
        let wrapText = false

        if (minFontSize === undefined) {
          minFontSize = 16
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize
          wrapText = true
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const centerX = ((chart.chartArea.left + chart.chartArea.right) / 2)
        let centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2)
        ctx.font = fontSizeToUse + 'px ' + fontStyle
        ctx.fillStyle = color

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY)
          return
        }

        const words = txt.split(' ')
        let line = ''
        const lines = []

        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' '
          const metrics = ctx.measureText(testLine)
          const testWidth = metrics.width
          if (testWidth > elementWidth && n > 0) {
            lines.push(line)
            line = words[n] + ' '
          } else {
            line = testLine
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight

        for (n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY)
          centerY += lineHeight
        }
        // Draw text in center
        ctx.fillText(line, centerX, centerY)
      }
    }
  }])

  const userOptions = {
    elements: {
      center: {
        text: `${position}`,
        color: '#000000',
        sidePadding: 20,
        maxFontSize: 80,
        minFontSize: 20
      }
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      }
    }

  }

  const userData = {
    labels: ['president', 'financial', 'gen_sec', 'organiser'],
    datasets: [
      {
        label: 'Users Gained',
        data: [78, 79, 67, 98],
        backgroundColor: [
          '#ff0000',
          '#00ff00',
          '#0000ff'
        ]
      }
    ]

  }
  const offices = ['President', 'General Secretary', 'Financial Secretary', 'Organiser']
  return (
    <div className='container'>
      <nav className='results__header'>
        <ul className='results__header--list'>
          <li className='results__header--nav'>
           <MdMenu color="DarkPurple" size="1.5em" />
            <p>Results</p>
          </li>
          <li className='results__header--input'>
            <input type='text' placeholder='Search position' />
            <MdMenu color="DarkPurple" size="1.5em" />
          </li>
        </ul>
      </nav>
      <section className='results__positions'>
        <h1>President</h1>
      </section>
      <section className='results__card'>
        <div className='results__card--header'>
          <p>President</p>
          <p>Candidates:6</p>
        </div>
        <div className='results--chart'>
          <Doughnut
            data={userData}
            options={userOptions}
            plugins={plugins}
          />
        </div>

      </section>

    </div>
  )
}

export default Results
