<template>
  <v-container>
    <v-col cols="12">
      <v-card-title class="primary">
        <span class="headline white--text">Unidades</span>
      </v-card-title>
      <v-card class="pa-5">
        <v-col cols="12">
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Turmas</th>
                  <th class="text-left"> Data de Inauguração</th>
                  <th class="text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(unidade, index) in unidades" :key="index">
                <td>{{unidade.nome}}</td>
                <td>{{unidade.turmas.length}}</td>
                <td>{{unidade.created_at | dataPtBr}}</td>
                <td>
                  <div class="my-2">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="warning"
                          fab
                          x-small
                          dark
                          elevation="1"
                          :to="{name: 'unidade.editar', params: {unidade: unidade}}"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Editar</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          dark
                          color="error"
                          fab
                          x-small
                          elevation="1"
                          @click.prevent="confirmarExclusao(unidade.id)"
                        >
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                      </template>
                      <span>Excluir</span>
                    </v-tooltip>
                  </div>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
        <v-col cols="12">
          <v-btn
                color="primary"
                :to="{name: 'unidade.cadastrar'}"
            >
              Nova Unidade
            </v-btn>
        </v-col>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import moment from "moment";

export default {
  data(){
    return {
      unidades: {}
    }
  },
  created() {
    this.buscarUnidades();
  },
  methods:{
    buscarUnidades(){
      this.$store.dispatch('buscarUnidades')
        .then(response => this.unidades = response);
    },
    confirmarExclusao(id) {
      this.$snotify.warning('Tem certeza que deseja excluir?', 'Confirmar', {
        timeout: 10000,
        showProgressBar: true,
        closeOnClick: true,
        buttons: [
          {text: 'Não', action: null},
          {text: 'Sim', action: (toast) => {this.deletarUnidade(id); this.$snotify.remove(toast.id);} }
        ]
      })
    },
    deletarUnidade(id) {
      this.$store.dispatch('excluirUnidade', id)
          .then(response => {
            this.$snotify.success(response.data, 'Pronto!')
            this.buscarUnidades();
          })
          .catch(error => this.$snotify.error(error.response.data, 'Ops...'));
    },
  },
  filters: {
    dataPtBr: function(value) {
      return moment(value).format("DD/MM/Y");
    },
  }
}
</script>