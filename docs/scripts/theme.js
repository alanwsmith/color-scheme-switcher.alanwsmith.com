const themes = ["dark", "light", "system"]

function addThemeSwitchers() {
  const switchers = document.querySelectorAll(".theme-switcher")
  const currentTheme = localStorage.getItem("theme")
  switchers.forEach((switcher, num) => {
    themes.forEach((theme) => {
      const themeLabel = document.createElement("label")
      themeLabel.htmlFor = `theme-switcher-${theme}-${num}`
      themeLabel.innerHTML = `${theme} `
      const themeButton = document.createElement("input")
      themeButton.type = "radio"
      themeButton.name = `theme-switcher-${num}`
      themeButton.id = `theme-switcher-${theme}-${num}`
      themeButton.value = theme
      themeButton.dataset.num = num
      themeButton.setAttribute('aria-label', `switch to ${theme} mode`)
      if (currentTheme && currentTheme === theme) {
        themeButton.checked = true 
      } else if (!currentTheme && theme === "system") {
        // This makes system the default if nothing
        // has been selected yet
        themeButton.checked = true 
      }
      themeLabel.appendChild(themeButton)
      switcher.appendChild(themeLabel)
      themeButton.addEventListener("input", switchTheme)
    })
  })
}

function finishLoadingStylesheets() {
  const themeStyles = document.createElement( "link" )
  themeStyles.href = `/styles/theme.css`
  themeStyles.rel = "stylesheet"
  document.body.appendChild(themeStyles)
}

function switchTheme(event) {
  const newTheme = event.target.value
  const theBody = document.querySelector("body")
  console.log(`Switching theme to: ${newTheme}`)
  const switcherNum = parseInt(event.target.dataset.num, 10)
  localStorage.setItem("theme", newTheme)
  const switchers = document.querySelectorAll(".theme-switcher")
  switchers.forEach((switcher, num) => {
    themes.forEach((theme) => {
      if (switcherNum !== num) {
        const el = document.querySelector(`#theme-switcher-${theme}-${num}`)
        if (newTheme === theme) {
          el.checked = true
        } else {
          el.checked = false
        }
      }
    })
  })
  // updateTheme()
}

function updateTheme() {
  const currentThemer = localStorage.getItem("themer")
  if (currentThemer) {
      document.body.dataset.themer = currentThemer;
  } else {
      document.body.dataset.themer = "system";
  }
  if (document.body.dataset.themer === "system") {
    const darkThemeCheck= window.matchMedia("(prefers-color-scheme: dark)")
    if (prefersDarkScheme.matches) {
      document.body.dataset.theme = "dark"
    } else {
      document.body.dataset.theme = "light"
    }
  } else  {
      document.body.dataset.theme = document.body.dataset.themer
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
            sheet.insertRule(`[data-theme="dark"] ${parsedString}`, sheet.cssRules.length)
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
  //addThemeSwitchers()
  duplicateDarkStyles()
  makeContentVisible()


  // finishLoadingStylesheets()


  // const styleSheetArray = [];
  // const styleSheets = document.styleSheets;
  // for (let i = 0; i < styleSheets.length; i++) {
  //   styleSheetArray.push(styleSheets[i]);
  // }
  // console.log(styleSheetArray)

})
