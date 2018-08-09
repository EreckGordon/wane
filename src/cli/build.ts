import * as ora from 'ora'
import chalk from 'chalk'
import { oneLine } from 'common-tags'
import { compile, WaneCompilerOptions } from '../compiler/compile'

const spinner = ora({
  spinner: 'moon',
  text: `Building...`,
  color: 'blue',
})

const TIME_TO_BUILD = `Time to build`

export default async function build (options: Partial<WaneCompilerOptions> = {}) {
  spinner.start()
  console.time(TIME_TO_BUILD)
  await compile()
  spinner.stop()
  console.info(oneLine`${chalk.green.bold('Done.')}
    The bundle is available in the ${chalk.bold(`dist`)} folder.`)
  console.timeEnd(TIME_TO_BUILD)
}