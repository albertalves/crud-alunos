<template>
   <v-container>
    <v-col cols="12">
        <v-card-title class="primary">
            <span class="headline white--text">Cadastrar Unidade</span>
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
    data(){
        return {
            unidade: {
                nome: '',
            },
            errors: {}
        }
    },
    methods:{
        onSubmit() {
            this.$store.dispatch('cadastrarUnidade', this.unidade)
                .then(response => { 
                    this.$router.push({name: 'unidade'})
                    this.$snotify.success(response, 'Pronto!')
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