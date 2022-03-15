export default function <T extends object> (initialValue: T) {
  return {
    data: reactive(initialValue),
    reset () {}
  }
}