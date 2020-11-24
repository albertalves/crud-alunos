<template>
  <div class="text-center">
    <v-dialog
      v-model="ativarModal"
      width="500"
    >
      <v-card>
        <v-card-title class="headline primary white--text">
          Alunos
        </v-card-title>

        <v-card-text>
           <v-simple-table dense>
                <template>
                    <thead>
                        <tr>
                            <th class="text-left">Nome</th>
                            <th class="text-left">E-mail</th>
                            <th class="text-left">Telefone</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in alunos"
                            :key="item.name"
                        >
                            <td>{{ item.nome }}</td>
                            <td>{{ item.email }}</td>
                            <td>{{ item.telefone }}</td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
  export default {
    data(){
        return {
          alunos: {},
          ativarModal: false,
        }
    },
    methods: {
      ativar(alunos){
        this.ativarModal  = true;
        this.alunos      = alunos;
      },
    }
  }
</script>