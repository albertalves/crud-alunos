<template>
  <v-container>
    <v-col cols="12">
      <v-card-title class="primary">
        <span class="headline white--text">Alunos</span>
      </v-card-title>
      <v-card class="pa-5">
          <v-row>
            <v-col md="6">
              <v-btn
                color="primary"
                @click.prevent="cadastrarAluno"
              >
                Novo aluno
              </v-btn>
            </v-col>
            <v-col md="6">
              <v-row>
                <v-col md="4">
                <v-text-field
                  v-model="search"
                  label="Buscar aluno..."
                  solo
                  dense
                ></v-text-field>
                </v-col>
                <v-col md="4">
                <v-select
                  :items="['Nome', 'E-mail']"
                  label="Selecione..."
                  solo
                  dense
                ></v-select>
                </v-col>
                <v-col md="4" class="d-flex justify-space-between">
                <v-btn
                  @click.prevent="limpar"
                >
                  Limpar
                </v-btn>
                <v-btn
                  color="primary"
                  @click.prevent="buscarAlunos"
                  class="mr-7"
                >
                  Buscar
                </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="text-left">Nome</th>
                    <th class="text-left">E-mail</th>
                    <th class="text-left">Telefone</th>
                    <th class="text-left">CEP</th>
                    <th class="text-left">Logradouro</th>
                    <th class="text-left">Bairro</th>
                    <th class="text-left">Estado</th>
                    <th class="text-left">Cidade</th>
                    <th class="text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(aluno, index) in alunos.data" :key="index">
                    <td>{{aluno.nome}}</td>
                    <td>{{aluno.email}}</td>
                    <td>{{aluno.telefone}}</td>
                    <td>{{aluno.cep}}</td>
                    <td>{{aluno.logradouro}}</td>
                    <td>{{aluno.bairro}}</td>
                    <td>{{aluno.estado}}</td>
                    <td>{{aluno.cidade}}</td>
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
                              @click.prevent="editarAluno(aluno)"
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
                              @click.prevent="confirmarExclusao(aluno.id)"
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
              </v-simple-table>
            </v-col>
          </v-row>
        <v-pagination
          v-if="params.last_page > 1"
          v-model="params.page"
          :length="params.last_page"
          :total-visible="4"
          @input="onPageChange"
        >
        </v-pagination>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
      search: '',
      alunos: {},
    }
  },
  created() {
    this.buscarAlunos();
  },
  methods:{
    buscarAlunos(page = 1){
      this.$store.dispatch('buscarAlunos', {search: this.search, page})
        .then(response => this.alunos = response);
    },
    cadastrarAluno(){
      this.$router.push({name: 'aluno.cadastrar'})
    },
    editarAluno(aluno){
      this.$router.push({name: 'aluno.editar', params: {aluno: aluno}})
    },
    confirmarExclusao(id) {
      this.$snotify.warning('Tem certeza que deseja excluir?', 'Confirmar', {
        timeout: 10000,
        showProgressBar: true,
        closeOnClick: true,
        buttons: [
          {text: 'Não', action: null},
          {text: 'Sim', action: (toast) => {this.deletarUsuario(id); this.$snotify.remove(toast.id);} }
        ]
      })
    },
    deletarUsuario(id) {
      this.$store.dispatch('excluirAluno', id)
          .then(response => {
            this.$snotify.success(response.data, 'Pronto!')
            this.buscarAlunos();
          })
          .catch(() => this.$snotify.error('Erro ao deletar usuário', 'Ops...'));
    },
    limpar() {
      this.search = '';
      this.buscarAlunos();
    },
    onPageChange() {
      this.buscarAlunos(this.params.page);
    },
  },
  computed: {
      params() {
        return {
          page: this.alunos.current_page,
          last_page: this.alunos.last_page
        }
      }
    },
}
</script>