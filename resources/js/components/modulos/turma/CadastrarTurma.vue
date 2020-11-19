<template>
  <v-container>
    <v-col cols="12">
        <v-card-title class="primary">
            <span class="headline white--text">Cadastrar Turma</span>
        </v-card-title>
        <v-card class="pa-5">
            <FormTurma
                :turma="turma"
            >
            </FormTurma>
        </v-card>
    </v-col>
  </v-container>
</template>

<script>
import FormTurma from './partials/FormTurma';

export default {
    components: {
      FormTurma
    },
    data(){
      return {
        turma: {
          nome:'',
          unidade_id: '',
          vagas: '',
          data_inicio: '',
        }
      }
    }
}
</script>

<style>

</style>