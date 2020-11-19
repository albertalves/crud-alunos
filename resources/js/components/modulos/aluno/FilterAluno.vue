<template>
    <v-container>
        <v-row>
            <v-col cols="9" md="3">
                <v-text-field
                    v-model="filter.nameOrEmail"
                    label="Buscar aluno..."
                    solo
                    dense
                ></v-text-field>
            </v-col>
            <v-col cols="9" md="3">
                <v-select
                    v-model="filter.select"
                    :items="items"
                    label="Selecione..."
                    solo
                    dense
                ></v-select>
            </v-col>
            <v-col cols="9" md="3">    
                <v-btn @click.prevent="search">Buscar</v-btn>
                <v-btn @click.prevent="clear">Limpar</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            filter: {},
            items: [
              'Nome',
              'E-mail',
            ],
        }
    },

    methods: {
        search() {
            this.$emit('search', this.filter) 
        },
        clear() {
            this.filter = {};
            this.$emit('clear', this.filter) 
        }
    }
}
</script>