<template>
    <v-form @submit.prevent="onSubmit">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Nome*"
                        :rules="(this.errors.nome)"
                        :error="(this.errors.nome) ? true : false"
                        v-model="turma.nome"
                        type="text"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-text-field
                        label="Vagas*"
                        :rules="(this.errors.vagas)"
                        :error="(this.errors.vagas) ? true : false"
                        v-model="turma.vagas"
                        type="text"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-menu
                        v-model="menuIni"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        lazy
                        transition="scale-transition"
                        offset-y
                        full-width
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{on}">
                            <v-text-field
                                v-model="dataIniFormatted"
                                persistent-hint
                                label="Data início"
                                prepend-icon="mdi-calendar"
                                v-on="on"
                                readonly
                            ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="dataInicio"
                            no-title
                            :first-day-of-week="0"
                            locale="pt-br"
                        ></v-date-picker>
                    </v-menu>
                    <span 
                        v-if="this.errors.vagas"
                        class="error--text v-messages"
                    >
                        O campo 'data início' é obrigatório
                    </span>
                    <span
                        v-if="this.errors.dataInicio"
                        class="error--text v-messages"
                    >
                        A data de início não pode ser menor que a de hoje.
                    </span>
                </v-col>
                <v-col cols="12">
                    <v-select
                        v-model="turma.unidade_id"
                        :items="unidades"
                        item-text="nome"
                        item-value='id'
                        label="Selecionar unidade"
                        :rules="(this.errors.unidade_id)"
                        :error="(this.errors.unidade_id) ? true : false"
                    >
                    </v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-btn type="submit" :to="{name: 'turma'}">Voltar</v-btn>
                    <v-btn color="primary" type="submit">Salvar</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>

<script>
import moment from "moment";
export default {
    props: {
        turma: {
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
            menuIni: false,
            dataIniFormatted: (this.updating) ? this.dataPtBr(this.turma.data_inicio) : null,
            dataInicio: (this.updating) ? this.turma.data_inicio : null,
            unidades: null
        }
    },
    created(){
        this.buscarUnidades();
    },
    methods: {
        onSubmit() {
            this.turma.data_inicio = this.dataInicio;
            const action = this.updating ? 'atualizarTurma' : 'cadastrarTurma';
            
            this.$store.dispatch(action, this.turma)
                .then(response => { 
                    this.$router.push({name: 'turma'})
                    this.$snotify.success(response, 'Pronto!')
                })
                .catch(error => {
                    this.errors = error.response.data.errors;
                    this.$snotify.error('Preencha os campos obrigatórios!', 'Ops...')
                })
        },
        formatDate (date) {
            if (!date) return null

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },
        dataPtBr(value) {
            return moment(value).format("DD/MM/Y");
        },
        buscarUnidades(){
            this.$store.dispatch('buscarUnidades').then(response => this.unidades = response);
        }
    },
    watch: {
        dataInicio(val) {
            this.dataIniFormatted = this.formatDate(val);
        },
  },
}
</script>

<style>

</style>