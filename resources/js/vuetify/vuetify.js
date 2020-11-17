import Vue from 'vue'
import Vuetify from 'vuetify'

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

const opts = {
    theme: {
        themes: {
            light: {
                primary: colors.indigo.base,
              },
        }
    },
}

export default new Vuetify(opts)