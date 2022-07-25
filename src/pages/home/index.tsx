import React, { useEffect } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';
import styles from './index.less';

export default function Index() {
  useEffect(() => {
    AMapLoader.load({
      key: '835b7af950f744acb9d111baf0df9c67', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        const buildingLayer = new AMap.Buildings({
          zIndex: 130,
          zooms: [16, 20],
        });
        const options = {
          hideWithoutStyle: false, //是否隐藏设定区域外的楼块
          visible: false,
          areas: [
            {
              //围栏1
              //visible:false,//是否可见
              rejectTexture: false, //是否屏蔽自定义地图的纹理
              color1: '#FFFFFF', //楼顶颜色
              color2: '#222222', //楼面颜色
              path: [
                [120.88138, 30.14324],
                [120.88296, 30.14303],
                [120.88222, 30.14211],
              ],
            },
            {
              //围栏2
              color1: 'ff99ff00',
              color2: 'ff999900',
              path: [
                [120.85406, 30.14649],
                [120.8548, 30.144],
                [120.85609, 30.145],
                [120.85545, 30.14685],
                [120.85546, 30.14685],
              ],
            },
          ],
        };
        buildingLayer.setStyle(options); //此配色优先级高于自定义mapStyle

        const map = new AMap.Map('container', {
          zoom: 17,
          pitch: 50,
          showBuildingBlock: true,
          showIndoorMap: false,
          showLabel: false,
          mapStyle: 'amap://styles/a0514d556c49223740a59f4d8f7ba8f4',
          center: [120.881689, 30.142519],
          features: ['bg', 'point', 'road'],
          viewMode: '3D',
          layers: [AMap.createDefaultLayer()],
        });
        map.addControl(new AMap.Scale());
        new AMap.Polygon({
          bubble: true,
          fillOpacity: 0,
          strokeWeight: 0,
          path: options.areas[0].path,
          map: map,
        });
        map.on('click', function (e: { [x: string]: any }) {
          console.log(e.lnglat.lat);
          const p0 = [e.lnglat.lng, e.lnglat.lat];
          const inRing = AMap.GeometryUtil.isPointInRing(p0, [
            [120.88138, 30.14324],
            [120.88296, 30.14303],
            [120.88222, 30.14211],
          ]);
          if (!inRing) {
            map.remove(buildingLayer);
          } else {
            map.add(buildingLayer);
          }
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className={styles.wrapper}>
      <span>主页</span>
      <div style={{ width: '100%', height: 800 }} id="container"></div>
    </div>
  );
}
