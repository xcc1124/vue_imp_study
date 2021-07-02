/**
 * 百度地图=》火星坐标
 * @param {*} baidu_point
 * @returns
 */
export function baiduTomars(baidu_point) {
  var x_pi = (3.14159265358979324 * 3000.0) / 180.0;
  var mars_point = { lat: 0, lon: 0 };
  var x = baidu_point.lon - 0.0065;
  var y = baidu_point.lat - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  mars_point.lat = z * Math.sin(theta);
  mars_point.lon = z * Math.cos(theta);
  return mars_point;
}

/**
 * 火星坐标系=》天地图坐标系
 * @param {*} gcj_point
 * @returns
 */
export function transformGCJ2WGS(gcj_point) {
  var PI = 3.14159265358979324;
  function delta(lat, lon) {
    let a = 6378245.0; //  a: 卫星椭球坐标投影到平面地图坐标系的投影因子。
    let ee = 0.00669342162296594323; //  ee: 椭球的偏心率。
    let dLat = transformLat(lon - 105.0, lat - 35.0);
    let dLon = transformLon(lon - 105.0, lat - 35.0);
    let radLat = (lat / 180.0) * PI;
    let magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    let sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * PI);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * PI);
    return {
      lat: dLat,
      lon: dLon,
    };
  }
  function transformLat(x, y) {
    let ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(y * PI) + 40.0 * Math.sin((y / 3.0) * PI)) * 2.0) / 3.0;
    ret +=
      ((160.0 * Math.sin((y / 12.0) * PI) + 320 * Math.sin((y * PI) / 30.0)) *
        2.0) /
      3.0;
    return ret;
  }
  function transformLon(x, y) {
    let ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * PI) + 20.0 * Math.sin(2.0 * x * PI)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * PI) + 40.0 * Math.sin((x / 3.0) * PI)) * 2.0) / 3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * PI) + 300.0 * Math.sin((x / 30.0) * PI)) *
        2.0) /
      3.0;
    return ret;
  }
  let d = delta(gcj_point.lat, gcj_point.lon);
  return {
    lat: gcj_point.lat - d.lat,
    lon: gcj_point.lon - d.lon,
  };
}

/**
 * 天地图=》火星
 */
export function WGSToGCJ(baidu_point) {
  var pi = 3.14159265358979324;

  var a = 6378245.0;

  var ee = 0.00669342162296594323;
  function aa(baidu_point) {
    var mars_point = { lon: 0, lat: 0 };
    if (outOfChina(baidu_point.lon, baidu_point.lat)) {
      mars_point.lat = baidu_point.lat;
      mars_point.lon = baidu_point.lon;
      return;
    }
    var dLat = transformLat(baidu_point.lon - 105.0, baidu_point.lat - 35.0);
    var dLon = transformLon(baidu_point.lon - 105.0, baidu_point.lat - 35.0);
    var radLat = (baidu_point.lat / 180.0) * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / (((a * (1 - ee)) / (magic * sqrtMagic)) * pi);
    dLon = (dLon * 180.0) / ((a / sqrtMagic) * Math.cos(radLat) * pi);
    mars_point.lat = baidu_point.lat + dLat;
    mars_point.lon = baidu_point.lon + dLon;
    return mars_point;
  }

  /*判断是否在国内，不在国内则不做偏移*/
  function outOfChina(lon, lat) {
    if ((lon < 72.004 || lon > 137.8347) && (lat < 0.8293 || lat > 55.8271)) {
      return true;
    } else {
      return false;
    }
  }

  function transformLat(x, y) {
    var ret =
      -100.0 +
      2.0 * x +
      3.0 * y +
      0.2 * y * y +
      0.1 * x * y +
      0.2 * Math.sqrt(Math.abs(x));

    ret +=
      ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
      3.0;

    ret +=
      ((20.0 * Math.sin(y * pi) + 40.0 * Math.sin((y / 3.0) * pi)) * 2.0) / 3.0;

    ret +=
      ((160.0 * Math.sin((y / 12.0) * pi) + 320 * Math.sin((y * pi) / 30.0)) *
        2.0) /
      3.0;

    return ret;
  }
  function transformLon(x, y) {
    var ret =
      300.0 +
      x +
      2.0 * y +
      0.1 * x * x +
      0.1 * x * y +
      0.1 * Math.sqrt(Math.abs(x));
    ret +=
      ((20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0) /
      3.0;
    ret +=
      ((20.0 * Math.sin(x * pi) + 40.0 * Math.sin((x / 3.0) * pi)) * 2.0) / 3.0;
    ret +=
      ((150.0 * Math.sin((x / 12.0) * pi) + 300.0 * Math.sin((x / 30.0) * pi)) *
        2.0) /
      3.0;
    return ret;
  }
  return aa(baidu_point);
}

/**火星=》百度 */
export function marsTobaidu(mars_point) {
  let x_pi = (3.14159265358979324 * 3000.0) / 180.0;

  var baidu_point = { lon: 0, lat: 0 };

  var x = mars_point.lon;

  var y = mars_point.lat;

  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);

  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);

  baidu_point.lon = z * Math.cos(theta) + 0.0065;

  baidu_point.lat = z * Math.sin(theta) + 0.006;

  return baidu_point;
}

/**
 * 百度地图=》天地图坐标(WGS-84)
 * @param {*} baidu_point
 * @returns
 */
export function baiduToGCJ2WGS(baidu_point) {
  let tomars_point = baiduTomars(baidu_point);
  return transformGCJ2WGS(tomars_point);
}

/**
 * 天地图坐标=》百度地图(WGS-84)
 * @param {*} baidu_point
 * @returns
 */
export function GCJ2WGSTobaidu(baidu_point) {
  let tomars_point = WGSToGCJ(baidu_point);
  return marsTobaidu(tomars_point);
}

/**base64转文件 */
export function base64ToFile(imgBase64, fileName = "base64") {
  const base64ToBlob = function (base64Data) {
    let arr = base64Data.split(","),
      fileType = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      l = bstr.length,
      u8Arr = new Uint8Array(l);

    while (l--) {
      u8Arr[l] = bstr.charCodeAt(l);
    }
    return new Blob([u8Arr], {
      type: fileType,
    });
  };
  const blobToFile = function (newBlob, fileName) {
    newBlob.lastModifiedDate = new Date();
    newBlob.name = fileName;
    const files = new window.File([newBlob], fileName);
    return files;
  };
  return blobToFile(base64ToBlob(imgBase64), fileName);
}
