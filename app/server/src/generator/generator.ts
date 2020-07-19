import Archiver from 'archiver'
import { join } from 'path'
import { Transform } from 'stream'
import latex, { LatexOptions } from 'node-latex'
import { stripIndent } from 'common-tags'
import { template1 } from './templates/template1/template1'
import { template2 } from './templates/template2/template2'
import { template3 } from './templates/template3/template3'
import { template4 } from './templates/template4/template4'
import { template5 } from './templates/template5/template5'
import { template6 } from './templates/template6/template6'
import { FormValues } from './types'

interface TemplateData {
  texDoc: string
  options: LatexOptions
}

export function generatePdf(formValues: FormValues) {
  const { texDoc, options } = generateTemplateData(formValues)
  return latex(texDoc, options)
}

export function generateSource(formValues: FormValues): Transform {
  const { texDoc, options } = generateTemplateData(formValues)
  const zip = Archiver('zip')
  const readme = generateReadme(formValues.selectedTemplate, options.cmd)

  zip.append(texDoc, { name: 'resume.tex' })
  zip.append(readme, { name: 'README.md' })

  if (options.inputs) {
    zip.directory(options.inputs as string, '../')
  }

  zip.finalize()

  return zip
}

export function generateTemplateData(formValues: FormValues): TemplateData {
  switch (formValues.selectedTemplate) {
    case 1:
      return {
        texDoc: template1(formValues),
        options: {}
      }

    case 2:
      return {
        texDoc: template2(formValues),
        options: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'templates', 'template2', 'inputs'),
          fonts: join(__dirname, 'templates', 'template2', 'inputs')
        }
      }

    case 3:
      return {
        texDoc: template3(formValues),
        options: {}
      }

    case 4:
      return {
        texDoc: template4(formValues),
        options: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'templates', 'template4', 'inputs'),
          fonts: join(__dirname, 'templates', 'template4', 'inputs')
        }
      }

    case 5:
      return {
        texDoc: template5(formValues),
        options: {
          cmd: 'pdflatex',
          inputs: join(__dirname, 'templates', 'template5', 'inputs')
        }
      }

    case 6:
      return {
        texDoc: template6(formValues),
        options: {
          cmd: 'xelatex',
          inputs: join(__dirname, 'templates', 'template6', 'inputs'),
          fonts: join(__dirname, 'templates', 'template6', 'inputs')
        }
      }

    case 7:
      return {
        texDoc: '',
        options: {}
      }
    case 8:
      return {
        texDoc: '',
        options: {}
      }

    case 9:
      return {
        texDoc: '',
        options: {}
      }

    case 10:
      return {
        texDoc: '',
        options: {}
      }

    default:
      return {
        texDoc: template1(formValues),
        options: {}
      }
  }
}

export function generateReadme(templateId: number, cmd = 'pdflatex') {
  return stripIndent`
    # Resumake Template ${templateId}
    > LaTeX code generated from [resumake.io](https://resumake.io)

    ## Usage
    To generate a PDF from this LaTeX code, navigate to this folder in a terminal and run:

        ${cmd} resume.tex

    ## Requirements
    You will need to have \`${cmd}\` installed on your machine.
    Alternatively, you can use a site like [ShareLaTeX](https://sharelatex.com) to build and edit your LaTeX instead.
  `
}