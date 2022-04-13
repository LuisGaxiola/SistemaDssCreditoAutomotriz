export default function <T> (initialValue: T) {
  const ini = { ...initialValue }
  Object.freeze(ini)
  const data = ref(initialValue)
  function reset () { data.value = { ...ini } as any }
  return extendRef(data, { reset })
}