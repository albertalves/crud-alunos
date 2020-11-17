<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="E-mail"
                    v-model="formData.email"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    v-model="formData.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn class="ma-2" outlined color="indigo">
                  <router-link :to="{name: 'register'}">Cadastre-se</router-link>
                </v-btn>
                <v-btn color="primary" @click.prevent="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        email: null,
        password: null
      }
    }
  },

  methods: {
    login() {
      this.$store.dispatch('login', this.formData)
                  .then(() => this.$router.push({name: 'home'}));
    },
  },


}
</script>

<style scoped>
  a:link {
    text-decoration:none;
  }
</style>