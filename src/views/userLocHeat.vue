
<template>
  <div>
    <baidu-map class="map" :center="map.center" :zoom="map.zoom" @ready="handler">
      <!-- <baidu-map class="map" :center="{lng: 113.660445, lat: 34.753598}" :zoom="14"> -->
      <!--缩放-->
      <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT" />
      <!--定位-->
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :show-address-bar="true" :auto-location="true" />
      <!--点-->
      <bm-marker :position="map.center" :dragging="map.dragging" animation="BMAP_ANIMATION_DROP">
        <!--提示信息-->
        <bm-info-window :show="map.show">华龙壹号院</bm-info-window>
      </bm-marker>
      <!-- 热力图 -->
      <bml-heatmap :data="locData" :max="100" :radius="20" />
    </baidu-map>
  </div>
</template>
<script>

import { BmlHeatmap } from 'vue-baidu-map'
import { userLocHeat } from '@/api/userAnalyse'
export default {
  components: {
    BmlHeatmap
  },
  data() {
    return {
      map: {
        center: { lng: 113.940895, lat: 35.073071 },
        zoom: 15,
        show: true,
        dragging: true
      },
      locData: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map)
      // 鼠标缩放
      map.enableScrollWheelZoom(true)
      // 点击事件获取经纬度
      map.addEventListener('click', function(e) {
        console.log('{ lng: ' + e.point.lng + ',' + ' lat: ' + e.point.lat + '},')
      })
    },
    getData() {
      userLocHeat().then(response => {
        this.locData = response.data.locData
      })
    }
  }
}
</script>
<style>
.map {
        width: 100%;
        height: 1000px;
    }
</style>
