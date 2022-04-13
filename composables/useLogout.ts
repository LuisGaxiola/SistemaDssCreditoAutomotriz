
export default function () {
    const store = useStore()
    return function () {
        store.state.usuario.id = 0
        store.state.usuario.nombre = ''
    }
}