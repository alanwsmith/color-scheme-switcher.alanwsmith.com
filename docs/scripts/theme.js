const schemes = ["auto", "light", "dark", "black", "white"]

function addSchemeSwitchers() {
  const switchers = document.querySelectorAll(".scheme-switcher")
  switchers.forEach((switcher, num) => {
    const fieldSet = document.createElement("fieldset")
    fieldSet.classList.add("scheme-list")
    const legend = document.createElement("legend")
    legend.innerHTML = "Color Scheme"
    fieldSet.appendChild(legend)
    schemes.forEach((scheme) => {
      if (scheme === "auto" && !hasSystem()) {
        // skip system if there isn't data for it
      } else {
        const schemeLabel = document.createElement("label")
        schemeLabel.htmlFor = `scheme-switcher-${scheme}-${num}`
        schemeLabel.innerHTML = `${scheme} `
        const schemeButton = document.createElement("input")
        schemeButton.type = "radio"
        schemeButton.name = `scheme-switcher-${num}`
        schemeButton.id = `scheme-switcher-${scheme}-${num}`
        schemeButton.value = scheme
        schemeButton.dataset.num = num
        if (currentSchemer() === scheme) {
          schemeButton.checked = true 
        }
        schemeButton.addEventListener("input", switchSchemer)
        schemeLabel.appendChild(schemeButton)
        fieldSet.appendChild(schemeLabel)
      }
    })
    switcher.appendChild(fieldSet)
  })
}

function switchSchemer(event) {
  const newSchemer = event.target.value
  localStorage.setItem("schemer", newSchemer)
  const switcherNum = parseInt(event.target.dataset.num, 10)
  const switchers = document.querySelectorAll(".scheme-switcher")
  switchers.forEach((switcher, num) => {
    schemes.forEach((scheme) => {
      if (switcherNum !== num) {
        const el = document.querySelector(`#scheme-switcher-${scheme}-${num}`)
        if (el) {
          if (newSchemer === scheme) {
            el.checked = true
          } else {
            el.checked = false
          }
        }
      }
    })
  })
  updateScheme()
}

function updateScheme() {
  if (currentSchemer() === "auto") {
    document.body.dataset.scheme = "auto"
  } else {
    document.body.dataset.scheme = currentScheme()
  }
}

function duplicateDarkStyles() {
  for (let sheetNum = 0; sheetNum < document.styleSheets.length; sheetNum++) {
    const sheet = document.styleSheets[sheetNum]
    for (let ruleNum = 0; ruleNum < sheet.cssRules.length; ruleNum++) {
      const rule = sheet.cssRules[ruleNum]
      if (rule.conditionText === "(prefers-color-scheme: dark)") {
        for (let subNum = 0; subNum < rule.cssRules.length; subNum++) {
          const subRule = rule.cssRules[subNum]
          if (subRule.selectorText === ":root") {
            const ruleString = subRule
            const parsedString = ruleString.cssText.replace(subRule.selectorText, "")
            sheet.insertRule(`[data-scheme="dark"] ${parsedString}`, sheet.cssRules.length)
          }
        }
      }
    }
  }
}

function makeContentVisible() {
  const showSheet = document.createElement("style")
  showSheet.innerHTML = `html { visibility: visible };`
  document.body.appendChild(showSheet)
}

document.addEventListener("DOMContentLoaded", () => {
  addSchemeSwitchers()
  duplicateDarkStyles()
  updateScheme()
  makeContentVisible()
})
