const schemes = ["dark", "light", "system"]

function addschemeSwitchers() {
  const switchers = document.querySelectorAll(".scheme-switcher")
  switchers.forEach((switcher, num) => {
    schemes.forEach((scheme) => {
      const schemeLabel = document.createElement("label")
      schemeLabel.htmlFor = `scheme-switcher-${scheme}-${num}`
      schemeLabel.innerHTML = `${scheme} `
      const schemeButton = document.createElement("input")
      schemeButton.type = "radio"
      schemeButton.name = `scheme-switcher-${num}`
      schemeButton.id = `scheme-switcher-${scheme}-${num}`
      schemeButton.value = scheme
      schemeButton.dataset.num = num
      schemeButton.setAttribute('aria-label', `switch to ${scheme} mode`)
      if (currentSchemer() === scheme) {
        schemeButton.checked = true 
      }
      schemeLabel.appendChild(schemeButton)
      switcher.appendChild(schemeLabel)
      schemeButton.addEventListener("input", switchSchemer)
    })
  })
}

/*
function finishLoadingStylesheets() {
  const schemeStyles = document.createElement( "link" )
  schemeStyles.href = `/styles/scheme.css`
  schemeStyles.rel = "stylesheet"
  document.body.appendChild(schemeStyles)
}
*/

function switchSchemer(event) {
  const newSchemer = event.target.value
  console.log(`Switching scheme to: ${newSchemer}`)
  localStorage.setItem("schemer", newSchemer)
  const switcherNum = parseInt(event.target.dataset.num, 10)
  const switchers = document.querySelectorAll(".scheme-switcher")
  switchers.forEach((switcher, num) => {
    schemes.forEach((scheme) => {
      if (switcherNum !== num) {
        const el = document.querySelector(`#scheme-switcher-${scheme}-${num}`)
        if (newSchemer === scheme) {
          el.checked = true
        } else {
          el.checked = false
        }
      }
    })
  })
  updateScheme()
}

function updateScheme() {
  if (currentSchemer() === "system") {
    document.body.dataset.scheme = "system"
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
  addschemeSwitchers()
  //duplicateDarkStyles()
  updateScheme()
  makeContentVisible()

  // finishLoadingStylesheets()


  // const styleSheetArray = [];
  // const styleSheets = document.styleSheets;
  // for (let i = 0; i < styleSheets.length; i++) {
  //   styleSheetArray.push(styleSheets[i]);
  // }
  // console.log(styleSheetArray)

})
