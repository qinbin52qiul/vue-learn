<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          我是订单兰
        </el-col>
        <el-col :span="17">
          我是产品栏
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pos',
  data () {
    return {

    }
  },
  mounted () {
    var orderHeight = document.body.clientHeight
    console.log(orderHeight)
    document.getElementById('order-list').style.height = orderHeight + 'px'
  }
}
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
</style>
