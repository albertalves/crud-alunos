<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >

      <v-list dense>

        <v-list-item :to="{name: 'home'}">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'aluno'}">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Adicionar Aluno</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item :to="{name: 'turma'}">
          <v-list-item-action>
            <v-icon>mdi-account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Adicionar Turma</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click.prevent="logout">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sair</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>

    <v-app-bar 
        app
        color="primary"
        dark
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="me">
          <h1>Bem vindo, {{me.name}}!</h1>
      </v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
    <v-footer
      color="primary"
      app
      dark
    >
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({ 
        drawer: null
    }),
    computed: {
      me() {
          return this.$store.state.auth.me;
      }
    },
    methods: {
      logout() {
          this.$store.dispatch('logout')
      }
    }
  }
</script>