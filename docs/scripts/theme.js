const themes = ["dark", "light"]

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
      if (currentTheme && currentTheme === theme) {
        themeButton.checked = true 
      } else if (!currentTheme && theme === "dark") {
        themeButton.checked = true 
      }
      themeLabel.appendChild(themeButton)
      switcher.appendChild(themeLabel)
      themeButton.addEventListener("input", switchTheme)
    })
  })
}

function finishLoadingStylesheets() {
  const currentTheme = localStorage.getItem("theme")
  if (currentTheme) {
    const themeVars = document.createElement( "link" )
    themeVars.href = `/styles/vars-${currentTheme}.css`
    themeVars.rel = "stylesheet"
    document.querySelector("body").appendChild(themeVars)
  } else {
    const themeVars = document.createElement( "link" )
    themeVars.href = `/styles/vars-dark.css`
    themeVars.rel = "stylesheet"
    document.querySelector("body").appendChild(themeVars)
  }
  const themeStyles = document.createElement( "link" )
  themeStyles.href = `/styles/theme.css`
  themeStyles.rel = "stylesheet"
  document.querySelector("body").appendChild(themeStyles)
}

function switchTheme(event) {
  const newTheme = event.target.value
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
  var link = document.createElement( "link" )
  link.href = `/styles/vars-${newTheme}.css`
  link.rel = "stylesheet"
  document.querySelector("body").appendChild(link)
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded")
  addThemeSwitchers()
  finishLoadingStylesheets()
})
