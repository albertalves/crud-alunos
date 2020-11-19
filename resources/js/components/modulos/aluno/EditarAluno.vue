<template>
   <v-container>
    <v-col cols="12">
        <v-card-title class="primary">
            <span class="headline white--text">Editar Aluno</span>
        </v-card-title>
        <v-card class="pa-5">
            <FormAluno
                :aluno="aluno"
                :updating="true"
            >
            </FormAluno>
        </v-card>
    </v-col>
  </v-container>
</template>

<script>
import FormAluno from './partials/FormAluno';
export default {
  props: {
    aluno: ''
  },
  components: {
    FormAluno
  },
  created(){
    if(!this.aluno) {
      this.$router.push({name: 'aluno'})
    }
  },
}
</script>

<style>

</style>