import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors'
Vue.use(Vuetify);

export default new Vuetify({
    theme: { 
        themes: {
            light: {
                
                primary     : '#0288D1',
                secondary   : '#4FC3F7',
                tertiary    : '#81D4FA',
                lighter    : colors.lightBlue.lighten5,
                accent      : colors.shades.black,
                error       : colors.red.accent2,
                success     : colors.green.accent4,
                theme       : colors.shades.white,
                
            },
            dark: {
              secondary     : colors.blue,
              success     : colors.green.accent3
            },
          },
     },
});
