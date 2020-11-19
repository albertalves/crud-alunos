<template>
  <v-container>
    <v-col cols="12">
        <v-card-title class="primary">
            <span class="headline white--text">Cadastrar Aluno</span>
        </v-card-title>
        <v-card class="pa-5">
            <FormAluno
                :aluno="aluno"
            >
            </FormAluno>
        </v-card>
    </v-col>
  </v-container>
</template>

<script>
import FormAluno from './partials/FormAluno';

export default {
    components: {
      FormAluno
    },
    data(){
      return {
        aluno: {
          nome:'',
          email: '',
          telefone: '',
          cep: '',
          logradouro: '',
          bairro: '',
          estado: '',
          cidade: '',
        }
      }
    }
}
</script>