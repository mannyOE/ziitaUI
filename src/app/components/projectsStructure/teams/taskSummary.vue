<template id="">
  <div class="container" style="margin-top: 30px;">
    <div class="row">
      <div class="col-md-4 text-center">
        <div class="fa fa-flag">

        </div><br>
        {{project.all_task}}
        <div class="">
          Tasks Assigned
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="fa fa-flag">

        </div><br>
        {{project.in_progress}}
        <div class="">
          Deadlines Missed
        </div>
      </div>
      <div class="col-md-4 text-center">
        <div class="fa fa-flag">

        </div><br>
        {{project.done}}
        <div class="">
          Tasks Completed
        </div>
      </div>
    </div>

    <div class="row" style="border-top: 1px dashed #D6DAE5;">
      <div class="col-md-4">
        <!-- klsdo;eiro -->
      </div>
      <div class="col-md-4 text-center">

        {{project.progress.toFixed(0)}}%
      </div>
      <div class="col-md-4 text-center">

      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'taskSummary',
    props: ['member','stats','project']
  }
</script>
