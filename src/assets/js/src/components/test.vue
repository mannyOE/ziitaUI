<template> 
    <div class="final">
    <div class="hey">
    <div id="scrollbar2">
        <div class="viewport">
        <div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
                <div class="overview">
                <h3>Magnis dis parturient montes</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae velit at velit pretium sodales. Maecenas egestas imperdiet mauris, vel elementum turpis iaculis eu. Duis egestas augue quis ante ornare eu tincidunt magna interdum. Vestibulum posuere risus non ipsum sollicitudin quis viverra ante feugiat. Pellentesque non faucibus lorem. Nunc tincidunt diam nec risus ornare quis porttitor enim pretium. Ut adipiscing tempor massa, a ullamcorper massa bibendum at. Suspendisse potenti. In vestibulum enim orci, nec consequat turpis. Suspendisse sit amet tellus a quam volutpat porta. Mauris ornare augue ut diam tincidunt elementum. Vivamus commodo dapibus est, a gravida lorem pharetra eu. Maecenas ultrices cursus tellus sed congue. Cras nec nulla erat.</p>

                <p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque eget mauris libero. Nulla sit amet felis in sem posuere laoreet ut quis elit. Aenean mauris massa, pretium non bibendum eget, elementum sed nibh. Nulla ac felis et purus adipiscing rutrum. Pellentesque a bibendum sapien. Vivamus erat quam, gravida sed ultricies ac, scelerisque sed velit. Integer mollis urna sit amet ligula aliquam ac sodales arcu euismod. Fusce fermentum augue in nulla cursus non fermentum lorem semper. Quisque eu auctor lacus. Donec justo justo, mollis vel tempor vitae, consequat eget velit.</p>

                <p>Vivamus sed tellus quis orci dignissim scelerisque nec vitae est. Duis et elit ipsum. Aliquam pharetra auctor felis tempus tempor. Vivamus turpis dui, sollicitudin eget rhoncus in, luctus vel felis. Curabitur ultricies dictum justo at luctus. Nullam et quam et massa eleifend sollicitudin. Nulla mauris purus, sagittis id egestas eu, pellentesque et mi. Donec bibendum cursus nisi eget consequat. Nunc sit amet commodo metus. Integer consectetur lacus ac libero adipiscing ut tristique est viverra. Maecenas quam nibh, molestie nec pretium interdum, porta vitae magna. Maecenas at ligula eget neque imperdiet faucibus malesuada sed ipsum. Nulla auctor ligula sed nisl adipiscing vulputate. Curabitur ut ligula sed velit pharetra fringilla. Cras eu luctus est. Aliquam ac urna dui, eu rhoncus nibh. Nam id leo nisi, vel viverra nunc. Duis egestas pellentesque lectus, a placerat dolor egestas in. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec vitae ipsum non est iaculis suscipit.</p>

                <h3>Adipiscing risus </h3>
                <p>Quisque vel felis ligula. Cras viverra sapien auctor ante porta a tincidunt quam pulvinar. Nunc facilisis, enim id volutpat sodales, leo ipsum accumsan diam, eu adipiscing risus nisi eu quam. Ut in tortor vitae elit condimentum posuere vel et erat. Duis at fringilla dolor. Vivamus sem tellus, porttitor non imperdiet et, rutrum id nisl. Nunc semper facilisis porta. Curabitur ornare metus nec sapien molestie in mattis lorem ullamcorper. Ut congue, purus ac suscipit suscipit, magna diam sodales metus, tincidunt imperdiet diam odio non diam. Ut mollis lobortis vulputate. Nam tortor tortor, dictum sit amet porttitor sit amet, faucibus eu sem. Curabitur aliquam nisl sed est semper a fringilla velit porta. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum in sapien id nulla volutpat sodales ac bibendum magna. Cras sollicitudin, massa at sodales sodales, lacus tortor vestibulum massa, eu consequat dui nulla et ipsum.</p>

                <p>Aliquam accumsan aliquam urna, id vulputate ante posuere eu. Nullam pretium convallis tincidunt. Duis vitae odio arcu, ut fringilla enim. Nam ante eros, vestibulum sit amet rhoncus et, vehicula quis tellus. Curabitur sed iaculis odio. Praesent vitae ligula id tortor ornare luctus. Integer placerat urna non ligula sollicitudin vestibulum. Nunc vestibulum auctor massa, at varius nibh scelerisque eget. Aliquam convallis, nunc non laoreet mollis, neque est mattis nisl, nec accumsan velit nunc ut arcu. Donec quis est mauris, eu auctor nulla. Fusce leo diam, tempus a varius sit amet, auctor ac metus. Nam turpis nulla, fermentum in rhoncus et, auctor id sem. Aliquam id libero eu neque elementum lobortis nec et odio.</p>
            </div>
        </div>
        </div>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style>
    .hey  {
    /* outline: 1px solid black; */
    position: relative;
    height: 79%;
    overflow: hidden;
}
.final {
    width: 300px;
    height: 432px;
    margin: auto;
    /* transition: height 35s; */
    box-shadow: 0 4px 21px rgba(0, 0, 0, 0.2);
    padding: 5px;
    box-sizing: border-box;
    /* overflow: hidden; */
    /* outline: 1px solid blue; */
}
/*Tiny Styles*/
#scrollbar2 .disable { display: none; }
.noSelect { user-select: none; -o-user-select: none; -moz-user-select: none; -khtml-user-select: none; -webkit-user-select: none; }

/*New*/
#scrollbar2 .scrollbar {
    position: relative;
    background-position: 0 0;
    float: right;
    width: 15px;
}

#scrollbar2 .track {
    /* background: transparent url(images/bg-scrollbar-trackend-y.png) no-repeat 0 100%; */
    height: 100%;
    width: 13px;
    position: relative;
    padding: 0 1px;
}

#scrollbar2 .thumb {
    height: 20px;
    width: 8px;
    cursor: pointer;
    overflow: hidden;
    position: absolute;
    top: 0;
    /* left: -5px; */
    border-radius: 13px;
    background-color: rgba(0,0,0,0.6);
}

#scrollbar2 .thumb .end {
    /* background: transparent url(images/bg-scrollbar-thumb-y.png) no-repeat 50% 0; */
    overflow: hidden;
    height: 5px;
    /* width: 25px; */
}
#scrollbar2 {
     /* overflow-y: scroll; */
    height: 100%;
    /* outline: 1px solid blue; */
    position: relative;
    transition: background-color .15s linear;
    transition: width 0.01s, height 0.01s;
}
#scrollbar2 .viewport { width: 100%; height: 100%; overflow: hidden; position: relative; }
#scrollbar2 .overview { width: 100%; list-style: none; position: absolute; left: 0; top: 0; padding: 0; margin: 0; }
</style>
