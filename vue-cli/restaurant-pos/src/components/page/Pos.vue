<template>
  <div class="pos">
    <div>
      <el-row>
        <el-col :span="7" class="pos-order" id="order-list">
          <el-tabs type="border-card">
            <el-tab-pane label="点餐" class="order-pane">
              <el-table :data="tableData" :summary-method="getSummaries" border show-summary style="width: 100%;">
                <el-table-column prop="goodsName" label="商品名称"></el-table-column>
                <el-table-column prop="count" label="数量" width="70"></el-table-column>
                <el-table-column prop="price" label="金额" width="70"></el-table-column>
                <el-table-column label="操作" width="90" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" size="small">增加</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="div-btn">
                <el-button type="warning">挂单</el-button>
                <el-button type="danger">删除</el-button>
                <el-button type="success">结账</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">
              挂单
            </el-tab-pane>
            <el-tab-pane label="外卖">
              外卖
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="17">
          <div class="often-goods">
            <div class="title">常用商品</div>
            <div class="often-goods-list">
              <ul>
                <li v-for="goods of oftenGoods" :key="goods.goodsId" @click="addOrderList(goods)">
                  <span>{{goods.goodsName}}</span>
                  <span class="o-price">￥{{goods.price}}</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="goods-type">
            <el-tabs type="border-card">
              <el-tab-pane label="汉堡">
                <ul class='cookList'>
                  <li v-for="goods in type0Goods" :key="goods.id" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <div class="foodContent">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}</span>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="小食">
                <ul class='cookList'>
                  <li v-for="goods in type1Goods" :key="goods.id" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <div class="foodContent">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}</span>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="饮料">
                <ul class='cookList'>
                  <li v-for="goods in type2Goods" :key="goods.id" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <div class="foodContent">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}</span>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
              <el-tab-pane label="套餐">
                <ul class='cookList'>
                  <li v-for="goods in type3Goods" :key="goods.id" @click="addOrderList(goods)">
                    <span class="foodImg"><img :src="goods.goodsImg" width="100%"></span>
                    <div class="foodContent">
                      <span class="foodName">{{goods.goodsName}}</span>
                      <span class="foodPrice">￥{{goods.price}}</span>
                    </div>
                  </li>
                </ul>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Pos',
  data () {
    return {
      tableData: [],
      oftenGoods: [],
      type0Goods: [],
      type1Goods: [],
      type2Goods: [],
      type3Goods: []
    }
  },
  created () {
    // 读取常用商品数据
    axios.get('https://www.easy-mock.com/mock/5bf0b232a0bdb34c1fe20e3b/restaurant-pos/oftenGoods')
      .then(response => {
        // console.log(response)
        this.oftenGoods = response.data
      })
      .catch(error => {
        alert('网络错误，不能访问', error)
      })

    // 读取分类商品数据
    axios.get('https://www.easy-mock.com/mock/5bf0b232a0bdb34c1fe20e3b/restaurant-pos/typeGoods')
      .then(response => {
        // console.log(response.data)
        this.type0Goods = response.data[0]
        this.type1Goods = response.data[1]
        this.type2Goods = response.data[2]
        this.type3Goods = response.data[3]
      })
      .catch(error => {
        alert('网络错误，不能访问', error)
      })
  },
  mounted () {
    var orderHeight = document.body.clientHeight
    // console.log(orderHeight)
    document.getElementById('order-list').style.height = orderHeight + 'px'
  },
  methods: {
    /* 添加订单列表的方法 */
    addOrderList (goods) {
      // 汇总数量清零
      // this.totalCount = 0

      // 商品如果已经存在于订单列表中
      let isHave = false
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].goodsId === goods.goodsId) {
          isHave = true
        }
      }

      // 根据判断的值编写业务逻辑
      if (isHave) {
        // 改变列表中商品的数量
        let arr = this.tableData.filter(o => o.goodsId === goods.goodsId)
        arr[0].count++
      } else {
        // 当前订单列表中还未存在该商品
        let newGoods = {
          goodsId: goods.goodsId,
          goodsName: goods.goodsName,
          price: goods.price,
          count: 1
        }
        this.tableData.push(newGoods)
      }
    },
    getSummaries (param) {
      const { columns, data } = param
      // 各分类总计
      const sums = []
      // 存放每种商品的数量
      let count = []
      columns.forEach((column, index) => {
        const values = data.map(item => Number(item[column.property]))
        if (index === 0) {
          sums[index] = '合计'
          return null
        } else if (index === 1) {
          if (!values.every(value => isNaN(value))) {
            for (let v in values)
              count[v] = values[v]
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
          }
        } else if (index === 2) {
          console.log(count)
          if (!values.every(value => isNaN(value))) {
            sums[index] = 0
            /* sums[index] = values.map((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0) */
            for (let v in values) {
              sums[index] += values[v] * count[v]
            }
            sums[index] += ' 元'
          }
        } else {
          sums[index] = ''
        }
      })
      return sums
    }
  }
}
</script>

<style scoped>
.pos-order {
  background-color: #f9fafc;
  border-right: 1px solid #c0ccda;
}
.div-btn {
  margin-top: 10px;
  text-align: center;
}
.title {
  height: 20px;
  border-bottom: 1px solid #d3dce6;
  background-color: #f9fafc;
  padding: 10px;
}
.often-goods-list {
  font-size: 14px;
}
.often-goods-list ul li {
  list-style: none;
  float: left;
  border: 1px solid #e5e9f2;
  padding: 10px;
  margin: 5px;
  background-color: #fff;
  cursor: pointer;
}
.o-price {
  color: #58b7ff;
}
.goods-type {
  clear: both;
  padding-top: 10px;
}
.cookList li {
  list-style: none;
  width: 180px;
  height: auto;
  border: 1px solid #e5e9f2;
  background-color: #fff;
  overflow: hidden;
  margin: 2px;
  padding: 2px;
  float: left;
  cursor: pointer;
}
.cookList li span {
  display: block;
  float: left;
}
.foodImg {
  width: 40%;
}
.foodContent {
  padding: 10px 0;
}
.foodName {
  font-size: 16px;
  padding-left: 10px;
  color: #3f3f3f;
}
.foodPrice {
  font-size: 14px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
