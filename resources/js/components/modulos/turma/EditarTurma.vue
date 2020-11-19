<template>
   <v-container>
    <v-col cols="12">
        <v-card-title class="primary">
            <span class="headline white--text">Editar Turma</span>
        </v-card-title>
        <v-card class="pa-5">
            <FormTurma
                :turma="turma"
                :updating="true"
            >
            </FormTurma>
        </v-card>
    </v-col>
  </v-container>
</template>

<script>
import FormTurma from './partials/FormTurma';
export default {
  props: {
    turma: ''
  },
  components: {
    FormTurma
  },
  created(){
    if(!this.turma) {
      this.$router.push({name: 'turma'})
    }
  },
}
</script>

<style>

</style>