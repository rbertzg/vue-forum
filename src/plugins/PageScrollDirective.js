import { debounce } from 'lodash'

const pageScrollDirective = {
  mounted(el, binding) {
    el.__PageScroll__ = debounce(() => binding.value(), 300, {
      leading: true,
    })
    document.addEventListener('scroll', el.__PageScroll__)
  },

  unmounted(el) {
    document.removeEventListener('scroll', el.__PageScroll__)
  },
}

export default (app) => {
  app.directive('page-scroll', pageScrollDirective)
}
