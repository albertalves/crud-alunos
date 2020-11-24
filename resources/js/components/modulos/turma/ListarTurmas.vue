<template>
  <v-container>
    <v-col cols="12">
      <v-card-title class="primary">
        <span class="headline white--text">Turmas</span>
      </v-card-title>
      <v-card class="pa-5">
        <v-col cols="12">
          <v-simple-table>
            <template>
              <thead>
                <tr>
                  <th class="text-left">Nome</th>
                  <th class="text-left">Vagas</th>
                  <th class="text-left">Alunos</th>
                  <th class="text-left">Data Início</th>
                  <th class="text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
              <tr v-for="(turma, index) in turmas" :key="index">
                <td>{{turma.nome}}</td>
                <td>{{turma.vagas}}</td>
                <td>{{turma.alunos.length}}</td>
                <td>{{turma.data_inicio | dataPtBr}}</td>
                <td>
                  <div class="my-2">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          v-bind="attrs"
                          v-on="on"
                          color="success"
                          fab
                          x-small
                          dark
                          elevation="1"
                          @click.prevent="ativarModalAlunos(turma.alunos)"
                        >
                          <v-icon>mdi-account-circle</v-icon>
                        </v-btn>
                      </template>
                      <span>Ver alunos</span>
                    </v-tooltip>
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
                          @click.prevent="editarTurma(turma)"
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
                          @click.prevent="confirmarExclusao(turma.id)"
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
                :to="{name: 'turma.cadastrar'}"
            >
              Nova Turma
            </v-btn>
        </v-col>
      </v-card>
    </v-col>
    <ModalAlunos
      ref="alunosModal"
    ></ModalAlunos>
  </v-container>
</template>

<script>
import moment from "moment";
import ModalAlunos from "./partials/ModalAlunos";

export default {
  components: {
    ModalAlunos
  },
  data(){
    return {
      turmas: {},
      alunos: {},
      dialog: false,
    }
  },
  created() {
    this.buscarTurmas();
  },
  methods:{
    buscarTurmas(){
      this.$store.dispatch('buscarTurmas')
        .then(response => this.turmas = response);
    },
    editarTurma(turma){
      this.$router.push({name: 'turma.editar', params: {turma: turma}})
    },
    confirmarExclusao(id) {
      this.$snotify.warning('Tem certeza que deseja excluir?', 'Confirmar', {
        timeout: 10000,
        showProgressBar: true,
        closeOnClick: true,
        buttons: [
          {text: 'Não', action: null},
          {text: 'Sim', action: (toast) => {this.deletarTurma(id); this.$snotify.remove(toast.id);} }
        ]
      })
    },
    deletarTurma(id) {
      this.$store.dispatch('excluirTurma', id)
          .then(response => {
            this.$snotify.success(response.data, 'Pronto!')
            this.buscarTurmas();
          })
          .catch(error => this.$snotify.error(error.response.data, 'Ops...'));
    },
    ativarModalAlunos(alunos){
      this.$refs.alunosModal.ativar(alunos);
    },
  },
  filters: {
    dataPtBr: function(value) {
      return moment(value).format("DD/MM/Y");
    },
  }
}
</script>