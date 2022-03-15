export default function <T> (initialValue: T) {
  const self = {
    data: ref(initialValue),
    reset () {
      self.data.value = initialValue as any
    }
  }
  return self
}