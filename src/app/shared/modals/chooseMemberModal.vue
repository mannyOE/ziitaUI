<template>
    <el-dialog :visible="show"
      width="35%" style="margin-top: -100px;"
      :show-close="false"
      :before-close="beforeClose">
        <div slot="title">
            <button type="button" class="close" @click.stop="$_$closeModal">×</button>
        </div>
      <h3 class="text-center">Add Team Members</h3>
      <ChooseMember :modalVisible.sync="show" @reloadStore="reloadStore" @close="$_$closeModal()" 
      :developer="developer" :projectId="projectId"/>
    </el-dialog>
</template>

<script>
import ChooseMember from '@/app/shared/chooseMember'

export default {
    name: 'choose-team-member-modal',
    props: ['show', 'projectId', 'developer'],
    components: {
        ChooseMember,
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
        goBack () {
            this.$emit('back')
        },
        sendPM () {
            this.$emit('next')
        },
        reloadStore(type, id) {
            this.$emit('reloadStore', type, id)
        },
    },
}
</script>


<style scoped>
</style>
