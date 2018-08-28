function CircleOverlay(center, radius, color){
  this._center = center;
  this._radius = radius;
  this._color = color;
}
CircleOverlay.prototype = new BMap.Overlay();
CircleOverlay.prototype.initialize = (map)=>{
  this._map = map;
  let div = document.createElement("div");
  div.style.position = "absolute";
  div.style.width = this._radius + "px";
  div.style.height = this._radius + "px";
  div.style.background = this._color;
  div.style.borderRadius = '50%';
  map.getPanes().markerPane.appendChild(div);
  this._div = div;
  return div;
}
CircleOverlay.prototype.draw = ()=>{
  var position = this._map.pointToOverlayPixel(this._center);
  this._div.style.left = position.x - this._length / 2 + "px";
  this._div.style.top = position.y - this._length / 2 + "px";
}

export default {
  circle: CircleOverlay
}

