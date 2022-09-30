export const outsideClick = {
  beforeMount(el, binding) {
    el.outsideClickHandler = (event) => {
      const path = (event.composedPath && event.composedPath()) || event.path
      const isClickOutside = path
        ? !~path.indexOf(el)
        : !el.contains(event.target)

      if (isClickOutside) {
        if (binding.value instanceof Function) {
          binding.value()
        }
      }
    }

    requestAnimationFrame(() =>
      document.addEventListener('click', el.outsideClickHandler),
    )
  },
  unmounted(el) {
    document.removeEventListener('click', el.outsideClickHandler)
  },
}
