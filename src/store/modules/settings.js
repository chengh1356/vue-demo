export default {
    //全局变量
    state: {
        demoValue: {}
    },
    mutations: {
        setDemoValue(state, demoValue) {
            state.demoValue = demoValue
        }
    },
    getter: {
        getDemoValue: state => state.demoValue
    }
}