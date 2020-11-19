<template>
   <v-container>
    <v-col cols="12">
        <v-card-title class="primary">
            <span class="headline white--text">Editar Unidade</span>
        </v-card-title>
        <v-card class="pa-5">
                <v-form @submit.prevent="onSubmit">
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    label="Nome*"
                                    :rules="(this.errors.nome)"
                                    :error="(this.errors.nome) ? true : false"
                                    v-model="unidade.nome"
                                    type="text"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-btn type="submit" :to="{name: 'unidade'}">Voltar</v-btn>
                                <v-btn color="primary" type="submit">Salvar</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
        </v-card>
    </v-col>
  </v-container>
</template>

<script>

export default {
  props:{
      unidade: ''
  },
  data(){
      return {
          errors: {}
      }
  },
  created(){
    if(!this.unidade) {
      this.$router.push({name: 'unidade'})
    }
  },
    methods:{
        onSubmit() {
            this.$store.dispatch('atualizarUnidade', this.unidade)
                .then(response => { 
                    this.$snotify.success(response, 'Pronto!')
                    this.$router.push({name: 'unidade'})
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                    this.$snotify.error('Preencha os campos obrigatórios!', 'Ops...')
                });
        },
    }
}
</script>

<style>

</style>