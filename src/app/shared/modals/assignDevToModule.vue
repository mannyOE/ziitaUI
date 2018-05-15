<template>
    <el-dialog :visible="show"
      width="40%" 
      :show-close="false" 
      :before-close="beforeClose">
        <div slot="title">
            <button type="button" class="close" @click.stop="$_$closeModal">×</button>
        </div>

      <AssignDeveloperToModule :modalVisible.sync="show" @close="$_$closeModal()" 
        :moduleId="moduleId"
        :module="module"
        :projectId="projectId"
        @reloadStore="reloadStore"/>
    </el-dialog>
</template>

<script>
import AssignDeveloperToModule from '@/app/shared/assignDevModuleView'

export default {
    name: 'choose-team-member-modal',
    props: ['show', 'moduleId', 'projectId','module'],
    components: {
        AssignDeveloperToModule,
    },
    data () {
        return {
        }
    },
    methods: {
        beforeClose(done) {
            this.$_$closeModal()
            done();
        },
        reloadStore (type, id) {
            this.$emit('reloadStore', type, id)
        },
    },
}
</script>


<style scoped>
</style>