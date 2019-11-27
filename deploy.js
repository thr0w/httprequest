const path = require('path')
const { execSync } = require('child_process')
const pkg = require(path.join(process.cwd(), 'package.json'))

const exec = str => process.stdout.write(execSync(str))

const current = getCurrent()
const version = pkg.version

if (current === version) console.log('current:', current, 'already deployed')
else {
    console.log('deploying version:', version, ' last published is:', current)
    exec(`npm publish --access=public`)
    exec(`git tag ${version}`)
    exec(`git push merge-release --tags`)
}


function getCurrent() {
    try {
        return execSync(`npm view "${pkg.name}" version`).toString().trim()
    } catch (e) {
        return '?'
    }
}