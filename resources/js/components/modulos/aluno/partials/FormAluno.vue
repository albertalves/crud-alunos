<template>
    <v-form @submit.prevent="onSubmit">
        <v-container>
            <v-row>
                <v-col cols="12" sm="6" md="8">
                    <v-text-field
                        label="Nome*"
                        :rules="(this.errors.nome)"
                        :error="(this.errors.nome) ? true : false"
                        v-model="aluno.nome"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        label="E-mail*"
                        :rules="(this.errors.email)"
                        :error="(this.errors.email) ? true : false"
                        v-model="aluno.email"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        label="Telefone"
                        :rules="(this.errors.telefone)"
                        :error="(this.errors.telefone) ? true : false"
                        v-mask="'(##) # ####-####'"
                        v-model="aluno.telefone"
                        type="text"
                    ></v-text-field>  
                    <v-text-field
                        label="CEP*"
                        :rules="(this.errors.cep)"
                        :error="(this.errors.cep) ? true : false"
                        v-mask="'#####-###'"
                        v-model="aluno.cep"
                        type="text"
                        @keyup="buscarEndereco"
                    ></v-text-field> 
                    <v-text-field
                        label="Logradouro"
                        v-model="aluno.logradouro"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        label="Bairro"
                        v-model="aluno.bairro"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        label="Estado"
                        v-model="aluno.estado"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        label="Cidade"
                        v-model="aluno.cidade"
                        type="text"
                    ></v-text-field>
                </v-col>
                <v-col cols="6" md="4">
                    <v-card-title>
                        <span class="headline">Selecione as turmas</span>
                    </v-card-title>
                    <v-card elevation="0">
                        <v-checkbox
                            v-for="(item, index) in turmas" 
                            :key="index"
                            :label="item.nome"
                            :value="item.id"
                            v-model="chkTurmas"
                        ></v-checkbox>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn type="submit" :to="{name: 'aluno'}">Voltar</v-btn>
                    <v-btn color="primary" type="submit">Salvar</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
export default {
    props: {
        aluno: {
        },
        updating: {
            require: false,
            type: Boolean,
            default: false,
        }
    },
    data() {
        return {
            errors: {},
            turmas: {},
            chkTurmas: [],
        }
    },
    created() {
        this.retornarTurmas();
    },
    methods: {
        onSubmit() {
            this.aluno.turmas   = this.chkTurmas ?? '';

            const action = this.updating ? 'atualizarAluno' : 'cadastrarAluno';
            
            this.$store.dispatch(action, this.aluno)
                .then(response => { 
                    this.$router.push({name: 'aluno'})
                    this.$snotify.success(response, 'Pronto!');
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                    if(this.errors){
                        console.log(error.response.data);
                        this.$snotify.error('Campos obrigatórios!', 'Ops...')
                    }else if(error.response.status == 401){
                        this.$snotify.error(error.response.data, 'Ops...')
                        this.$router.push({name: 'aluno'});
                    }
                })
        },
        buscarEndereco() {
            if(this.aluno.cep.length == 9) {
                this.$viaCep.buscarCep(this.aluno.cep).then((response) => {
                    this.aluno.logradouro = response.logradouro;
                    this.aluno.estado     = response.uf;
                    this.aluno.cidade     = response.localidade;
                    this.aluno.bairro     = response.bairro;
                });
            }
        },
        retornarTurmas(){
            this.$store.dispatch('buscarTurmas')
                .then(response => {
                    this.turmas = response
                    if(this.updating)
                        this.montarCheckTurmas();
                });
        },

        /**
         * Alimenta a checkbox da view e cria um backup para 
         * verificar no backend quais serão inseridas e quais serão removidas
         */
        montarCheckTurmas(){
            this.aluno.turmas.forEach(element => this.chkTurmas.push(element.id));
            this.aluno.turmasOld = this.updating ? this.chkTurmas : '';
        }
    },
}
</script>

<style>

</style>