// Mobile menu toggle
function toggleMobileMenu() {
  const nav = document.getElementById("nav-menu")
  nav.classList.toggle("active")
}

// Close mobile menu when clicking outside
document.addEventListener("click", (event) => {
  const nav = document.getElementById("nav-menu")
  const toggle = document.querySelector(".mobile-menu-toggle")

  if (!nav.contains(event.target) && !toggle.contains(event.target)) {
    nav.classList.remove("active")
  }
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Copy code blocks
document.addEventListener("DOMContentLoaded", () => {
  const codeBlocks = document.querySelectorAll("pre code")

  codeBlocks.forEach((codeBlock) => {
    const button = document.createElement("button")
    button.className = "copy-button"
    button.innerHTML = '<i data-lucide="copy"></i>'
    button.setAttribute("title", "Copy code")

    const pre = codeBlock.parentNode
    pre.style.position = "relative"
    pre.appendChild(button)

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(codeBlock.textContent).then(() => {
        button.innerHTML = '<i data-lucide="check"></i>'
        button.style.color = "#10b981"

        setTimeout(() => {
          button.innerHTML = '<i data-lucide="copy"></i>'
          button.style.color = ""
        }, 2000)
      })
    })
  })

  // Re-initialize Lucide icons for dynamically added elements
  if (typeof lucide !== "undefined") {
    lucide.createIcons()
  }
})

// Add copy button styles
const style = document.createElement("style")
style.textContent = `
    .copy-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: #e2e8f0;
        padding: 0.5rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
        opacity: 0;
    }
    
    pre:hover .copy-button {
        opacity: 1;
    }
    
    .copy-button:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .copy-button i {
        width: 16px;
        height: 16px;
    }
`
document.head.appendChild(style)

// Highlight current section in sidebar
function highlightCurrentSection() {
  const sections = document.querySelectorAll("h2[id], h3[id]")
  const navLinks = document.querySelectorAll(".docs-nav a")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight

    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active")
    }
  })
}

// Throttled scroll listener
let ticking = false
function updateOnScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      highlightCurrentSection()
      ticking = false
    })
    ticking = true
  }
}

window.addEventListener("scroll", updateOnScroll)

// Search functionality (if search input exists)
const searchInput = document.querySelector(".search-input")
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase()
    const searchableElements = document.querySelectorAll("h1, h2, h3, p, li")

    searchableElements.forEach((element) => {
      const text = element.textContent.toLowerCase()
      const parent = element.closest(".docs-content")

      if (text.includes(query) || query === "") {
        element.style.display = ""
        if (parent) parent.style.display = ""
      } else {
        element.style.display = "none"
      }
    })
  })
}

// Table of contents generator
function generateTableOfContents() {
  const headings = document.querySelectorAll(".docs-content h2, .docs-content h3")
  const toc = document.querySelector(".table-of-contents")

  if (!toc || headings.length === 0) return

  const tocList = document.createElement("ul")
  tocList.className = "toc-list"

  headings.forEach((heading, index) => {
    const id = heading.id || `heading-${index}`
    heading.id = id

    const li = document.createElement("li")
    li.className = heading.tagName.toLowerCase() === "h3" ? "toc-sub-item" : "toc-item"

    const a = document.createElement("a")
    a.href = `#${id}`
    a.textContent = heading.textContent
    a.className = "toc-link"

    li.appendChild(a)
    tocList.appendChild(li)
  })

  toc.appendChild(tocList)
}

// Initialize table of contents
document.addEventListener("DOMContentLoaded", generateTableOfContents)

// Progress indicator
function createProgressIndicator() {
  const progressBar = document.createElement("div")
  progressBar.className = "reading-progress"
  progressBar.innerHTML = '<div class="reading-progress-bar"></div>'

  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
    const scrolled = (winScroll / height) * 100

    document.querySelector(".reading-progress-bar").style.width = scrolled + "%"
  })
}

// Add progress indicator styles
const progressStyle = document.createElement("style")
progressStyle.textContent = `
    .reading-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: rgba(16, 185, 129, 0.1);
        z-index: 1000;
    }
    
    .reading-progress-bar {
        height: 100%;
        background: #10b981;
        width: 0%;
        transition: width 0.1s ease;
    }
`
document.head.appendChild(progressStyle)

// Initialize progress indicator
document.addEventListener("DOMContentLoaded", createProgressIndicator)
