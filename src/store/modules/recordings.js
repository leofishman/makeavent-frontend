import routes from '../routes/recordings'
import util from '../../util'

export default {
    actions: {
        getRecordings (ctx, obj) {
            return new Promise(async (resolve, reject) => {
                try {
                    ctx.commit('toggleRecordingsLoading')
                    const recordings = await routes.getRecordings(obj)
                    ctx.commit('setRecordings', recordings)
                    resolve(true)
                }
                catch (e) {
                    resolve(true)
                    ctx.commit('toggleRecordingsLoading')
                }
            })
        }
    },
    mutations: {
        toggleRecordingsLoading (state) {
            state.recordingsLoading = !state.recordingsLoading
        },
        setRecordings (state, data) {
            state.recordings = data.data
            ctx.commit('toggleRecordingsLoading')
        }
    },
    state: {
        recordings: [],

        recordingsLoading: false
    },
    getters: {
        
    }
}