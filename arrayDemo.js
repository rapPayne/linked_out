
const eastPpl = ['Sam', 'Allison', 'Lalitha']
const westPpl = ['Mitchell', 'Reginald', 'Evan']

const allPpl = [...eastPpl, ...westPpl];

const newPpl = [...allPpl];
const deepCopy = JSON.parse(JSON.stringify(newPpl))
newPpl.push("Matt")

console.log(allPpl)