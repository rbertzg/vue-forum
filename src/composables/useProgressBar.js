import NProgress from 'nprogress'

export function useProgressBar() {
  NProgress.configure({
    speed: 200,
    showSpinner: false,
  })

  return {
    start: NProgress.start,
    end: NProgress.done,
  }
}
